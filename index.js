const express = require('express');
const server = express();

server.use(express.json());

const projects = [];
var count=0;
//middlewares


function checkIdExist(req, res, next){
  const { id } = req.params
  const result = projects.find(compareId => compareId.id === id);
  if(!result){
    return res.json("Id does not exist");
  }
  return next();
}

function countRequest(req,res,next){
  count++;
  console.log("Número de requisições: ",count);
  return next();
}
server.use(countRequest);
//crud
server.get('/projects', (req, res) => {

  return res.json(projects);
});

server.post('/projects', (req, res) =>{
  const{ id,title} = req.body;
  

  projects.push({id,title,tasks:[]});

  return res.json(projects);
});

server.post('/projects/:id/tasks',checkIdExist , (req, res) =>{
  const { id } = req.params;
  const { tasks } = req.body;

  const result = projects.find(compareId => compareId.id === id);
  result.tasks.push(tasks);

  return res.json(projects);
});

server.put('/projects/:id',checkIdExist , (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;
  
  const result = projects.find(compareId => compareId.id === id);
  result.title = title;
  
  return res.json(projects);
});

server.delete('/projects/:id',checkIdExist , (req, res) =>{
  const { id } = req.params;

  const resultIndex = projects.findIndex(compareId => compareId.id === id);
  
  projects.splice(resultIndex, 1);

  return res.json('Projeto deletado');
});

server.listen(3000);