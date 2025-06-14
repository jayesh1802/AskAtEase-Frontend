import React, { useContext } from "react";
import SpacesToFollow from "./mainpagaright";
import myphoto from "./Assets/myphoto.jpg";
import LeftSection from "../Components/mainleftpart";
import MainHeader from "../Components/MainHeader";
import { QuestionsContext } from "../contexts/QuestionsContext";
import { AuthContext } from "../contexts/AuthContext";
import AddQuestion2 from "./AddQue";

const MainComponent = () => {
  const { questions } = useContext(QuestionsContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <MainHeader />

      {/* Main Content */}
      <div className="flex justify-evenly w-full gap-2 p-2">
        {/* Left Section */}
        <div className="w-1/5 bg-white p-2 rounded-2xl">
          <LeftSection />
        </div>

        {/* Center Section */}
        <div className="w-2/3 bg-slate-200 p-2 rounded-2xl">
          {/* User Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={myphoto}
                alt="User"
                className="h-12 w-12 rounded-full"
              />
              <h3 className="font-semibold">{user?.username || "Anonymous"}</h3>
            </div>

            {/* Question Add Button */}
            <div className="flex-col justify-around items-center mt-4 space-x-4">
              <AddQuestion2 />
            </div>
          </div>

          {/* Questions and Answers Section */}
          <div className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.queId}
                className="bg-white p-6 rounded-lg shadow space-y-3"
              >
                {/* Question Text and User */}
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {question.question}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Asked by: {question.userId || "Anonymous"}
                  </p>
                </div>

                {/* Answer List */}
                <div className="space-y-2">
                  {question.answers && question.answers.length > 0 ? (
                    question.answers.map((answer) => (
                      <div
                        key={answer.ansId}
                        className="bg-gray-100 p-4 rounded-md"
                      >
                        <p className="text-gray-700">{answer.answer}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Answered by: {answer.userId || "Anonymous"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No answers yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-3/10 bg-white p-2 rounded-2xl">
          <SpacesToFollow />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
