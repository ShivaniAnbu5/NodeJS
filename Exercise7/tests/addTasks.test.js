const sinon=require("sinon");
const taskServices = require('../services/tasksServices')
const fileActions=require("../utils/fileActions");
const axios=require("axios");
const constants = require('../constants/constants');

let auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkaSIsImlhdCI6MTY4MTMwMDEyMCwiZXhwIjoxNjgxMzA3OTIwfQ.xjnoVOSpVkW37pzmmAXg3HHp7-1dVIjOlu0mogZlo8Q";
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

let taskData = {
        "title": "third",
        "description": "This is task3",
        "priority": "low",
        "dueDate": "2025-4-15",
        "comments": "['cmnt1','cmnt2','cmnt3']"
        }

describe("Adding Task", () => {
  test("Adding task with no token",async()=>{
    let res=await axios({
      method: "post",
      url:"http://localhost:4006/tasks/task",
      headers: {},
      data: {taskData},
    }).catch(err=>{
      expect(err.response.data).toBe(constants.TOKEN_EXPIRED);
    });
  });
    test("Adding task with no data",async()=>{
      let res=await axios({
        method: "post",
        url:"http://localhost:4006/tasks/task",
        headers: {'Authorization': auth},
        body: {},
      });
      expect(res.data).toBe("Body is empty")
      });

    test("Adding task with some data",async()=>{
      let res=await axios({
        method: "post",
        url:"http://localhost:4006/tasks/task",
        headers: {'Authorization': auth},
        data: {
          "title": "third",
          "description": "This is task3",
          "priority": "low",
          "dueDate": "2025-4-15",
        },
      });
      expect(res.data).toBe("Fill all the fields")
      });
    test("adding task correctly",async ()=>{
        let fileStub = sinon.stub(fileActions);
        fileStub.readFile.returns(Promise.resolve(data));
        fileStub.writeFile.returns(Promise.resolve("data written"));

        let res = await taskServices.createDetailsService(taskData, 0);
        expect(res).toEqual({status:true,message:"Created task"});

        fileStub.readFile.restore();
        fileStub.writeFile.restore();
    });

});