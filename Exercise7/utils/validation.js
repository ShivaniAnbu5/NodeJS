function validate(data){
    let flag = true;

    if(!data.title || !isNaN(data.title)){
        flag = false;
    }
    if(!data.description){
        flag = false;
    }
    if(!data.priority || !isNaN(data.priority)){
        flag = false;
    }
    if(!data.dueDate){
        flag = false;
    }
    if(!data.comments){
        flag = false;
    }
    return flag;
}

module.exports = validate;