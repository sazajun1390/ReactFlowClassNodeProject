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
  Node,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import '@reactflow/node-resizer/dist/style.css'
import { initialEdges, initialNodes } from '../store/ReactFlowStarterDeck'
import { useCallback, useMemo, MouseEvent as ReactMouseEvent, FC, DragEvent, useRef, useState } from 'react'
import Draggable, { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';

import type { GetServerSideProps, NextPage } from 'next'
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
  Text as ChakraText,
} from '@chakra-ui/react'
import type { Edge, Connection } from 'reactflow'

import { useToGetWindowSize } from '../hooks/useToGetWindowSize'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import shallow from 'zustand/shallow'
import { testEdge, TestNode, userMapTestNode } from '../store/TestNode'
import ClassNodeComp from '../components/ClassNodePackage/ClassNodeComp'
import { useForm } from 'react-hook-form'
import EditorDrawer from '../components/EditorDrawer'
import { useEditData } from '../zustand/EditData'
import { useReactFlow } from 'reactflow'
import { implementsClassNode } from '../components/ClassNodePackage/type/ClassNodeCompTypeGuard'
import { ClassNodeData } from '../components/ClassNodePackage/type/ClassNodeComp'
import type { NodeMouseHandler } from 'reactflow'
import UserMapTagComp from '../components/UserMapPackage/UserMapTagComp'
import UserMapGroupComp from '../components/UserMapPackage/UserMapGroupComp'
import { getFirestore, collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db, analytics } from '../firebase/firebaseCallFunctions'
import firebaseApp from '../firebase/firebaseApp'
import type { Node as FlowNode } from 'reactflow'
import { firebaseAdmin } from '../firebase/firebaseAdmin'
import nookies from 'nookies'
import { getAuth } from 'firebase/auth'

const FLowEditPage: NextPage<{ NodeData?: FlowNode[] }> = ({ NodeData }) => {
  type NodeDragPosition = {
    position: {
      x:number,
      y:number
    }
  }
  const { height, width } = useToGetWindowSize()

  const [nodes, setNodes, onNodesChange] = useNodesState(userMapTestNode)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  //const { EditorIsOpen, EditorOnOpen, EditorOnClose } = useEditorDisclojure();
  const { getIntersectingNodes, getNodes } = useReactFlow()
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  /**
   * const { EditorIsOpen, EditorOnClose } = useDisclojureStore(
    (state) => ({
      EditorIsOpen: state.isOpen,
      EditorOnClose: state.onClose,
    }),
    shallow,
  )
  

  const EditorOnOpen = useDisclojureStore.getState().onOpen
  //setClassNodeData
  const setClassNodeData = (id: string, data: ClassNodeData) =>
    useEditData((state) => state.setData(id, data))
  const allowEdit = () => useEditData((state) => state.allowEdit())
  const denyEdit = () => useEditData((state) => state.denyEdit())
  */
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const nodeTypes = useMemo(
    () => ({
      custom: ClassNodeComp,
      UserMapTag: UserMapTagComp,
      UserMapGroup: UserMapGroupComp,
    }),
    [],
  )
  /**
   * const mouseEnter = useCallback<NodeMouseHandler>((e: ReactMouseEvent, node: Node) => {
    //setClassNodeData
    if (implementsClassNode(node) && useEditData.getState().dnotEdit) {
      useEditData.getState().setData(node.id, node.data)
      useEditData.getState().allowEdit()
    }
  }, [])

  const mouseLeave = useCallback<NodeMouseHandler>((e: ReactMouseEvent, node: Node) => {
    useEditData.getState().denyEdit()
  }, [])
   */


  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onNodeDragStart = (e:DragEvent, nodeType:string) => {
    e.dataTransfer.setData('application/reactflow',nodeType);
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragOver = useCallback((event:DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDrop = useCallback((event: DragEvent)=>{
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');

    if (typeof type === 'undefined' || !type) {
      return;
    }
    
    const newNode: Node<any> = {
      id: String(getNodes().length),
      position:{
        x: event.clientX,
        y: event.clientY - 40,
      },
      type,
      data:{label: 'data'}
    }
    setNodes( (nds)=>{
      console.log(nds)
      return nds.concat(newNode)
    })

  },[reactFlowInstance])

  return (
    <div>
      <Head>
        <title>fLowEditPage</title>
      </Head>

      <Header />
      <Box w={width} h={height} top='16px'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          defaultViewport={{ zoom: 1, x: 0, y: 0 }}
          fitView
          fitViewOptions={{ padding: 0.4 }}
          onDrop={onNodeDrop}
          onDragOver={onDragOver}
          onInit={onInit}
        >
          <MiniMap />
          <Controls />
          <Background />
          

          <Panel position='bottom-center'>
            <Box>
              <Box onDragStart={(e)=>{onNodeDragStart(e,'UserMapTag')}} w='40' h='50' bg='azure'>
                <ChakraText>付箋</ChakraText>
              </Box>
              <Box onDragStart={(e)=>{onNodeDragStart(e,'UserMapGroup')}}>
                <ChakraText>グループ</ChakraText>
              </Box>
            </Box>
          </Panel>
        </ReactFlow>
      </Box>
    </div>
  )
}
export default FLowEditPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = nookies.get(ctx).session || ''
  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null)

  const currentUser = getAuth(firebaseApp).currentUser

  if (!user) {
    return {
      redirect: {
        destination: '/signInPage',
        permanent: false,
      },
    }
  }
  

  return {
    props: {
      NodeData: '',
    },
  }
}
/*

          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
