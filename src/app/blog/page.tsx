import type { Metadata } from 'next';
import Soon from '@/components/Soon';

export const metadata: Metadata = { title: 'Блог', alternates: { canonical: '/blog' } };

export default function Page() {
  return <Soon title={<>блог<br /><span>скоро</span></>} text={<>готовлю видео про рекламу, продажи и цифры. <br />первые выпуски появятся здесь</>} />;
}
