import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  NodeProps,
  ReactFlowInstance,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { initialEdges, initialNodes } from '../store/ReactFlowStarterDeck'
import { useCallback, useMemo } from 'react'

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
  DrawerCloseButton,
} from '@chakra-ui/react'
import type { Edge, Connection } from 'reactflow'

import { useToGetWindowSize } from '../hooks/useToGetWindowSize'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import shallow from 'zustand/shallow'
import { testEdge, TestNode } from '../store/TestNode'
import ClassNodeComp from '../components/ClassNodeComp'
import { useForm } from 'react-hook-form'
import EditorDrawer from '../components/EditorDrawer'
import { useEditData } from '../zustand/EditData'
import { useReactFlow } from 'reactflow'
import { implementsClassNode } from '../type/ClassNodeCompTypeGuard'
import { ClassNodeData } from '../type/ClassNodeComp'

const FLowEditPage: NextPage = () => {
  const { height, width } = useToGetWindowSize()

  const [nodes, setNodes, onNodesChange] = useNodesState(TestNode)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  //const { EditorIsOpen, EditorOnOpen, EditorOnClose } = useEditorDisclojure();

  const { EditorIsOpen, EditorOnClose } = useDisclojureStore(
    (state) => ({
      EditorIsOpen: state.isOpen,
      EditorOnClose: state.onClose,
    }),
    shallow,
  )

  const EditorOnOpen = useDisclojureStore.getState().onOpen
  const setClassNodeData = (id: string, data: ClassNodeData) =>
    useEditData((state) => state.setData(id, data))
  const allowEdit = () => useEditData((state) => state.allowEdit())
  const denyEdit = () => useEditData((state) => state.denyEdit())

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  console.log('EditPageRendering')
  const nodeTypes = useMemo(() => ({ custom: ClassNodeComp }), [])

  return (
    <div>
      <Head>
        <title>fLowEditPage</title>
      </Head>

      <Header />
      <EditorDrawer setNodes={setNodes} />

      <Box w={width} h={height} top='16px'>
        <>
          <ReactFlow
            defaultNodes={nodes}
            defaultEdges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeMouseEnter={(e, node) => {
              if (implementsClassNode(node) && useEditData.getState().dnotEdit) {
                useEditData.getState().setData(node.id, node.data)
                useEditData.getState().allowEdit()
              }
            }}
            onNodeMouseLeave={() => {
              useEditData.getState().denyEdit()
            }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </>
      </Box>
    </div>
  )
}

export default FLowEditPage

/*
  const reactFlowInstance = useReactFlow();
  onNodeMouseEnter={(e,node)=>{
            if(implementsClassNode(node)) {
              useEditData.getState().setData(node.id,node.data);
            }
          }}
          onMouseLeave={()=>{
            useEditData.getState().resetData()
          }}

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
