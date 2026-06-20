const item= document.querySelector("#item")
const toDoBox= document.querySelector("#to-do-box")
item.addEventListener(
    "keyup",
    function(event){
        if(event.key == "Enter"){
            addToDo(this.value)
            this.value = "" //jaise hi Input me dali hui value par enter kiya jaye to vo input se hat kar console me show ho 
        }
    }
)
const addToDo= (item) =>{
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    ${item}
    <i class="fa-solid fa-xmark"></i>
    `;

    listItem.addEventListener(
        "click",
        function(){
            this.classList.toggle("done");
        }
    )

    listItem.querySelector("i").addEventListener(
    "click",
    function(){
        listItem.remove();
    }
    )

    toDoBox.appendChild(listItem)
}
