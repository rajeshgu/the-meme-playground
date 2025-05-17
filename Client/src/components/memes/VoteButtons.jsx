import { IconButton, Text, Flex, Tooltip } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { upvoteMeme, downvoteMeme } from '../../api/memes';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const VoteButtons = ({ meme }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [votes, setVotes] = useState(meme?.upvotes?.length || 0);
  const [userVote, setUserVote] = useState(meme.userVote || 0);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    try {
      let newVotes = votes;
      let newUserVote = userVote;

      if (voteType === 'up') {
        if (userVote === 1) {
          // Already upvoted, remove vote
          await downvoteMeme(meme._id);
          newVotes -= 1;
          newUserVote = 0;
        } else {
          await upvoteMeme(meme._id);
          if (userVote === -1) {
            // Changing from downvote to upvote
            newVotes += 2;
          } else {
            newVotes += 1;
          }
          newUserVote = 1;
        }
      } else {
        if (userVote === -1) {
          // Already downvoted, remove vote
          await upvoteMeme(meme._id);
          newVotes += 1;
          newUserVote = 0;
        } else {
          await downvoteMeme(meme._id);
          if (userVote === 1) {
            // Changing from upvote to downvote
            newVotes -= 2;
          } else {
            newVotes -= 1;
          }
          newUserVote = -1;
        }
      }

      setVotes(newVotes);
      setUserVote(newUserVote);
    } catch (error) {
      toast({
        title: 'Vote failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center">
      <Tooltip label="Upvote">
        <IconButton
          aria-label="Upvote"
          icon={<FaArrowUp />}
          colorScheme={userVote === 1 ? 'green' : undefined}
          onClick={() => handleVote('up')}
          size="sm"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </Tooltip>
      <Text mx={2} fontWeight="bold" minW="20px" textAlign="center">
        {votes}
      </Text>
      <Tooltip label="Downvote">
        <IconButton
          aria-label="Downvote"
          icon={<FaArrowDown />}
          colorScheme={userVote === -1 ? 'red' : undefined}
          onClick={() => handleVote('down')}
          size="sm"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </Tooltip>
    </Flex>
  );
};

export default VoteButtons;