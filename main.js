// 유저가 todo를 입력
// 추가(+) 버튼 클릭시 list 로 todo 가 추가
// 유저가 delete 버튼 클릭시 todo 삭제
// check 버튼 클릭시 할일이 끝남 (밑줄)
// 탭을 클릭시 underline 이동
// 진행중, 완료 탭에는 해당 todo만 표시됨
// 전체 탭에는 전체 todo표시

let inputTodo = document.getElementById("inputTodo");
let addBtn = document.getElementById("addBtn");
let todoList = [];
addBtn.addEventListener("click", todoCreate);

function todoCreate() {
  let todoContent = inputTodo.value;
  todoList.push(todoContent);
  render();
}

function render() {
  let resultHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    resultHTML += `<div class="todo">
            <div>${todoList[i]}</div>
            <div>
              <button>check</button>
              <button>delete</button>
            </div>
          </div>`;
  }
  document.getElementById("todoList").innerHTML = resultHTML;
}
