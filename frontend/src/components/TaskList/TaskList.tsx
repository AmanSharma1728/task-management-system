import React from 'react';
import styles from './TaskList.module.scss';
import type { Task } from '../../api';
import { TaskItem } from '../TaskItem/TaskItem';
import { ClipboardList } from 'lucide-react';

interface Props {
  tasks: Task[];
  onComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export const TaskList: React.FC<Props> = ({ tasks, onComplete, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className={`${styles.emptyState} glass-panel`}>
        <ClipboardList size={48} style={{ color: 'var(--text-secondary)' }} />
        <h3>No tasks found</h3>
        <p>You're all caught up! Add a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onComplete={onComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
