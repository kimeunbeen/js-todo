// 유저가 todo를 입력
// 추가(+) 버튼 클릭시 list 로 todo 가 추가
// 유저가 delete 버튼 클릭시 todo 삭제
// check 버튼 클릭시 할일이 끝남 (밑줄)
// => true / false 로직 추가
// 탭을 클릭시 underline 이동
// 진행중, 완료 탭에는 해당 todo만 표시됨
// 전체 탭에는 전체 todo표시

let inputTodo = document.getElementById("inputTodo");
let addBtn = document.getElementById("addBtn");
let todoList = [];
addBtn.addEventListener("click", todoCreate);

let i = 0;

function todoCreate() {
  let todo = {
    id: i,
    todoContent: inputTodo.value,
    isDone: false,
  };
  todoList.push(todo);
  render();
  i++;
}

function render() {
  let resultHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].isDone == true) {
      resultHTML += `<div class="todo">
            <div class="isDone">${todoList[i].todoContent}</div>
            <div>
              <button onclick="toggle('${todoList[i].id}')">check</button>
              <button onclick="deleteTodo('${todoList[i].id}')">delete</button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="todo">
            <div>${todoList[i].todoContent}</div>
            <div>
              <button onclick="toggle('${todoList[i].id}')">check</button>
              <button onclick="deleteTodo('${todoList[i].id}')">delete</button>
            </div>
          </div>`;
    }
  }
  document.getElementById("todoList").innerHTML = resultHTML;
}

function toggle(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      todoList[i].isDone = !todoList[i].isDone;
      break;
    }
  }

  render();
}

function deleteTodo(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      todoList.splice(i, 1);
      break;
    }
  }

  render();
}
