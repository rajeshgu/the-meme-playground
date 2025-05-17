import { Box, Flex, Image, Text, Heading, IconButton, Badge } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import { formatDate } from '../../utils/helpers';
const apiUrl = import.meta.env.VITE_API_URL;


const MemeCard = ({ meme }) => {
  console.log('MemeCard-->', apiUrl);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      boxShadow="md"
    >
      <Flex align="center" mb={2}>
        <Text fontSize="sm" color="gray.500">
          Posted by {meme.user?.username || 'Anonymous'} • {formatDate(meme.createdAt)}
        </Text>
      </Flex>

      <Link to={`/memes/${meme._id}`}>
        <Heading size="md" mb={2}>
          {meme.title}
        </Heading>
        <Image src={`${apiUrl}${meme.imageUrl}`} alt={meme.title} w="100%" borderRadius="md" />
      </Link>

      <Flex mt={3} wrap="wrap" gap={2}>
        {meme.tags?.map((tag) => (
          <Badge key={tag} colorScheme="purple">
            #{tag}
          </Badge>
        ))}
      </Flex>

      <Flex justify="space-between" mt={4}>
        <VoteButtons meme={meme} />

        <Flex align="center" gap={4}>
          <Flex align="center">
            <IconButton
              aria-label="Comments"
              icon={<FaComment />}
              variant="ghost"
              size="sm"
            />
            <Text ml={1}>{meme.commentsCount || 0}</Text>
          </Flex>
          <IconButton
            aria-label="Share"
            icon={<FaShare />}
            variant="ghost"
            size="sm"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default MemeCard;