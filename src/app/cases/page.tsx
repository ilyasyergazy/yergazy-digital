import type { Metadata } from 'next';
import Soon from '@/components/Soon';

export const metadata: Metadata = { title: 'Кейсы и разборы', alternates: { canonical: '/cases' } };

export default function Page() {
  return <Soon title={<>кейсы<br /><span>и разборы</span></>} text={<>собираю кейсы с цифрами и честные разборы <br />слитых бюджетов. пока могу рассказать лично</>} />;
}
