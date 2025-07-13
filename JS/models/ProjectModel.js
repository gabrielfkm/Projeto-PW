import { ProjectService } from '../services/projectService.js';

export const ProjectModel = {
  async getAll() {
    return await ProjectService.getAll();
  },

  async getByUserId(userId) {
    const all = await ProjectService.getAll();
    return all.filter(p => p.userId === userId);
  },

  async create(project) {
    return await ProjectService.create(project);
  }
};
