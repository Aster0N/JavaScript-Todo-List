const addNewItem = document.querySelector('#addBtn');
const wrapper = document.querySelector('#wrapper');
const todoList = document.querySelector('#todoList');
const closeTrigger = document.querySelector('#popupContent');
const inputWrapper = document.querySelector('#inputWrapper');
const input = document.querySelector('#input');
const clearBtn = document.querySelector('#clearInputBtn');
const deleteAllTasksBtn = document.querySelector('#deleteAllTasksBtn');
const completedTasks = document.querySelector('#completedTasks');
const mainBox = document.querySelector('.main-box');
const createButton = document.querySelector('#createTodoButton');
let itemsArray = [];
let completedTasksCount = 0;


deleteAllTasksBtn.addEventListener('click', () => {
	itemsArray = [];
	todoList.textContent = '';
})

function create() {
	closeTrigger.classList.toggle('todo-popup_disable');
	inputWrapper.classList.toggle('input-wrapper_disable');

	mainBox.style.backgroundColor = 'rgba(83, 92, 104, 1.0)';

	const newItem = document.createElement("li");
	newItem.classList.add('new-li');
	newItem.innerHTML = input.value;
	todoList.appendChild(newItem);

	const deleteButton = document.createElement('button');
	const doneButton = document.createElement('button');

	deleteButton.classList.add('delete-task-btn');
	doneButton.classList.add('done-task-btn');
	newItem.appendChild(deleteButton);
	newItem.appendChild(doneButton);

	itemsArray.push(newItem);
	input.value = '';

	deleteButton.onclick = function () {
		const deletedItem = deleteButton.parentNode;
		const deleteItemIndex = itemsArray.indexOf(newItem);
		itemsArray.splice(deleteItemIndex, 1);
		todoList.removeChild(deletedItem);
	};

	doneButton.onclick = function () {
		let scrollDownIcon = document.querySelector('#scrollDownIcon');

		if (typeof (scrollDownIcon) == 'undefined' || scrollDownIcon == null) {
			scrollDownIcon = document.createElement('a');
			scrollDownIcon.setAttribute('id', 'scrollDownIcon');
			scrollDownIcon.setAttribute('href', '#doneTaskWrapper');
			scrollDownIcon.classList.add('scroll-down-icon', 'scroll-down-icon_active');

			const scrollIcon = document.createElement('img');
			scrollIcon.setAttribute('src', './images/down-arrow.svg');
			scrollIcon.classList.add('scroll-icon');
			scrollDownIcon.appendChild(scrollIcon);
			wrapper.appendChild(scrollDownIcon);
		};

		completedTasksCount++;
		completedTasks.innerHTML = completedTasksCount;

		moveToCompletedList(doneButton, newItem);
	};

	// delete all tasts 
	if (itemsArray.length > 1) {
		deleteAllTasksBtn.classList.remove('delete-all_disable');
		deleteAllTasksBtn.classList.add('delete-all');
	} else {
		deleteAllTasksBtn.classList.remove('delete-all');
		deleteAllTasksBtn.classList.add('delete-all_disable');
	}
	// deleteAllTasksBtn.addEventListener('click', deleteAllTasks())
};

function moveToCompletedList(doneButton, newItem) {
	const doneTaskWrapper = document.querySelector('#doneTaskWrapper');
	const doneTaskUl = document.querySelector('#doneTaskUl');
	const doneTaskContent = document.querySelector('#doneTaskContent');
	const completedTitle = document.querySelector('#completedTasksTitle');

	const recompleteTaskBtn = document.createElement('button');
	recompleteTaskBtn.classList.add('remove-btn');
	newItem.appendChild(recompleteTaskBtn);
	newItem.style.cssText = 'padding-right: 70px;';
	doneTaskUl.appendChild(recompleteTaskBtn.parentNode);
	console.log(recompleteTaskBtn.parentNode)

	doneTaskWrapper.classList.add('done-task-wrapper_anable');
	doneTaskContent.classList.add('done-task-content');
	completedTitle.classList.add('completed-tasks-title');

	doneTaskUl.appendChild(doneButton.parentNode);
	doneButton.parentNode.removeChild(doneButton);

	// recomplete task
	recompleteTaskBtn.onclick = function () {
		const removeItem = recompleteTaskBtn.parentNode;
		doneTaskUl.removeChild(removeItem);
		todoList.appendChild(removeItem);

		removeItem.removeChild(recompleteTaskBtn);
		removeItem.appendChild(doneButton);

		completedTasksCount--;
		completedTasks.innerHTML = completedTasksCount;
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
clearBtn.onclick = () => { input.value = '' }

closeTrigger.onclick = function () {
	mainBox.style.backgroundColor = 'rgba(83, 92, 104,1.0)';
	closeTrigger.classList.toggle('todo-popup_disable');
	inputWrapper.classList.toggle('input-wrapper_disable');
};