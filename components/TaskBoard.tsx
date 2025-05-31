
import React from 'react';
import { Task, TaskStatus } from '../types';
import { STATUS_COLUMNS } from '../constants';
import TaskColumn from './TaskColumn';

interface TaskBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onEditTask, onDeleteTask, onUpdateTaskStatus }) => {
  const tasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by creation date, newest first
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {STATUS_COLUMNS.map(status => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus(status)}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onUpdateTaskStatus={onUpdateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
