/* Termos de uso e Política de privacidade (LGPD). Preencher RESPONSAVEL antes de vender. */
import { PageHeader } from '../ui';
import { href } from '../router';

/** Dados do controlador: preencher com nome/razão social, CPF/CNPJ e e-mail de contato. */
export const RESPONSAVEL = { nome: '[nome ou razão social]', documento: '[CPF ou CNPJ]', contato: '[e-mail de contato]' };
const ATUALIZADO = '28/11/2026';

const H = ({ children }: { children: string }) => <h2 className="mt-7 mb-2 text-[17px] font-semibold text-ink">{children}</h2>;

function Termos() {
  return (
    <>
      <p>Estes termos regulam o uso do Estudo PR (o "app"), oferecido por {RESPONSAVEL.nome}, {RESPONSAVEL.documento}. Ao usar o app você concorda com eles.</p>
      <H>1. O que é o app</H>
      <p>Plataforma educacional para estudantes de Medicina, com simulador de OSCE, casos clínicos simulados e questões. O conteúdo é de estudo: não é orientação médica, não substitui aulas, professores, diretrizes oficiais nem a conduta clínica real.</p>
      <H>2. Conta</H>
      <p>O acesso usa sua conta Google. Você é responsável pelo uso da sua conta. A conta é pessoal e intransferível: compartilhar o acesso ou revender o conteúdo leva ao cancelamento sem reembolso.</p>
      <H>3. Plano grátis e Premium</H>
      <p>O plano grátis tem limites descritos na página Premium. O Premium é uma assinatura mensal com renovação automática, cobrada pelo Mercado Pago no cartão informado. A primeira assinatura de cada conta pode ter um período de teste grátis; se você cancelar antes do fim do teste, nada é cobrado.</p>
      <H>4. Cancelamento e reembolso</H>
      <p>Você pode cancelar a qualquer momento na página Premium; o acesso Premium termina com o cancelamento e não há novas cobranças. Em compras pela internet, você pode desistir em até 7 dias da primeira cobrança (art. 49 do Código de Defesa do Consumidor) e receber o valor de volta, pedindo pelo contato abaixo.</p>
      <H>5. Uso permitido</H>
      <p>É proibido copiar, extrair em massa, redistribuir ou vender o conteúdo, burlar os limites do plano ou tentar acessar áreas restritas. O conteúdo e o software são protegidos por direito autoral.</p>
      <H>6. Disponibilidade</H>
      <p>Trabalhamos para o app funcionar sempre, mas podem ocorrer interrupções e mudanças de conteúdo. O conteúdo é revisado continuamente; se encontrar um erro, avise pelo contato.</p>
      <H>7. Responsabilidade</H>
      <p>O app é ferramenta de estudo. Não nos responsabilizamos por decisões clínicas tomadas com base nele nem por resultados de provas.</p>
      <H>8. Mudanças e contato</H>
      <p>Estes termos podem mudar; a data da última atualização fica no topo. Contato: {RESPONSAVEL.contato}. Foro do domicílio do consumidor.</p>
    </>
  );
}

function Privacidade() {
  return (
    <>
      <p>Esta política explica como o Estudo PR trata seus dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018). Controlador: {RESPONSAVEL.nome}, {RESPONSAVEL.documento}, contato {RESPONSAVEL.contato}.</p>
      <H>1. Dados que coletamos</H>
      <ul className="list-disc pl-5">
        <li><b>Conta:</b> nome, e-mail e foto da sua conta Google, quando você entra.</li>
        <li><b>Estudo:</b> respostas, progresso, revisões, estações e casos realizados, para sincronizar entre aparelhos e montar a trilha.</li>
        <li><b>Assinatura:</b> status, data da próxima cobrança e identificador da assinatura no Mercado Pago. <b>Não recebemos nem guardamos dados do cartão</b>: o pagamento é processado pelo Mercado Pago.</li>
        <li><b>Neste aparelho:</b> preferências e cópia local do progresso (armazenamento do navegador), para o app funcionar offline.</li>
      </ul>
      <H>2. Para que usamos</H>
      <p>Prestar o serviço (execução de contrato), sincronizar seu progresso, controlar o acesso Premium, cumprir obrigações legais e fiscais, e melhorar o conteúdo com estatísticas agregadas (legítimo interesse). Não vendemos seus dados e não usamos para publicidade de terceiros.</p>
      <H>3. Com quem compartilhamos</H>
      <p>Google (Firebase: login, banco de dados e hospedagem) e Mercado Pago (pagamentos), como operadores, só para prestar o serviço. Os servidores podem ficar fora do Brasil, com as salvaguardas desses provedores.</p>
      <H>4. Por quanto tempo</H>
      <p>Enquanto sua conta existir. Depois de pedido de exclusão, apagamos os dados de estudo; registros de pagamento ficam pelo prazo exigido em lei.</p>
      <H>5. Seus direitos</H>
      <p>Confirmar o tratamento, acessar, corrigir, levar seus dados a outro serviço, pedir anonimização ou exclusão e revogar o consentimento. Peça pelo contato {RESPONSAVEL.contato}; respondemos em até 15 dias. Você também pode reclamar à ANPD.</p>
      <H>6. Segurança</H>
      <p>Acesso autenticado, comunicação criptografada (HTTPS) e regras que impedem um usuário de ler os dados de outro.</p>
    </>
  );
}

export default function LegalPage({ tipo }: { tipo: 'termos' | 'privacidade' }) {
  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow={`Atualizado em ${ATUALIZADO}`} title={tipo === 'termos' ? 'Termos de uso' : 'Política de privacidade'} />
      <div className="space-y-3 text-[14.5px] leading-relaxed text-ink-2">{tipo === 'termos' ? <Termos /> : <Privacidade />}</div>
      <p className="mt-8 text-[13px]"><a className="font-semibold text-accent" href={href(tipo === 'termos' ? 'privacidade' : 'termos')}>{tipo === 'termos' ? 'Política de privacidade' : 'Termos de uso'}</a></p>
    </div>
  );
}
