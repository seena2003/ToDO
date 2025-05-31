import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { EditIcon, TrashIcon, ChevronDownIcon } from './Icons';
import PriorityBadge from './PriorityBadge';
import DueDateBadge from './DueDateBadge';
import { STATUS_COLUMNS, STATUS_COLUMN_NAMES } from '../constants';


interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 group transition-shadow duration-200 ease-in-out">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 break-words mr-2">{task.title}</h3>
        <div className="flex-shrink-0 space-x-2">
          <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-indigo-600 transition-colors" title="Edit Task" aria-label={`Edit task ${task.title}`}>
            <EditIcon />
          </button>
          <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-red-600 transition-colors" title="Delete Task" aria-label={`Delete task ${task.title}`}>
            <TrashIcon />
          </button>
        </div>
      </div>

      {task.description && (
        <div className="mb-3">
          <p className={`text-sm text-gray-600 break-words ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
            {task.description}
          </p>
          {task.description.length > 100 && ( 
             <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                aria-expanded={isDescriptionExpanded}
             >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
             </button>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 items-center mb-3">
        <PriorityBadge priority={task.priority} />
        {task.dueDate && <DueDateBadge task={task} />}
      </div>

      <div>
        <label htmlFor={`status-select-${task.id}`} className="sr-only">Change Status for task {task.title}</label>
        <div className="relative">
          <select
            id={`status-select-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            className="appearance-none w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 py-1.5 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm transition-colors"
          >
            {STATUS_COLUMNS.map(s => (
              <option key={s} value={s}>{STATUS_COLUMN_NAMES[s]}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon className="w-4 h-4"/>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Created: {new Date(task.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </p>
    </div>
  );
};

export default TaskCard;