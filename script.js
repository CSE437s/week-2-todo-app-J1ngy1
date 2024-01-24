document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://localhost:3000'; // Update with your backend URL
    const taskList = document.getElementById('taskList');
    const newTaskForm = document.getElementById('newTaskForm');
    const sortSelect = document.getElementById('sortSelect');

    newTaskForm.addEventListener('submit', addTask);
    sortSelect.addEventListener('change', loadTasks);
    loadTasks();

    async function loadTasks() {
        try {
            const response = await fetch(`${apiBaseUrl}/tasks`);
            let tasks = await response.json();
            tasks = sortTasks(tasks, sortSelect.value);
            displayTasks(tasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async function addTask(e) {
        e.preventDefault();
        const title = document.getElementById('newTaskTitle').value.trim();
        const dueDate = document.getElementById('newTaskDueDate').value;
        const priority = document.getElementById('newTaskPriority').value;

        try {
            const response = await fetch(`${apiBaseUrl}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, dueDate, priority, completed: false })
            });
            const newTask = await response.json();
            loadTasks();
            newTaskForm.reset();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => addTaskToDOM(task));
    }

    function addTaskToDOM(task) {
        const taskElement = document.createElement('li');
        taskElement.innerText = `${task.title} - Due: ${task.dueDate} - Priority: ${task.priority}`;
        taskElement.classList.add(task.completed ? 'completed' : 'incomplete');
        taskList.appendChild(taskElement);
    }

    function sortTasks(tasks, method) {
        const sortedTasks = tasks.slice();
        sortedTasks.sort((a, b) => {
            if (method === 'priority') {
                return priorityLevel(a.priority) - priorityLevel(b.priority);
            } else if (method === 'date') {
                return (new Date(a.dueDate) - new Date(b.dueDate));
            }
            return 0;
        });
        return sortedTasks.sort((a, b) => a.completed - b.completed);
    }

    function priorityLevel(priority) {
        switch (priority) {
            case 'High': return 1;
            case 'Medium': return 2;
            case 'Low': return 3;
            default: return 4;
        }
    }
});