// TaskList.js

import React, { useState, useCallback, useEffect } from 'react';
import TodoList from '../TodoList/todoList';
import { getAllDataApi, addTaskApi, deleteTaskApi, editTaskApi } from '../../apis/crud';
import { Tasks } from '../../types/task';
import AddTaskForm from '../Forms/addForm';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [editingTask, setEditingTask] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = process.env.ITEMS_PER_PAGE ? parseInt(process.env.ITEMS_PER_PAGE) : 10;
     const getAllData = useCallback(async (page: number, itemsPerPage: number) => {
        try {
            const data = await getAllDataApi(page, itemsPerPage);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    }, [itemsPerPage]);

    useEffect(() => {
        getAllData(currentPage, itemsPerPage);
    }, [getAllData, currentPage]);

    // Xử lý việc chuyển trang
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const addTask = useCallback(async (name: string) => {
        try {
            await addTaskApi(name);
            await getAllData(currentPage, itemsPerPage);
        } catch (error) {
            console.log(error);
        }
    }, [getAllData, currentPage]);

    const deleteTask = useCallback(async (taskId: string) => {
        try {
            await deleteTaskApi(taskId);
            await getAllData(currentPage, itemsPerPage);
        } catch (error) {
            console.log(error);
        }
    }, [getAllData, currentPage]);

    const editTask = useCallback(
        async (taskId: string, newName: string, newStatus: string) => {
            try {
                await editTaskApi(taskId, newName, newStatus);
                await getAllData(currentPage, itemsPerPage);
                setEditingTask(null);
            } catch (error) {
                console.log(error);
            }
        },
        [getAllData, currentPage]
    );

    const startEditingTask = (taskId: string) => {
        setEditingTask(taskId);
    };

    const cancelEditingTask = () => {
        setEditingTask(null);
    };

    return (
        <div className="container">
            {/* ... */}
            <h2>List Task</h2>
            <AddTaskForm onAddTask={addTask} />
            <br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <TodoList
                            key={index}
                            task={task}
                            index={index + 1}
                            onDelete={deleteTask}
                            onEdit={editTask}
                            isEditing={editingTask === task._id}
                            onStartEditing={startEditingTask}
                            onCancelEditing={cancelEditingTask}
                        />
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default TaskList;
