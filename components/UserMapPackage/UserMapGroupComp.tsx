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
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Center,
  PopoverBody,
  SimpleGrid,
  EditableTextarea,
  Textarea,
  Flex,
  Popover,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { useDisclojureStore } from '../../zustand/EditorsDIscrojure'
import { useEditData } from '../../zustand/EditData'
import shallow from 'zustand/shallow'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'
import { SketchPicker } from 'react-color'
import { NodeResizeControl, NodeResizer, ResizeDragEvent, ResizeEventParams  } from '@reactflow/node-resizer'
import UserMapTagComp from './UserMapTagComp'
import { BlockPicker, ColorChangeHandler } from 'react-color'
import '@reactflow/node-resizer/dist/style.css'

const UserMapGroupComp: FC<NodeProps> = (Props) => {
  const { data, selected } = Props
  const colors = [
    'gray.100',
    'gray.500',
    'pink.500',
    'red.500',
    'gray.700',
    'green.500',
    'blue.500',
    'blue.800',
    'yellow.500',
    'orange.500',
    'purple.500',
  ]
  const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])
  const [height, setHeight] = useState(60)
  const [width, setWidth] =useState(60)
  const calcHeight = useCallback(( event: ResizeDragEvent, params: ResizeEventParams ) => {
    setHeight(params.height)
    setWidth(params.width)
  }, [height])
  const handleOnChange: ColorChangeHandler = (color, event) => {}

  const { getIntersectingNodes } = useReactFlow()
  return (
    <Box bg={color} h={height} w={width} minW={40}>
      <NodeResizer
        onResize={calcHeight}
        minWidth={40}
      />
      <Flex>
        <Popover>
          <PopoverTrigger>
            <IconButton aria-label='setColor' icon={<EditIcon />} bg='whiteAlpha.100' pos='fixed' bottom='0' />
          </PopoverTrigger>
          <PopoverContent width='170px'>
            <PopoverArrow bg={color} />
            <PopoverCloseButton color='white' />
            <PopoverHeader
              height='100px'
              backgroundColor={color}
              borderTopLeftRadius={5}
              borderTopRightRadius={5}
              color='white'
            >
              <Center height='100%'>{color}</Center>
            </PopoverHeader>
            <PopoverBody height='120px'>
              <SimpleGrid columns={5} spacing={2}>
                {colors.map((c) => (
                  <Button
                    key={c}
                    aria-label={c}
                    background={c}
                    height='22px'
                    width='22px'
                    padding={0}
                    minWidth='unset'
                    borderRadius={3}
                    _hover={{ background: c }}
                    onClick={() => {
                      setColor(c)
                    }}
                  ></Button>
                ))}
              </SimpleGrid>
              <Input
                borderRadius={3}
                marginTop={3}
                placeholder='red.100'
                size='sm'
                value={color}
                onChange={(e) => {
                  setColor(e.target.value)
                }}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  )
}

export default memo(UserMapGroupComp)
