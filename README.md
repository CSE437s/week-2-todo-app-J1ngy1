[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hVfz7S7L)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13516212&assignment_repo_type=AssignmentRepo)
# CSE 437s Week 2: Build a To-Do App

**Live Demo:** [To-Do App](https://j1ngy1.github.io/week-2-todo-app-J1ngy1/)

### Key Features
- **Adding Tasks**: Users can add tasks with a title, optional due date, and optional priority level.
- **Viewing Tasks**: Tasks are displayed in a list, showing the title, due date, and priority (if applicable).
- **Marking Tasks Complete**: Tasks can be marked as completed, visually distinguishing them from incomplete tasks.
- **Deleting Tasks**: Users can delete tasks that are no longer needed.
- **Persistence**: Tasks are stored and retrieved from the browser's Local Storage, ensuring data persistence across sessions.

## Built With
- **Front-End**: HTML, CSS, JavaScript
- **Back-End**: Node.js with Express
- **Database**: Firestore from Firebase

## Running the Backend Locally

To run the backend server on your local machine:

1. **Navigate to the Backend Directory**:
   - Open a terminal and navigate to the backend directory of the project.

2. **Install Dependencies**:
   - Run `npm install` to install the necessary Node.js dependencies.

3. **Start the Server**:
   - Run `node server.js` to start the backend server.
   - The server will start on `http://localhost:3000` (or another port if configured).

4. **Accessing the Application**:
   - With the server running, open the [To-Do App](https://j1ngy1.github.io/week-2-todo-app-J1ngy1/) in your web browser to access the frontend.

## Future Enhancements
- Implement security measures to protect the data and user privacy.
- Ensure the backend server can run continuously on a cloud platform for constant uptime.
- Enhance user experience by adopting modern frontend frameworks like React or Vue.js.