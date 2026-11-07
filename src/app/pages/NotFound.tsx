import { Compass } from 'lucide-react';
import { Button, Empty } from '../ui';

export default function NotFound() {
  return (
    <Empty icon={<Compass className="size-5" />} title="Página não encontrada" action={<Button variant="primary" to="">Voltar ao início</Button>}>
      O endereço pode ter mudado na nova versão do app.
    </Empty>
  );
}
