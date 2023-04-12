const sinon=require("sinon");
const TASK_SERVICES=require("../services/task_services");
const FILE_ACTIONS=require("../utils/file_actions");

test("create test",async ()=>{
    let fileStub = sinon.stub(FILE_ACTIONS);
    fileStub.readFile.returns(Promise.resolve("[]"));
    fileStub.writeFile.returns(Promise.resolve("data written"));
    let taskData={};
    let username="shiv";

    let res=await TASK_SERVICES.createDetailsService(taskData, username);
    expect(res).toBe({status:true,message:"User not found"});

    fileStub.readFile.restore();
    fileStub.writeFile.restore();
});