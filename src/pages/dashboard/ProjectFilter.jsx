import { useState } from "react";
import React from "react";

const projectList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

const ProjectFilter = () => {
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  console.log(currentFilter.target);

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {projectList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}>
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
