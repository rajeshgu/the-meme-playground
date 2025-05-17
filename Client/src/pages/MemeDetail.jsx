import { Box, Heading, Text, Flex, Avatar, Badge, Divider, VStack, HStack, Image, IconButton, Textarea, Button, useToast, Link, SimpleGrid } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { getMeme, upvoteMeme, downvoteMeme, addComment } from '../api/memes';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
const MemeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [meme, setMeme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const data = await getMeme(id);
        setMeme(data);
        setUserVote(data.userVote || 0);
      } catch (error) {
        toast({
          title: 'Failed to load meme',
          description: error.response?.data?.message || 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeme();
  }, [id, navigate, toast]);

  const handleVote = async (voteType) => {
    if (!user) {
      toast({
        title: 'Please login to vote',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      let newVotes = meme.votes;
      let newUserVote = userVote;

      if (voteType === 'up') {
        if (userVote === 1) {
          await downvoteMeme(id);
          newVotes -= 1;
          newUserVote = 0;
        } else {
          await upvoteMeme(id);
          if (userVote === -1) newVotes += 2;
          else newVotes += 1;
          newUserVote = 1;
        }
      } else {
        if (userVote === -1) {
          await upvoteMeme(id);
          newVotes += 1;
          newUserVote = 0;
        } else {
          await downvoteMeme(id);
          if (userVote === 1) newVotes -= 2;
          else newVotes -= 1;
          newUserVote = -1;
        }
      }

      setMeme({ ...meme, votes: newVotes });
      setUserVote(newUserVote);
    } catch (error) {
      toast({
        title: 'Vote failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = await addComment(id, { text: commentText });
      setMeme({
        ...meme,
        comments: [...meme.comments, newComment],
        commentsCount: meme.commentsCount + 1,
      });
      setCommentText('');
      toast({
        title: 'Comment added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to add comment',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!meme) return null;

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="xl">{meme.title}</Heading>
        <Flex align="center" gap={2}>
          <IconButton
            icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            aria-label="Bookmark"
            onClick={() => setIsBookmarked(!isBookmarked)}
            variant="ghost"
            colorScheme="purple"
          />
          <IconButton
            icon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            aria-label="Like"
            onClick={() => setIsLiked(!isLiked)}
            variant="ghost"
          />
        </Flex>
      </Flex>

      <Flex align="center" mb={4}>
        <Avatar name={meme.user?.username} size="sm" mr={2} />
        <Text fontWeight="bold">{meme.user?.username || 'Anonymous'}</Text>
        <Text mx={2}>•</Text>
        <Text color="gray.500">{formatDate(meme.createdAt)}</Text>
      </Flex>

      <Box mb={6} borderRadius="md" overflow="hidden" boxShadow="lg">
        <Image src={`${apiUrl}${meme.imageUrl}`} alt={meme.title} w="100%" />
      </Box>

      <Flex gap={4} mb={6}>
        <Flex align="center">
          <IconButton
            icon={<FaArrowUp />}
            aria-label="Upvote"
            colorScheme={userVote === 1 ? 'green' : undefined}
            onClick={() => handleVote('up')}
            mr={1}
          />
          <Text fontWeight="bold" mx={1}>
            {meme.votes || 0}
          </Text>
          <IconButton
            icon={<FaArrowDown />}
            aria-label="Downvote"
            colorScheme={userVote === -1 ? 'red' : undefined}
            onClick={() => handleVote('down')}
            ml={1}
          />
        </Flex>
        <Flex align="center">
          <IconButton
            icon={<FaComment />}
            aria-label="Comments"
            variant="ghost"
            mr={1}
          />
          <Text>{meme.commentsCount || 0}</Text>
        </Flex>
        <IconButton
          icon={<FaShare />}
          aria-label="Share"
          variant="ghost"
          ml="auto"
        />
      </Flex>

      <HStack spacing={2} mb={6} wrap="wrap">
        {meme.tags?.map((tag) => (
          <Badge key={tag} colorScheme="purple">
            #{tag}
          </Badge>
        ))}
      </HStack>

      <Box mb={8}>
        <Heading size="md" mb={4}>
          Stats
        </Heading>
        <SimpleGrid columns={3} spacing={4}>
          <StatBox label="Views" value={meme.views || 0} />
          <StatBox label="Upvotes" value={meme.upvotes || 0} />
        <StatBox label="Engagement" value={`${Math.min(100, Math.floor(((meme.votes + meme.commentsCount) / (meme.views || 1)) * 100))}%`} />
        </SimpleGrid>
      </Box>

      <Divider my={6} />

      <Box mb={8}>
        <Heading size="md" mb={4}>
          Add Comment
        </Heading>
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
              mb={3}
              resize="vertical"
            />
            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isSubmitting}
              isDisabled={!commentText.trim()}
            >
              Post Comment
            </Button>
          </form>
        ) : (
          <Text>
            Please <Link as={RouterLink} to="/login" color="purple.500">login</Link> to comment
          </Text>
        )}
      </Box>

      <Box>
        <Heading size="md" mb={4}>
          Comments ({meme.commentsCount || 0})
        </Heading>
        <VStack align="stretch" spacing={4}>
          {meme.comments?.length > 0 ? (
            meme.comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          ) : (
            <Text>No comments yet. Be the first to comment!</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

const StatBox = ({ label, value }) => (
  <Box borderWidth="1px" borderRadius="md" p={3} textAlign="center">
    <Text fontSize="sm" color="gray.500" mb={1}>
      {label}
    </Text>
    <Text fontWeight="bold" fontSize="xl">
      {value}
    </Text>
  </Box>
);

const CommentItem = ({ comment }) => (
  <Box borderWidth="1px" p={4} borderRadius="md">
    <Flex align="center" mb={2}>
      <Avatar name={comment.user?.username} size="xs" mr={2} />
      <Text fontWeight="bold">{comment.user?.username}</Text>
      <Text mx={2}>•</Text>
      <Text fontSize="sm" color="gray.500">
        {formatDate(comment.createdAt)}
      </Text>
    </Flex>
    <Text>{comment.text}</Text>
  </Box>
);

export default MemeDetail;