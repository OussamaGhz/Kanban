import React, { KeyboardEvent, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

const Task: React.FC<{
  task: task;
  onDelete: (id: id) => void;
  onUpdateTask: (id: id, newTitle: string) => void;
}> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [mouseState, setMouseState] = useState<boolean>(false);
  const [input, setInput] = useState<string>(props.task.title);

  const clickHandler = (id: id) => {
    props.onDelete(id);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInput(input);
  };

  const submitHandler = () => {    
    props.onUpdateTask(props.task.taskId, input);
    setEditMode(false);
  };

  return (
    <div
      key={props.task.taskId}
      className={`bg-tasks-bg w-full p-4 py-2 rounded-lg flex justify-between min-h-[80px] opacity-85 hover:opacity-100`}
      onMouseOver={() => setMouseState(true)}
      onMouseLeave={() => setMouseState(false)}
      onClick={() => setEditMode(true)}
      onBlur={() => setEditMode(false)}
    >
      <div className="flex items-center">
        {!editMode ? (
          <h1 className="text-xl font-bold">{props.task.title}</h1>
        ) : (
          <div className="flex justify-between mr-3">
            <input
              placeholder={props.task.title}
              autoFocus
              value={input}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="bg-transparent outline-none font-bold text-xl w-2/3"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  submitHandler();
                }
              }}
            />
            <button
              className="font-bold opacity-60 hover:opacity-100"
              onMouseDown={submitHandler}
            >
              submit
            </button>
          </div>
        )}
      </div>
      {mouseState && (
        <div className="flex flex-col justify-center gap-2">
          <button
            className="opacity-75 hover:opacity-100"
            onClick={() => clickHandler(props.task.taskId)}
          >
            <DeleteIcon />
          </button>
          {!editMode && (
            <button
              className="opacity-75 hover:opacity-100"
              onClick={() => setEditMode(true)}
            >
              <EditIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
