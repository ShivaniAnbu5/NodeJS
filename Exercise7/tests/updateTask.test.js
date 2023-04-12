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
            "priority": "low",
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


let taskData =  {
    "title": "task1",
    "description": "This is task1",
    "priority": "medium",
    "dueDate": "2023-4-12",
    "comments": "['cmnt1','cmnt2','cmnt3']"
  }

describe("Updating Tasks", () => {
    test("updating task by id",async ()=>{
        let fileStub = sinon.stub(fileActions);
        fileStub.readFile.returns(Promise.resolve(data));
        fileStub.writeFile.returns(Promise.resolve("data written"));

        let res = await taskServices.updateDetailsByIdService(taskData,0, 1);
        expect(res.status).toBe(true);

        fileStub.readFile.restore();
        fileStub.writeFile.restore();
    });

});