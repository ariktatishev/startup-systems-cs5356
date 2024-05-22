import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { router } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";

export default function HelpPage() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(
        (question) =>
          question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.answers.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  }, [searchTerm, questions]);

  const fetchQuestions = async () => {
    const response = await fetch("/api/questions");
    const data = await response.json();
    setQuestions(data);
    setFilteredQuestions(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The search functionality is handled by the useEffect hook
  };

  const handleRemoveFilter = () => {
    setSearchTerm("");
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: newQuestion }),
    });
    const data = await response.json();
    setQuestions([...questions, data]);
    setNewQuestion("");
  };

  const handleAddAnswer = async () => {
    const response = await fetch(`/api/questions/${selectedQuestion.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newAnswer }),
    });
    const data = await response.json();
    setQuestions(
      questions.map((q) => (q.id === selectedQuestion.id ? data : q))
    );
    setNewAnswer(""); // Clear the input field after adding the answer
    setSelectedQuestion(null); // Close the pop-up window
  };

  const handleDeleteQuestion = async (questionId) => {
    await fetch(`/api/questions/${questionId}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {/* Start Main Page */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div className="dashboard-h1">Help Center</div>
        {/* Ask Question */}
        <div style={{ marginBottom: "20px" }}>
          <form onSubmit={handleAskQuestion}>
            <label className="label-heading">Ask a Question</label>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter Question Here"
                />
              </div>
              <div className="control">
                <button className="button is-link" style={{ width: "5rem", background: "#1A95EC", fontFamily: "Nunito", fontWeight: "bold", color: "#ffffff" }}>
                  Ask
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Ask Question End */}
        {/* Find Question */}
        <div style={{ marginBottom: "20px" }}>
          <form onSubmit={handleSearch}>
            <label className="label-heading">Find Help on a Topic</label>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter Topic Here"
                />
              </div>
              <div className="control">
                <button className="button is-link" style={{ width: "5rem", background: "#1A95EC", fontFamily: "Nunito", fontWeight: "bold", color: "#ffffff" }}>
                  Search
                </button>
              </div>
            </div>
          </form>
          {searchTerm && (
            <button
              className="button is-link is-light"
              onClick={handleRemoveFilter}
            >
              Remove Filter
            </button>
          )}
        </div>
        {/* Find Question End */}
        {/* Previous Requests Start */}
        <div className="dashboard-h2" style={{ marginTop: "3rem" }}>
          Previous Requests
        </div>
        <div>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th className="th-heading">Question</th>
                <th className="th-heading">Answers</th>
                <th className="th-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question) => (
                <tr key={question.id}>
                  <td className="td-p">{question.question}</td>
                  <td className="td-p">{question.answers}</td>
                  <td>
                    <button
                      className="button-add-answer"
                      style={{ marginBottom: 5 }}
                      onClick={() => {
                        setSelectedQuestion(question);
                        setNewAnswer("");
                      }}
                    >
                      Add Answer
                    </button>
                    <button
                      className="button-help-delete"
                      style={{ marginBottom: 15 }}
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Previous Requests End */}
      </div>
      {/* End Main Page */}
      {selectedQuestion && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Answer</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setSelectedQuestion(null)}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>{selectedQuestion.question}</p>
              <textarea
                className="textarea"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter your answer"
              ></textarea>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleAddAnswer}>
                Submit
              </button>
              <button
                className="button"
                onClick={() => setSelectedQuestion(null)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
