import { ProjectModel } from '../models/ProjectModel.js';
import { ProjectView } from '../views/ProjectView.js';

export class ProjectController {
  static async init() {
    const projetos = await ProjectModel.getAll();
    ProjectView.renderProjects(projetos);

    ProjectView.onFormSubmit(async (data) => {
      await ProjectModel.create(data);
      const atualizados = await ProjectModel.getAll();
      ProjectView.renderProjects(atualizados);
      ProjectView.clearForm();
    });

    ProjectView.onDeleteClick(async (id) => {
      await ProjectModel.delete(id);
      const atualizados = await ProjectModel.getAll();
      ProjectView.renderProjects(atualizados);
    });
  }
}
