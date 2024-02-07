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
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [col, setCol] = useState<columns[]>([
    {
      id: "1",
      title: "To-Do",
    },
    {
      id: "2",
      title: "In Progress",
    },
    {
      id: "3",
      title: "Completed",
    },
  ]);
  const [activeCol, setActiveCol] = useState<columns | null>(null);
  const [tasks, setTasks] = useState<task[]>([]);

  const addHandlder = () => {
    setCol([
      ...col,
      {
        id: col.length + 1,
        title: `Column  ${col.length + 1}`,
      },
    ]);
  };

  const deleteHandler = (id: id) => {
    const newCol = col.filter((element) => element.id !== id);
    setCol(newCol);
  };

  const createTask = (id: id) => {
    const newTask: task = {
      colId: id,
      taskId: Math.random().toString(),
      title: "New Task",
    };

    const updatedTasks = tasks.concat([newTask]);
    setTasks(updatedTasks);
  };

  const deleteTaskHandler = (id: id) => {
    const updatedTasks = tasks.filter((task) => task.taskId !== id);
    setTasks(updatedTasks);
  };

  const updateTaskHandler = (id: id, newTitle: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.taskId !== id) {
        return task;
      } else {
        return { ...task, title: newTitle };
      }
    });
    setTasks(updatedTasks);
  };

  // DND logique
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
    if (!over) {
      return;
    }
    const activeColumn = active.id;
    const overColumn = over.id;
    if (activeColumn === overColumn) {
      return;
    }

    setCol((col) => {
      const activeIndex = col.findIndex((c) => c.id === activeColumn);
      const overIndex = col.findIndex((c) => c.id === overColumn);
      return arrayMove(col, activeIndex, overIndex);
    });
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

  const updateColumn = (id: id, title: string) => {
    setCol((cols) =>
      cols.map((item) => (item.id === id ? { ...item, title } : item))
    );
  };

  return (
    // setting the context provider for the dnd

    <div className="m-auto overflow-x-auto overflow-y-auto sm:overflow-y-hidden min-h-screen max-h-screen w-full items-center flex px-7 ">
      <DndContext
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        sensors={sensors}
      >
        <div className="m-auto flex sm:flex-row flex-col gap-5 items-start">
          {/* setting the sortable context */}
          <SortableContext items={columnsId}>
            <div className="flex gap-2 text-col-bg sm:flex-row flex-col">
              {col.map((element) => {
                return (
                  <Column
                    element={element}
                    onDelete={deleteHandler}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter((task) => task.colId === element.id)}
                    onDeleteTask={deleteTaskHandler}
                    onUpdateTask={(id: id, newTitle: string) =>
                      updateTaskHandler(id, newTitle)
                    }
                  />
                );
              })}
            </div>
          </SortableContext>

          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-second-color text-white hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] hover:shadow-second-color flex items-center gap-3 "
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
                <Column
                  element={activeCol}
                  onDelete={deleteHandler}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.colId === activeCol.id)}
                  onDeleteTask={deleteTaskHandler}
                  onUpdateTask={updateTaskHandler}
                />
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
