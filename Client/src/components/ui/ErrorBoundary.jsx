import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" py={10} px={6}>
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Something went wrong
          </Heading>
          <Text color="gray.500" mb={6}>
            We're sorry for the inconvenience. Please try reloading the page.
          </Text>
          <Button colorScheme="purple" onClick={this.handleReload}>
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;