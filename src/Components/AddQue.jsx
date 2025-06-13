import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { QuestionsContext } from "../contexts/QuestionsContext";
import { SpaceContext } from "../contexts/SpaceContext";
import { AuthContext } from "../contexts/AuthContext";

const AddQuestion2 = () => {
  const { spaces, fetchSpaces } = useContext(SpaceContext);
  const { dispatch } = useContext(QuestionsContext);
  const { user } = useContext(AuthContext); 

  const [questionText, setQuestionText] = useState("");
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
  useEffect(() => {
    fetchSpaces(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || !selectedSpaceId || !user?.username) {
      alert("Please enter a question, select a space, and ensure you're logged in.");
      return;
    }

    const payload = {
      question: questionText,
      spaceIds: [parseInt(selectedSpaceId)],
      userId: user.username, 
      createdAt: new Date().toISOString(),
      answers: []
    };

    try {
      const response = await axios.post(`${API_URL}/api/question`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Question added successfully!");
      dispatch({
        type: "add",
        ...response.data,
      });
      setQuestionText("");
      setSelectedSpaceId("");
    } catch (err) {
      console.error("Error adding question:", err);
      alert(err?.response?.data?.error || "Failed to add question.");
    }
  };


  return (
    <div>
      <h2>Add a Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question"
            required
          />
        </div>

        <div>
          <label>Select Space:</label>
          <select
            value={selectedSpaceId}
            onChange={(e) => setSelectedSpaceId(e.target.value)}
            required
          >
            <option value="">-- Select Space --</option>
            {spaces.map((space) => (
              <option key={space.spaceId} value={space.spaceId}>
                {space.spaceName} - {space.description}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
};

export default AddQuestion2;
