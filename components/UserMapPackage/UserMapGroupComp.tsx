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
import { NodeResizeControl, NodeResizer } from '@reactflow/node-resizer'
import UserMapTagComp from './UserMapTagComp'
import { BlockPicker, ColorChangeHandler } from 'react-color'
import Popover, { PopoverPlace } from "react-popover";
import '@reactflow/node-resizer/dist/style.css';

const UserMapGroupComp: FC<NodeProps> = (Props) => {
  const colors = [
    '#D9E3F0',
    '#697689',
    '#f47373',
    '#37d67a',
    '#2ccce4',
    '#555555',
    '#dce775',
    '#ff8a65',
    '#ba68c8',
    '#417505',
    '#5300eb',
    '#fccb00',
  ]
  const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])
  const [popOverIsOpen, setPopoverIsOpen] = useState(false)

  const handleOnChange: ColorChangeHandler = (color, event) => {
    
  }
  
  const { getIntersectingNodes } = useReactFlow()
  return (
    <>
      <NodeResizer />
      <Box>
      <Popover
        isOpen={popOverIsOpen}
        body={<BlockPicker onChange={handleOnChange}/>}
      >
        <IconButton aria-label='picker' icon={<EditIcon />} bg='whiteAlpha.100' onClick={()=>setPopoverIsOpen(!popOverIsOpen)} />
      </Popover>
      </Box>
    </>
  )
}

export default memo(UserMapGroupComp)
