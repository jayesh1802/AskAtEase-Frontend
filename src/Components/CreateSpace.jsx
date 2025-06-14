import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../utils/constants";

const CreateSpace = ({ dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    if (!loading) setIsModalOpen(!isModalOpen);
  };

  const handleCreateSpace = async () => {
    if (!spaceName.trim()) {
      alert("Space name is required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a space.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create the space
      const postResponse=await axios.post(
        `${API_URL}/api/space`,
        {
          spaceName: spaceName,
          description: spaceDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Space Created:", postResponse.data);
      // Step 2: Fetch updated space list
      const response = await axios.get(`${API_URL}/api/space`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Step 3: Dispatch fresh data
      dispatch({
        type: "all",
        spaces: response.data,
      });

      // Reset form and close modal
      alert(`Space "${spaceName}" created successfully.`);
      setSpaceName("");
      setSpaceDescription("");
      toggleModal();
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to create space.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Create Button */}
      <button
        onClick={toggleModal}
        className="text-2xl font-bold p-4 text-button rounded-lg border-2 border-gray-500 hover:bg-gray-300 transition-colors duration-300 flex mx-auto items-center justify-center gap-3"
      >
        Create Space
        <svg
          className="h-6 w-6"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          {/* Modal Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg p-6 relative">
              <h2 className="text-xl font-bold mb-4 text-center text-button">
                Create a New Space
              </h2>

              <form>
                {/* Space Name Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Space Name
                  </label>
                  <input
                    type="text"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    placeholder="Enter space name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-950"
                  />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={spaceDescription}
                    onChange={(e) => setSpaceDescription(e.target.value)}
                    placeholder="Enter space description"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-950"
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateSpace}
                    className={`bg-button text-white px-4 py-2 rounded ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateSpace;
