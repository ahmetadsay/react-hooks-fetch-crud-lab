import React, { useState } from "react";

function QuestionForm({ setQuestions }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleChangePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleChangeAnswer = (e, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleChangeCorrectAnswer = (e) => {
    setCorrectIndex(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          answers,
          correctIndex,
        }),
      });
      const data = await response.json();

      setQuestions((prevQuestions) => [...prevQuestions, data]);

      setPrompt("");
      setAnswers(["", "", "", ""]);
      setCorrectIndex(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Create New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={handleChangePrompt} />
        </label>
        <br />
        {answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => handleChangeAnswer(e, index)}
            />
          </label>
        ))}
        <br />
        <label>
          Correct Answer:
          <select value={correctIndex} onChange={handleChangeCorrectAnswer}>
            {answers.map((_, index) => (
              <option key={index} value={index}>
                Choice {index + 1}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default QuestionForm;
