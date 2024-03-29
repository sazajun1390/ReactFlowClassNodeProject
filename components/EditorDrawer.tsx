/*
2022/11/2

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import shallow from 'zustand/shallow'
import { useDisclojureStore } from '../zustand/EditorDIscrojure'
import { 
  Drawer, 
  DrawerContent, 
  DrawerOverlay,
  DrawerCloseButton,
  
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from '@chakra-ui/react'
import { useEditData } from '../zustand/EditData'
import Slider from "react-slick";

const EditDrawer:FC = (props) => {

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { EditorIsOpen, EditorOnClose } = useDisclojureStore((state)=> ({
    EditorIsOpen: state.isOpen,
    EditorOnClose: state.onClose
  }),shallow)

  const { editId, editClassName, editFuncs, editVars } = useEditData( state => ({
    editId: state.id,
    editClassName: state.className,
    editFuncs: state.functions,
    editVars: state.variables
  }))

  return (
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
  )
}*/

import { FC, Key, useState, memo, useCallback, useReducer, Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import shallow from 'zustand/shallow'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useDisclosure,
  Collapse,
  Box,
  DrawerBody,
  DrawerHeader,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { useEditData } from '../zustand/EditData'
import {
  ClassNodeData,
  formObjectReducerState,
  formObjectType,
  FunctionObj,
  VariableObj,
} from './ClassNodePackage/type/ClassNodeComp'
import Slider from 'react-slick'
import type { Settings } from 'react-slick'
import ParamCard from './ClassNodePackage/ParamCard'
import { memoryUsage } from 'process'
import type { Node } from 'reactflow'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AddIcon } from '@chakra-ui/icons'
import { useReactFlow } from 'reactflow'

export interface EditDrawerProps {
  setNodes: Dispatch<SetStateAction<Node<any>[]>>
}

const EditDrawer: FC<EditDrawerProps> = (props) => {
  const { setNodes } = useReactFlow()
  //setClassNodeData
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ClassNodeData>()

  //EditorDisclojure
  const { EditorIsOpen, EditorOnClose } = useDisclojureStore(
    (state) => ({
      EditorIsOpen: state.isOpen,
      EditorOnClose: state.onClose,
    }),
    shallow,
  )

  //state of editClassNodeData
  const { editId, editClassName, editFuncs, editVars } = useEditData(
    (state) => ({
      editId: state.id,
      editClassName: state.className,
      editFuncs: state.functions,
      editVars: state.variables,
    }),
    shallow,
  )
  const cardSetting: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
  }
  //Cardの枚数制御
  const [funcCardState, setFuncCardState] = useState<Settings>({
    ...cardSetting,
    slidesToShow: 2,
    slidesToScroll: 2,
  })
  const [varCardState, setVarCardState] = useState<Settings>({
    ...cardSetting,
    slidesToShow: 2,
    slidesToScroll: 2,
  })

  useCallback(() => {
    setFuncCardState((state) => ({
      ...state,
      slidesToScroll: editFuncs.length - 2,
    }))
    setVarCardState((state) => ({
      ...state,
      slidesToScroll: editVars.length - 2,
    }))
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === editId) {
          node.data = {
            className: editClassName,
            variables: editVars,
            functions: editFuncs,
          }
        }
        return node
      }),
    )
  }, [editClassName, editVars, editFuncs, editId, setNodes, setFuncCardState, setVarCardState])

  const { isOpen, onToggle } = useDisclosure()
  //const [ formData, setFormData ] = useState<formObjectType>(null);

  //setClassNodeData
  const editReducer = (state: formObjectType, act: formObjectReducerState) => {
    switch (act.type) {
      case 'variables':
        return act.state
      case 'functions':
        return act.state
      default:
        return null
    }
  }

  const [formData, setFormData] = useReducer(editReducer, null)
  //functionName={items.functionName} type={items.type} FuncId={items.FuncId}
  //variableName={items.variableName} type={items.type} VarId={items.VarId}
  return (
    <Drawer isOpen={EditorIsOpen} onClose={EditorOnClose} placement='right' size={'sm'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          onClick={() => {
            useEditData.getState().resetData()
          }}
        />
        <DrawerHeader>Editor</DrawerHeader>
        <DrawerBody>
          <Box></Box>
          <Box mt={10} mb={25}>
            <Slider {...funcCardState}>
              {editFuncs.map((items: FunctionObj, index: Key) => {
                //setClassNodeData
                console.log(items)
                return <ParamCard setter={setFormData} {...items} key={index} />
              })}
              <Box>
                <Box justifyContent={'center'}>
                  <IconButton colorScheme='teal' aria-label='addFunctions' icon={<AddIcon />} />
                </Box>
              </Box>
            </Slider>
          </Box>
          <Collapse></Collapse>
          <Box mb={10} mt={25}>
            <Slider {...varCardState}>
              {editVars.map((items: VariableObj, index: Key) => {
                //setClassNodeData
                return <ParamCard setter={setFormData} {...items} key={index} />
              })}
              <Box>
                <Box justifyContent={'center'}>
                  <IconButton colorScheme='teal' aria-label='addVariables' icon={<AddIcon />} />
                </Box>
              </Box>
            </Slider>
          </Box>
          <Collapse></Collapse>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default memo(EditDrawer)
