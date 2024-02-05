import React from "react";

const Task: React.FC<{ task: task }> = (props) => {
  return (
    <div key={props.task.taskId} className="bg-main-bg w-full p-4 py-2 rounded-lg">
      <h1 className="text-xl font-bold">{props.task.title}</h1>
      <p>{props.task.descreption}</p>
    </div>
  );
};

export default Task;
