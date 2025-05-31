
import React from 'react';
import { Task } from '../types';
import { isTaskOverdue } from '../constants';
import { CalendarIcon, WarningIcon } from './Icons';

interface DueDateBadgeProps {
  task: Task;
}

const DueDateBadge: React.FC<DueDateBadgeProps> = ({ task }) => {
  if (!task.dueDate) return null;

  const overdue = isTaskOverdue(task);
  
  // Parse the YYYY-MM-DD date string as local date.
  // Adding 'T00:00:00' makes it interpret the date in the local timezone.
  // If new Date('YYYY-MM-DD') is used directly, it might be parsed as UTC midnight, 
  // leading to off-by-one day errors depending on the user's timezone.
  const dateParts = task.dueDate.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) -1; // JavaScript months are 0-indexed
  const day = parseInt(dateParts[2], 10);
  const localDate = new Date(year, month, day);

  const formattedDate = localDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });


  return (
    <div className={`inline-flex items-center text-xs font-medium ${overdue ? 'text-red-600' : 'text-gray-600'}`}>
      <CalendarIcon className={`w-3.5 h-3.5 mr-1 ${overdue ? 'text-red-500' : 'text-gray-500'}`} />
      <span>{formattedDate}</span>
      {overdue && (
        <WarningIcon className="w-3.5 h-3.5 ml-1 text-red-500" title="This task is overdue!" />
      )}
    </div>
  );
};

export default DueDateBadge;
