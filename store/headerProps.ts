import {
  ResponsiveValue,
} from '@chakra-ui/react'
export interface headerProps{
  toggle(): void,
  open: boolean,
  bg: string,
  color: string,
  borderColor: string,
  textAlign: ResponsiveValue<TextAlign> | undefined,
  textColor: string
}