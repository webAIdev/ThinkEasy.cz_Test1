
import {
  VStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  LinkBox,
  Button,
  FormControl,
  Text,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../providers/auth/AuthProvider'
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // React hook form 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>()
  const toast = useToast()
  const router = useRouter()
  const { signUp } = useAuth()
  const onSubmit = async (data: RegisterData) => {
    await signUp(data)
      .then(() => {
        toast({
          title: 'Success',
          description: 'You have successfully signed up',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        router.push('/login');
      })
      .catch(err => {
        toast({
          title: 'Authentication error',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }
  return (
    <VStack spacing={4} align="stretch" maxW="sm" mx="auto" mt={8}>
      <Heading as="h1" size="2xl">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <Input
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
        </FormControl>
        {/* Show error  */}
        {errors.email && (
          <Text fontSize="sm" color="red.500">
            {errors.email.message}
          </Text>
        )}
        <FormControl mt={4} isInvalid={!!errors.password}>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: true,
              })}
            />
            <InputRightElement>
              <IconButton
                aria-label="Show password"
                icon={showPassword ? <FiEyeOff /> : <FiEye />}
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.password}>
          <InputGroup>
            <Input
              type="text"
              placeholder="First name"
              {...register('firstname', {
                required: true,
              })}
            />
          </InputGroup>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.password}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Last name"
              {...register('lastname', {
                required: true,
              })}
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" mt={4} isLoading={isSubmitting}>
          Sign Up
        </Button>
      </form>
      <LinkBox>
        <Link href="/login">Go to Login Page</Link>
      </LinkBox>
    </VStack>
  )
}
export default RegisterPage