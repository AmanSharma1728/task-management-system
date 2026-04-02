import React, { useState } from 'react';
import styles from './TaskForm.module.scss';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: (title: string, description: string) => Promise<void>;
}

export const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await onAdd(title, description);
      setTitle('');
      setDescription('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.formContainer} glass-panel`} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!title.trim() || loading} className={styles.submitBtn}>
        <Plus size={20} />
        <span>Add Task</span>
      </button>
    </form>
  );
};
