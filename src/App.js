import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { SpaceProvider } from "./contexts/SpaceContext";
import { QuestionsProvider } from "./contexts/QuestionsContext";

import MainComponent from "./Components/maincomponent";
import AnswerPage from "./Components/Answerpage";
import AddQuestion2 from "./Components/AddQue";
import SpaceQuestions from "./Components/SpaceQuestions";
import AnswerQuestion from "./Components/AnswerQuestion";
import SpaceQuestion from "./Components/SpaceQuestion";
import Gemini from "./Components/Gemini";
import ProfilePage from "./Components/ProfilePage";
import QuestionAnswer from "./Components/QuestionAnswer";
import Login from "./Components/LoginAndSignUp/Login";
import Signup from "./Components/LoginAndSignUp/SignUp";

import { useContext } from "react";

// ✅ Protected route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <SpaceProvider>
        <QuestionsProvider>
          <AppRoutes />
        </QuestionsProvider>
      </SpaceProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/returnhome" element={<PrivateRoute><MainComponent /></PrivateRoute>} />
      <Route path="/answer" element={<PrivateRoute><AnswerPage /></PrivateRoute>} />
      <Route path="/addque" element={<PrivateRoute><AddQuestion2 /></PrivateRoute>} />
      <Route path="/spacequestions" element={<PrivateRoute><SpaceQuestions /></PrivateRoute>} />
      <Route path="/answer/:questionId" element={<PrivateRoute><AnswerQuestion /></PrivateRoute>} />
      <Route path="/spaces/:id" element={<PrivateRoute><SpaceQuestion /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/gemini" element={<PrivateRoute><Gemini /></PrivateRoute>} />
      <Route path="/questions-and-answers" element={<PrivateRoute><QuestionAnswer /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
