import { TaskService } from '../services/taskService.js';

export const TaskModel = {
  async getAll() {
    return await TaskService.getAll();
  },

  async getByProjectId(projectId) {
    const tasks = await TaskService.getAll();
    return tasks.filter(task => task.projectId === projectId);
  },

  async create(task) {
    return await TaskService.create(task);
  }
};
