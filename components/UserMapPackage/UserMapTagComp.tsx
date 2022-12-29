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
  Node,
} from 'reactflow'
import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer'
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
  Textarea,
  Flex,
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import ResizeTextarea from "react-textarea-autosize"
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'

type tagForm = {
  tag: string
}
class CannotGetNodeError extends Error {}

const UserMapTagComp: FC<NodeProps> = (props) => {
  const { getNode, getNodes, setNodes, getIntersectingNodes } = useReactFlow()

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

  const { register, handleSubmit } = useForm<tagForm>({
    defaultValues:{tag:'start UserMap'}
  })
  /*const onSubmit: SubmitHandler<tagForm> = (data) => {
    try{
      const setNodeData = getNode(props.id)
    }catch(e){
      throw e
    }
  }
  <NodeResizer />
  */

  return (
    <Box bg={color} rounded='md' shadow='md' border='1px' borderColor='gray.500'>
      <Stack p={3}>
        <Box>
          <form>
            <Textarea {...register('tag')} overflow="hidden" resize="none" minRows={1} as={ResizeTextarea} />
          </form>
        </Box>

        <Flex>
          <></>
          <Popover>
          <PopoverTrigger>
            <IconButton aria-label='setColor' icon={<AddIcon />} bg='whiteAlpha.100' />
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
      </Stack>
    </Box>
  )
}

export default memo(UserMapTagComp)

// onSubmit={handleSubmit(onSubmit)}
