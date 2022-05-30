//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById('new-task');//Add a new task.
var addButton=document.querySelectorAll('.btn')[0];//first button
var incompleteTaskHolder=document.querySelector('.tasks__list');//ul of .tasks__list
var completedTasksHolder=document.querySelector('.tasks__list_completed');//.tasks__list_completed


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement('li');

    //input (checkbox)
    var checkBox=document.createElement('input');//checkbox
    //label
    var label=document.createElement('label');//label
    //input (text)
    var editInput=document.createElement('input');//text
    //.btn.btn_action_edit
    var editButton=document.createElement('button');//edit button

    //.btn.btn_action_remove
    var deleteButton=document.createElement('button');//delete button
    var deleteButtonImg=document.createElement('img');//delete button image

    label.innerText=taskString;
    label.className='tasks__label name';

    //Each elements, needs appending
    checkBox.type='checkbox';
    checkBox.className='tasks__checkbox';
    editInput.type='text';
    editInput.className='input tasks__input name';

    editButton.innerText='Edit'; //innerText encodes special characters, HTML does not.
    editButton.className='btn btn_action_edit';

    deleteButton.className='btn btn_action_remove';
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className='btn__remove-img';
    deleteButtonImg.alt='Button to delete a task from the to-do list';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log('Add Task...');
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    listItem.className='tasks__item';

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value='';

}

//Edit an existing task.

var editTask=function(){
    console.log('Edit Task...');
    console.log('Change \'edit\' to \'save\'');


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.input');
    var label=listItem.querySelector('label');
    var editBtn=listItem.querySelector('.btn_action_edit');
    var containsClass=listItem.classList.contains('tasks__item_edit-mode');
    //If class of the parent is .tasks__item_edit-mode
    if(containsClass){

        //switch to .tasks__item_edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText='Edit';
    }else{
        editInput.value=label.innerText;
        editBtn.innerText='Save';
    }

    //toggle .tasks__item_edit-mode on the parent.
    listItem.classList.toggle('tasks__item_edit-mode');
};


//Delete task.
var deleteTask=function(){
    console.log('Delete Task...');

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log('Complete Task...');

    //Append the task list item to the .tasks__list_completed
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log('Incomplete Task...');
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the .tasks__list.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log('bind list item events');
//select ListItems children
    var checkBox=taskListItem.querySelector('.tasks__checkbox');
    var editButton=taskListItem.querySelector('.btn_action_edit');
    var deleteButton=taskListItem.querySelector('.btn_action_remove');


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items children(tasksIncomplete)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.