import { Box, Heading, Input, Select, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import MemeFeed from '../components/memes/MemeFeed';
import useMemes from '../hooks/useMemes';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const { memes, isLoading } = useMemes({
    search: searchTerm,
    sort: sortBy === 'new' ? '-createdAt' : '-votes',
  });

 

  const filteredMemes =Array.isArray(memes?.memes)&& memes?.memes?.filter((meme) =>
    meme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meme.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <Heading mb={6} size="xl">
        Explore Memes
      </Heading>

      <Stack direction={{ base: 'column', md: 'row' }} mb={6} spacing={4}>
        <Input
          placeholder="Search memes or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          maxW="200px"
        >
          <option value="new">Newest First</option>
          <option value="top">Most Popular</option>
        </Select>
      </Stack>

      <MemeFeed memes={filteredMemes} isLoading={isLoading} />
    </Box>
  );
};

export default Explore;