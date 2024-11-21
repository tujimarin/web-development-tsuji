import { renderToStaticMarkup } from 'react-dom/server';

export default function ShowRenderedHTML({ children }: any) {
  const markup = renderToStaticMarkup(
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
  return (
    <>
      (markup)
    </>
  );
}