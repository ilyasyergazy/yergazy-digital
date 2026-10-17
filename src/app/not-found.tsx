import Soon from '@/components/Soon';

export default function NotFound() {
  return <Soon chip="404" title={<>такой страницы<br /><span>нет</span></>} text={<>возможно, ссылка устарела. <br />вернитесь на главную или напишите мне</>} />;
}
