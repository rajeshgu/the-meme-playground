import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  VStack,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const About = () => {
  return (
    <Container maxW="6xl" py={12}>
      {/* Hero Section */}
      <Box textAlign="center" mb={12}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, purple.400, purple.600)"
          backgroundClip="text"
        >
          🎉 Welcome to The MemeHub!
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={4}>
          The ultimate internet sandbox for creating, editing, and sharing memes — fast,
          fun, and entirely in your browser.
        </Text>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10}>
        {/* Left Column - About Info */}
        <GridItem>
          <Heading size="lg" mb={4} color="purple.600">
            💡 Why We Built This
          </Heading>
          <Text fontSize="md" color="gray.700">
            Built during a hackathon by the team <b>Code Commandos</b>, our goal was to create
            a tool that makes meme creation simple, social, and smart. We were tired of clunky meme generators and
            wanted something modern, powerful, and fun to use.
          </Text>
        </GridItem>

        {/* Right Column - Features */}
        <GridItem>
          <Heading size="lg" mb={4} color="purple.600">
            🛠️ Key Features
          </Heading>
          <VStack align="start" spacing={2}>
            <Text>✏️ Edit meme text with custom fonts, colors, and sizes</Text>
            <Text>🖼️ Upload your own images or load from online URLs</Text>
            <Text>😂 Drag & drop funny emojis, stickers, or clipart</Text>
            <Text>💾 Download your final meme in one click</Text>
            <Text>🌐 Share your memes across social media</Text>
          </VStack>
        </GridItem>
      </Grid>

      <Divider my={12} borderColor="gray.300" />

      {/* Team Section */}
      <Box>
        <Heading size="lg" mb={4} color="purple.600">
          👨‍💻 Meet the Team
        </Heading>
        <Text fontSize="md" color="gray.700">
          We're a trio of developers who love tech and memes:
        </Text>
        <Text mt={2}>
          <b>Ankit</b> • <b>Rajesh</b> •  <b>Rupaym</b>
        </Text>
      </Box>

      <Box mt={10}>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="purple"
          bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
          color="white"
          size="lg"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default About;
