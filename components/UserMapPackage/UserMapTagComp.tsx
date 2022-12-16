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
import { NodeResizer } from '@reactflow/node-resizer'
import '@reactflow/node-resizer/dist/style.css'
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Center,
  PopoverBody,
  SimpleGrid,
  EditableTextarea,
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'

import { useDisclojureStore } from '../../zustand/EditorsDIscrojure'
import { useEditData } from '../../zustand/EditData'
import shallow from 'zustand/shallow'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form'
import { SketchPicker } from 'react-color'
import { ColorPicker } from 'chakra-color-picker'
import { BlockPicker } from 'react-color'

type tagForm = {
  tag: string;
}

const UserMapTagComp: FC<NodeProps> = (props) => {

  const { getNode, getNodes, setNodes} = useReactFlow();

  const colors = [
    'gray.500',
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
  
  const { register, handleSubmit } = useForm<tagForm>();
  const onSubmit: SubmitHandler<tagForm> = (data) => {}

  return (
    <Box bg={color}>
      <NodeResizer />
      <Stack p={3} bg='white' rounded='md' shadow='md' border='1px' borderColor='gray.500'>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Editable>
            <EditablePreview />
            <EditableTextarea {...register("tag")}/>
          </Editable>
          </form>
        </Box>
        <Box>
          <IconButton aria-label='tag' icon={<EditIcon />} />
        </Box>
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label='setColor'
              icon={<AddIcon />}
              bg={color}
            />
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
      </Stack>
    </Box>
  )
}
