import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  VStack,
} from '@chakra-ui/react';

const Terms = () => {
  return (
    <Container maxW="6xl" py={10}>
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        Terms & Conditions
      </Heading>

      <VStack spacing={6} align="start">
        <Box>
          <Heading as="h2" size="md" mb={2}>
            1. Introduction
          </Heading>
          <Text>
            Welcome to <b>The MemeHub</b>. By accessing or using our platform, you agree to these
            Terms & Conditions. If you don’t agree, please do not use the site.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            2. User Responsibilities
          </Heading>
          <Text>
            You are responsible for any content you create, upload, or share. Please do not post offensive,
            hateful, copyrighted, or inappropriate content. Memes are fun — let’s keep them that way!
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            3. Intellectual Property
          </Heading>
          <Text>
            All tools, features, and UI elements provided by The Meme Playground are owned by our team.
            You retain rights to your original content, but by using our editor, you grant us permission to display
            and feature your memes on our platform or promotional material.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            4. Uploads & Content Ownership
          </Heading>
          <Text>
            When uploading images, you confirm that you have the rights to use and modify those images.
            Do not upload any copyrighted or third-party content without permission.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            5. Sharing & Community Use
          </Heading>
          <Text>
            Memes created on our platform can be shared freely on social media. You are welcome to distribute
            your memes, but we ask you to link back to The Meme Playground if possible.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            6. Limitations of Liability
          </Heading>
          <Text>
            The Meme Playground is a free tool built during a hackathon for educational and entertainment
            purposes. We are not liable for any misuse, content disputes, or data loss resulting from use of
            this platform.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            7. Updates to Terms
          </Heading>
          <Text>
            We may update these terms from time to time. Significant changes will be posted on this page.
            Continued use of the platform after updates means you agree to the revised terms.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            8. Contact Us
          </Heading>
          <Text>
            Questions? Suggestions? Want to report a bug or meme abuse? Contact our team at:
            <br />
            <b>codecomandosmemehub@gmail.com</b>
          </Text>
        </Box>
      </VStack>

      <Divider my={5} />
    </Container>
  );
};

export default Terms;
