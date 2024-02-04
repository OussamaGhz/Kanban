import { useState } from "react";
import Column from "./Column";

const KanbanBoard = () => {
  const [col, setCol] = useState<columns[]>([]);

  const addHandlder = () => {
    setCol([
      ...col,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: `Column  ${col.length + 1}`,
      },
    ]);
  };

  const deleteHandler = (id: id) => {
    console.log(id);

    const newCol = col.filter((element) => element.id !== id);
    setCol(newCol);
  };

  return (
    <div className="m-auto overflow-x-auto overflow-y-hidden min-h-screen max-h-screen w-full items-center flex px-7 ">
      <div className="m-auto flex gap-5 items-end">
        <div className="flex gap-2 text-col-bg">
          {col.map((element) => {
            return <Column column={element} onDelete={deleteHandler} />;
          })}
        </div>
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 "
          type="button"
          onClick={addHandlder}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add columns
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
