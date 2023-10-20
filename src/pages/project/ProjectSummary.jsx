import React from "react";
import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hook/useFirestore";
import { useAuthContext } from "../../hook/useAuthContext";
import { useHistory } from "react-router-dom";

const ProjectSummary = ({ project }) => {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  const handleClick = (e) => {
    deleteDocument(project.id);
    history.push("/");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date"></p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((assignedUser) => (
            <div key={assignedUser.id}>
              <Avatar src={assignedUser.photoURL} />
            </div>
          ))}
        </div>
        {/* allow to delete only who has project created */}
        {user.uid === project.createdBy.id && (
          <button className="btn" onClick={handleClick}>
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectSummary;
