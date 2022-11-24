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
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import type { VariableObj, FunctionObj, ClassNode, ClassNodeData } from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import { useEditData } from '../zustand/EditData'
import shallow from 'zustand/shallow'
import { FramerBox, FramerLayoutGroup } from '../chakraFactory/Framer'
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { useAnimationControls } from 'framer-motion'
//import * as yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod'
import { classNodeDataSchema } from '../type/zodClassNodeComp'

const FunctionsFormField = memo((props) => {
  const {
    control,
    getFieldState,
    formState: { errors, isSubmitted },
  } = useFormContext<ClassNodeData>()

  const functions = useFieldArray({
    name: 'functions',
    control,
  })

  const [focusFuncFieldNum, setFocusFuncFieldNum] = useState<string | null>(null)

  return (
    <>
      {functions.fields.map((item, index) => {
        const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
        const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')

        useEffect(() => {
          setDisplay(focusFuncFieldNum == `functions.${index}.FunId`?'block':'none')
          setVisibility(focusFuncFieldNum == `functions.${index}.FunId`?'visible':'hidden')
        }, [focusFuncFieldNum])

        const focusFunc = useCallback(() => setFocusFuncFieldNum(`functions.${index}.FunId`),[])
        const blurFunc = useCallback(() => setFocusFuncFieldNum(null),[])

        return (
          <HStack spacing={6} justify='center' key={index}>
            <FramerBox visibility={visibility} display={display}>
              <IconButton aria-label='deleteFunction' key={index} icon={<CloseButton />} />
            </FramerBox>
            <Box>-</Box>
            <Controller
              name={`functions.${index}.functionName`}
              control={control}
              render={(controlProps) => (
                <FormControl isRequired isInvalid={!!errors.functions?.[index]?.functionName}>
                  <Editable
                    defaultValue={controlProps.field.value}
                    onFocus={focusFunc}
                    onBlur={blurFunc}
                  >
                    <EditablePreview
                      {...(!!errors.functions?.[index]?.functionName && {
                        boxShadow: '0 0 0 2px red',
                        px: 3,
                      })}
                      w='100%'
                    />
                    <EditableInput {...controlProps.field} />
                    <FormErrorMessage>
                      {errors.functions?.[index]?.functionName?.message}
                    </FormErrorMessage>
                  </Editable>
                </FormControl>
              )}
            />
            <Box>{': '}</Box>
            <Controller
              name={`functions.${index}.funcType`}
              control={control}
              render={(controlProps) => (
                <FormControl isRequired isInvalid={!!errors.functions?.[index]?.funcType}>
                  <Editable
                    value={controlProps.field.value}
                    onFocus={focusFunc}
                    onBlur={blurFunc}
                  >
                    <EditablePreview
                      {...(!!errors.functions?.[index]?.funcType && {
                        boxShadow: '0 0 0 2px red',
                        px: 3,
                      })}
                      w='100%'
                    />
                    <EditableInput {...controlProps.field} />
                    <FormErrorMessage>
                      {errors.functions?.[index]?.funcType?.message}
                    </FormErrorMessage>
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
  } = useFormContext<ClassNodeData>()

  const vars = useFieldArray({
    name: 'variables',
    control,
  })

  const [focusVarFieldNum, setFocusVarFieldNum] = useState<string | null>(null)

  return (
    <>
      {vars.fields.map((item, index) => {
        const [visibility, setVisibility] = useState<ResponsiveValue<Property.Visibility>>('hidden')
        const [display, setDisplay] = useState<ResponsiveValue<Property.Display>>('none')

        const focusFunc = useCallback(() => setFocusVarFieldNum(`variables.${index}.VarId`),[])
        const blurFunc = useCallback(() => setFocusVarFieldNum(null),[])

        useEffect(() => {
          setDisplay(focusVarFieldNum == `variables.${index}.VarId`?'block':'none')
          setVisibility(focusVarFieldNum == `variables.${index}.VarId`?'visible':'hidden')
        }, [focusVarFieldNum])

        return (
          <HStack spacing={6} justify='center' key={index}>
            <FramerLayoutGroup>
              <Box visibility={visibility} display={display}>
                <IconButton aria-label='deleteVars' key={index} icon={<CloseButton />} />
              </Box>
              <Box>{'+ '}</Box>
              <Controller
                name={`variables.${index}.variableName`}
                control={control}
                render={(controlProps) => (
                  <FormControl isRequired isInvalid={!!errors.variables?.[index]?.variableName}>
                    <Editable
                      value={controlProps.field.value}
                      onFocus={focusFunc}
                      onBlur={blurFunc}
                    >
                      <EditablePreview
                        {...(!!errors.variables?.[index]?.variableName && {
                          boxShadow: '0 0 0 2px red',
                          px: 3,
                        })}
                        w='100%'
                      />
                      <EditableInput {...controlProps.field} />
                    </Editable>
                    <FormErrorMessage>
                      {errors.variables?.[index]?.variableName?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <Box>{': '}</Box>
              <Controller
                name={`variables.${index}.varType`}
                control={control}
                render={(controlProps) => (
                  <FormControl isRequired isInvalid={!!errors.variables?.[index]?.varType}>
                    <Editable
                      value={controlProps.field.value}
                      onFocus={focusFunc}
                      onBlur={blurFunc}
                    >
                      <EditablePreview
                        {...(!!errors.variables?.[index]?.varType && {
                          boxShadow: '0 0 0 2px red',
                          px: 3,
                        })}
                        w='100%'
                      />
                      <EditableInput {...controlProps.field} />
                    </Editable>
                    <FormErrorMessage>
                      {errors.variables?.[index]?.varType?.message}
                    </FormErrorMessage>
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
