const frisby = require('frisby');
const Joi = frisby.Joi;

// 配置参数
const tenantId = 'aaa';

frisby.globalSetup({
  request: {
    headers: {
      'tenantId': tenantId,
      'Content-Type': 'application/json',
    }
  }
});

it('add advance schema', function () {
  return frisby.post('http://localhost:8071/projects',{
    "projectName":"test pro",
    "creator":"test",
    "projectType":"ONESERVICE"})
  .expect('status', 200)
  .expect('json','code', 0)
  .expect('jsonTypes', 'data', {
    id: Joi.string().required(),
    projectName: Joi.string().required()
  })
  .then(function(res){
    let projectId = res.json.data.id;
    post(projectId);
  })
});

// 配置参数

const topicName = 'EMdmCuCorp';
const topicVersion = 'v1';
const cubeFile = '{\"oneservice\":\"v1\",\"measures\":{\"count\":{\"sql\":\"sum(${CUBE}.thrdr)\",\"type\":\"number\",\"drillMembers\":[\"code\",\"istatus\"]}},\"dimensions\":{\"code\":{\"sql\":\"code\",\"type\":\"string\",\"title\":\"code\"},\"num\":{\"sql\":\"${CUBE}.thrdr\",\"type\":\"number\",\"title\":\"number\"},\"istatus\":{\"sql\":\"istatus\",\"type\":\"string\",\"title\":\"istatus\"},\"name\":{\"sql\":\"name\",\"type\":\"string\",\"title\":\"name\"},\"description\":{\"sql\":\"description\",\"type\":\"string\",\"title\":\"description\"},\"gmtcreate\":{\"sql\":\"gmtCreate\",\"type\":\"time\",\"title\":\"gmtcreate\"},\"id\":{\"sql\":\"id\",\"type\":\"string\",\"title\":\"id\"},\"gmtmodified\":{\"sql\":\"gmtModified\",\"type\":\"time\",\"title\":\"gmtmodified\"},\"shortname\":{\"sql\":\"shortname\",\"type\":\"string\",\"title\":\"shortname\"},\"supmd\":{\"sql\":\"supmd\",\"type\":\"string\",\"title\":\"supmd\"}},\"dataSource\":\"default\"}';

// 新增schema
function post(projectId){
  let schemaId;
  return frisby.post('http://localhost:8071/advancedschema',{
    "creator": "test",
    "cubeFile": cubeFile,
    "force": true,
    "projectId": projectId,
    "topicName": topicName,
    "topicVersion": topicVersion
  })
  .expect('status', 200)
  .expect('json','code', 0)
  .expect('json','data',{

  })
  .expect('jsonTypes', 'data', {
    id: Joi.string().required(),
    topicName: topicName,
    currentVersion: Joi.string().required(),
    validStatus: true,
    storageStatus: true
  })
}