import {
  Box,
  Heading,
  Text as ChakraText,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Flex,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Badge
} from '@chakra-ui/react';
import { formatNumber, formatDate } from '../../utils/helpers';

const UserStats = ({ memes }) => {
  // Calculate stats
  const totalMemes = memes.length;
  const totalVotes = memes.reduce((sum, meme) => sum + (meme.votes || 0), 0);
  const totalViews = memes.reduce((sum, meme) => sum + (meme.views || 0), 0);
  const totalComments = memes.reduce((sum, meme) => sum + (meme.commentsCount || 0), 0);
  const topMeme = [...memes].sort((a, b) => (b.votes || 0) - (a.votes || 0))[0];
  const recentMeme = [...memes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  // Calculate tag distribution
  const tagDistribution = memes
    .flatMap((meme) => meme.tags || [])
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  // Convert to array and sort
  const sortedTags = Object.entries(tagDistribution)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box>
      <Heading size="lg" mb={6}>
        Your Meme Statistics
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Stat bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <StatLabel>Total Memes</StatLabel>
          <StatNumber>{totalMemes}</StatNumber>
          <StatHelpText>All time creations</StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <StatLabel>Total Votes</StatLabel>
          <StatNumber>{formatNumber(totalVotes)}</StatNumber>
          <StatHelpText>Combined upvotes and downvotes</StatHelpText>
        </Stat>

        <Stat bg={cardBg} p={4} borderRadius="md" boxShadow="md">
          <StatLabel>Total Views</StatLabel>
          <StatNumber>{formatNumber(totalViews)}</StatNumber>
          <StatHelpText>All meme views combined</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        <Box flex={1} bg={cardBg} p={6} borderRadius="md" boxShadow="md">
          <Heading size="md" mb={4}>
            Performance Overview
          </Heading>

          <VStack align="stretch" spacing={4}>
            <Box>
              <Flex justify="space-between" mb={1}>
                <ChakraText fontWeight="medium">Votes per Meme</ChakraText>
                <ChakraText>
                  {totalMemes > 0 ? Math.round(totalVotes / totalMemes) : 0} avg
                </ChakraText>
              </Flex>
              <Progress
                value={Math.min(100, (totalVotes / (totalMemes * 10)) * 100)}
                size="sm"
                colorScheme="purple"
                borderRadius="full"
              />
            </Box>

            <Box>
              <Flex justify="space-between" mb={1}>
                <ChakraText fontWeight="medium">Views per Meme</ChakraText>
                <ChakraText>
                  {totalMemes > 0 ? formatNumber(Math.round(totalViews / totalMemes)) : 0} avg
                </ChakraText>
              </Flex>
              <Progress
                value={Math.min(100, (totalViews / (totalMemes * 100)) * 100)}
                size="sm"
                colorScheme="purple"
                borderRadius="full"
              />
            </Box>

            <Box>
              <Flex justify="space-between" mb={1}>
                <ChakraText fontWeight="medium">Engagement Rate</ChakraText>
                <ChakraText>
                  {totalViews > 0
                    ? ((totalVotes + totalComments) / totalViews * 100).toFixed(1)
                    : 0}%
                </ChakraText>
              </Flex>
              <Progress
                value={Math.min(
                  100,
                  totalViews > 0
                    ? ((totalVotes + totalComments) / totalViews) * 100
                    : 0
                )}
                size="sm"
                colorScheme="purple"
                borderRadius="full"
              />
            </Box>
          </VStack>
        </Box>

        <Box flex={1} bg={cardBg} p={6} borderRadius="md" boxShadow="md">
          <Heading size="md" mb={4}>
            Meme Highlights
          </Heading>

          <VStack align="stretch" spacing={6}>
            {topMeme && (
              <Box>
                <HStack justify="space-between">
                  <ChakraText fontWeight="medium">Most Popular Meme</ChakraText>
                  <Badge colorScheme="purple">
                    {topMeme.votes || 0} votes
                  </Badge>
                </HStack>
                <ChakraText fontSize="sm" noOfLines={1} mt={1}>
                  "{topMeme.title}"
                </ChakraText>
                <ChakraText fontSize="xs" color="gray.500">
                  Posted {formatDate(topMeme.createdAt)}
                </ChakraText>
              </Box>
            )}

            {recentMeme && (
              <Box>
                <HStack justify="space-between">
                  <ChakraText fontWeight="medium">Most Recent Meme</ChakraText>
                  <Badge colorScheme="purple">
                    {formatDate(recentMeme.createdAt, true)}
                  </Badge>
                </HStack>
                <ChakraText fontSize="sm" noOfLines={1} mt={1}>
                  "{recentMeme.title}"
                </ChakraText>
                <ChakraText fontSize="xs" color="gray.500">
                  {recentMeme.views || 0} views
                </ChakraText>
              </Box>
            )}

            <Divider />

            <Box>
              <ChakraText fontWeight="medium" mb={2}>
                Tag Distribution
              </ChakraText>
              <Flex wrap="wrap" gap={2}>
                {sortedTags.map(({ tag }) => (
                  <Badge key={tag} colorScheme="purple">
                    #{tag}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserStats;