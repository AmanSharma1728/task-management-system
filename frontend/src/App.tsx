import  { useEffect, useState } from 'react';
import './styles/main.scss';
import { DashboardStats } from './components/DashboardStats/DashboardStats';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import type { Task, TaskStats } from './api';
import { getTasks, getTaskStats, createTask, updateTask, completeTask, deleteTask } from './api';
import { Layout } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAppData = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([getTasks(), getTaskStats()]);
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to load application data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  const handleAddTask = async (title: string, description: string) => {
    await createTask({ title, description });
    await fetchAppData();
  };

  const handleUpdateTask = async (id: string, title: string, description: string) => {
    await updateTask(id, { title, description });
    await fetchAppData();
  };

  const handleCompleteTask = async (id: string) => {
    await completeTask(id);
    await fetchAppData();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    await fetchAppData();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <Layout size={32} style={{ color: 'var(--accent-color)' }} />
        <h1>Task Master</h1>
      </header>

      <main>
        <DashboardStats stats={stats} />
        <TaskForm onAdd={handleAddTask} />
        <TaskList 
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
