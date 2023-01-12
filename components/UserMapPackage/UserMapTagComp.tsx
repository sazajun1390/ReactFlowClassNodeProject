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
import {
  NodeResizer,
  NodeResizeControl,
  ResizeDragEvent,
  ResizeEventParams,
} from '@reactflow/node-resizer'
import '@reactflow/node-resizer/dist/style.css'
import {
  Divider,
  Box,
  Button,
  VStack,
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
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import ResizeTextarea from 'react-textarea-autosize'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'

type tagForm = {
  tag: string
}
class CannotGetNodeError extends Error {}

const UserMapTagComp: FC<NodeProps> = (props) => {
  const { data, selected, id } = props
  const { getNode, getNodes, setNodes, getIntersectingNodes } = useReactFlow()

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

  const { register, watch } = useForm<tagForm>({
    defaultValues: { tag: data?.label },
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
  const [height, setHeight] = useState(60)
  const [width, setWidth] = useState(60)
  const fieldValue = watch('tag')

  const calcHeight = useCallback(
    (event: ResizeDragEvent, params: ResizeEventParams) => {
      setHeight(params.height)
      setWidth(params.width)
    },
    [height],
  )

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id == id) {
          node.data = {
            label: fieldValue,
          }
          node.width = width
          node.height = height
        }
        return node
      }),
    )
  }, [fieldValue, width, height])

  return (
    <Box
      bg={color}
      rounded='md'
      shadow='md'
      border='1px'
      borderColor='gray.500'
      h={height}
      w={width}
      minW={40}
    >
      <NodeResizer onResize={calcHeight} minWidth={40} />
      <Box m={2}>
        <form>
          <Textarea
            {...register('tag')}
            overflow='hidden'
            resize='none'
            minRows={2}
            as={ResizeTextarea}
          />
        </form>
      </Box>

      <Flex pos='fixed' bottom={2} my='2'>
        <></>
        <Popover>
          <PopoverTrigger>
            <IconButton aria-label='setColor' icon={<EditIcon />} bg='whiteAlpha.100' />
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

export default memo(UserMapTagComp)

// onSubmit={handleSubmit(onSubmit)}
