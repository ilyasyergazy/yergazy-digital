import Link from 'next/link';

type Props = { title: React.ReactNode; text: React.ReactNode; chip?: string };

export default function Soon({ title, text, chip = 'скоро' }: Props) {
  return (
    <div className="soon">
      <nav>
        <Link href="/" aria-label="на главную"><img src="/img/logo-yergazy.png" alt="yergazy digital" /></Link>
        <Link href="/" className="back">на главную</Link>
      </nav>
      <div className="body">
        <span className="chip fade">{chip}</span>
        <h1 className="fade">{title}</h1>
        <p className="fade">{text}</p>
        <div className="acts fade">
          <a className="pri" href="https://wa.me/77016545675" target="_blank" rel="noopener">написать в whatsapp</a>
          <Link className="sec" href="/">на главную</Link>
        </div>
      </div>
      <footer>© 2026 yergazy digital · ИП Express Marketing · БИН 941210300892</footer>
    </div>
  );
}
