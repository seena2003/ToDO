import React from 'react';
import { APP_TITLE } from '../constants';
import { PlusIcon } from './Icons';

interface HeaderProps {
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <header className="bg-slate-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{APP_TITLE}</h1>
        <button
          onClick={onAddTask}
          className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-400"
          aria-label="Add new task"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Task
        </button>
      </div>
    </header>
  );
};

export default Header;