import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession(); // to tell whether user signed in
  const [classCodes, setClassCodes] = useState([]);

  const fetchClassCodes = async () => {
    const response = await fetch("/api/class-codes");
    const data = await response.json();
    setClassCodes(data);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);
  // use effect: if any changes to parameter (namely status), triggers useEffect.

  useEffect(() => {
    fetchClassCodes();
  }, []); // will run only once when the component loads

  const onClassCodeSubmitted = async (event) => {
    event.preventDefault();
    const classCode = event.target.classCodeInput.value;
    const response = await fetch("/api/class-codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: classCode }),
    });
    if (response.ok) {
      await fetchClassCodes();
    }
  };

  const onClassCodeDeleted = async (classCodeID) => {
    const response = await fetch(
      `/api/class-codes?classCode=${classCodeID}`,
      {
        method: "DELETE",
      }
    );
    // console.log("ClassCode", classCodeID);
    if (response.ok) {
      await fetchClassCodes();
    }
  };

  return (
    <section className="section">
    <div className="container">
      <h3 className="title is-3">Class Codes</h3>
      <form onSubmit={(event) => onClassCodeSubmitted(event)}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-medium"
              type="text"
              name="classCodeInput"
              placeholder="Enter new class code"
            />
          </div>
          <div className="control">
            <button className="button is-primary is-medium">Create Class Code</button>
          </div>
        </div>
      </form>
      <div className="table-container">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Class Code</th>
              <th>Date created</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {classCodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((classCode, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/app/${classCode.id}`}>{classCode.id}</Link>
                </td>
                <td>
                  {classCode.createdAt ? new Date(classCode.createdAt).toLocaleDateString() : "No date"}
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={() => onClassCodeDeleted(classCode.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  );
}
