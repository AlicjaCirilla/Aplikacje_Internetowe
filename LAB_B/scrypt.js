class ToDo{
    constructor (){
        this.tasks=[];
        this.dates=[];
        this.loadFromStorage();
    }
    draw(elementID){
        document.getElementById(elementID).innerHTML = "";
        if(this.tasks.length==0){
                document.getElementById(elementID).innerHTML = "<p id=\"starchild\"></p>";
                return;
            }
        for(let i=0;i<this.tasks.length;i++){
            var task=this.tasks[i];
            var date=this.dates[i];
            var list=document.createElement("container");
            list.setAttribute("class","ListedItem");
            var BinButton=document.createElement("p");
            var taskDesc=document.createElement("p");
            var DateDesc=document.createElement("p");
            taskDesc.setAttribute("class","taskDesc");
            DateDesc.setAttribute("class","DateDesc");
            BinButton.setAttribute("class","BinButton");
            taskDesc.setAttribute("data-index",i);
            DateDesc.setAttribute("data-index",i);
            BinButton.setAttribute("data-index",i);
            BinButton.innerHTML="✗";
            taskDesc.appendChild(document.createTextNode(task));
            DateDesc.appendChild(document.createTextNode(date));
            list.appendChild(taskDesc);
            list.appendChild(DateDesc);
            list.appendChild(BinButton);
            document.getElementById(elementID).appendChild(list);
        }
        drawBinButtons();
        drawEdits();
    }
    saveToStorage(){
        const todoData = {
            tasks: this.tasks,
            dates: this.dates
        };
        localStorage.setItem('todoData', JSON.stringify(todoData));
    }

    loadFromStorage(){
        const savedData = localStorage.getItem('todoData');
        if(savedData){
            const todoData = JSON.parse(savedData);
            this.tasks = todoData.tasks || [];
            this.dates = todoData.dates || [];
        }
    }
    
    clearStorage(){
        localStorage.removeItem('todoData');
        this.tasks = [];
        this.dates = [];
    }
}

function wariat1(Future){
    var todaysDate=new Date();
    var year = todaysDate.getFullYear();
	var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);
	var day = ("0" + todaysDate.getDate()).slice(-2);
	var dtToday = (year + "-" + month + "-" + day);
    Future.setAttribute('min',dtToday);
}

function saveFunction(){
    var task=document.querySelector('#taskInput').value;
    var date=document.querySelector('#Future').value;
    if(task.length<3){
        alert("Task too short");
        return;
    }
    else if(task.length>255){
        alert("Task too long");
        return;
    }
    date= date || "No date set";
    todo.tasks.push(task);
    todo.dates.push(date);
    todo.saveToStorage();
    todo.draw("taskList");
    document.querySelector('#taskInput').value="";
}
function clearItem(index){
    todo.tasks.splice(index, 1);
    todo.dates.splice(index, 1);
    todo.saveToStorage();
    todo.draw("taskList");
}
function drawEdits(index){
    var taskElements = document.getElementsByClassName("taskDesc");
    var taskDates = document.getElementsByClassName("DateDesc");
    for (let i = 0; i < taskElements.length; i++) {
        taskElements[i].onclick = function() { EditFunction(taskElements[i]); };
        taskDates[i].onclick = function() { EditFunction(taskDates[i]); };
        }
    }
function drawBinButtons(){
    var binButtons = document.getElementsByClassName("BinButton");
    for (let i = 0; i < binButtons.length; i++) {
    binButtons[i].onclick = function() { clearItem(i); };
    }
}
function clearFunction(){
    todo.clearStorage();
    document.getElementById("taskList").innerHTML = "<p id=\"starchild\"></p>";
}
function EditFunction(element){
    if(element.getAttribute("class")=="taskDesc"){
        var originalText = element.textContent;
        let index = element.getAttribute("data-index");
        element.innerHTML = "<input type='text' id='editInput' value='" + element.textContent + "'>";
        var editInput = document.getElementById("editInput");
        editInput.focus();
        editInput.onblur = function() {
            if(editInput.value.length<3){
                element.innerHTML = originalText;
                return;
            }
            todo.tasks[index] = editInput.value;
            element.innerHTML = editInput.value;
            todo.saveToStorage();
            todo.draw("taskList");
        }
    }
    else if(element.getAttribute("class")=="DateDesc"){
        let index = element.getAttribute("data-index");
        console.log("Editing date at index:", index);
        element.innerHTML = "<input type='date' id='editInput' value='" + element.textContent + "'>";
        var editInput = document.getElementById("editInput");
        wariat1(editInput);
        editInput.focus();
        editInput.onblur = function(event) {
            console.log("onblur triggered, value:", editInput.value);
            todo.dates[index] = editInput.value;
            element.innerHTML = editInput.value;
            if(!editInput.value || editInput.value===""){
                todo.dates[index]="No date set";
            }
            todo.saveToStorage();
            todo.draw("taskList");
        };
        editInput.onclick = function(event) {
            event.stopPropagation();
        }
        
    } 
}
function SearchFunction(){
    todo.draw("taskList");
    //zmienne
    var input=document.getElementById("Search").value.toLowerCase();
    const regex=new RegExp(input);
    bool1 = false;
    //filtr1
    todo.tasks.filter((task, index) => {
        var taskElement = document.getElementsByClassName("taskDesc")[index];
        var Item=document.getElementsByClassName("ListedItem")[index];
        //css
        if(regex.test(task)){     
                var HighlightedTask = task.replace(regex, '<mark class="highlight">$&</mark>');
                taskElement.innerHTML = HighlightedTask;
                bool1 = true;
        } 
        else {
            Item.style.display = "none";
        }
    });
    if(!bool1){
        document.getElementById("taskList").innerHTML = "<p id=\"starchild\"></p>";
    }
}

wariat1(document.getElementById("Future"));
var todo=new ToDo();
todo.draw("taskList");
var inputField=document.getElementById("Search");
inputField.addEventListener("input", function() { SearchFunction(); });