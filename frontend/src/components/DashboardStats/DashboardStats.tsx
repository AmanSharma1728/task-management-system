import React from 'react';
import styles from './DashboardStats.module.scss';
import type { TaskStats } from '../../api';
import { ListTodo, CheckCircle2, CircleDashed } from 'lucide-react';

interface Props {
  stats: TaskStats | null;
}

export const DashboardStats: React.FC<Props> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className={styles.statsContainer}>
      <div className={`${styles.statCard} glass-panel`}>
        <div className={styles.iconContainer} style={{ color: 'var(--accent-color)' }}>
          <ListTodo size={24} />
        </div>
        <div className={styles.statInfo}>
          <p>Total Tasks</p>
          <h3>{stats.total}</h3>
        </div>
      </div>

      <div className={`${styles.statCard} glass-panel`}>
        <div className={styles.iconContainer} style={{ color: 'var(--success-color)' }}>
          <CheckCircle2 size={24} />
        </div>
        <div className={styles.statInfo}>
          <p>Completed</p>
          <h3>{stats.completed}</h3>
        </div>
      </div>

      <div className={`${styles.statCard} glass-panel`}>
        <div className={styles.iconContainer} style={{ color: 'var(--text-secondary)' }}>
          <CircleDashed size={24} />
        </div>
        <div className={styles.statInfo}>
          <p>Pending</p>
          <h3>{stats.pending}</h3>
        </div>
      </div>
    </div>
  );
};
