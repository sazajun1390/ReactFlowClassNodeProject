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
        return (
          <HStack spacing={6} justify='center' key={index}>
            <FramerBox
              visibility={focusFuncFieldNum == `functions.${index}.FunId` ? 'visible' : 'hidden'}
              display={focusFuncFieldNum == `functions.${index}.FunId` ? 'block' : 'none'}
            >
              <IconButton aria-label='deleteFunction' key={index} icon={<CloseButton />} />
            </FramerBox>
            <Box>-</Box>
            <Controller
              name={`functions.${index}.functionName`}
              control={control}
              render={(controlProps) => (
                <Editable
                  value={controlProps.field.value}
                  onFocus={() => {
                    console.log('focus')
                    setFocusFuncFieldNum(`functions.${index}.FunId`)
                  }}
                  onBlur={() => {
                    console.log('blur')
                    setFocusFuncFieldNum(null)
                  }}
                >
                  <EditablePreview />
                  <EditableInput {...controlProps.field} />
                  <FormErrorMessage>
                    {errors.functions?.[index]?.functionName &&
                      errors.functions?.[index]?.functionName?.message}
                  </FormErrorMessage>
                </Editable>
              )}
            />
            <Box>{': '}</Box>
            <Controller
              name={`functions.${index}.type`}
              control={control}
              render={(controlProps) => (
                <Editable
                  value={controlProps.field.value}
                  onFocus={() => {
                    setFocusFuncFieldNum(`functions.${index}.FunId`)
                  }}
                  onBlur={() => {
                    setFocusFuncFieldNum(null)
                  }}
                >
                  <EditablePreview />
                  <EditableInput {...controlProps.field} />
                </Editable>
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
        return (
          <HStack spacing={6} justify='center' key={index}>
            <FramerLayoutGroup>
              <FramerBox
                visibility={focusVarFieldNum == `variables.${index}.VarId` ? 'visible' : 'hidden'}
                display={focusVarFieldNum == `variables.${index}.VarId` ? 'block' : 'none'}
              >
                <IconButton aria-label='deleteVars' key={index} icon={<CloseButton />} />
              </FramerBox>
              <Box>{'+ '}</Box>
              <Controller
                name={`variables.${index}.variableName`}
                control={control}
                render={(controlProps) => (
                  <Editable
                    value={controlProps.field.value}
                    onFocus={() => {
                      console.log('focus')
                      setFocusVarFieldNum(`variables.${index}.VarId`)
                    }}
                    onBlur={() => {
                      console.log('blur')
                      setFocusVarFieldNum(null)
                    }}
                  >
                    <EditablePreview />
                    <EditableInput {...controlProps.field} />
                  </Editable>
                )}
              />
              <Box>{': '}</Box>
              <Controller
                name={`variables.${index}.type`}
                control={control}
                render={(controlProps) => (
                  <Editable
                    value={controlProps.field.value}
                    onFocus={() => {
                      console.log('focus')
                      setFocusVarFieldNum(`variables.${index}.VarId`)
                    }}
                    onBlur={() => {
                      console.log('blur')
                      setFocusVarFieldNum(null)
                    }}
                  >
                    <EditablePreview />
                    <EditableInput {...controlProps.field} />
                  </Editable>
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
