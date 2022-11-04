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
import { useCallback,useMemo } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { 
  Box,
  useColorModeValue,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import type { 
  Edge,
  Connection 
} from 'reactflow'

import { useToGetWindowSize } from '../hooks/useToGetWindowSize'
import { useDisclojureStore } from '../zustand/EditorDIscrojure'
import shallow from "zustand/shallow"
import { TestNode } from '../store/TestNode'
import ClassNodeComp from '../components/ClassNodeComp'
import { useForm } from 'react-hook-form'
import EditorDrawer from '../components/EditorDrawer'


const FLowEditPage :NextPage = () =>{
  const { height, width } = useToGetWindowSize();

  const [nodes, setNodes, onNodesChange] = useNodesState(TestNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //const { EditorIsOpen, EditorOnOpen, EditorOnClose } = useEditorDisclojure();

  
  const { EditorIsOpen, EditorOnClose } = useDisclojureStore((state)=> ({
    EditorIsOpen: state.isOpen,
    EditorOnClose: state.onClose
  }),shallow)

  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  console.log("EditPageRendering");
  const nodeTypes = useMemo(()=>({ custom: ClassNodeComp}),[]);

  return (
    <div>
      <Head>
        <title>fLowEditPage</title>
      </Head>

      <Header/>
      <EditorDrawer setNodes={setNodes}/>
      
      <Box
        w={width}
        h={height-16}
        top="16px"
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
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

/*
  <Drawer
        isOpen={EditorIsOpen}
        onClose={EditorOnClose}
        placement='right'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

        </DrawerContent>
      </Drawer>
*/