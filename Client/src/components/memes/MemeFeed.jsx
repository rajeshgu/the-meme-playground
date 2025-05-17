import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import MemeCard from './MemeCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const MemeFeed = ({ memes, isLoading }) => {
  // if (isLoading) return <LoadingSpinner />;

  // Ensure memes is an array before attempting to map
  if (!Array.isArray(memes)) {
    console.error('MemeFeed received non-array memes:', memes);
    return <Text color="red">Error loading memes.</Text>; // Or a more user-friendly error message
  }

  if (memes.length === 0) return <Text>No memes found</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {memes.map((meme) => (
        <Box key={meme._id}>
          <MemeCard meme={meme} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MemeFeed;