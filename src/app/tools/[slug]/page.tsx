import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Soon from '@/components/Soon';

const TOOLS: Record<string, { a: string; b: string; title: string }> = {
  whatsapp: { a: 'ссылка', b: 'на whatsapp', title: 'Генератор ссылки на WhatsApp' },
  strategy: { a: 'ии-стратегия', b: 'за 2 минуты', title: 'ИИ-стратегия продвижения' },
  calculator: { a: 'калькулятор', b: 'рекламы', title: 'Калькулятор рекламы' },
  audit: { a: 'мини-аудит', b: 'маркетинга', title: 'Мини-аудит маркетинга' },
};

export function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = TOOLS[slug];
  return t ? { title: t.title, alternates: { canonical: `/tools/${slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = TOOLS[slug];
  if (!t) notFound();
  return <Soon chip="бесплатный инструмент · скоро" title={<>{t.a}<br /><span>{t.b}</span></>} text={<>инструмент скоро заработает на этой странице. <br />а пока могу помочь лично</>} />;
}
