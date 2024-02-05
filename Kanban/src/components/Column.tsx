import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/plusIcon";
import Task from "./Task";
import DeleteIcon from "../icons/DeleteIcon";

const Column: React.FC<{
  element: columns;
  onDelete: (id: id) => void;
  updateColumn: (id: id, title: string) => void;
  createTask: (id: id) => void;
  tasks: task[];
  onDeleteTask: (id: id) => void;
}> = (props) => {
  const deleteHandler = (id: id, event: React.MouseEvent) => {
    event.stopPropagation();
    props.onDelete(id);
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<task[]>([]);

  useEffect(() => {
    const updatedTasks = props.tasks.filter(
      (task) => task.colId === props.element.id
    );
    setTasks(updatedTasks);
  }, [props.tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.element.id,
    data: {
      type: "column",
      column: props.element,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInput(input);
  };

  const submitHandler = () => {
    props.updateColumn(props.element.id, input);
  };

  const createTaskHandler = (id: id) => {
    props.createTask(id);
  };

  const taskDeleteHadnler = (id: id) => {
    props.onDeleteTask(id);
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        key={props.element.id}
        className="bg-col-bg w-80 h-[400px] max-h-[500px] rounded-lg flex flex-col gap-2 text-white p-2 opacity-45 border-second-color border-2"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={props.element.id}
      className="bg-col-bg w-full sm:w-80 h-[400px] max-h-[500px] rounded-lg flex flex-col justify-between gap-2 text-white p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] shadow-col-bg"
    >
      <div>
        <div
          className="flex rounded-lg bg-second-color px-4 py-2 justify-between"
          {...attributes}
          {...listeners}
          onClick={() => setEdit(true)}
        >
          <div className="flex gap-3 font-bold">
            <div>{props.element.id}</div>
            {!edit && <div>{props.element.title}</div>}
            {edit && (
              <div className="flex mr-2">
                <input
                  value={input}
                  placeholder={props.element.title}
                  onBlur={() => {
                    submitHandler();
                    setEdit(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEdit(false);
                      submitHandler();
                    }
                  }}
                  autoFocus
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="bg-transparent border-none text-white font-bold w-full outline-none"
                />
                <button
                  className="opacity-75 hover:opacity-100 rounded-full px-2"
                  onClick={() => submitHandler()}
                >
                  submit
                </button>
              </div>
            )}
          </div>
          <button
            onClick={(event: React.MouseEvent) =>
              deleteHandler(props.element.id, event)
            }
            className="opacity-80 hover:opacity-100"
          >
            <DeleteIcon />
          </button>
        </div>
        <div className="flex rounded-lg py-2 flex-col flex-grow gap-4 overflow-y-auto max-h-[280px]">
          {tasks.map((task) => (
            <Task task={task} onDelete={taskDeleteHadnler} />
          ))}
        </div>
      </div>
      <div
        className="flex rounded-lg px-3 py-2 gap-2 hover:bg-second-color transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => createTaskHandler(props.element.id)}
      >
        <button className="rounded-full  flex gap-2 px-2 py-1 ">
          <PlusIcon />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
