import React, { createContext, useState } from "react";
import axios from "axios";

export const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]); // All spaces
  const [selectedSpace, setSelectedSpace] = useState(null); // Selected space
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([]); // NEW: Q&A list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all spaces
  const fetchSpaces = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/spaces");
      setSpaces(response.data);
    } catch (err) {
      console.error("Error fetching spaces:", err);
      setError("Failed to load spaces. Please try again later.");
    }
  };

  // Fetch questions + answers for selected space
  const fetchQuestionsWithAnswers = async (spaceId) => {
    if (!spaceId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/spaces/${spaceId}/queAns`
      );
      setQuestionsWithAnswers(response.data || []);
    } catch (err) {
      console.error("Error fetching questions with answers:", err);
      setError("Failed to load questions with answers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SpaceContext.Provider
      value={{
        spaces,
        fetchSpaces,
        selectedSpace,
        setSelectedSpace,
        questionsWithAnswers,            
        fetchQuestionsWithAnswers,       
        
        loading,
        error,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};
