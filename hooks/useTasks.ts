
import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

const LOCAL_STORAGE_KEY = 'simpleTaskBoardTasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'status'> & { status?: TaskStatus }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      status: taskData.status || TaskStatus.TODO, // Default status
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const updateTask = useCallback((taskId: string, updatedData: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const getTaskById = useCallback((taskId: string): Task | undefined => {
    return tasks.find(task => task.id === taskId);
  }, [tasks]);

  return { tasks, addTask, updateTask, deleteTask, getTaskById };
};
