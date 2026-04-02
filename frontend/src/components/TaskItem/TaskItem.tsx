import React, { useState } from 'react';
import styles from './TaskItem.module.scss';
import type { Task } from '../../api';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';

interface Props {
  task: Task;
  onComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export const TaskItem: React.FC<Props> = ({ task, onComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    try {
      setLoading(true);
      await onUpdate(task.id, editTitle, editDesc);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (task.completed || loading) return;
    try {
      setLoading(true);
      await onComplete(task.id);
    } catch (error: any) {
      console.error('Complete error:', error);
      alert('Failed to complete task: ' + (error.response?.data?.message || error.message));
    } finally {
      if (!task.completed) {
        setLoading(false);
      }
    }
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditDesc(task.description);
    setIsEditing(false);
  };

  return (
    <div className={`${styles.itemContainer} glass-panel ${task.completed ? styles.completed : ''}`}>
      <div className={styles.statusSection}>
        <button 
          type="button"
          className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
          onClick={handleComplete}
          disabled={task.completed || loading}
        >
          {task.completed && <Check size={16} />}
        </button>
      </div>

      <div className={styles.contentSection}>
        {isEditing ? (
          <div className={styles.editMode}>
            <input 
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className={styles.editInput}
            />
            <input 
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              className={styles.editInput}
              placeholder="Description"
            />
          </div>
        ) : (
          <div>
            <h4 className={styles.title}>{task.title}</h4>
            {task.description && <p className={styles.description}>{task.description}</p>}
          </div>
        )}
      </div>

      <div className={styles.actionSection}>
        {isEditing ? (
          <>
            <button onClick={handleUpdate} disabled={loading} className={styles.actionBtn}>
              <Save size={18} style={{ color: 'var(--success-color)' }} />
            </button>
            <button onClick={cancelEdit} disabled={loading} className={styles.actionBtn}>
              <X size={18} style={{ color: 'var(--text-secondary)' }} />
            </button>
          </>
        ) : (
          <>
            {!task.completed && (
              <button onClick={() => setIsEditing(true)} className={styles.actionBtn}>
                <Edit2 size={18} style={{ color: 'var(--accent-color)' }} />
              </button>
            )}
            <button onClick={() => onDelete(task.id)} disabled={loading} className={styles.actionBtn}>
              <Trash2 size={18} style={{ color: 'var(--danger-color)' }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
