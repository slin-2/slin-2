// 2D Array to store tasks - each task is [taskText, priority]
let tasks = [];
// New 2D array to store date and time - each item is [dateString, timeString]
let taskDueDates = [];

// Array of random tasks for the random task feature - focused on health and student wellness
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Function to validate date in MM/DD format
// TODO
/* 1. Create a function that validates the date string in MM/DD format
   2. Check if the string has exactly one '/' character
   3. Split the string by '/' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if month is between 1-12
   7. Check if day is valid for the given month (use an array for days in each month)
   8. Return true if date is valid, false otherwise
*/
function validateDate(dateStr) {
  const parts = dateStr.split('/');

  // write the body of this function please
  if (parts.length - 1 !== 1) {
    return false;
  }

  if (parts.length !== 2) {
    return false;
  }

  const monthStr = parts[0];
  const dayStr = parts[1];

  if (monthStr.length !== 2 || dayStr.length !== 2) {
    return false;
  }

  for (let i = 0; i < monthStr.length; i++)
    if (monthStr.charCodeAt(i) < 48 || monthStr.charCodeAt(i) > 57) {
      return false
    }
  
  for (let i = 0; i < dayStr.length; i++)
    if (dayStr.charCodeAt(i) < 48 || dayStr.charCodeAt(i) > 57) {
      return false
    }
  
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  
  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day < 1 || day > daysInMonth[month]) {
    return false;
  }

  return true;
  
}

// Function to validate time in 24-hour format (HH:MM)
// TODO
/* 1. Create a function that validates the time string in 24-hour (HH:MM) format
   2. Check if the string has exactly one ':' character
   3. Split the string by ':' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if hours are between 0-23
   7. Check if minutes are between 0-59
   8. Return true if time is valid, false otherwise
*/
function validateTime(timeStr) {
  const parts = timeStr.split(':');
  if (parts.length !== 2) {
    return false
  }

  const hourStr = parts[0]
  const minStr = parts[1]

  if (hourStr.length !== 2 || minStr.length !== 2) {
    return false;
  }

  for (let i = 0; i < hourStr.length; i++)
    if (hourStr.charCodeAt(i) < 48 || hourStr.charCodeAt(i) > 57) {
      return false
    }
  
  for (let i = 0; i < minStr.length; i++)
    if (minStr.charCodeAt(i) < 48 || minStr.charCodeAt(i) > 57) {
      return false
    }
    const hours = parseInt(hourStr, 10);
  if (hours < 0 || hours > 23) {
    return false;
  }

  const minutes = parseInt(minStr, 10);
  if (minutes < 0 || minutes > 59) {
    return false;
  }

  return true;
  // write the body of this function please
}

// TODO
/* 1. Create a function that calculates priority based on date and time
   2. Get the current year using new Date().getFullYear()
   3. Parse the date and time from strings to numbers using:
      - Split dateStr by '/' and convert parts to numbers
      - Split timeStr by ':' and convert parts to numbers
   4. Create a new Date object with the provided date and time
      (Hint: new Date(year, month-1, day, hours, minutes))
   5. Return the timestamp (milliseconds since epoch) by using dueDate.getTime()
      (This will be used for sorting tasks by due date/time) 
      (This last return statement is already given to you.)
*/
function calculatePriority(dateStr, timeStr) {
  const currentYear = new Date().getFullYear();

  
  const dateParts = dateStr.split('/').map(Number);
  const month = dateParts[0];
  const day = dateParts[1];

  const timeParts = timeStr.split(':').map(Number);
  const hours = timeParts[0];
  const minutes = timeParts[1];

  const dueDate = new Date(currentYear, month - 1, day, hours, minutes);

  return dueDate.getTime();
}



// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  if (!validateDate(dateStr)) {
    alert('Please enter a valid date in MM/DD format!');
    return;
  }
  
  if (!validateTime(timeStr)) {
    alert('Please enter a valid time in 24-hour format (HH:MM)!');
    return;
  }
  
  // Calculate priority based on date and time
  const priority = calculatePriority(dateStr, timeStr);
  console.log(priority);
  
  // Create task array [taskText, priority]
  const task = [taskText, priority];
  
  // Add to tasks array
  tasks.push(task);
  
  // Add to due dates array
  taskDueDates.push([dateStr, timeStr]);
  
  // Sort tasks by priority
  sortTasksByPriority();
  
  // Update task display
  updateTaskDisplay();
  
  // Clear the input field
  clearInput();
}

// Function to add a random task
function addRandomTask() {
  // Get random task from the array
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  const randomTask = randomTasks[randomIndex];
  
  // Set the task input value
  taskInput.value = randomTask;
  
  // Focus on the date input
  dateInput.focus();
}

// Function to sort tasks by priority and update the taskDueDates array accordingly
function sortTasksByPriority() {
  // Create an array of indices
  let indices = Array.from(Array(tasks.length).keys());
  
  // Sort indices based on due dates and times
  indices.sort(function(a, b) {
    // Get date and time from taskDueDates
    const dateA = taskDueDates[a][0];
    const timeA = taskDueDates[a][1];
    const dateB = taskDueDates[b][0];
    const timeB = taskDueDates[b][1];
    
    // Parse date components
    const [monthA, dayA] = dateA.split('/').map(Number);
    const [monthB, dayB] = dateB.split('/').map(Number);
    
    // Compare months first
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    
    // If months are the same, compare days
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    // If dates are the same, compare times
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    
    // Compare hours
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    
    // Compare minutes
    return minutesA - minutesB;
  });
  
  // Create new arrays based on sorted indices
  const newTasks = [];
  const newTaskDueDates = [];
  
  for (let i = 0; i < indices.length; i++) {
    newTasks.push(tasks[indices[i]]);
    newTaskDueDates.push(taskDueDates[indices[i]]);
  }
  
  // Replace original arrays with sorted arrays
  tasks = newTasks;
  taskDueDates = newTaskDueDates;
}

// Function to handle keypress (for Enter key)
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// Assign the onkeydown property directly
taskInput.onkeydown = handleKeyPress;

// Function to clear the input fields
function clearInput() {
  taskInput.value = '';

  taskInput.focus();
}

// Function to update the task display
function updateTaskDisplay() {
  // Clear current task list
  taskList.innerHTML = '';
  
  // Add each task item using for loop as requested
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task[0]; // Task text is at index 0
    const dateStr = taskDueDates[i][0]; // Date string
    const timeStr = taskDueDates[i][1]; // Time string
    
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    // Create task details container
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Parse the date and time
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create a date object for the due date
    const dueDate = new Date(currentYear, month - 1, day, hours, minutes);
    
    // Calculate time difference in hours
    const diffMs = dueDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Assign visible priority class based on time difference
    let priorityClass = 1; // Default to highest priority (red)
    if (diffHours < 0) {
      priorityClass = 1; // Overdue - highest priority (red)
    } else if (diffHours < 4) {
      priorityClass = 1; // Due within 4 hours - highest priority (red)
    } else if (diffHours < 24) {
      priorityClass = 2; // Due within a day (orange)
    } else if (diffHours < 48) {
      priorityClass = 3; // Due within 2 days (blue)
    } else if (diffHours < 72) {
      priorityClass = 4; // Due within 3 days (green)
    } else {
      priorityClass = 5; // Due later - lowest priority (gray)
    }
    
    // Create task text container
    const taskTextContainer = document.createElement('span');
    taskTextContainer.className = 'task-text';
    
    // Create priority dot element
    const priorityDot = document.createElement('span');
    priorityDot.className = `priority-indicator priority-${priorityClass}`;
    
    // Create the actual task text element
    const taskTextElement = document.createTextNode(taskText);
    
    // Create due date text
    const dueDateText = document.createElement('span');
    dueDateText.className = 'due-date-text';
    dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
    
    // Create delete button with onclick attribute
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    // Append elements to containers
    taskTextContainer.appendChild(priorityDot);
    taskTextContainer.appendChild(taskTextElement);
    
    taskDetails.appendChild(taskTextContainer);
    taskDetails.appendChild(dueDateText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    // Append list item to task list
    taskList.appendChild(listItem);
  }
}

// Function to delete a specific task
function deleteTask(index) {
  // Remove task from both arrays
  tasks.splice(index, 1);
  taskDueDates.splice(index, 1);
  
  // Update the display
  updateTaskDisplay();
}

// Function to clear all tasks
function clearTasks() {
  // Clear both arrays
  tasks = [];
  taskDueDates = [];
  
  // Update the display
  updateTaskDisplay();
}

// Initial input field setup and display update
window.onload = function() {
  // Initial update of task display
  updateTaskDisplay();
};