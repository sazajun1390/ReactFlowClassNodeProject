import { useCallback, useRef, memo, FC, useState, Key, useEffect } from 'react'
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from 'reactflow'
import {
  Box,
  HStack,
  FormControl,
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  FormErrorMessage,
  ResponsiveValue,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import type { ClassNode, fieldPreviewProps } from './type/ClassNodeComp'
import { useDisclojureStore } from '../../zustand/EditorsDIscrojure'
import { useEditData } from '../../zustand/EditData'
import shallow from 'zustand/shallow'
import { FramerBox, FramerLayoutGroup } from '../../chakraFactory/Framer'
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { useAnimationControls } from 'framer-motion'
//import * as yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod'
import type { Property } from 'csstype'
import { FieldArrayWithId } from 'react-hook-form'
import { UseFieldArrayRemove } from 'react-hook-form'
import { FieldArrayPath } from 'react-hook-form'
import { FieldValue } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'
const errorCss: fieldPreviewProps = {
  border: '2px',
  borderColor: 'red.400',
}

type fieldProps<T extends 'data.variables' | 'data.functions'> = {
  item: FieldArrayWithId<ClassNode, T, 'id'>
  index: number
  remove: UseFieldArrayRemove
}

const FunctionsFormFields = memo((props) => {
  const { control } = useFormContext<ClassNode>()

  const { fields, remove } = useFieldArray({
    name: 'data.functions',
    control,
  })

  return (
    <Accordion>
      {fields.map((item, index) => {
        return <FuncFormField item={item} index={index} remove={remove} />
      })}
    </Accordion>
    // onBlur={blurFunc}
  )
})

const VarsFormFields = memo(() => {
  const { control } = useFormContext<ClassNode>()

  const { fields, remove } = useFieldArray({
    name: 'data.variables',
    control,
  })

  return (
    <>
      {fields.map((item, index) => {
        return <VarFormField item={item} index={index} remove={remove} />
      })}
    </>
  )
})

const funcFormField: FC<fieldProps<'data.functions'>> = (props) => {
  const { item, index, remove } = props
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<ClassNode>()

  const funcErrorState = errors.data?.functions?.[index]
  const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
  const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')
  const [funcNameFieldError, setFuncNameFieldError] = useState<fieldPreviewProps | null>(null)
  const [funcTypeFieldError, setFuncTypeFieldError] = useState<fieldPreviewProps | null>(null)

  const [focusFuncFieldNum, setFocusFuncFieldNum] = useState<string | null>(null)

  useEffect(() => {
    setFuncNameFieldError(typeof funcErrorState?.functionName === 'undefined' ? null : errorCss)
  }, [funcErrorState?.functionName])
  useEffect(() => {
    setFuncTypeFieldError(typeof funcErrorState?.funcType === 'undefined' ? null : errorCss)
  }, [funcErrorState?.funcType])
  useEffect(() => {
    setDisplay(focusFuncFieldNum == `data.functions.${index}.FunId` ? 'block' : 'none')
    setVisibility(focusFuncFieldNum == `data.functions.${index}.FunId` ? 'visible' : 'hidden')
  }, [focusFuncFieldNum])

  const focusFunc = useCallback(() => setFocusFuncFieldNum(`data.functions.${index}.FunId`), [])
  const blurFunc = useCallback(() => setFocusFuncFieldNum(null), [])

  return (
    <AccordionItem>
      <HStack spacing={6} justify='center' key={item.id}>
        <Box>-</Box>
        <FormControl isRequired isInvalid={!!funcErrorState?.functionName}>
          <Editable defaultValue={item.functionName} onFocus={focusFunc} onBlur={blurFunc}>
            <EditablePreview {...funcNameFieldError} w='100%' />
            <EditableInput
              id={`data.functions.${index}.functionName`}
              {...register(`data.functions.${index}.functionName`)}
            />
            <FormErrorMessage>{funcErrorState?.functionName?.message}</FormErrorMessage>
          </Editable>
        </FormControl>
        <Box>{'('}</Box>

        <Box>{')'}</Box>
        <Box>{': '}</Box>
        <FormControl isRequired isInvalid={!!funcErrorState?.funcType}>
          <Editable defaultValue={item.funcType} onFocus={focusFunc} onBlur={blurFunc}>
            <EditablePreview {...funcTypeFieldError} w='100%' />
            <EditableInput {...register(`data.functions.${index}.funcType`)} />
            <FormErrorMessage>{funcErrorState?.funcType?.message}</FormErrorMessage>
          </Editable>
        </FormControl>
        <IconButton
          aria-label='deleteFunction'
          visibility={visibility}
          display={display}
          key={index}
          icon={<CloseIcon />}
          onClick={() => remove(index)}
        />
      </HStack>
    </AccordionItem>
  )
}

const varFormField: FC<fieldProps<'data.variables'>> = (props) => {
  const { item, index, remove } = props
  const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
  const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')
  const {
    register,
    formState: { errors },
  } = useFormContext<ClassNode>()
  const varErrorState = errors.data?.variables?.[index]
  const [focusVarFieldNum, setFocusVarFieldNum] = useState<string | null>(null)

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
        <IconButton
          visibility={visibility}
          display={display}
          aria-label='deleteVars'
          key={index}
          icon={<CloseIcon />}
          onClick={() => remove(index)}
        />
        <Box>{'+ '}</Box>
        <FormControl isRequired isInvalid={!!varErrorState?.variableName}>
          <Editable defaultValue={item.variableName} onFocus={focusFunc} onBlur={blurFunc}>
            <EditablePreview {...varNameFieldError} w='100%' />
            <EditableInput {...register(`data.variables.${index}.variableName`)} />
          </Editable>
          <FormErrorMessage>{varErrorState?.variableName?.message}</FormErrorMessage>
        </FormControl>
        <Box>{': '}</Box>
        <FormControl isRequired isInvalid={!!varErrorState?.varType}>
          <Editable defaultValue={item.varType} onFocus={focusFunc}>
            <EditablePreview {...varTypeFieldError} w='100%' />
            <EditableInput {...register(`data.variables.${index}.varType`)} />
          </Editable>
          <FormErrorMessage>{varErrorState?.varType?.message}</FormErrorMessage>
        </FormControl>
      </FramerLayoutGroup>
    </HStack>
  )
}

const FuncFormField = memo(funcFormField)
const VarFormField = memo(varFormField)

export { FunctionsFormFields, VarsFormFields }

/**
 * 
 * const FunctionsFormFields = memo((props) => {
  const {
    register,
    control,
    getFieldState,
    formState: { errors, isSubmitted },
  } = useFormContext<ClassNode>()

  const { fields, remove, append } = useFieldArray({
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

        const focusFunc = useCallback(() => setFocusFuncFieldNum(`data.functions.${index}.FunId`),[],)
        const blurFunc = useCallback(() => setFocusFuncFieldNum(null), [])

        return (
          <HStack spacing={6} justify='center' key={item.id}>
            <IconButton
              aria-label='deleteFunction'
              visibility={visibility}
              display={display}
              key={index}
              icon={<CloseIcon />}
              onClick={() => remove(index)}
            />
            <Box>-</Box>
            <FormControl isRequired isInvalid={!!funcErrorState?.functionName}>
              <Editable defaultValue={item.functionName} onFocus={focusFunc}>
                <EditablePreview {...funcNameFieldError} w='100%' />
                <EditableInput
                  id={`data.functions.${index}.functionName`}
                  {...register(`data.functions.${index}.functionName`)}
                />
                <FormErrorMessage>{funcErrorState?.functionName?.message}</FormErrorMessage>
              </Editable>
            </FormControl>
            <Box>{': '}</Box>
            <FormControl isRequired isInvalid={!!funcErrorState?.funcType}>
              <Editable defaultValue={item.funcType} onFocus={focusFunc}>
                <EditablePreview {...funcTypeFieldError} w='100%' />
                <EditableInput {...register(`data.functions.${index}.funcType`)} />
                <FormErrorMessage>{funcErrorState?.funcType?.message}</FormErrorMessage>
              </Editable>
            </FormControl>
          </HStack>
        )
      })}
    </>
    // onBlur={blurFunc}
  )
})
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
