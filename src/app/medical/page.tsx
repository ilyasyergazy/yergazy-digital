import type { Metadata } from 'next';
import Soon from '@/components/Soon';

export const metadata: Metadata = {
  title: 'Маркетинг для клиник и врачей',
  description: 'Продвижение медицинских клиник и частных врачей в Алматы и по Казахстану.',
  alternates: { canonical: '/medical' },
};

export default function Page() {
  return <Soon chip="отдельное направление · скоро" title={<>продвижение<br /><span>для клиник<br className="mbr" /> и врачей</span></>} text={<>отдельная страница для медицины уже в работе. <br />напишите – расскажу, как работаю с клиниками</>} />;
}
