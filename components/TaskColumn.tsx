import React from 'react';
import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import { STATUS_COLUMN_NAMES, STATUS_COLUMN_STYLES } from '../constants';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onEditTask, onDeleteTask, onUpdateTaskStatus }) => {
  const columnTitle = STATUS_COLUMN_NAMES[status];
  const columnStyle = STATUS_COLUMN_STYLES[status];

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg flex flex-col max-h-[calc(100vh-10rem)] w-full md:w-1/3">
      <div className={`px-4 py-3 bg-white rounded-t-lg ${columnStyle.borderClass}`}>
        <h2 className={`text-xl text-center ${columnStyle.titleClass}`}>
          {columnTitle} ({tasks.length})
        </h2>
      </div>
      <div className="overflow-y-auto flex-grow p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-50">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-10">No tasks here.</p>
        )}
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEditTask} 
            onDelete={onDeleteTask}
            onStatusChange={onUpdateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;