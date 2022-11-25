import { useCallback, useRef, memo, FC, useState, Key, useEffect } from 'react'
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from 'reactflow'
import {
  Divider,
  Box,
  Button,
  Stack,
  HStack,
  Heading,
  FormControl,
  Collapse,
  useDisclosure,
  Fade,
  Input,
  Editable,
  EditablePreview,
  EditableInput,
  FormLabel,
  useEditableControls,
  IconButton,
  CloseButton,
  FormErrorMessage,
  ResponsiveValue,
  BorderProps,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import type {
  VariableObj,
  FunctionObj,
  ClassNode,
  ClassNodeData,
  fieldPreviewProps,
} from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import { useEditData } from '../zustand/EditData'
import shallow from 'zustand/shallow'
import { FramerBox, FramerLayoutGroup } from '../chakraFactory/Framer'
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { useAnimationControls } from 'framer-motion'
//import * as yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod'
import { classNodeDataSchema } from '../type/zodClassNodeComp'
import type { Property } from 'csstype'
const errorCss: fieldPreviewProps = {
  border: '2px',
  borderColor: 'red.400',
}

const FunctionsFormField = memo((props) => {
  const {
    control,
    getFieldState,
    formState: { errors, isSubmitted },
  } = useFormContext<ClassNode>()

  const {fields,remove,append} = useFieldArray({
    name: 'data.functions',
    control,
  })

  const [focusFuncFieldNum, setFocusFuncFieldNum] = useState<string | null>(null)

  return (
    <>
      {fields.map((item, index) => {
        const funcErrorState = errors.data?.functions?.[index]
        const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
        const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')
        const [funcNameFieldError, setFuncNameFieldError] = useState<fieldPreviewProps | null>(null)
        const [funcTypeFieldError, setFuncTypeFieldError] = useState<fieldPreviewProps | null>(null)

        useEffect(() => {
          setFuncNameFieldError(
            typeof funcErrorState?.functionName === 'undefined' ? null : errorCss,
          )
        }, [funcErrorState?.functionName])
        useEffect(() => {
          setFuncTypeFieldError(typeof funcErrorState?.funcType === 'undefined' ? null : errorCss)
        }, [funcErrorState?.funcType])
        useEffect(() => {
          setDisplay(focusFuncFieldNum == `data.functions.${index}.FunId` ? 'block' : 'none')
          setVisibility(focusFuncFieldNum == `data.functions.${index}.FunId` ? 'visible' : 'hidden')
        }, [focusFuncFieldNum])

        const focusFunc = useCallback(() => setFocusFuncFieldNum(`functions.${index}.FunId`), [])
        const blurFunc = useCallback(() => setFocusFuncFieldNum(null), [])
        
        return (
          <HStack spacing={6} justify='center' key={item.id}>
            <IconButton 
              aria-label='deleteFunction' 
              visibility={visibility} 
              display={display} 
              key={index} 
              icon={<CloseIcon />} 
              onClick={()=>{remove(index)}} 
            />
            <Box>-</Box>
            <Controller
              name={`data.functions.${index}.functionName`}
              control={control}
              render={(controlProps) => (
                <FormControl isRequired isInvalid={!!funcErrorState?.functionName}>
                  <Editable
                    defaultValue={controlProps.field.value}
                    onFocus={focusFunc}
                    onBlur={blurFunc}
                  >
                    <EditablePreview {...funcNameFieldError} w='100%' />
                    <EditableInput {...controlProps.field} />
                    <FormErrorMessage>{funcErrorState?.functionName?.message}</FormErrorMessage>
                  </Editable>
                </FormControl>
              )}
            />
            <Box>{': '}</Box>
            <Controller
              name={`data.functions.${index}.funcType`}
              control={control}
              render={(controlProps) => (
                <FormControl isRequired isInvalid={!!funcErrorState?.funcType}>
                  <Editable value={controlProps.field.value} onFocus={focusFunc} onBlur={blurFunc}>
                    <EditablePreview {...funcTypeFieldError} w='100%' />
                    <EditableInput {...controlProps.field} />
                    <FormErrorMessage>{funcErrorState?.funcType?.message}</FormErrorMessage>
                  </Editable>
                </FormControl>
              )}
            />
          </HStack>
        )
      })}
    </>
  )
})










const VarsFormField = memo((props) => {
  const {
    control,
    getFieldState,
    formState: { errors, isSubmitted },
  } = useFormContext<ClassNode>()

  const vars = useFieldArray({
    name: 'data.variables',
    control,
  })

  const [focusVarFieldNum, setFocusVarFieldNum] = useState<string | null>(null)

  return (
    <>
      {vars.fields.map((item, index) => {
        const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
        const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')
        const varErrorState = errors.data?.variables?.[index]

        const focusFunc = useCallback(() => setFocusVarFieldNum(`data.variables.${index}.VarId`), [])
        const blurFunc = useCallback(() => setFocusVarFieldNum(null), [])
        const [varNameFieldError, setVarNameFieldError] = useState<fieldPreviewProps | null>(null)
        const [varTypeFieldError, setVarTypeFieldError] = useState<fieldPreviewProps | null>(null)

        useEffect(() => {
          setVarNameFieldError(typeof varErrorState?.variableName === 'undefined' ? null : errorCss)
        }, [varErrorState?.variableName])
        useEffect(() => {
          setVarTypeFieldError(typeof varErrorState?.varType === 'undefined' ? null : errorCss)
        }, [varErrorState?.varType])
        useEffect(() => {
          setDisplay(focusVarFieldNum == `data.variables.${index}.VarId` ? 'block' : 'none')
          setVisibility(focusVarFieldNum == `data.variables.${index}.VarId` ? 'visible' : 'hidden')
        }, [focusVarFieldNum])

        return (
          <HStack spacing={6} justify='center' key={item.id}>
            <FramerLayoutGroup>
              <IconButton visibility={visibility} display={display} aria-label='deleteVars' key={index} icon={<CloseIcon />} onClick={()=>{ 
                console.log(item.id) 
                vars.remove(index)}}
              />
              <Box>{'+ '}</Box>
              <Controller
                name={`data.variables.${index}.variableName`}
                control={control}
                render={(controlProps) => (
                  <FormControl isRequired isInvalid={!!varErrorState?.variableName}>
                    <Editable
                      value={controlProps.field.value}
                      onFocus={focusFunc}
                      onBlur={blurFunc}
                    >
                      <EditablePreview {...varNameFieldError} w='100%' />
                      <EditableInput {...controlProps.field} />
                    </Editable>
                    <FormErrorMessage>{varErrorState?.variableName?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
              <Box>{': '}</Box>
              <Controller
                name={`data.variables.${index}.varType`}
                control={control}
                render={(controlProps) => (
                  <FormControl isRequired isInvalid={!!varErrorState?.varType}>
                    <Editable
                      value={controlProps.field.value}
                      onFocus={focusFunc}
                      onBlur={blurFunc}
                    >
                      <EditablePreview {...varTypeFieldError} w='100%' />
                      <EditableInput {...controlProps.field} />
                    </Editable>
                    <FormErrorMessage>{varErrorState?.varType?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
            </FramerLayoutGroup>
          </HStack>
        )
      })}
    </>
  )
})

export { FunctionsFormField, VarsFormField }

/**
 * <FramerBox
                visibility={focusVarFieldNum == `variables.${index}.VarId` ? 'visible' : 'hidden'}
                display={focusVarFieldNum == `variables.${index}.VarId` ? 'block' : 'none'}
              >

              
        useEffect(()=>{
          setVisibility((prevArr)=> 
            prevArr.map((value,visIndex)=> (visIndex  == focusVarFieldNum as unknown ? 'visible': 'hidden'))
          )
          setDisplay((prev)=>
            prev.map((v,disIndex) => (disIndex == focusVarFieldNum as unknown ? 'block': 'hidden'))
          )
        },[focusVarFieldNum])
        visibility={focusVarFieldNum == `variables.${index}.VarId` ? 'visible' : 'hidden'}
                display={focusVarFieldNum == `variables.${index}.VarId` ? 'block' : 'none'}
 */
