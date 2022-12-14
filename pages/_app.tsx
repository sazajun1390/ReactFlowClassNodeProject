import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ReactFlowProvider, useReactFlow } from 'reactflow'
import { AnimatePresence } from 'framer-motion'
import 'reactflow/dist/style.css'
import '@reactflow/node-resizer/dist/style.css'

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
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
