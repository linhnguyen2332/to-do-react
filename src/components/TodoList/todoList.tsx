import React, { useEffect, useState } from 'react';
import { Tasks } from '../../types/task';

interface TodoListProps {
  index: number;
  task: Tasks;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newName: string, newStatus: string) => void;
  isEditing: boolean;
  onStartEditing: (taskId: string) => void;
  onCancelEditing: () => void;
}

const TodoList: React.FC<TodoListProps> = ({
  index,
  task,
  onDelete,
  onEdit,
  isEditing,
  onStartEditing,
  onCancelEditing,
}) => {
  const [newName, setNewName] = useState<string>(task.name);
  const [newStatus, setNewStatus] = useState<string>(task.status);
  const handleEdit = () => {
    onEdit(task._id, newName, newStatus);
    onCancelEditing();
  };

  useEffect(() => {
    setNewName(task.name)
  }, [task.name])
  

  return (
    <tr>
      <td>{index}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          task.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        ) : (
          task.status
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleEdit}>
              Save
            </button>
            <button className="btn-cancel" onClick={onCancelEditing}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={() => onStartEditing(task._id)}>
              <i className="fas fa-pen-to-square"></i>
            </button>
            <button className="btn-delete" onClick={() => onDelete(task._id)}>
              <i className="far fa-trash-alt" ></i>
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TodoList;
