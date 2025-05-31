import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';
import { PRIORITIES, STATUS_COLUMNS, STATUS_COLUMN_NAMES } from '../constants';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
      setTitleError('');
    } else {
      // Reset for new task
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.TODO);
      setPriority(TaskPriority.MEDIUM);
      setDueDate('');
      setTitleError('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Title is required.');
      return;
    }
    setTitleError('');
    onSubmit({
      title: title.trim(),
      description: description.trim() === '' ? undefined : description.trim(),
      status,
      priority,
      dueDate: dueDate === '' ? undefined : dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setTitleError('');
          }}
          className={`w-full px-3 py-2 border ${titleError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm`}
          aria-required="true"
          aria-invalid={!!titleError}
          aria-describedby={titleError ? "title-error" : undefined}
        />
        {titleError && <p id="title-error" className="text-xs text-red-500 mt-1">{titleError}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
          >
            {STATUS_COLUMNS.map(s => (
              <option key={s} value={s}>{STATUS_COLUMN_NAMES[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
          >
            {PRIORITIES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 border border-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {task ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;