import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ReactFlowProvider } from 'reactflow'
import { RecoilRoot } from 'recoil'
import { AnimatePresence } from 'framer-motion'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <AnimatePresence>
          <ReactFlowProvider>
            <Component {...pageProps} />
          </ReactFlowProvider>
        </AnimatePresence>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
