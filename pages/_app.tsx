import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil';

import AllProviders from '../providers'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <AllProviders>
          <Component {...pageProps} />
        </AllProviders>
      </ChakraProvider>
    </RecoilRoot>
  )
}
