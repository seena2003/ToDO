import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import ConfirmationDialog from './components/ConfirmationDialog';
import { useTasks } from './hooks/useTasks';
import { Task, TaskStatus } from './types';

const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, getTaskById } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const handleOpenAddTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskFormSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData as Omit<Task, 'id' | 'createdAt' | 'status'> & { status?: TaskStatus });
    }
    handleCloseTaskModal();
  };

  const handleOpenDeleteModal = (taskId: string) => {
    setDeletingTaskId(taskId);
    setIsConfirmModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsConfirmModalOpen(false);
    setDeletingTaskId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      deleteTask(deletingTaskId);
    }
    handleCloseDeleteModal();
  };

  const handleUpdateTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    const task = getTaskById(taskId);
    if (task) {
      updateTask(taskId, { ...task, status: newStatus });
    }
  }, [getTaskById, updateTask]);


  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header onAddTask={handleOpenAddTaskModal} />
      <main className="flex-grow">
        <TaskBoard 
          tasks={tasks} 
          onEditTask={handleOpenEditTaskModal} 
          onDeleteTask={handleOpenDeleteModal}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
      </main>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskFormSubmit}
          onCancel={handleCloseTaskModal}
        />
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default App;