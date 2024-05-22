import Link from "next/link";
import { useState } from "react";

const ClassLink = () => {
  const [classCode, setClassCode] = useState("");
  const intro = "Enter class name here, e.g. CS5356";

  return (
    <div>
      <div className="field">
        <div className="control">
          <input
            style={{ width: "35%" }}
            className="input"
            type="text"
            placeholder={intro}
            onChange={(e) => setClassCode(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <Link href={`/app/${classCode}`}>
            {/* CS5356 TODO 1a. Navigation

            Create a new page at /app/[classCode] - this will be a Dynamic Page, 
            where the content of the page will be different based on the
            class code. This will be the page where users can ask questions
            for a given class code.

            This page should include 2 things
            1. A short form at the top of the page with 2 text inputs,
            one for the question itself, and another for an optional
            name, with a button to submit the question. Make a 
            POST /api/class-codes/[classCode]/question request with the data,
            and re-fetch the data on the page to display the latest data.
            2. A list that displays all the questions that have been 
            asked for that class code. When the page first loads, make a 
            GET /api/class-codes/[classCode]/question to get all the 
            questions for the given class code.
             */}
            <button className="button is-primary">Go to App</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassLink;
