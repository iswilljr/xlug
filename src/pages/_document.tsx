import { createStylesServer, ServerStyles } from '@mantine/next'
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'

const stylesServer = createStylesServer()

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await NextDocument.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [initialProps.styles, <ServerStyles html={initialProps.html} server={stylesServer} key='styles' />],
  }
}
