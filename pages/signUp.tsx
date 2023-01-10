import type { NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  Text,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { auth, db, googleOnSubmit, passSignUpOnSubmit } from '../firebase/firebaseCallFunctions'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'

const signUpFormShema = z.object({
  email: z.string({ required_error: 'className is required' }).email(),
  password: z.string({ required_error: 'className is required' }).min(6),
  confirmPass: z.string({ required_error: 'className is required' }).min(6)
}).superRefine((({password, confirmPass},ctx) => {
  if(password !== confirmPass){
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
}))

interface SignUpForm {
  email:string,
  password:string,
  confirmPass:string
}

const SignUpPage: NextPage = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver:zodResolver(signUpFormShema)
  })

  const onSubmit:SubmitHandler<SignUpForm> = async (data) => {
    try{
      await passSignUpOnSubmit(data.email,data.password)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <Box w='100vw' h='100vh'>
      <Flex alignItems='center' justifyContent='center' w='100%' h='100%'>
        <Card>
          <CardHeader textAlign='center' fontSize='lg' textColor='blackAlpha.800'>
            SingUp
          </CardHeader>
          <CardBody>
            <Center>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor='email'>email</FormLabel>
                  <Input
                    id='email'
                    {...register('email')}
                  />
                  <FormErrorMessage>
                    {errors.email?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor='password'>pass</FormLabel>
                  <Input
                    id='password'
                    {...register('password')}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPass}>
                  <FormLabel htmlFor='confirmPass'>confirm pass</FormLabel>
                  <Input
                    id='confirmPass'
                    {...register('confirmPass')}
                  />
                  <FormErrorMessage>
                    {errors.confirmPass?.message}
                  </FormErrorMessage>
                </FormControl>
              </form>
              
            </Center>
          </CardBody>
          <CardFooter>
            <Center>
            <Button isLoading={isSubmitting} type='submit' colorScheme='teal'  mt={4}>
              SignUp
            </Button>
            <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />} onClick={googleOnSubmit}>
              <Center>
                <Text>Sign up with Google</Text>
              </Center>
            </Button>
            </Center>
          </CardFooter>
        </Card>
      </Flex>
    </Box>
  )
}

export default SignUpPage
