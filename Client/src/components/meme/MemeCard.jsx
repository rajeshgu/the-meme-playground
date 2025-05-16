import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, ChatBubbleLeftIcon as ChatBubbleLeftIconSolid } from '@heroicons/react/24/solid';
import memesAPI from '../../api/memes';
import { useAuth } from '../../context/AuthContext';

const MemeCard = ({ meme, onVote }) => {
  const { user, token } = useAuth();
  const [isLiked, setIsLiked] = useState(meme.upvotes.includes(user?._id));
  const [isDisliked, setIsDisliked] = useState(meme.downvotes.includes(user?._id));
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(meme.comments || []);

  const handleVote = async (type) => {
    if (!token) return;

    try {
      if (type === 'upvote') {
        await memesAPI.upvoteMeme(meme._id, token);
        setIsLiked(true);
        setIsDisliked(false);
      } else {
        await memesAPI.downvoteMeme(meme._id, token);
        setIsLiked(false);
        setIsDisliked(true);
      }
      onVote();
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, {
      _id: Date.now().toString(),
      text: newComment,
      user: {
        _id: user._id,
        username: user.username
      },
      createdAt: new Date()
    }]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            {meme.creator.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{meme.creator.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(meme.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{meme.title}</h3>
        <img 
          src={meme.imageUrl} 
          alt={meme.title} 
          className="w-full h-auto rounded-md mb-3"
        />
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleVote('upvote')}
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <ArrowUpIcon className="h-5 w-5" />
              <span>{meme.upvotes.length}</span>
            </button>
            <button 
              onClick={() => handleVote('downvote')}
              className={`flex items-center space-x-1 ${isDisliked ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <ArrowDownIcon className="h-5 w-5" />
              <span>{meme.downvotes.length}</span>
            </button>
          </div>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-500"
          >
            {showComments ? (
              <ChatBubbleLeftIconSolid className="h-5 w-5" />
            ) : (
              <ChatBubbleLeftIcon className="h-5 w-5" />
            )}
            <span>{comments.length}</span>
          </button>
        </div>
        
        {showComments && (
          <div className="mt-4">
            <div className="mb-4 space-y-3">
              {comments.map(comment => (
                <div key={comment._id} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    {comment.user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 bg-gray-100 p-2 rounded-lg">
                    <p className="font-semibold text-sm">{comment.user.username}</p>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md text-sm"
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeCard;