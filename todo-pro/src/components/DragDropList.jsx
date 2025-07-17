import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
 
import TodoItem from "./TodoItem";

const SortableItem = ({ id, editTask, deleteTask, handleIsDone }) => {
  const { attributes, listeners, setNodeRef } =
    useSortable({ id });  
  return (
    <div
      ref={setNodeRef} 
      {...attributes} 
    >
      <TodoItem task={id} editTask={editTask}  deleteTask={deleteTask} handleIsDone={handleIsDone} dragListeners={listeners} />
    </div>
  );
};

const DragDropList = ({ items, setItems, editTask, deleteTask, handleIsDone }) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <SortableItem
            key={`${item}-${index}`}
            id={item}
            editTask={editTask}
            deleteTask={deleteTask}
            handleIsDone={handleIsDone}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragDropList;
