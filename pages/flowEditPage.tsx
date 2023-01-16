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
import {
  useCallback,
  useMemo,
  MouseEvent as ReactMouseEvent,
  FC,
  DragEvent,
  useRef,
  useState,
  useEffect,
} from 'react'
import Draggable, { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable'

import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import {
  Box,
  useColorModeValue,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text as ChakraText,
  Button,
} from '@chakra-ui/react'
import type { Edge, Connection } from 'reactflow'

import { useToGetWindowSize } from '../hooks/useToGetWindowSize'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import shallow from 'zustand/shallow'
import { defaultClassData, testEdge, TestNode, userMapTestNode } from '../store/TestNode'
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
import { db, analytics, realDB, auth, logout } from '../firebase/firebaseCallFunctions'
import { ref, onValue, get, child, set, update } from 'firebase/database'
import firebaseApp from '../firebase/firebaseApp'
import type { Node as FlowNode } from 'reactflow'
import { firebaseAdmin } from '../firebase/firebaseAdmin'
import nookies, { parseCookies } from 'nookies'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getCookie, hasCookie } from 'cookies-next'
import { useSWRConfig } from 'swr'
import Router from 'next/router'
import { json } from 'stream/consumers'
import FloatingConnectionLine from '../components/ClassNodePackage/ConnectionLin'
import FloatingEdge from '../components/ClassNodePackage/FloatingEdge'
import { getEdgeParams } from '../components/ClassNodePackage/utils'
import { EditIcon } from '@chakra-ui/icons'

const FLowEditPage: NextPage<{ NodeData: FlowNode[], EdgeData: Edge[] }> = ({ NodeData, EdgeData }) => {
  type NodeDragPosition = {
    position: {
      x: number
      y: number
    }
  }
  const { height, width } = useToGetWindowSize()
  const { addNodes } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(NodeData)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  //const { EditorIsOpen, EditorOnOpen, EditorOnClose } = useEditorDisclojure();
  const { getIntersectingNodes } = useReactFlow()
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)


  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => {console.log(eds) 
    return addEdge(connection,eds)
    });
    console.log(connection)
    
  },[setEdges]);

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
  
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )*/

  const nodeTypes = useMemo(
    () => ({
      custom: ClassNodeComp,
      UserMapTag: UserMapTagComp,
      UserMapGroup: UserMapGroupComp,
    }),
    [],
  )
  const edgeTypes = useMemo(()=>({
    floating: FloatingEdge,
  }),[]);
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

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi)

  const onNodeDragStart = useCallback((e: DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  },[])

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const currentUserUid = auth.currentUser?.uid
  const dbRef = ref(realDB, 'users/' + currentUserUid + '/room1')

  const setNodeToDB = ()=>{
    const nodeRef = ref(realDB, 'users/' + currentUserUid + '/room1/Nodes' )
    
    
  }
  const onNodeDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      console.log(type)
      if (typeof type === 'undefined' || !type) {
        return
      }

      const newNode: Node<any> = {
        id: String(nodes.length+1),
        position: {
          x: event.clientX,
          y: event.clientY,
        },
        type,
        data: type==='custom'? defaultClassData :  { label: 'data' },
      }



      setNodes((nds) => {
        console.log(nds)
        const concatNodes = [newNode]
        switch (type){
          case 'UserMapGroup': return concatNodes.concat(nds)
          default: return nds.concat(newNode)
        }
      })
    },
    [reactFlowInstance,event],
  )

  const onNodeDrag = useCallback((M: MouseEvent, node: Node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id)

    intersections.map((id) => {})
  }, [])

  const updateData = async () => {
    update(dbRef, {
      Nodes: nodes
    })
  }

  const interval = setInterval(() => {
    updateData()
  }, 15000)


  
  useEffect(() => {
    updateData()
  }, [])


  useEffect(() => {
    console.log(nodes)
  },[nodes])
  useEffect(()=>{
    setEdges(edges)
  },[edges])


  return (
    <div>
      <Head>
        <title>fLowEditPage</title>
      </Head>

      <Navbar />
      <Box w={width} h={height} top='16px'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
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
              <Box
                onDragStart={(e) => {
                  onNodeDragStart(e, 'UserMapTag')
                }}
                w='40'
                h='50'
                bg='azure'
                draggable
              >
                <ChakraText>付箋</ChakraText>
              </Box>
              <Box
                onDragStart={(e) => {
                  onNodeDragStart(e, 'UserMapGroup')
                }}
                draggable
              >
                <ChakraText>グループ</ChakraText>
              </Box>
              <Box
                onDragStart={(e) => {
                  onNodeDragStart(e, 'custom')
                }}
                w='40'
                h='50'
                bg='azure'
                draggable
              >
                <ChakraText>Class</ChakraText>
              </Box>
              <Box>
                <Button leftIcon={<EditIcon />} type='submit' form='classNodeForm' onClick={()=>{updateData()}}></Button>
              </Box>
            </Box>
          </Panel>
        </ReactFlow>
      </Box>
    </div>
  )
}
export default FLowEditPage

interface flowEdtJson {
  user?: {
    email: string
    Nodes: Node<any>[]
    Edges?: Edge<any>[]
  }
}

FLowEditPage.getInitialProps = async ({ req, res }) => {
  const isServerSide = typeof window === 'undefined'
  let arr: Node<any>[] | undefined = []
  let edgeArr: Edge<any>[] | undefined = []

  if (isServerSide && req && res) {
    const root = 'http://localhost:3000'
    const options = { headers: { cookie: req.headers.cookie || '' } }
    const result = await fetch(`${root}/api/iniPropAPI`, options)
    const json = (await result.json()) as flowEdtJson

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        res.writeHead(302, { Location: '/signInPage' })
        res.end()
      }
    })

    // 認証情報が無ければログイン画面へリダイレクトさせる
    if (!json.user) {
      res.writeHead(302, { Location: '/signInPage' })
      res.end()
    }
    arr = json.user!.Nodes
    edgeArr = []
  }

  // フロントエンドのみで動かす
  if (!isServerSide) {
    const result = await fetch('/api/iniPropAPI') // 認証情報を取得する
    const json = (await result.json()) as flowEdtJson

    // 認証情報が無ければログイン画面へリダイレクトさせる
    if (!json.user) Router.push('/signInPage')

    onAuthStateChanged(auth, (user) => {
      if (!user) Router.push('/signInPage')
    })

    arr = json.user!.Nodes
    edgeArr = []
  }

  //const FlowData = snapshot.exists() ? snapshot.val() as Node<any>[] :
  return { NodeData: arr, EdgeData: edgeArr }
}

/*
  const currentUserUid = auth.currentUser?.uid
  const dbRef = ref(realDB)
  const snapshot = await get(child(dbRef,'users/'+currentUserUid+'/room1'))
  console.log(snapshot.val())

export const getStaticProps: GetServerSideProps = async (ctx) => {
  console.log(ctx)
  //const cookie = getCookie('session',ctx) as string;
  //const cookies = context.req.headers.cookie
  const cookies = nookies.get(ctx)
  console.log(cookies.session)
  console.log(typeof cookies.session)
  //const cookie = (typeof cookies !== 'string') ? '' : cookie.parse(cookies)
  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(cookies.session, true)
    .catch((e) => {
      console.log(e)
      return null
    })


  console.log(user)
  if (!user) {
    return {
      redirect: {
        destination: '/signInPage',
        permanent: false,
      },
    }
  }

  const currentUser = auth.currentUser

  const reactNodeRef = ref(realDB, 'users/' + currentUser?.uid)
  const snapShot = await get(child(reactNodeRef, 'room1/Nodes'))
    if(snapShot.exists()){
      return {
        props: {
          NodeData: snapShot.val(),
        },
      }
    }else{

      return {
        props: {
          NodeData: userMapTestNode,
        },
      }
    }
}*/
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
