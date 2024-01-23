document.addEventListener('DOMContentLoaded', () => {
    const newTaskForm = document.getElementById('newTaskForm');
    const taskList = document.getElementById('taskList');

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
        taskList.innerHTML = ''; // Clear current tasks
        tasks.forEach((task, index) => addTaskToDOM(task, index));
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