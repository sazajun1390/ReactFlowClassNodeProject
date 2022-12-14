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
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
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
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { useDisclojureStore } from '../../zustand/EditorsDIscrojure'
import { useEditData } from '../../zustand/EditData'
import shallow from 'zustand/shallow'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'

const UserMapTagComp: FC<NodeProps> = (props) =>{

  const [color, setColor] = useState("gray.500");

  const colors = [
    "gray.500",
    "red.500",
    "gray.700",
    "green.500",
    "blue.500",
    "blue.800",
    "yellow.500",
    "orange.500",
    "purple.500",
    "pink.500"
  ];

  return (
    <Box>
      <NodeResizer  />
      <Stack p={3} bg='white' rounded='md' shadow='md' border='1px' borderColor='gray.500'>

      </Stack>
    </Box>
  )
}