import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ReverbUITheme, ThemeProvider} from "@reverb-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ReverbUITheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
