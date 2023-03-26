import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document'

const config = {
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
