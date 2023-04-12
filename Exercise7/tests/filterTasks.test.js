const sinon=require("sinon");
const taskServices = require('../services/tasksServices')
const fileActions=require("../utils/fileActions");

let data = [
    {
      "username": "adi",
      "tasks": [
        {
          "taskData": {
            "title": "first",
            "description": "This is task1",
            "priority": "high",
            "dueDate": "2025-12-30",
            "comments": "['cmnt1','cmnt2','cmnt3']"
          },
          "createdDate": "2023-04-09T19:05:11.136Z",
          "taskId": 1
        },
        {
          "taskData": {
            "title": "second",
            "description": "This is task2",
            "priority": "medium",
            "dueDate": "2025-4-15",
            "comments": "['cmnt1','cmnt2','cmnt3']"
          },
          "createdDate": "2023-04-09T19:05:15.075Z",
          "taskId": 2
        }
      ],
      "taskCount": 2
    }
];

let filteredData  = [{
    "taskData": {
      "title": "second",
      "description": "This is task2",
      "priority": "medium",
      "dueDate": "2025-4-15",
      "comments": "['cmnt1','cmnt2','cmnt3']"
    },
    "createdDate": "2023-04-09T19:05:15.075Z",
    "taskId": 2
  }];
  
describe("Filtering Tasks", () => {
    test("filtering task by specifying field",async ()=>{
        let fileStub = sinon.stub(fileActions);
        fileStub.readFile.returns(Promise.resolve(data));
        fileStub.writeFile.returns(Promise.resolve("data written"));

        let res = await taskServices.filterTasks({"priority":"medium"},0);
        expect(res).toEqual({status:true,message:filteredData});

        fileStub.readFile.restore();
        fileStub.writeFile.restore();
    });

    test("filtering task without specifying field",async ()=>{
      let fileStub = sinon.stub(fileActions);
      fileStub.readFile.returns(Promise.resolve(data));
      fileStub.writeFile.returns(Promise.resolve("data written"));

      let res = await taskServices.filterTasks({},0);
      expect(res).toEqual({status:false,message:"Error occured in filtering tasks"});

      fileStub.readFile.restore();
      fileStub.writeFile.restore();
  });

  test("filtering task with field but file doesn't contain a task with that field",async ()=>{
    let fileStub = sinon.stub(fileActions);
    fileStub.readFile.returns(Promise.resolve(data));
    fileStub.writeFile.returns(Promise.resolve("data written"));

    let res = await taskServices.filterTasks({"priority":"low"},0);
    expect(res).toEqual({status:true,message:"No results"});

    fileStub.readFile.restore();
    fileStub.writeFile.restore();
  });

});