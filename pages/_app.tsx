import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme, createMultiStyleConfigHelpers, type ThemeConfig } from '@chakra-ui/react'
import { ReactFlowProvider, useReactFlow } from 'reactflow'
import { AnimatePresence } from 'framer-motion'
import { cardAnatomy } from '@chakra-ui/anatomy'
import 'reactflow/dist/style.css'
import '@reactflow/node-resizer/dist/style.css'
import 'firebaseui/dist/firebaseui.css'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)
const cardBgColor = definePartsStyle({
  container: {
    backgroundColor: 'white',
  },
})
const colors: ThemeConfig = {
  initialColorMode: 'dark',
}

const theme = {
  ...extendTheme({ colors }),
  styles: {
    global: {
      body: {
        bg: 'white-100',
      },
    },
    fonts: {
      body: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'`,
    },
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence>
        <ReactFlowProvider>
          <Component {...pageProps} />
        </ReactFlowProvider>
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
