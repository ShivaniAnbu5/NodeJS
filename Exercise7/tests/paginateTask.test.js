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
        },
        {
        "taskData": {
            "title": "third",
            "description": "This is task3",
            "priority": "medium",
            "dueDate": "2025-4-15",
            "comments": "['cmnt1','cmnt2','cmnt3']"
        },
        "createdDate": "2023-04-09T19:05:15.075Z",
        "taskId": 3
        }
      ],
      "taskCount": 3
    }
];

let paginatedData  = [
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
  },
  {
  "taskData": {
      "title": "third",
      "description": "This is task3",
      "priority": "medium",
      "dueDate": "2025-4-15",
      "comments": "['cmnt1','cmnt2','cmnt3']"
  },
  "createdDate": "2023-04-09T19:05:15.075Z",
  "taskId": 3
  }
];
  
describe("Paginating Tasks", () => {
    test("pagination with limit greater than actual data",async ()=>{
        let fileStub = sinon.stub(fileActions);
        fileStub.readFile.returns(Promise.resolve(data));
        fileStub.writeFile.returns(Promise.resolve("data written"));

        let res = await taskServices.paginateTasks({"page":3,"limit":5},0);
        expect(res).toEqual({status:true,message:"Data less than limit"});

        fileStub.readFile.restore();
        fileStub.writeFile.restore();
    });

    test("pagination within limit",async ()=>{
      let fileStub = sinon.stub(fileActions);
      fileStub.readFile.returns(Promise.resolve(data));
      fileStub.writeFile.returns(Promise.resolve("data written"));

      let res = await taskServices.paginateTasks({"page":1,"limit":5},0);
      expect(res).toEqual({status:true,message:paginatedData});

      fileStub.readFile.restore();
      fileStub.writeFile.restore();
  });
});