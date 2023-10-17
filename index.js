const prototype = {
    sayhello : function(){
        console.log(`hello is name is  ${this.name}`);
    }
}

const obj =  Object.create(prototype);
obj.name = "dheeraj";






