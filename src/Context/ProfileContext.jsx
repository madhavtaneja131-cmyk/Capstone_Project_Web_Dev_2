import { createContext, useContext, useState } from "react";
import { profiles } from "../Data/MoviesData";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(null);
  const [continueWatching, setContinueWatching] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [myVideos, setMyVideos] = useState([]);

  const addToContinueWatching = (movie) => {
    setContinueWatching((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;
      return [...prev, { ...movie, progress: Math.floor(Math.random() * 80) + 10 }];
    });
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  const addMyVideo = (video) => {
    setMyVideos((prev) => [...prev, video]);
  };

  return (
    <ProfileContext.Provider value={{
      activeProfile, setActiveProfile, profiles,
      continueWatching, addToContinueWatching,
      watchlist, addToWatchlist, isInWatchlist,
      myVideos, addMyVideo,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);