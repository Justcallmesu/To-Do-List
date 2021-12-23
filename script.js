let todoList = [];
function load() {
    let json = JSON.parse(localStorage.getItem('list'));
    if (json) {
        for (let i = 0; i < json.length; i++) {
            todoList.push(json[i]);
        }
        view("load");
        addListener();

    }

}
let length;
function view(load) {
    length = todoList.length;
    if (load === "load") {
        if (todoList.length !== 0) {
            for (let i = 0; i < length; i++) {
                let parent = document.querySelector(".list");
                let list = document.createElement("li");
                let paragraph = document.createElement("p");
                let attr = document.createAttribute("class");
                attr.value = `data list${i}`
                let listText = document.createTextNode(todoList[i].input);

                paragraph.appendChild(listText);
                list.setAttributeNode(attr);
                list.appendChild(paragraph);
                parent.appendChild(list);
            }
        }

    } else {
        let input = document.querySelector(".new").value.replace(/(\r\n|\n|\r)/gm, "");
        if (input === "") {
            let alert = document.querySelector(".alert");
            let viewError = document.createElement("h2");
            let attribute = document.createAttribute("class");
            attribute.value = "error";
            let errorText = document.createTextNode("The input must filled");

            viewError.setAttributeNode(attribute);
            viewError.appendChild(errorText);
            alert.appendChild(viewError);

            setTimeout(function () {
                document.querySelector(".error").remove()
            }, 2000);
        } else {
            let parent = document.querySelector(".list");
            let list = document.createElement("li");
            let paragraph = document.createElement("p");
            let attr = document.createAttribute("class");
            attr.value = `data list${length} `
            let listText = document.createTextNode(input);

            paragraph.appendChild(listText);
            list.setAttributeNode(attr);
            list.appendChild(paragraph);
            parent.appendChild(list);
            todoList.push({ key: `list${length} `, input });
            document.querySelector(".new").value = "";
            update();
            addListener();
        }

    }
}

function update() {
    localStorage.setItem('list', JSON.stringify(todoList))
}

function addListener() {
    let list = document.querySelectorAll("li.data");
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', function (e) {
            if (e.target.parentNode.classList.contains('pressed')) {
                e.target.parentNode.classList.toggle('pressed');
            } else {
                e.target.parentNode.classList.toggle('pressed');
            }
        })
    }
}
function deleteList() {
    let element = document.querySelectorAll('.pressed');
    console.log(element)
    for (let i = 0; i < element.length; i++) {
        for (let a = 0; a < todoList.length; a++) {
            if (element[i].innerText === todoList[a].input) {
                todoList.splice(a, 1);
                element[i].remove()
                update()
            }
        }
    }
}
function deleteAll() {
    let element = document.querySelectorAll(".data")
    for (let i = 0; i < element.length; i++) {
        element[i].remove();
        todoList = [];
        update();
    }
}