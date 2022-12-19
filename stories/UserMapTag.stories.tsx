import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { ReactFlowProvider } from 'reactflow'
import UserMapTagComp from '../components/UserMapPackage/UserMapTagComp'
import { StroyUserMapTag } from '../store/TestNode'
import { useEditData } from '../zustand/EditData'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'

export default {
  title: 'UseMapTag',
  component: UserMapTagComp,
} as ComponentMeta<typeof UserMapTagComp>

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const Template: ComponentStory<typeof UserMapTagComp> = (args) => (
  <ChakraProvider theme={theme}>
    <ReactFlowProvider>
        <UserMapTagComp {...args}/>
    </ReactFlowProvider>
  </ChakraProvider>
)

export const Default: ComponentStory<typeof UserMapTagComp> = Template.bind({})

Default.args = StroyUserMapTag

Default.storyName = 'デフォ'
