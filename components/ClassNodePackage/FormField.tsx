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
import type { ClassNode, fieldPreviewProps, classObj } from './type/ClassNodeComp'
import { useDisclojureStore } from '../../zustand/EditorsDIscrojure'
import { useEditData } from '../../zustand/EditData'
import shallow from 'zustand/shallow'
import { FramerBox, FramerLayoutGroup } from '../../chakraFactory/Framer'
import {
  Control,
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'
import { useAnimationControls } from 'framer-motion'
//import * as yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod'
import type { Property } from 'csstype'
import { FieldArrayWithId } from 'react-hook-form'
import { UseFieldArrayRemove, UseFieldArrayAppend } from 'react-hook-form'
import { FieldArrayPath } from 'react-hook-form'
import { FieldValue } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'
import type { FunctionObj } from './type/zod/zodClassNodeComp'
const errorCss: fieldPreviewProps = {
  border: '2px',
  borderColor: 'red.400',
}

type fieldProps<T extends 'data.variables' | 'data.functions'> = {
  item: FieldArrayWithId<ClassNode, T, 'id'>
  index: number
  remove: UseFieldArrayRemove
}

type argsProps = {
  item: FieldArrayWithId<FunctionObj, 'funcArgs', 'id'>
  argIndex: number
  remove: UseFieldArrayRemove
  funcIndex: number
}

type classArgsProps = {
  item: FieldArrayWithId<classObj, 'classArgs', 'id'>
  argIndex: number
  remove: UseFieldArrayRemove
}

const FunctionsFormFields = memo((props) => {
  const { control } = useFormContext<ClassNode>()

  const { fields, remove, append } = useFieldArray({
    name: 'data.functions',
    control,
  })
  const appendFunc = useCallback(() => {
    const id = fields.length + 1
    const name = 'Calc' + id.toString()
    append({ FuncId: id, functionName: name, funcType: 'Integer', funcArgs: [] })
  }, [fields])

  return (
    <Accordion allowToggle>
      {fields.map((item, index) => {
        return <FuncFormField item={item} index={index} remove={remove} />
      })}
      <AccordionItem>
        <IconButton aria-label='addFuncField' icon={<AddIcon />} onClick={appendFunc} />
      </AccordionItem>
    </Accordion>
    // onBlur={blurFunc}
  )
})

const VarsFormFields = memo(() => {
  const { control } = useFormContext<ClassNode>()

  const { fields, remove, append } = useFieldArray({
    name: 'data.variables',
    control,
  })

  const appendVar = useCallback(() => {
    const id = fields.length + 1
    const name = 'Num' + id.toString()
    append({ VarId: id, variableName: name, varType: 'Integer' })
  }, [fields])

  return (
    <Accordion allowToggle>
      {fields.map((item, index) => {
        return <VarFormField item={item} index={index} remove={remove} />
      })}
      <AccordionItem>
        <IconButton aria-label='addVarField' icon={<AddIcon />} onClick={appendVar} />
      </AccordionItem>
    </Accordion>
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
      <AccordionButton>
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
        <Box>args</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <FuncArgFormFields funcIndex={index} />
      </AccordionPanel>
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
    <AccordionItem>
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
    </AccordionItem>
  )
}

const funcArgFormFields: FC<{ funcIndex: number }> = (props) => {
  const { control } = useFormContext<ClassNode>()
  const { funcIndex } = props
  const { fields, append, remove } = useFieldArray({
    control,
    name: `data.functions.${funcIndex}.funcArgs`,
  })
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<ClassNode>()
  const appendFuncArg = useCallback(() => {
    const id = fields.length + 1
    const name = 'Num' + id.toString()
    append({ argId: id.toString(), argName: name, argType: 'Integer' })
  }, [fields])
  return (
    <>
      {fields.map((item, index) => {
        return <Arg item={item} argIndex={index} remove={remove} funcIndex={funcIndex} />
      })}
      <IconButton aria-label='addFuncArgField' icon={<AddIcon />} onClick={appendFuncArg} />
    </>
  )
}

const Arg: FC<argsProps> = (props) => {
  const { argIndex, item, remove, funcIndex } = props
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<ClassNode>()

  const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
  const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')
  const [argNameFieldError, setArgNameFieldError] = useState<fieldPreviewProps | null>(null)
  const [argTypeFieldError, setArgTypeFieldError] = useState<fieldPreviewProps | null>(null)
  const [focusArgFieldNum, setFocusArgFieldNum] = useState<string | null>(null)

  const focusFunc = useCallback(
    () => setFocusArgFieldNum(`data.functions.${funcIndex}.funcArgs.${argIndex}`),
    [],
  )
  const blurFunc = useCallback(() => setFocusArgFieldNum(null), [])

  const argErrorState = errors.data?.functions?.[funcIndex]?.funcArgs?.[argIndex]

  useEffect(() => {
    setArgNameFieldError(typeof argErrorState?.argName === 'undefined' ? null : errorCss)
  }, [argErrorState?.argName])
  useEffect(() => {
    setArgTypeFieldError(typeof argErrorState?.argType === 'undefined' ? null : errorCss)
  }, [argErrorState?.argType])
  useEffect(() => {
    setDisplay(
      focusArgFieldNum == `data.functions.${funcIndex}.funcArg.${argIndex}.argId`
        ? 'block'
        : 'none',
    )
    setVisibility(focusArgFieldNum == `data.functions.${argIndex}.argId` ? 'visible' : 'hidden')
  }, [focusArgFieldNum])

  return (
    <HStack spacing={6} justify='center' key={item.id}>
      <Box>-</Box>
      <FormControl isRequired isInvalid={!!argErrorState?.argName}>
        <Editable defaultValue={item.argName} onFocus={focusFunc} onBlur={blurFunc}>
          <EditablePreview {...argNameFieldError} w='100%' />
          <EditableInput
            id={`data.functions.${funcIndex}.funcArgs.argName`}
            {...register(`data.functions.${funcIndex}.funcArgs.${argIndex}.argName`)}
          />
          <FormErrorMessage>{argErrorState?.argName?.message}</FormErrorMessage>
        </Editable>
      </FormControl>
      <Box>{'('}</Box>

      <Box>{')'}</Box>
      <Box>{': '}</Box>
      <FormControl isRequired isInvalid={!!argErrorState?.argType}>
        <Editable defaultValue={item.argType} onFocus={focusFunc} onBlur={blurFunc}>
          <EditablePreview {...argTypeFieldError} w='100%' />
          <EditableInput
            {...register(`data.functions.${funcIndex}.funcArgs.${argIndex}.argType`)}
          />
          <FormErrorMessage>{argErrorState?.argType?.message}</FormErrorMessage>
        </Editable>
      </FormControl>
      <IconButton
        aria-label='deleteFunction'
        visibility={visibility}
        display={display}
        key={argIndex}
        icon={<CloseIcon />}
        onClick={() => remove(argIndex)}
      />
    </HStack>
  )
}


const ClassArgFields: FC = memo((props) =>{
  const { control } = useFormContext<ClassNode>()
  const { fields, remove, append } = useFieldArray({
    name: 'data.class.classArgs',
    control,
  })
  const appendClassArg = useCallback(() => {
    const id = fields.length + 1
    const name = 'Num' + id.toString()
    append({ argId: id.toString(), argName: name, argType: 'Integer' })
  }, [fields])

  return (
    <>
      {fields.map((item, index) => {
        return <ClassArgField item={item} argIndex={index} remove={remove} />
      })}
      <AccordionItem>
        <IconButton aria-label='addClassArgField' icon={<AddIcon />} onClick={appendClassArg} />
      </AccordionItem>
    </>
  )
})

const ClassArgField: FC<classArgsProps> = memo((props)=>{
  const {argIndex,remove,item} = props
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<ClassNode>()

  const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
  const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')
  const [classArgNameFieldError, setClassArgNameFieldError] = useState<fieldPreviewProps | null>(null)
  const [classArgTypeFieldError, setClassArgTypeFieldError] = useState<fieldPreviewProps | null>(null)
  const [focusClassArgFieldNum, setFocusClassArgFieldNum] = useState<string | null>(null)

  const focusFunc = useCallback(
    () => setFocusClassArgFieldNum(`data.class.classArgs.${argIndex}`),
    [],
  )
  const blurFunc = useCallback(() => setFocusClassArgFieldNum(null), [])

  const classArgErrorState = errors.data?.class?.classArgs?.[argIndex]

  useEffect(() => {
    setClassArgNameFieldError(typeof classArgErrorState?.argName === 'undefined' ? null : errorCss)
  }, [classArgErrorState?.argName])
  useEffect(() => {
    setClassArgTypeFieldError(typeof classArgErrorState?.argType === 'undefined' ? null : errorCss)
  }, [classArgErrorState?.argType])
  useEffect(() => {
    setDisplay(
      focusClassArgFieldNum == `data.class.classArg.${argIndex}.argId`
        ? 'block'
        : 'none',
    )
    setVisibility(focusClassArgFieldNum == `data.class.classArg.${argIndex}.argId` ? 'visible' : 'hidden')
  }, [focusClassArgFieldNum])

  return(
    <HStack spacing={6} justify='center' key={item.id}>
      <Box>-</Box>
      <FormControl isRequired isInvalid={!!classArgErrorState?.argName}>
        <Editable defaultValue={item.argName} onFocus={focusFunc} onBlur={blurFunc}>
          <EditablePreview {...classArgNameFieldError} w='100%' />
          <EditableInput
            id={`data.class.classArgs.${argIndex}.argName`}
            {...register(`data.class.classArgs.${argIndex}.argName`)}
          />
          <FormErrorMessage>{classArgErrorState?.argName?.message}</FormErrorMessage>
        </Editable>
      </FormControl>
      <Box>{'('}</Box>

      <Box>{')'}</Box>
      <Box>{': '}</Box>
      <FormControl isRequired isInvalid={!!classArgErrorState?.argType}>
        <Editable defaultValue={item.argType} onFocus={focusFunc} onBlur={blurFunc}>
          <EditablePreview {...classArgTypeFieldError} w='100%' />
          <EditableInput
            {...register(`data.class.classArgs.${argIndex}.argType`)}
          />
          <FormErrorMessage>{classArgErrorState?.argType?.message}</FormErrorMessage>
        </Editable>
      </FormControl>
      <IconButton
        aria-label='deleteFunction'
        visibility={visibility}
        display={display}
        key={argIndex}
        icon={<CloseIcon />}
        onClick={() => remove(argIndex)}
      />
    </HStack>
  )
})
const FuncFormField = memo(funcFormField)
const VarFormField = memo(varFormField)
const FuncArgFormFields = memo(funcArgFormFields)

export { FunctionsFormFields, VarsFormFields, ClassArgFields }

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
