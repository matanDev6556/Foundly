import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  deleteLike,
  fetchLikesForUser,
  saveLikeToDb,
} from '../services/dbService';
import Like from '../models/Like';
import { useUser } from './UserContext';

interface LikesContextType {
  likes: Like[];
  toggleLike: (companyId: string, userId: string) => void;
}

const LikesContext = createContext<LikesContextType>({
  likes: [],
  toggleLike: () => {},
});

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    if (user && user.userType === 'Investor') {
      console.log('use effect : fetchLikes');

      fetchLikesForUser(user.uid).then(setLikes);
    } else {
      console.log('use effect : set to Empty likes');
      setLikes([]);
    }
  }, []);

  const toggleLike = async (companyId: string, userId: string) => {
    console.log('toggle like');
    const newLikes = [...likes];
    //check if its like or unlike
    const likeIndex = newLikes.findIndex(
      (like) => like.companyId === companyId
    );

    if (likeIndex !== -1) {
      // Unlike
      console.log('delete like');
      newLikes.splice(likeIndex, 1);
      setLikes(newLikes);
      await deleteLike(userId, companyId);
    } else {
      // Like
      console.log('new like');
      const newLike = new Like(userId, companyId);
      newLikes.push(newLike);
      setLikes(newLikes);

      await saveLikeToDb(newLike);
    }
  };

  return (
    <LikesContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);
