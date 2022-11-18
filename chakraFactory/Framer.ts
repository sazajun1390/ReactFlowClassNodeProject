import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp, LayoutGroup } from 'framer-motion'

const FramerBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const FramerLayoutGroup = chakra(LayoutGroup, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

export { FramerBox, FramerLayoutGroup }
