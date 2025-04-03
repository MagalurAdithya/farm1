import Investornavbar from '../dashbord/Investornavbar';
import React, { useState } from 'react';
import API from '../API';
import { toast } from 'react-toastify';
import './Investerissue.css'

function Investorissue() {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDiscription, setIssueDiscription] = useState("");

  const issuehandle = (e) => {
    setIssueTitle(e.target.value);
  };

  const discriptionhandle = (e) => {
    setIssueDiscription(e.target.value);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/issue/add-issue", { issueTitle, issueDiscription });
      console.log(data);
      toast.success("Issue posted successfully");
    } catch {
      toast.error("Error in posting");
    }
  };

  return (
    <div >
      <Investornavbar />
      <div >
        <form onSubmit={save} className="form1">
          <h2 className="para22">Report an Issue</h2>
          <div className="div7">
            <label >Issue Title</label>
            <input
              type="text"
              placeholder="Title of the issue"
              value={issueTitle}
              onChange={issuehandle}
              className="form-input"
              required
            />
          </div>
          <div className="div7">
            <label className="form-label">Issue Description</label>
            <textarea
              placeholder="Describe the issue"
              value={issueDiscription}
              onChange={discriptionhandle}
              className="form-textarea"
              required
            />
          </div>
          <div >
            <button type="submit" className="button3">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Investorissue;
