import React, { useState, useEffect } from "react";

const quizQuestions = [
  {
    question: "What is the capital of India?",
    options: ["Berlin", "Delhi", "Paris", "Rome"],
    answer: "Delhi",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Which month has 28 days?",
    options: ["January", "February", "March", "May"],
    answer: "February",
  },
];

function QuizBoard() {
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
  }, [progress, currentQuestionIndex]);

  const handleAnswerSelection = (option) => {
    setShowScore(false);
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    // setShowScore(true);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer("");
    setShowScore(false);
  };

  // const handleNextQuestion = () => {
  //   setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   setSelectedAnswer("");
  //   setShowScore(false);
  // };

  return (
    <>
      <div className="flex flex-col items-center pt-0  h-screen ">
        <progress
          className="w-full h-3 rounded-l-lg rounded-r-lg "
          value={progress}
          max="100"
        ></progress>

        <h1 className="text-[#352F44] text-3xl text-center font-semibold">
          Sample Quiz
        </h1>

        <div className="flex flex-col max-h-80 w-7/12 border-2 p-4 rounded-lg mt-4 gap-y-2 border-[#B9B4C7] bg-[#FAF0E6] ">
          {currentQuestionIndex < quizQuestions.length ? (
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-[#352F44] text-lg">
                  Question {currentQuestionIndex + 1}
                </h2>
                <h2 className="text-[#352F44] text-lg">
                  {`${currentQuestionIndex + 1}/${quizQuestions.length}`}
                </h2>
              </div>

              <p className="text-[#352F44]">{currentQuestion.question}</p>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li key={index}>
                    <div className="flex flex-row gap-x-3 items-center">
                      <input
                        type="radio"
                        name="answer"
                        id={`option${index}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => handleAnswerSelection(option)}
                        className="appearance-none h-4 w-4 border border-[#B9B4C7] rounded-full checked:bg-[#5C5470] checked:border-transparent"
                      />
                      <label
                        htmlFor={`option${index}`}
                        className="text-[#352F44]"
                      >
                        {option}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              {showScore && (
                <p
                  className={`${
                    selectedAnswer === currentQuestion.answer
                      ? "text-green-900"
                      : "text-red-900"
                  } text-lg`}
                >
                  {selectedAnswer === currentQuestion.answer
                    ? "Correct!"
                    : "Incorrect."}
                </p>
              )}
            </div>
          ) : (
            <div className="text-[#352F44]">
              <h2>Quiz Completed</h2>
              <p>
                Your Score: {score} out of {quizQuestions.length}
              </p>
            </div>
          )}

          {currentQuestionIndex < quizQuestions.length && (
            <div className="flex flex-row justify-end gap-4">
              <button
                className="p-2 h-10 text-center rounded-md text-[#FAF0E6] bg-[#5C5470] "
                onClick={handleSubmitAnswer}
              >
                Submit
              </button>

              {/* <button
                className="p-2 h-10 text-center rounded-md text-[#FAF0E6] bg-[#5C5470] "
                onClick={handleNextQuestion}
              >
                Next Question
              </button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizBoard;
