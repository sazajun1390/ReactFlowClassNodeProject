import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import ReactFlow, { ReactFlowProps, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from 'reactflow'
import UserMapTagComp from '../components/UserMapPackage/UserMapTagComp'
import { StroyUserMapTag } from '../store/TestNode'
import { useEditData } from '../zustand/EditData'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import { FC, useMemo } from 'react'
import { userMapTestNode } from '../store/TestNode'
import { useToGetWindowSize } from '../hooks/useToGetWindowSize'
//import UserMapGroup from '../components/UserMapPackage/UserMapGroupComp'

//userMapGroup: UserMapGroupComp
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
      <Flow/>
    </ReactFlowProvider>
  </ChakraProvider>
)

const Flow: FC<ReactFlowProps>=(props)=>{
  // you can access the internal state here
  const { height, width } = useToGetWindowSize()
  const [nodes, setNodes, onNodesChange] = useNodesState(userMapTestNode)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const reactFlowInstance = useReactFlow();
  const nodeTypes = useMemo(()=> ({
    userMapTag: UserMapTagComp,
    
  }),[])
  return(
    <Box w={width} h={height}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange} 
      />
    </Box>
  )    
}

export const Default: ComponentStory<typeof UserMapTagComp> = Template.bind({})

Default.args = StroyUserMapTag

Default.storyName = 'デフォ'
