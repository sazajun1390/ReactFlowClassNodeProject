import { useCallback, useRef, memo, FC, useState, Key, useEffect } from 'react'
import {
  Connection,
  Edge,
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
  addEdge,
} from 'reactflow'
import {
  Divider,
  Box,
  Button,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  FormControl,
  FormErrorMessage,
  Input,
  useEditableControls,
  BorderProps,
  IconButton,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { useDisclojureStore } from '../../zustand/EditorsDIscrojure'
import { useEditData } from '../../zustand/EditData'
import shallow from 'zustand/shallow'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'
import { SketchPicker } from 'react-color'
import { NodeResizeControl } from '@reactflow/node-resizer'
import UserMapTagComp from './UserMapTagComp'

const UserMapGroupComp: FC = () => {
  
  const colors = [
    'gray.500',
    'pink.500',
    'pink.500',
    'red.500',
    'gray.700',
    'green.500',
    'blue.500',
    'blue.800',
    'yellow.500',
    'orange.500',
    'purple.500',
    'pink.500',
  ]
  const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])

  const { getIntersectingNodes } = useReactFlow();
  return (
    <Box bg={color}>
      <NodeResizeControl minWidth={100} minHeight={50}>
        <IconButton bg='red-200' aria-label='setColor' icon={<EditIcon /> }/>
      </NodeResizeControl>
    </Box>
  )
}

export default memo(UserMapGroupComp)