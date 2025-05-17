import { Flex, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Flex justify="center" align="center" py={10}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingSpinner;