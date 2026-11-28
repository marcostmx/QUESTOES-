# Vendas por assinatura (Mercado Pago)

O app cobra uma assinatura mensal (Premium) pelo Mercado Pago. Enquanto o token do Mercado Pago não
estiver configurado no servidor, **tudo fica liberado** e a página Premium avisa que as vendas não estão abertas.

## O que é grátis e o que é Premium

Regras em `src/app/core/acesso.ts`:

| Recurso | Grátis | Premium |
| --- | --- | --- |
| Estações de OSCE 3D | 2 por sistema | todas |
| Prova OSCE completa e circuitos | não | sim |
| Casos clínicos vivos | IAM e asma | todos |
| Plantão e procedimentos | oxigenoterapia | todos |
| Questões | 20 por dia | ilimitadas |
| Simulados | não | sim |

## Como funciona

1. O aluno entra com Google e toca em **Assinar**. O servidor cria a assinatura (`/preapproval`) e abre o checkout do Mercado Pago.
2. O Mercado Pago avisa o servidor em `/api/mp/webhook`, e o aluno volta para `/#/planos?retorno=1`.
3. Nos dois casos o servidor **consulta a assinatura na API do Mercado Pago** e grava o status em Firestore `assinaturas/{uid}`. Só o servidor escreve ali.
4. O Premium vale enquanto o status for `authorized`. Se o aluno cancelar ou a cobrança pausar, o acesso Premium é retirado.

O aluno pode cancelar na própria página Premium.

## Configurar (uma vez)

1. **Conta Mercado Pago:**
   - Crie uma conta de vendedor (de preferência como MEI ou CNPJ).
   - Em *Suas integrações*, crie uma aplicação do tipo "Assinaturas".
   - Copie o **Access Token de produção**. Para testar, use antes o de teste com usuários de teste.
2. **Webhook:**
   - Na aplicação, em *Webhooks*, cadastre `https://SEU-ENDERECO/api/mp/webhook`.
   - Marque os eventos *Planos e assinaturas* (`subscription_preapproval` e `subscription_authorized_payment`).
   - Copie a **assinatura secreta**.
3. **Variáveis no Cloud Run:** no serviço, abra *Editar e implantar nova revisão → Variáveis e secrets*. Guarde os dois tokens como **secrets** (Secret Manager), nunca no repositório. Os deploys seguintes mantêm essa configuração.
   - `MP_ACCESS_TOKEN`: token do passo 1 (secret).
   - `MP_WEBHOOK_SECRET`: assinatura secreta do passo 2 (secret).
   - `PRECO_MENSAL`: por exemplo `29.90`.
   - `APP_URL`: endereço público do app, sem barra no fim.
   - `ADMIN_EMAILS`: e-mails com Premium liberado (o seu), separados por vírgula.
4. **Permissão no Firestore:** a conta de serviço do Cloud Run precisa do papel *Cloud Datastore User* no projeto do Firebase. Se o Cloud Run estiver no mesmo projeto, isso já vale.
5. **Testar:**
   - assine com um usuário de teste;
   - confira o documento em `assinaturas/{uid}`;
   - cancele pela página Premium.

## Antes de vender

- Termos de uso e política de privacidade (LGPD): estão no roteiro, item P3.
- Emissão de nota fiscal pelo MEI ou CNPJ.
- Direito autoral: o banco inclui questões de provas antigas e slides de professores, e parte das estações OSCE vem de material da faculdade. A decisão foi manter esse conteúdo. O ideal é ter autorização por escrito dos autores ou da instituição.
- Proteção do conteúdo: hoje o conteúdo Premium vai junto no pacote do app. Mover isso para o servidor é o item P2 do roteiro.
