function validate(data){
    let flag = true;

    if(!data.title || !isNaN(data.title)){
        console.log("tit");
        flag = false;
    }
    if(!data.description){
        console.log("Desc");
        flag = false;
    }
    if(!data.priority || !isNaN(data.priority)){
        console.log("pri");
        flag = false;
    }
    if(!data.dueDate){
        console.log("due");
        flag = false;
    }
    if(!data.comments){
        console.log("cmn");
        flag = false;
    }
    return flag;
}

module.exports = validate;