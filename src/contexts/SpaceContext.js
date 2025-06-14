import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const SpaceContext = createContext(null);

function spaceReducer(spaces, action) {
  switch (action.type) {
    case "add":
      return [
        ...spaces,
        {
          spaceId: action.spaceId,
          spaceName: action.spaceName,
          description: action.description,
          localDateTime: action.localDateTime || null,
          userIds: action.userIds || [],
        },
      ];
    case "all":
      return action.spaces;
    default:
      console.error(`Unknown action type: ${action.type}`);
      return spaces;
  }
}

function useSpaces() {
  const [spaces, dispatch] = useReducer(spaceReducer, []);

  const fetchSpaces = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/space`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "all", spaces: response.data });
    } catch (error) {
      console.error("Error fetching spaces:", error.message);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return { spaces, dispatch, fetchSpaces }; // ✅ RETURN fetchSpaces
}

export function SpaceProvider({ children }) {
  const { spaces, dispatch, fetchSpaces } = useSpaces();

  return (
    <SpaceContext.Provider value={{ spaces, dispatch, fetchSpaces }}>
      {children}
    </SpaceContext.Provider>
  );
}
