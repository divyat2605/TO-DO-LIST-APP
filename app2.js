document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

// Function for Local Storage 
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    console.log('Tasks saved to local storage');
};

// Function to add a new task
const addTask = () => {
    const taskInput = document.getElementById('taskinput');
    const text = taskInput.value.trim(); 
    if (text) {
        tasks.push({ text: text, completed: false });
        console.log(`New task added: ${text}`);
        updateTasksList();
        taskInput.value = ''; 
        updateStats();
        saveTasks(); 
    }
};

// Function to update the tasks list in the UI
const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./writing.jpeg" alt="Edit" onclick="editTask(${index})" />
                    <img src="./images.jpg" alt="Delete" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
        taskList.appendChild(listItem);
        
    });
};

// Function to toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    console.log(`Task ${index} completion toggled`);
    updateTasksList();
    updateStats();
    saveTasks();
};

// To implement the task bar functionality 
const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    console.log(`Progress updated: ${progress}%`);

    const numbers = document.getElementById('numbers');
    numbers.textContent = `${completedTasks}/${totalTasks}`;
    console.log(`Stats updated: ${completedTasks}/${totalTasks}`);
    if (completedTasks === totalTasks && totalTasks > 0) {
        triggerConfetti();
    }
};
const triggerConfetti = () => {
    confetti({
        particleCount: 150, // Number of confetti pieces
        spread: 70, // Spread angle of the confetti
        origin: { y: 0.6 } // Y-axis position to start the confetti
    });
    console.log('All tasks completed! Confetti animation triggered!');
};
// Function to edit a task
const editTask = (index) => {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText.trim();
        console.log(`Task ${index} edited`);
        updateTasksList(); 
    }
    updateStats();
    saveTasks();
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1); 
    console.log(`Task ${index} deleted`);
    updateTasksList(); 
    updateStats();
    saveTasks();
};

// Event listener for the "+" button
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

// Event listener for the "Enter" key
document.getElementById('taskinput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});
