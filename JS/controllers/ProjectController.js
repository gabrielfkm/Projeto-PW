import { ProjectModel } from '../models/ProjectModel.js';
import { ProjectView } from '../views/ProjectView.js';

export const ProjectController = {
  async init() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return window.location.href = '../pages/login.html';

    const projects = await ProjectModel.getByUserId(user.id);
    ProjectView.renderProjects(projects);
  },

  async create(formData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const newProject = { ...formData, userId: user.id };
    await ProjectModel.create(newProject);
    ProjectView.showCreateSuccess();
    this.init(); // Recarrega lista
  }
};
