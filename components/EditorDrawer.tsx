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

import { FC, Key, useState, memo,useCallback,useReducer,Dispatch,SetStateAction} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  Button,
  useDisclosure,
  Collapse,
  Box,
  DrawerBody,
  DrawerHeader,
  IconButton,
  Flex
} from '@chakra-ui/react'
import { useEditData } from '../zustand/EditData'
import { ClassNodeData, formObjectReducerState, formObjectType, FunctionObj, VariableObj } from '../type/ClassNodeComp'
import { useReactFlow } from 'react-flow-renderer'
import Slider from "react-slick";
import type { Settings } from 'react-slick'
import ParamCard from './ParamCard'
import { memoryUsage } from 'process'
import type { Node } from 'reactflow'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddIcon } from '@chakra-ui/icons'

export interface EditDrawerProps {
  setNodes:Dispatch<SetStateAction<Node<any>[]>>
}

const EditDrawer:FC<EditDrawerProps> = (props) => {
  const { setNodes } = props;
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ClassNodeData>();

  //EditorDisclojure
  const { EditorIsOpen, EditorOnClose } = useDisclojureStore((state)=> ({
    EditorIsOpen: state.isOpen,
    EditorOnClose: state.onClose
  }),shallow)

  //state of editClassNodeData
  const { editId, editClassName, editFuncs, editVars } = useEditData( state => ({
    editId: state.id,
    editClassName: state.className,
    editFuncs: state.functions,
    editVars: state.variables
  }),shallow)
  const cardSetting:Settings = {
    dots: true,
    infinite: true,
    speed: 500
  }
  //Cardの枚数制御
  const [funcCardState,setFuncCardState] = useState<Settings>({
    ...cardSetting,
    slidesToShow: 2,
    slidesToScroll: 1 
  });
  const [varCardState,setVarCardState] =useState<Settings>({
    ...cardSetting,
    slidesToShow: 2,
    slidesToScroll: 1
  });

  useCallback(() => {
    setFuncCardState(state=>({
      ...state,
      slidesToShow: editFuncs.length-1,
      slidesToScroll: editFuncs.length-1 
    }))
    setVarCardState(state=>({
      ...state,
      slidesToShow: editVars.length-1,
      slidesToScroll: editVars.length-1
    }))
    setNodes((nodes)=>
      nodes.map(node=>{
        if(node.id === editId){
          node.data={
            className: editClassName,
            variables: editVars,
            functions: editFuncs
          }
        }
      return node;}
    ))
  }, [editClassName,editVars,editFuncs,editId,setNodes,setFuncCardState,setVarCardState])

  const { isOpen, onToggle } = useDisclosure();
  //const [ formData, setFormData ] = useState<formObjectType>(null);
  
  const editReducer = (state: formObjectType, act: formObjectReducerState) => {
    switch (act.type) {
      case "variables":
        return act.state;
      case "functions":
        return act.state;
      default:
        return null;
    }
  }

  const [ formData, setFormData ] = useReducer(editReducer,null);
  
  return (
    <Drawer
      isOpen={EditorIsOpen}
      onClose={EditorOnClose}
      placement='right'
      size={'sm'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Editor
        </DrawerHeader>
        <DrawerBody>
          <Box>

          </Box>
          <Box my={5}>
            <Slider {...funcCardState}>
              {editFuncs.map((items:FunctionObj, index: Key)=>{
                console.log(items)
                return(
                  <ParamCard functionName={items.functionName} type={items.type} FuncId={items.FuncId} setter={setFormData} key={index}/>
                )
              })}
              <IconButton colorScheme='teal' aria-label='addFunctions' icon={<AddIcon />}/>
            </Slider>
          </Box>

          <Box mt={8}>
            <Slider {...varCardState}>
              {editVars.map((items:VariableObj, index: Key)=>{
                return(
                  <ParamCard variableName={items.variableName} type={items.type} VarId={items.VarId} setter={setFormData} key={index} />
                )
              })}
              <IconButton colorScheme='teal' aria-label='addVariables' icon={<AddIcon />}/>
            </Slider>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default memo(EditDrawer);