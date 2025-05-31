import { TaskStatus, TaskPriority, Task } from './types';

export const APP_TITLE = 'Simple Task Board';

export const STATUS_COLUMNS: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
];

export const STATUS_COLUMN_NAMES: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.DONE]: 'Done',
};

export const STATUS_COLUMN_STYLES: Record<TaskStatus, { borderClass: string; titleClass: string }> = {
  [TaskStatus.TODO]: { borderClass: 'border-t-4 border-blue-500', titleClass: 'text-blue-600 font-semibold' },
  [TaskStatus.IN_PROGRESS]: { borderClass: 'border-t-4 border-yellow-500', titleClass: 'text-yellow-600 font-semibold' },
  [TaskStatus.DONE]: { borderClass: 'border-t-4 border-green-500', titleClass: 'text-green-600 font-semibold' },
};

export const PRIORITIES: TaskPriority[] = [
  TaskPriority.LOW,
  TaskPriority.MEDIUM,
  TaskPriority.HIGH,
];

export const PRIORITY_STYLES: Record<TaskPriority, { name: string; badgeClass: string; iconClass: string }> = {
  [TaskPriority.LOW]: { name: 'Low', badgeClass: 'bg-green-100 text-green-700', iconClass: 'text-green-500' },
  [TaskPriority.MEDIUM]: { name: 'Medium', badgeClass: 'bg-yellow-100 text-yellow-700', iconClass: 'text-yellow-500' },
  [TaskPriority.HIGH]: { name: 'High', badgeClass: 'bg-red-100 text-red-700', iconClass: 'text-red-500' },
};

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.status === TaskStatus.DONE) {
    return false;
  }
  // Create a date object for 'today' at midnight in the local timezone
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Create a date object for the due date at midnight in the local timezone
  // task.dueDate is 'YYYY-MM-DD'. Splitting and using new Date(Y, M, D) treats it as local.
  const parts = task.dueDate.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
  const day = parseInt(parts[2], 10);
  const dueDate = new Date(year, month, day);
  dueDate.setHours(0,0,0,0); // Ensure it's at the start of the day for comparison
  
  return dueDate.getTime() < today.getTime();
};