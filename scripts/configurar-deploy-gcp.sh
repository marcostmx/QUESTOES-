#!/usr/bin/env bash
# Configuração única do deploy automático (GitHub → Cloud Run), sem chaves:
# usa Workload Identity Federation, então nada secreto fica no GitHub.
#
# Como usar: abra https://shell.cloud.google.com (já logado na conta do AI Studio) e rode
#   bash <(curl -fsSL https://raw.githubusercontent.com/marcostmx/QUESTOES-/main/scripts/configurar-deploy-gcp.sh)
# No fim, copie o bloco "deploy.config.json" e mande para o Claude (ou salve na raiz do repositório).
set -euo pipefail

REPO="${REPO:-marcostmx/QUESTOES-}"
PROJECT="${PROJECT:-$(gcloud config get-value project 2>/dev/null)}"
if [ -z "$PROJECT" ]; then
  echo "Escolha o projeto do Google Cloud onde está o app do AI Studio:"
  gcloud projects list --format="value(projectId,name)"
  read -rp "ID do projeto: " PROJECT
fi
gcloud config set project "$PROJECT" >/dev/null
NUM=$(gcloud projects describe "$PROJECT" --format="value(projectNumber)")

echo "→ Serviços do Cloud Run no projeto $PROJECT:"
mapfile -t SERVICOS < <(gcloud run services list --format="value(metadata.name,metadata.labels.'cloud.googleapis.com/location')" 2>/dev/null)
if [ "${#SERVICOS[@]}" -eq 0 ]; then
  echo "Nenhum serviço encontrado. Confira se é o projeto certo (o do app publicado pelo AI Studio)."; exit 1
fi
i=1; for s in "${SERVICOS[@]}"; do echo "  $i) $s"; i=$((i+1)); done
if [ "${#SERVICOS[@]}" -eq 1 ]; then ESC=1; else read -rp "Qual é o Estudo PR? (número): " ESC; fi
read -r SERVICE REGION <<<"${SERVICOS[$((ESC-1))]}"
URL=$(gcloud run services describe "$SERVICE" --region "$REGION" --format="value(status.url)")
echo "→ Serviço: $SERVICE ($REGION) — $URL"

echo "→ Ativando APIs necessárias…"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com \
  iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com >/dev/null

SA="github-deploy@$PROJECT.iam.gserviceaccount.com"
gcloud iam service-accounts describe "$SA" >/dev/null 2>&1 || \
  gcloud iam service-accounts create github-deploy --display-name="Deploy automático do GitHub (Estudo PR)" >/dev/null
for ROLE in roles/run.admin roles/iam.serviceAccountUser roles/cloudbuild.builds.editor \
            roles/artifactregistry.admin roles/storage.admin roles/serviceusage.serviceUsageConsumer; do
  gcloud projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:$SA" --role="$ROLE" --condition=None >/dev/null
done
# a conta padrão usada pelo Cloud Build para montar a imagem
gcloud projects add-iam-policy-binding "$PROJECT" --member="serviceAccount:$NUM-compute@developer.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder" --condition=None >/dev/null || true

echo "→ Criando a federação de identidade só para o repositório $REPO…"
gcloud iam workload-identity-pools describe github --location=global >/dev/null 2>&1 || \
  gcloud iam workload-identity-pools create github --location=global --display-name="GitHub Actions" >/dev/null
gcloud iam workload-identity-pools providers describe github-oidc --location=global --workload-identity-pool=github >/dev/null 2>&1 || \
  gcloud iam workload-identity-pools providers create-oidc github-oidc --location=global --workload-identity-pool=github \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository=='$REPO'" >/dev/null
gcloud iam service-accounts add-iam-policy-binding "$SA" --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$NUM/locations/global/workloadIdentityPools/github/attribute.repository/$REPO" >/dev/null

PROVIDER="projects/$NUM/locations/global/workloadIdentityPools/github/providers/github-oidc"
echo
echo "✅ Pronto. Mande este bloco para o Claude (ele grava no repositório como deploy.config.json):"
echo "----------------------------------------------------------------"
cat <<JSON
{
  "projectId": "$PROJECT",
  "region": "$REGION",
  "service": "$SERVICE",
  "url": "$URL",
  "workloadIdentityProvider": "$PROVIDER",
  "serviceAccount": "$SA"
}
JSON
echo "----------------------------------------------------------------"
echo "(Nada disso é secreto: o acesso só funciona para o repositório $REPO.)"
