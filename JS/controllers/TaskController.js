import { TaskModel } from '../models/TaskModel.js';
import { TaskView } from '../views/TaskView.js';

export const TaskController = {
  async init(projectId) {
    const tasks = await TaskModel.getByProjectId(projectId);
    TaskView.renderTasks(tasks);
  },

  async create(formData, projectId) {
    await TaskModel.create({ ...formData, projectId });
    this.init(projectId);
  }
};
