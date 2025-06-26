//date 
const objDate= new Date();
const day = String(objDate.getDate()).padStart(2,'0');
const month = String(objDate.getMonth()+1).padStart(2,'0');
const year = objDate.getFullYear();

const dateString = `${day} - ${month} - ${year}`;
document.getElementById("date").textContent = dateString;  //this is the pushing line 
//time


function updateClock(){
    const now=new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${String(hours).padStart(2,'0')} : ${minutes} : ${seconds} ${ampm}`;
    document.getElementById("time").textContent = timeString;
}
setInterval(updateClock,1000);
updateClock();

const plusButton = document.getElementsByClassName('plus-button')[0];
const inputButton = document.getElementsByClassName('input-container')[0];
const buttons = document.getElementById('textSaving');
plusButton.onclick = hidePlusButton;
function hidePlusButton(){
    plusButton.style.display = 'none';
    inputButton.style.display = 'flex';
    buttons.style.display = 'flex';
    console.log("hii");
}


const inputBox = document.getElementById('inputBox');
inputBox.addEventListener('input', () => {
  inputBox.style.height = 'auto';
  inputBox.style.height = inputBox.scrollHeight + 'px';
});


const can = document.getElementById('cancelID');
can.onclick = showPlusButton;
function showPlusButton(){
    plusButton.style.display = 'flex';
    inputButton.style.display = 'none';
    buttons.style.display = 'none';
    inputBox.value = "";
}


document.getElementById("saveID").onclick = function () {
    const inputBox = document.getElementById("inputBox");
    const taskText = inputBox.value.trim();

    if (taskText !== "") {
        tasks.push(taskText); // Add to array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
        addTaskToUI(taskText); // Add to screen
        inputBox.value = ""; // Clear input
    }
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTaskToUI(taskText) {
    const taskList = document.getElementById("taskList");
    const taskDiv = document.createElement("div");
    taskDiv.className = "item";
    taskDiv.textContent = taskText;
    taskList.appendChild(taskDiv);
}
window.onload = () => {
    tasks.forEach(addTaskToUI);
};