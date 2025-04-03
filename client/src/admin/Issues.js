import React, { useState, useEffect } from "react";
import API from "../API";
import Navbaradmin from "../dashbord/Navbaradmin";
import './Allissue.css'
const AdminIssuesDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await API.get("/issue/all-issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbaradmin />
      <div className="main">
        <h1 className="title" >
          Issues Dashboard
        </h1>

        {loading ? (
          <p className="text">
            <b>Loading issues...</b>
          </p>
        ) : issues.length > 0 ? (
          <div className="table1">
            <table className="issues-table">
              <thead>
                <tr>
                
                  <th>Issue Title</th>
                  <th>Reported By</th>
                  <th>Description</th>
                  <th>Reported On</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, index) => (
                  <tr key={issue._id}>
                    
                    <td>{issue.issueTitle}</td>
                    <td>{issue.user}</td>
                    <td>{issue.issueDiscription}</td>
                    <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-issue-data">No issues reported.</p>
        )}
      </div>
    </div>
  );
};

export default AdminIssuesDashboard;
