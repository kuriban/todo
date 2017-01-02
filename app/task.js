import store from "store";

export class Task {

    constructor (item){
        if(item){
            this.name = item;
            this.numberLastTask = this.getNumberLastTask();
            this.createTask();
        }
    }
    getNumberLastTask(){
        let count = 0;
        store.forEach((key,value)=>{
            if(key.indexOf("task_") != -1){
                count = parseInt(key.substr(5));
            }
        });

        return count;
    }

    createTask(){
        store.set("task_"+(this.numberLastTask+1),{
            "name":this.name
        });
    }

    getTask(id){
        this.name = store.get("task_");
        return this.name;
    }

    render(){
        let tr = "";
        store.forEach((key,value)=>{
            if(key.indexOf("task_") != -1){
                let mainTask = value,
                    count = parseInt(key.substr(5));
                tr += [
                    "<tr class='mainTask'>",
                        "<td data-id="+count+">"+mainTask.name+"</td>",
                        "<td>",
                            "<input type='text' name='subtask' placeholder='название подзадачи'>",
                            "<button class='subTask'>добавить подзадачу</button>",
                        "</td>",
                    "</tr>"
                ].join("");
            }
        });
        return tr;
    }

    deleteTask(){

    }
}
const tasks = new Task();
document.querySelector("table").innerHTML = tasks.render();

document.querySelector(".addTask").addEventListener("click",event=>{
    event.preventDefault();
    let item = event.target.previousElementSibling.value,
        task = new Task(item),
        name = task.getTask();
    document.querySelector("table").innerHTML = task.render();


});
