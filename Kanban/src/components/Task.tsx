import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

const Task: React.FC<{ task: task }> = (props) => {
  return (
    <div
      key={props.task.taskId}
      className="bg-main-bg w-full p-4 py-2 rounded-lg flex justify-between"
    >
      <div className="flex items-center">
        <h1 className="text-xl font-bold">{props.task.title}</h1>
      </div>
      <div className="flex flex-col justify-between">
        <button className="opacity-75 hover:opacity-100">
          <DeleteIcon />
        </button>
        <button className="opacity-75 hover:opacity-100">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

export default Task;
