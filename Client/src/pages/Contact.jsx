import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Text,
  useToast,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const Contact = () => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out to us.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    e.target.reset();
  };

  return (
    <Container maxW="6xl" py={10}>
      <Heading
        as="h1"
        size="xl"
        mb={6}
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        Contact Us
      </Heading>

      <Text fontSize="lg" mb={6} color="gray.600">
        Got questions, feedback, or a meme idea? We'd love to hear from you. Drop us a message!
      </Text>

      <Box
        bg="gray.50"
        p={8}
        rounded="md"
        boxShadow="md"
        as="form"
        onSubmit={handleSubmit}
      >
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" placeholder="Your name" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" placeholder="you@example.com" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea name="message" rows={5} placeholder="What's on your mind?" />
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
            color="white"
            size="lg"
            width="full"
          >
            Send Message
          </Button>
        </VStack>
      </Box>

      <Box mt={10}>
        <Heading as="h2" size="md" mb={4}>
          Or reach us directly:
        </Heading>
        <VStack align="start" spacing={2}>
          <HStack>
            <Icon as={MdEmail} color="purple.500" />
            <Text>codecomandosmemehub@gmail.com</Text>
          </HStack>
          <HStack>
            <Icon as={MdLocationOn} color="purple.500" />
            <Text>India — Remote Hackathon Team</Text>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Contact;
