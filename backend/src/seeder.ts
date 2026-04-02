import { TaskService } from './application/TaskService';

export const runSeeder = async (taskService: TaskService): Promise<void> => {
  console.log('Seeding initial tasks...');

  // Create 3 sample tasks
  const t1 = await taskService.createTask('1', 'Fix Backend Architecture', 'Ensure Clean Architecture is used.');
  const t2 = await taskService.createTask('2', 'Develop Frontend UI', 'Design the Task List and Forms.');
  const t3 = await taskService.createTask('3', 'Write Tests', 'Automate testing for CI/CD.');
  
  console.log('Created 3 tasks:', [t1.id, t2.id, t3.id]);

  // Update 1 task
  await taskService.updateTask('1', 'Implement Backend Architecture', 'Apply Clean Architecture with SOLID principles');
  console.log('Updated Task 1');

  // Mark 1 task as completed
  await taskService.completeTask('2');
  console.log('Marked Task 2 as completed');

  // Delete 1 task
  await taskService.deleteTask('3');
  console.log('Deleted Task 3');

  console.log('Seeding completed. Initial state ready!');
};
