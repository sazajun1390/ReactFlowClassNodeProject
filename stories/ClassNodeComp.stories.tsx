import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { ReactFlowProvider } from 'reactflow'
import ClassNodeComp from '../components/ClassNodeComp'
import { storyTestClass } from '../store/TestNode'
import { useEditData } from '../zustand/EditData'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'

export default {
  title: 'ClassNodeComp',
  component: ClassNodeComp,
} as ComponentMeta<typeof ClassNodeComp>

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const Template: ComponentStory<typeof ClassNodeComp> = (args) => (
  <ChakraProvider theme={theme}>
    <ReactFlowProvider>
      <ClassNodeComp {...args} />
    </ReactFlowProvider>
  </ChakraProvider>
)

export const Default: ComponentStory<typeof ClassNodeComp> = Template.bind({})

Default.args = storyTestClass

Default.storyName = 'デフォ'
