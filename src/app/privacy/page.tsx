import type { Metadata } from 'next';
import Soon from '@/components/Soon';

export const metadata: Metadata = { title: 'Политика конфиденциальности', robots: { index: false } };

export default function Page() {
  return <Soon chip="документ" title={<>политика<br /><span>конфиденциальности</span></>} text={<>текст документа скоро появится на этой странице. <br />по вопросам данных пишите на ilyasyergazy@gmail.com</>} />;
}
