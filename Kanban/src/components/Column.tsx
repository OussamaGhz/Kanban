import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column: React.FC<{ element: columns; onDelete: (id: id) => void }> = (
  props
) => {
  const deleteHandler = (id: id, event: React.MouseEvent) => {
    event.stopPropagation();
    props.onDelete(id);
  };

  const [column, setColumn] = useState<columns>(props.element);
  const [edit, setEdit] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  // pick the dragable item and use useSortable hook and import styles and the properties
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column: column,
    },
  });

  // setting the styles
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // if the item is dragging return a clone of the dragable item to simulate the drag
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    console.log(input);

    setInput(input);
  };

  const submitHandler = () => {
    setColumn((previousState) => {
      return { ...previousState, title: input };
    });
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        key={column.id}
        className="bg-col-bg w-80 h-[400px] max-h-[500px] rounded-lg flex flex-col gap-2 text-white p-2 opacity-45 border-second-color border-2"
      ></div>
    );
  }

  return (
    // setting the ref to the node and the style for the dragable item
    <div
      ref={setNodeRef}
      style={style}
      key={column.id}
      className="bg-col-bg w-80 h-[400px] max-h-[500px] rounded-lg flex flex-col gap-2 text-white p-2"
    >
      {/* adiing the attributes and the listerners from the hook*/}
      <div
        className="flex rounded-lg bg-second-color px-4 py-2 justify-between"
        {...attributes}
        {...listeners}
        onClick={() => setEdit(true)}
      >
        <div className="flex gap-3 font-bold">
          <div>0</div>
          {!edit && <div>{column.title}</div>}
          {edit && (
            <div className="flex mr-2">
              <input
                value={input}
                placeholder={column.title}
                onBlur={() => {
                  submitHandler;
                  setEdit(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEdit(false);
                    submitHandler();
                  } else {
                    return;
                  }
                }}
                autoFocus
                onChange={(e) => {
                  changeHandler(e);
                }}
                onSubmit={submitHandler}
                className="bg-transparent border-none text-white font-bold w-full outline-none"
              />
              <button
                className="opacity-75 hover:opacity-100 rounded-full px-2"
                onClick={submitHandler}
              >
                submit
              </button>
            </div>
          )}
        </div>
        <button
          onClick={(event: React.MouseEvent) => deleteHandler(column.id, event)}
          className="opacity-80 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox=" 0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div className="flex rounded-lg px-4 py-2 justify-between">content</div>
      <div className="flex rounded-lg px-4 py-2 justify-between">footer</div>
    </div>
  );
};

export default Column;
