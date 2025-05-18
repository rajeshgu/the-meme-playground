import {
  Box,
  Heading,
  Flex,
  Link as ChakraLink,
  Text,
  useColorModeValue,
  Divider,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  const shadow = useColorModeValue('md', 'dark-lg');

  return (
    <Flex align="center" justify="center" minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} px={4}>
      <Box
        w="100%"
        maxW="400px"
        bg={cardBg}
        p={8}
        borderRadius="lg"
        boxShadow={shadow}
      >
        <Heading mb={2} size="lg" textAlign="center" color={accentColor}>
          Welcome Back 👋
        </Heading>
        <Text fontSize="sm" color={textColor} textAlign="center" mb={6}>
          Log in to access your MemeHub dashboard
        </Text>

        {/* Login Form */}
        <LoginForm />

        {/* Divider */}
        <Flex align="center" my={4}>
          <Divider flex="1" />
          <Text px={2} fontSize="sm" color={textColor}>
            or
          </Text>
          <Divider flex="1" />
        </Flex>

        {/* Social Login Icons (optional placeholders) */}
        <VStack spacing={3}>
          <Flex
            as="button"
            align="center"
            justify="center"
            w="100%"
            p={2}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            _hover={{ bg: 'gray.100' }}
          >
            <Icon as={FaGoogle} mr={2} />
            <Text fontSize="sm">Continue with Google</Text>
          </Flex>

          <Flex
            as="button"
            align="center"
            justify="center"
            w="100%"
            p={2}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            _hover={{ bg: 'gray.100' }}
          >
            <Icon as={FaFacebook} mr={2} />
            <Text fontSize="sm">Continue with Facebook</Text>
          </Flex>
        </VStack>

        {/* Signup Link */}
        <Flex justify="center" mt={6}>
          <Text fontSize="sm" color={textColor}>
            Don't have an account?{' '}
            <ChakraLink
              as={RouterLink}
              to="/register"
              color={accentColor}
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >
              Sign up
            </ChakraLink>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
