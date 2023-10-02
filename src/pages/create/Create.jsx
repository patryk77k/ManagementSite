import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hook/useCollection";
import { useAuthContext } from "../../hook/useAuthContext";

//styles
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

const Create = () => {
  const { documents } = useCollection("users");
  const [users, setUsers] = useState("");
  const { user } = useAuthContext("");

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("please fill out categories field");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("please add some users");
      return;
    }
    console.log(name, details, dueDate, category.value, assignedUsers);
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((u) => {
        return { value: { ...user, id: user.id }, label: user.displayName };
      });

      setUsers(options);
    }
  }, [documents]);

  const assignedUsersList = assignedUsers.map((u) => {
    return {
      displayName: u.value.displayName,
      photoURL: u.value.photoURL,
      id: u.value.id,
    };
  });

  const createdBy = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    id: user.uid,
  };

  const project = {
    name,
    details,
    category: category.value,
    comments: [],
    createdBy,
    assignedUsersList,
  };

  console.log(project);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(options) => setAssignedUsers(options)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
