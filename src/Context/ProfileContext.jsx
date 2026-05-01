import { createContext, useContext, useState } from "react";
import { profiles } from "../data/moviesData";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(null);
  const [continueWatching, setContinueWatching] = useState([]);

  const addToContinueWatching = (movie) => {
    setContinueWatching((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;
      return [...prev, { ...movie, progress: Math.floor(Math.random() * 80) + 10 }];
    });
  };

  return (
    <ProfileContext.Provider value={{ activeProfile, setActiveProfile, profiles, continueWatching, addToContinueWatching }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);