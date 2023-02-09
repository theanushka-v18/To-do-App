let otitle, odesc;

const addToDo = () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;

    otitle = title;
    odesc = desc;

    let todos = [];

    let localTodos = localStorage.getItem("todos");

    if(localTodos!=null) {
        todos = JSON.parse(localTodos);
    }

    todoObj = {
        title : title,
        desc : desc,
        id : Math.trunc(Math.random()*1000)
    };

    todos.push(todoObj);
    if(title!="" && desc!="") {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    showToDo();
}

const showToDo = () => {
    let todoStr = localStorage.getItem("todos");
    let content = "";
    if(todoStr==null) {
        content += "<h3 class='text-white'>No Todo item present to show, Please add atleast one</h3>";
    } else {
        let todos = JSON.parse(todoStr);
        for (let todo of todos.reverse()) {
            content += `
                <div id='${todo.id}' class='card border border-secondary bg-dark mb-2'>
                    <div class='card-body'>
                        <h3 class='text-secondary'>${todo.title}</h3>
                        <p class='text-secondary'>${todo.desc}</p>
                    </div>
                    <button onclick="deleteTodo(${todo.id})" type="button" class="btn btn-light m-2">Delete</button>
                </div>
            `;
        }
    }
    if(otitle!="" && odesc!="") {
        document.getElementById("main-content").innerHTML = content;
    }
}

const deleteTodo = (id) => {
    let todoStr = localStorage.getItem("todos");
    let todos = JSON.parse(todoStr);
    let newTodo = todos.filter((todo) => {
        return todo.id !== id;
    })
    document.getElementById(id).innerHTML = "";
    todos = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
}

showToDo();