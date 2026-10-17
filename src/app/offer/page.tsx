import type { Metadata } from 'next';
import Soon from '@/components/Soon';

export const metadata: Metadata = { title: 'Публичная оферта', robots: { index: false } };

export default function Page() {
  return <Soon chip="документ" title={<>публичная<br /><span>оферта</span></>} text={<>текст оферты скоро появится на этой странице</>} />;
}
