import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "DELETE",
      });
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        page === "Form" ? (
          <QuestionForm setQuestions={setQuestions} />
        ) : (
          <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} />
        )
      )}
    </main>
  );
}

export default App;
