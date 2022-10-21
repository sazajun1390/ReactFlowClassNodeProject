import ReactFlow,{
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Background
} from 'reactflow'
import 'reactflow/dist/style.css'
import {
  initialEdges,
  initialNodes
} from '../store/ReactFlowStarterDeck'
import { useCallback } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { 
  Box,
  useDisclosure, 
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react'
import type { 
  Edge,
  Connection 
} from 'reactflow'

import { useToGetWindowSize } from '../hooks/useToGetWindowSize'
import { useEditorDisclojure } from '../recoil/atoms/EditerDrawerState'

const FLowEditPage :NextPage = () =>{
  const { height, width } = useToGetWindowSize();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { EditorIsOpen, EditorOnOpen, EditorOnClose } = useEditorDisclojure();

  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div>
      <Head>
        <title>fLowEditPage</title>
      </Head>

      <Header/>

      <Box
        w={width}
        h={height-16}
        top="16px"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <MiniMap/>
          <Controls/>
          <Background/>
        </ReactFlow>

      </Box>
    </div>
  )
}

export default FLowEditPage;