export const TaskView = {
  renderTasks(tasks) {
    const container = document.getElementById('task-list');
    container.innerHTML = '';

    if (tasks.length === 0) {
      container.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
      return;
    }

    tasks.forEach(task => {
      const item = document.createElement('div');
      item.className = 'task-item';
      item.innerHTML = `
        <h4>${task.title}</h4>
        <p>Status: ${task.status}</p>
        <p>Entrega: ${task.dueDate}</p>
      `;
      container.appendChild(item);
    });
  }
};
