// Funções auxiliares para manipular o localStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para renderizar tarefas na página
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = getTasks();
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'flex items-center p-2 bg-gray-100 rounded';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.className = `flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`;
        taskItem.appendChild(taskText);

        // Botão "Editar"
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'px-2 py-1 text-xs text-blue-600 mr-2';
        editButton.addEventListener('click', () => editTask(index));
        taskItem.appendChild(editButton);

        // Botão "Concluir"
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Concluir';
        completeButton.className = 'px-2 py-1 text-xs text-green-600 mr-2';
        completeButton.addEventListener('click', () => toggleCompleteTask(index));
        taskItem.appendChild(completeButton);

        // Botão "Excluir"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'px-2 py-1 text-xs text-red-600';
        deleteButton.addEventListener('click', () => deleteTask(index));
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Função para adicionar nova tarefa
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const newTask = { text: taskInput.value, completed: false };
    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    taskInput.value = '';
    renderTasks();
});

// Função para editar tarefa
function editTask(index) {
    const tasks = getTasks();
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks(tasks);
        renderTasks();
    }
}

// Função para alternar estado de conclusão da tarefa
function toggleCompleteTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

// Função para deletar tarefa
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

// Carrega as tarefas ao iniciar a página
window.onload = renderTasks;
