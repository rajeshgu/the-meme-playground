import { createContext, useContext, useState } from 'react';

const MemeContext = createContext();

export const MemeProvider = ({ children }) => {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [memes, setMemes] = useState([]);
  const [sortBy, setSortBy] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MemeContext.Provider
      value={{
        selectedMeme,
        setSelectedMeme,
        memes,
        setMemes,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};

export const useMeme = () => useContext(MemeContext);