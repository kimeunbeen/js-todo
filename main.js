// 유저가 todo를 입력
// 추가(+) 버튼 클릭시 list 로 todo 가 추가
// 유저가 delete 버튼 클릭시 todo 삭제
// check 버튼 클릭시 할일이 끝남 (밑줄)
// => true / false 로직 추가
// 탭을 클릭시 underline 이동
// 진행중, 완료 탭에는 해당 todo만 표시됨
// 전체 탭에는 전체 todo표시

let inputTodo = document.getElementById("inputTodo");
inputTodo.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    todoCreate();
  }
});

let addBtn = document.getElementById("addBtn");
let todoList = [];
addBtn.addEventListener("click", todoCreate);

let tabs = document.querySelectorAll(".tabs div");

let mode = "all";
let filterList = [];
let i = 0;

let underline = document.getElementById("underline");
tabs.forEach((tab) => tab.addEventListener("click", (e) => filter(e)));

// for (let i = 1; i < tabs.length; i++) {
//   tabs[i].addEventListener("click", function (event) {
//     filter(event);
//   });
// }

//할일추가
function todoCreate() {
  if (inputTodo.value == "") {
    return false;
  }

  let todo = {
    id: i,
    todoContent: inputTodo.value,
    isDone: false,
  };
  todoList.push(todo);
  render();
  i++;

  // 입력후 input값 초기화
  inputTodo.value = "";
}

// check클릭시
function toggle(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      todoList[i].isDone = !todoList[i].isDone;
      break;
    }
  }

  filterList = [];
  for (let i = 0; i < todoList.length; i++) {
    if (mode === "complete") {
      if (todoList[i].isDone === true) {
        filterList.push(todoList[i]);
      }
    } else {
      // all or isProgress
      if (todoList[i].isDone === false) {
        filterList.push(todoList[i]);
      }
    }
  }

  render();
}

//삭제클릭시
function deleteTodo(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      todoList.splice(i, 1);
      break;
    }
  }

  render();
}

function render() {
  let viewList = [];

  // mode 에 따라서 다른 List 그리기
  if (mode === "all") {
    viewList = todoList;
  } else if (mode === "inProgress" || mode === "complete") {
    viewList = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < viewList.length; i++) {
    if (viewList[i].isDone == true) {
      resultHTML += `<div class="todo todoDone">
            <div class="todoDone">${viewList[i].todoContent}</div>
            <div>
              <button class="complete" onclick="toggle('${viewList[i].id}')"></button>
              <button class="delete" onclick="deleteTodo('${viewList[i].id}')"></button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="todo">
            <div>${viewList[i].todoContent}</div>
            <div>
              <button class="check" onclick="toggle('${viewList[i].id}')"></button>
              <button class="delete" onclick="deleteTodo('${viewList[i].id}')"></button>
            </div>
          </div>`;
    }
  }
  document.getElementById("todoList").innerHTML = resultHTML;
}

// mode에 따라 todoList Filter
function filter(e) {
  mode = e.target.id;
  filterList = [];

  underline.style.left = e.currentTarget.offsetLeft + "px";
  underline.style.width = e.currentTarget.offsetWidth + "px";
  underline.style.top = e.currentTarget.offsetHeight - 3 + "px";

  if (mode === "all") {
    //전체
    render();
  } else if (mode === "inProgress") {
    // 진행중 = isDone = false
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isDone === false) {
        filterList.push(todoList[i]);
      }
    }

    render();
  } else if (mode === "complete") {
    // 완료 = isDone
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isDone === true) {
        filterList.push(todoList[i]);
      }
    }

    render();
  }
}
