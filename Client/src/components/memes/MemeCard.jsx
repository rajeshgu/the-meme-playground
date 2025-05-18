import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  IconButton,
  Badge,
  Tooltip
} from '@chakra-ui/react';
import {
  FaComment,
  FaShare,
  FaDownload
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import { formatDate } from '../../utils/helpers';

const apiUrl = import.meta.env.VITE_API_URL;

const MemeCard = ({ meme }) => {
  const memeImageUrl = `${apiUrl}${meme.imageUrl}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(memeImageUrl, {
        mode: 'cors',
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${meme.title || 'meme'}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Try again.');
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      boxShadow="md"
      bg="white"
    >
      {/* Posted Info */}
      <Flex align="center" mb={2}>
        <Text fontSize="sm" color="gray.500">
          Posted by {meme.user?.username || 'Anonymous'} • {formatDate(meme.createdAt)}
        </Text>
      </Flex>

      {/* Meme Content */}
      <Link to={`/memes/${meme._id}`}>
        <Heading size="md" mb={2}>
          {meme.title}
        </Heading>
        <Image
          src={memeImageUrl}
          alt={meme.title}
          w="100%"
          borderRadius="md"
          objectFit="contain"
        />
      </Link>

      {/* Tags */}
      <Flex mt={3} wrap="wrap" gap={2}>
        {meme.tags?.map((tag) => (
          <Badge key={tag} colorScheme="purple">
            #{tag}
          </Badge>
        ))}
      </Flex>

      {/* Actions */}
      <Flex justify="space-between" align="center" mt={4}>
        {/* Voting */}
        <VoteButtons meme={meme} />

        {/* Comments, Share, Download */}
        <Flex align="center" gap={3}>
          <Flex align="center">
            <IconButton
              aria-label="Comments"
              icon={<FaComment />}
              variant="ghost"
              size="sm"
            />
            <Text ml={1}>{meme.commentsCount || 0}</Text>
          </Flex>

          <Tooltip label="Share Meme">
            <IconButton
              aria-label="Share"
              icon={<FaShare />}
              variant="ghost"
              size="sm"
              onClick={() => navigator.share ? navigator.share({
                title: meme.title,
                url: window.location.origin + `/memes/${meme._id}`
              }) : alert('Sharing not supported on this browser.')}
            />
          </Tooltip>

          <Tooltip label="Download Meme">
            <IconButton
              aria-label="Download Meme"
              icon={<FaDownload />}
              variant="ghost"
              size="sm"
              onClick={handleDownload}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MemeCard;
