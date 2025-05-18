import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Divider,
} from '@chakra-ui/react';

const Privacy = () => {
  return (
    <Container maxW="6xl" py={10}>
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        Privacy Policy
      </Heading>

      <VStack spacing={6} align="start">
        <Box>
          <Heading as="h2" size="md" mb={2}>
            1. Introduction
          </Heading>
          <Text>
            At <strong>The MemeHub</strong>, your privacy is important to us. This Privacy Policy
            outlines the types of information we collect, how we use it, and your choices regarding your data.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            2. Information We Collect
          </Heading>
          <Text>
            We may collect basic user data such as:
          </Text>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>🔹 Email address (if you register or contact us)</li>
            <li>🔹 Content created or uploaded (memes, text, images)</li>
            <li>🔹 Anonymous analytics (e.g., page visits, interactions)</li>
          </ul>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            3. How We Use Your Data
          </Heading>
          <Text>
            We use your data to improve the platform, respond to feedback, feature user-created memes, and
            maintain functionality. We will never sell or share your personal data.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            4. Third-Party Services
          </Heading>
          <Text>
            We may use third-party tools such as Google Analytics or Emoji APIs to enhance user experience.
            These services may collect limited technical data (e.g., browser type, IP address) but not your
            personal information.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            5. Cookies & Tracking
          </Heading>
          <Text>
            We use minimal cookies to manage sessions and preferences. You can manage cookie settings in your
            browser. No tracking cookies are used for advertising purposes.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            6. Your Rights
          </Heading>
          <Text>
            You have the right to:
          </Text>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>✅ Access or delete your stored content</li>
            <li>✅ Ask us what data we have (if any)</li>
            <li>✅ Request removal of memes or images you’ve uploaded</li>
          </ul>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            7. Data Security
          </Heading>
          <Text>
            We take reasonable measures to keep your data secure. However, please remember that no online
            platform is 100% secure. Avoid uploading sensitive or private information.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            8. Updates to this Policy
          </Heading>
          <Text>
            This Privacy Policy may change if we add new features. We’ll post updates here and revise the date
            below.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            9. Contact Us
          </Heading>
          <Text>
            If you have questions about your data or our policies, feel free to reach out to our team at:
            <br />
            <strong>codecomandosmemehub@gmail.com</strong>
          </Text>
        </Box>
      </VStack>

      <Divider my={10} />
    </Container>
  );
};

export default Privacy;
