import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AddTaskFormProps {
    onAddTask: (name: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
    const [name, setName] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (name.trim() === '') {
            alert('Please enter a task name');
            return;
        }
        onAddTask(name);
        setName('');
    };

    return (
        <div>
            <h3>Add new task</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name of task"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddTaskForm;
