export const ProjectView = {
  renderProjects(projects) {
    const container = document.getElementById('project-list');
    container.innerHTML = '';

    if (projects.length === 0) {
      container.innerHTML = '<p>Nenhum projeto encontrado.</p>';
      return;
    }

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Prazo:</strong> ${project.deadline}</p>
        <p><strong>Prioridade:</strong> ${project.priority}</p>
      `;
      container.appendChild(card);
    });
  },

  showCreateSuccess() {
    alert("Projeto criado com sucesso!");
  }
};
