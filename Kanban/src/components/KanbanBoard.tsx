import { useMemo, useState } from "react";
import Column from "./Column";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [col, setCol] = useState<columns[]>([]);
  const [activeCol, setActiveCol] = useState<columns | null>(null);

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

  // creating a list of ids for the SortableContext object
  const columnsId = useMemo(() => {
    return col.map((e) => e.id);
  }, [col]);

  //   lisenting for the drag when its start and setting the dragable column as an active column
  const dragStartHandler = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setActiveCol(event.active.data.current.column);
    }
  };

  //   setting the logique for the dragabale when its end to switch the places between columns
  const dragEndHandler = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const activeIndex = col.findIndex((element) => element.id === active.id);
      const overIndex = col.findIndex((element) => element.id === over?.id);
      const newCol = [...col];
      newCol.splice(activeIndex, 1);
      newCol.splice(overIndex, 0, activeCol as columns);
      setCol(newCol);
    }
  };

  // solving the problem of the delete button (conflict with the drag action and the button action)
  // adding some kind of delay for the drag to avoid the conflict
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    // setting the context provider for the dnd

    <div className="m-auto overflow-x-auto overflow-y-auto sm:overflow-hidden min-h-screen max-h-screen w-full items-center flex px-7 ">
      <DndContext
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        sensors={sensors}
      >
        <div className="m-auto flex sm:flex-row flex-col gap-5 items-end">
          {/* setting the sortable context */}
          <SortableContext items={columnsId}>
            <div className="flex gap-2 text-col-bg sm:flex-row flex-col">
              {col.map((element) => {
                return <Column element={element} onDelete={deleteHandler} />;
              })}
            </div>
          </SortableContext>

          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-col-bg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 "
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
          {createPortal(
            <DragOverlay>
              {activeCol && (
                <Column element={activeCol} onDelete={deleteHandler} />
              )}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
