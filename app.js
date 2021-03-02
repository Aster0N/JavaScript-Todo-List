const addNewItem = document.querySelector('#addBtn');
const wrapper = document.querySelector('#wrapper');
var todoList = document.querySelector('#todo-list');
const closeTrigger = document.querySelector('#popup-content');
const inputWrapper = document.querySelector('#input-wrapper');
const inputValue = document.getElementById('input-value');
var itemArray = [];
const clearBtn = document.querySelector('#clear');
const deleteAllTasksBtn = document.querySelector('#delete-all-tasks');
var completedTasksCount = 0;
var completedTasks = document.querySelector('#completedTasks');
let mainBox = document.querySelector('.main-box');
var createButton = document.getElementById('createButton'); //create button


function deleteAllTasks(todoList, itemArray, newItem) {
   if (todoList.childNodes.length) {
      newItem.classList.add('item-deleted');
      todoList.removeChild(newItem)
   }
   if (itemArray.length) {
      itemArray = itemArray.splice(0, -1);
   }
};

function create() {
   closeTrigger.classList.toggle('todo-popup_disable');
   inputWrapper.classList.toggle('input-wrapper_disable');

   mainBox.style.backgroundColor = 'rgba(83, 92, 104, 1.0)';

   var newItem = document.createElement("li");
   newItem.classList.add('new-li');
   newItem.innerHTML = inputValue.value;
   todoList.appendChild(newItem);

   var deleteButton = document.createElement('button');
   var doneButton = document.createElement('button');

   deleteButton.classList.add('delete-task-btn');
   doneButton.classList.add('done-task-btn');
   newItem.appendChild(deleteButton);
   newItem.appendChild(doneButton);

   itemArray.push(newItem);

   // click the buttons (delete, done)
   deleteButton.onclick = function () {
      const deletedItem = deleteButton.parentNode;
      const deleteItemIndex = itemArray.indexOf(newItem);
      itemArray.splice(deleteItemIndex, 1);
      deletedItem.classList.add('item-deleted');
      todoList.removeChild(deletedItem);
   };

   doneButton.onclick = function () {
      var element = document.getElementById('scrollDownIcon');
      // plus done index
      if (typeof (element) != 'undefined' && element != null) {
         doneButton.parentNode.classList.add('item-done');
         if (completedTasksCount >= 0) {
            completedTasksCount = completedTasksCount + 1;
            completedTasks.innerHTML = completedTasksCount;
         }
      } else {
         var scrollDownIcon = document.createElement('a');
         scrollDownIcon.setAttribute('id', 'scrollDownIcon');

         const scrollIcon = document.createElement('img');
         scrollIcon.setAttribute('src', 'https://www.flaticon.com/svg/static/icons/svg/3305/3305833.svg');
         scrollDownIcon.appendChild(scrollIcon);
         scrollDownIcon.setAttribute('href', '#doneTaskWrapper');
         wrapper.appendChild(scrollDownIcon);
         scrollDownIcon.classList.add('scroll-down-icon', 'scroll-down-icon_active');
         scrollIcon.classList.add('scroll-icon');

         doneButton.parentNode.classList.add('item-done');
         if (completedTasksCount >= 0) {
            completedTasksCount = completedTasksCount + 1;
            completedTasks.innerHTML = completedTasksCount;
         }
      };
      doneTask(doneButton, newItem, todoList);
   };

   // delete all tasts 
   if (itemArray.length > 1) {
      deleteAllTasksBtn.classList.remove('delete-all_disable');
      deleteAllTasksBtn.classList.add('delete-all');
   } else {
      deleteAllTasksBtn.classList.remove('delete-all');
      deleteAllTasksBtn.classList.add('delete-all_disable');
   }
   deleteAllTasksBtn.addEventListener('click', () => deleteAllTasks(todoList, itemArray, newItem))
};


function doneTask(doneButton, newItem, todoList) {
   const doneTaskWrapper = document.querySelector('#doneTaskWrapper');
   const doneTaskUl = document.querySelector('#doneTaskUl');
   const doneTaskContent = document.querySelector('#doneTaskContent');
   const completedTitle = document.querySelector('#completedTasksTitle');

   // create remove button 
   var removeButton = document.createElement('button');
   removeButton.classList.add('remove-btn');
   newItem.appendChild(removeButton);
   newItem.style.cssText = 'padding-right: 70px;';
   doneTaskUl.appendChild(removeButton.parentNode);

   doneTaskWrapper.classList.add('done-task-wrapper_anable');
   doneTaskContent.classList.add('done-task-content');

   completedTitle.classList.add('completed-tasks-title');

   doneButton.parentNode.classList.remove('item-done');
   doneTaskUl.appendChild(doneButton.parentNode);
   doneButton.parentNode.removeChild(doneButton);

   // remove
   removeButton.onclick = function () {
      const removeItem = removeButton.parentNode;
      doneTaskUl.removeChild(removeItem);
      todoList.appendChild(removeItem);

      removeItem.removeChild(removeButton);
      removeItem.appendChild(doneButton);

      if (completedTasksCount >= 0) {
         completedTasksCount = completedTasksCount - 1;
         completedTasks.innerHTML = completedTasksCount;
      };
   };
};

addNewItem.onclick = function () {
   window.scrollTo(0, 0);
   mainBox.style.backgroundColor = '#222f3e';
   closeTrigger.classList.toggle('todo-popup_anable');
   inputWrapper.classList.toggle('input-wrapper_anable');
   closeTrigger.classList.remove('todo-popup_disable');
   inputWrapper.classList.remove('input-wrapper_disable');
};

document.addEventListener("keydown", (event) => {
   if (event.keyCode == 13 || event.keyCode == 9) {
      create();
   };
});

createButton.onclick = () => { create(); };
clearBtn.onclick = () => { inputValue.value = '' }

closeTrigger.onclick = function () {
   mainBox.style.backgroundColor = 'rgba(83, 92, 104,1.0)';
   closeTrigger.classList.toggle('todo-popup_disable');
   inputWrapper.classList.toggle('input-wrapper_disable');
};