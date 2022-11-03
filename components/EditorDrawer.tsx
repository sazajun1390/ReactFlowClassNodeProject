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

import { FC, useEffect, Key, useState, memo,useCallback,useReducer} from 'react'
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
  Box
} from '@chakra-ui/react'
import { useEditData } from '../zustand/EditData'
import { ClassNodeData, formObjectReducerState, formObjectType, FunctionObj, VariableObj } from '../type/ClassNodeComp'
import { useReactFlow } from 'react-flow-renderer'
import Slider from "react-slick";
import type { Settings } from 'react-slick'
import ParamCard from './ParamCard'
import { memoryUsage } from 'process'

const EditDrawer:FC = () => {

  const cardSetting:Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
  }
  const { setNodes } = useReactFlow();
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

  
  useCallback(() => {
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
  }, [editClassName,editVars,editFuncs,editId,setNodes])

  const { isOpen, onToggle } = useDisclosure();
  const [ formData, setFormData ] = useState<formObjectType>(null);
  
  const editReducer = (state: formObjectType, act: formObjectReducerState) => {
    switch (act.type) {
      case "variables":
        return state=act.state;
      case "functions":
        return state=act.state;
      default:
        return state=null;
    }
  }

  //const [ formData, setFormData ] = useReducer(editReducer,null);
  
  
  useEffect(()=>{
    
  },[formData])
  

  return (
    <Drawer
      isOpen={EditorIsOpen}
      onClose={EditorOnClose}
      placement='right'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <Box>

        </Box>
        <Slider {...cardSetting}>
          {editFuncs.map((items:FunctionObj, index: Key)=>{
            console.log(items)
            return(
              <ParamCard functionName={items.functionName} type={items.type} FuncId={items.FuncId} setter={setFormData} key={index}/>
            )
          })}
        </Slider>
        <Collapse>
        </Collapse>

        <Slider {...cardSetting}>
          {editVars.map((items:VariableObj, index: Key)=>{
            return(
              <ParamCard variableName={items.variableName} type={items.type} VarId={items.VarId} setter={setFormData} key={index} />
            )
          })}
        </Slider>
        <Collapse>
        </Collapse>
      </DrawerContent>
    </Drawer>
  )
}

export default memo(EditDrawer);