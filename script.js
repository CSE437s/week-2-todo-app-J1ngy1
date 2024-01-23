document.addEventListener('DOMContentLoaded', () => {
    const newTaskForm = document.getElementById('newTaskForm');
    const taskList = document.getElementById('taskList');
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', displayTasks);
    newTaskForm.addEventListener('submit', addTask);
    displayTasks();

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function displayTasks() {
        const tasks = loadTasks();
        const sortMethod = sortSelect.value;

        tasks.sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;

            if (sortMethod === 'priority') {
                return priorityLevel(b.priority) - priorityLevel(a.priority) ||
                    (a.dueDate < b.dueDate ? -1 : 1);
            } else if (sortMethod === 'date') {
                return (a.dueDate < b.dueDate ? -1 : 1) ||
                    priorityLevel(b.priority) - priorityLevel(a.priority);
            }
        });

        taskList.innerHTML = ''; // Clear current tasks
        tasks.forEach((task, index) => addTaskToDOM(task, index));
    }

    function sortByPriority(a, b) {
        return priorityLevel(b.priority) - priorityLevel(a.priority) ||
            (a.dueDate < b.dueDate ? -1 : 1) ||
            (a.completed === b.completed ? 0 : a.completed ? 1 : -1);
    }

    function sortByDate(a, b) {
        return (a.dueDate < b.dueDate ? -1 : 1) ||
            priorityLevel(b.priority) - priorityLevel(a.priority) ||
            (a.completed === b.completed ? 0 : a.completed ? 1 : -1);
    }

    function sortByCompleted(a, b) {
        return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) ||
            priorityLevel(b.priority) - priorityLevel(a.priority) ||
            (a.dueDate < b.dueDate ? -1 : 1);
    }

    // Convert priority to a number for sorting
    function priorityLevel(priority) {
        switch (priority) {
            case 'High': return 3;
            case 'Medium': return 2;
            case 'Low': return 1;
            default: return 0;
        }
    }

    function addTask(e) {
        e.preventDefault();
        const taskTitle = document.getElementById('newTaskTitle').value.trim();
        const taskDueDate = document.getElementById('newTaskDueDate').value;
        const taskPriority = document.getElementById('newTaskPriority').value;

        const newTask = {
            title: taskTitle,
            dueDate: taskDueDate,
            priority: taskPriority,
            completed: false
        };

        const tasks = loadTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        addTaskToDOM(newTask, tasks.length - 1);
        newTaskForm.reset();
    }

    function addTaskToDOM(task, index) {
        const taskElement = document.createElement('li');
        taskElement.innerText = `${task.title} ${task.dueDate ? `- Due: ${task.dueDate}` : ''} ${task.priority ? `[${task.priority}]` : ''}`;
        if (task.completed) taskElement.classList.add('completed');

        const deleteButton = document.createElement('span');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteTask(index);

        const completeButton = document.createElement('span');
        completeButton.innerText = 'Complete';
        completeButton.classList.add('complete-button');
        completeButton.onclick = () => toggleTaskCompletion(index, taskElement);

        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    }

    function deleteTask(taskIndex) {
        const tasks = loadTasks();
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        displayTasks();
    }

    function toggleTaskCompletion(taskIndex, taskElement) {
        const tasks = loadTasks();
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks(tasks);
        taskElement.classList.toggle('completed');
    }
});