const prototype = {
    sayhello : function(){
        console.log(`hello is name is  ${this.name}`);
    }
}

const obj =  Object.create(prototype);
obj.name = "dheeraj";






let name = "dheeraj";
let janu = "vavy";
let age = "22"
console.table([age,name,janu]);