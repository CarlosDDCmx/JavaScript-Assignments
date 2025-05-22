const tasks = [];
let taskId = 0;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const searchInput = document.getElementById('searchInput');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// Add new task
function addTask(taskText) {
    const task = {
        id: taskId++,
        text: taskText,
        completed: false,
        element: null
    };

    tasks.push(task);
    createTaskElement(task);
    updateTaskCounts();
}

// Create task DOM element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.taskId = task.id;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.checked = task.completed;
    if (task.completed) li.classList.add('completed');

    task.element = li;
    taskList.appendChild(li);
}

// Update task counts
function updateTaskCounts() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
}

// Event Listeners
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    if (!taskText) {
        errorMessage.textContent = 'Please enter a task!';
        errorMessage.style.display = 'block';
        return;
    }
    
    errorMessage.style.display = 'none';
    addTask(taskText);
    taskInput.value = '';
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

taskList.addEventListener('click', (e) => {
    const li = e.target.closest('.task-item');
    if (!li) return;

    const taskId = parseInt(li.dataset.taskId);
    const task = tasks.find(t => t.id === taskId);

    if (e.target.classList.contains('delete-btn')) {
        task.element.remove();
        tasks.splice(tasks.indexOf(task), 1);
        updateTaskCounts();
    }
    else if (e.target.classList.contains('task-checkbox')) {
        task.completed = e.target.checked;
        li.classList.toggle('completed', task.completed);
        updateTaskCounts();
    }
});

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    tasks.forEach(task => {
        const matches = task.text.toLowerCase().includes(searchTerm);
        task.element.style.display = matches ? 'flex' : 'none';
    });
});