import React, { KeyboardEvent, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const editClickHandler = () => {
    if (input === "New Task") {
      setInput("");
    }
  };

  // DND logique
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id: props.task.taskId,
    data: {
      type: "task",
      task: props.task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        key={props.task.taskId}
        className={
          "bg-tasks-bg w-full p-4 py-2 rounded-lg flex justify-between min-h-[80px] hover:opacity-100 opacity-65 border-second-color border-2"
        }
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={props.task.taskId}
      className={`bg-tasks-bg w-full p-4 py-2 rounded-lg flex justify-between min-h-[80px] opacity-85 hover:opacity-100`}
      onMouseOver={() => setMouseState(true)}
      onMouseLeave={() => setMouseState(false)}
      autoFocus
      onClick={() => {
        setEditMode(true);
      }}
      onBlur={() => setEditMode(false)}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center">
        {!editMode ? (
          <h1 className="text-xl font-bold" onClick={() => setEditMode(true)}>
            {props.task.title}
          </h1>
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
      {mouseState && !editMode && (
        <div className="flex flex-col justify-center gap-2">
          <button
            className="opacity-75 hover:opacity-100"
            onClick={() => clickHandler(props.task.taskId)}
          >
            <DeleteIcon />
          </button>

          <button
            className="opacity-75 hover:opacity-100"
            onClick={() => editClickHandler}
          >
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
