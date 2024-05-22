import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ClassCodePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const classCode = router.query.classCode;
  const [questions, setQuestions] = useState([]);
  const [classCodeExists, setClassCodeExists] = useState(null);

  const fetchClassCodeQuestions = async (c) => {
    const response = await fetch(`/api/class-codes/${c}/question`);
    if (response.ok) {
      const data = await response.json();
      setQuestions(data);
      setClassCodeExists(true);
    } else {
      setClassCodeExists(false);
    }
  };

  useEffect(() => {
    if (classCode) {
      fetchClassCodeQuestions(classCode);
    }
  }, [classCode]); // will run only once when the component loads

  if (classCodeExists === false) {
    return (
      <div>
        <section className="section">
          Class code doesn't exist.
          <Link href="/"> Try another class code.</Link>
        </section>
      </div>
    );
  }

  const onQuestionSubmitted = async (event) => {
    event.preventDefault();
    const Question = event.target.QuestionInput.value;
    const userName = session && session.user.name ? session.user.name : "anon";
    const response = await fetch(`/api/class-codes/${classCode}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: Question,
        name: userName,
      }),
    });
    if (response.ok) {
      await fetchClassCodeQuestions(classCode);
    }
  };

  const onQuestionDeleted = async (question) => {
    const response = await fetch(
      `/api/class-codes/${classCode}/question/${question}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      await fetchClassCodeQuestions(classCode);
    }
  };
  if (session) {
    return (
        <div className="container">
        <section className="section">
          <div className="title">QUESTIONIFY</div>
          <div className="subtitle">Welcome to {classCode}!</div>
          <div className="title is-5">Send A New Question</div>
          <form onSubmit={(event) => onQuestionSubmitted(event)}>
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  name="QuestionInput"
                  placeholder="Question"
                />
              </p>
              <p className="control">
                <button className="button is-primary">Create Question</button>
              </p>
            </div>
          </form>
        </section>
        <section className="section">
          <div className="title is-5">{classCode} Questions</div>
          <div className="content">
            <p>View recently asked questions below...</p>
            <div className="box">
              {questions.length > 0 &&
                questions.map((question, index) => (
                  <article key={index} className="media">
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong> { question.name } </strong>
                          <br />
                          {question.question}
                          <br />
                          <small>Asked {question.id ? new Date(Number(question.id)).toLocaleString() : "No date"}</small>
                        </p>
                      </div>
                    </div>
                    <div className="media-right">
                      <button
                        className="delete"
                        onClick={() => onQuestionDeleted(question.id)}
                      ></button>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      </div>
      
    );
  } else {
    return (
        <div className="container">
        <section className="section">
          <div className="title">QUESTIONIFY</div>
          <div className="subtitle">Welcome to {classCode}!</div>
          <div className="title is-5">Send A New Question</div>
          <form onSubmit={(event) => onQuestionSubmitted(event)}>
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  name="QuestionInput"
                  placeholder="Question"
                />
              </p>
              <p className="control">
                <button className="button is-primary">Create Question</button>
              </p>
            </div>
          </form>
        </section>
        <section className="section">
          <div className="title is-5">{classCode} Questions</div>
          <div className="content">
            <p>View recently asked questions below...</p>
            <div className="box">
              {questions.length > 0 &&
                questions
                .sort((a, b) => b.id - a.id)
                .map((question, index) => (
                  <article key={index} className="media">
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong> { question.name } </strong>
                          <br />
                          {question.question}
                          <br />
                          <small>Asked {question.id ? new Date(Number(question.id)).toLocaleString() : "No date"}</small>
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
