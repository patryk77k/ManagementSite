import React from "react";
//styles
import "./Dashboard.css";
import { useCollection } from "../../hook/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

const Dashboard = () => {
  const { documents, error } = useCollection("projects");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <ProjectFilter />
      {documents && <ProjectList projects={documents} />}
    </div>
  );
};

export default Dashboard;
