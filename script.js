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
const inputBox = document.getElementById('inputBox');
const can = document.getElementById('cancelID');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const clrStorageButton = document.getElementById("clrStorageID");


plusButton.onclick = hidePlusButton;
function hidePlusButton(){
    plusButton.style.display = 'none';
    inputButton.style.display = 'flex';
    buttons.style.display = 'flex';
    console.log("hii");
}


inputBox.addEventListener('input', () => {
  inputBox.style.height = 'auto';
  inputBox.style.height = inputBox.scrollHeight + 'px';
});


can.onclick = showPlusButton;
function showPlusButton(){
    plusButton.style.display = 'flex';
    inputButton.style.display = 'none';
    buttons.style.display = 'none';
    inputBox.value = "";
}


document.getElementById("saveID").onclick = function () {
    const taskText = inputBox.value.trim();

    if (taskText !== "") {
        const task = { text: taskText, done: false };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToUI(task,tasks.length-1);
        inputBox.value = "";
        inputBox.style.height = 'auto';
        clrStorageButtonVisibility();
    }
}

inputBox.addEventListener('keydown',function(event){
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        document.getElementById("saveID").click();
    }
})

let prevInsertedDiv=clrStorageButton;
function addTaskToUI(task,i) {
    const taskList = document.getElementById("taskList");

    const taskDiv = document.createElement("div");
    taskDiv.className = "item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-checkbox";
    checkbox.checked = task.done;

    const label = document.createElement("div");
    label.innerHTML = task.text.replace(/\n/g,"<br>");
    label.style.textDecoration = task.done ? 'line-through' : 'none';

    
    checkbox.addEventListener('change',function(){
        task.done = checkbox.checked;
        label.style.textDecoration = checkbox.checked ? 'line-through':'none';
        tasks[i].done = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log("done");
    })

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);

    taskList.insertBefore(taskDiv,prevInsertedDiv);
    prevInsertedDiv=taskDiv;
}
//clear storage 
clrStorageButton.onclick=function(){
    localStorage.clear();
    location.reload();
    console.log("hey");
}

function clrStorageButtonVisibility(){
    if(tasks.length != 0){
        clrStorageButton.style.display = 'flex';
    }
}


``

window.onload = () => {
    tasks = tasks.filter(task => !task.done);
    clrStorageButtonVisibility();
    localStorage.setItem("tasks",JSON.stringify(tasks));
    for (let i=0;i<tasks.length;i++) {
        addTaskToUI(tasks[i],i);
    }
};