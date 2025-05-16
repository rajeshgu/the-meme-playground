import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import memesAPI from '../api/memes';

import MemeList from '../components/meme/MemeList';
import { PlusIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const data = await memesAPI.getAllMemes();
        setMemes(data);
      } catch (error) {
        console.error('Failed to fetch memes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const handleMemeVote = () => {
    // Refetch or update local state
    fetchMemes();
  };

  if (loading) {
    return <div className="text-center py-10">Loading memes...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Meme Dashboard</h1>
        <button
          onClick={() => navigate('/create-meme')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
        >
          <PlusIcon className="h-5 w-5" />
          Create Meme
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map(meme => (
          <MemeCard 
            key={meme._id} 
            meme={meme} 
            onVote={handleMemeVote}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;