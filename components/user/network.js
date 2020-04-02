const express = require ('express')

const response = require('../../network/response')
const Controller = require ('./index')

const router = express.Router()

router.get('/',function(req,res){
  Controller.list()
    .then((user) => {
      response.success(req,res,user,200)
    })
    .catch((err) => {
      response.error(req,res,err.message,500)
    });
})

router.get('/:id',function(req,res){
  Controller.get(req.params.id)
    .then((result) => {
      response.success(req,res,result,200)
    })
    .catch((err) => {
      response.error  (req,res,err.message,500)
    });
})

router.put('/:id',function(req,res){
  Controller.upsert(req.body)
    .then ((user) => {
      response.success(req,res,user,201)
    })
    .catch((err) => {
      response.error  (req,res,err.message,500)
    });
})

router.post('/:id',function(req,res){
  Controller.upsert(req.body)
    .then ((user) => {
      response.success(req,res,user,201)
    })
    .catch((err) => {
      response.error  (req,res,err.message,500)
    });
})

router.delete('/:id',function(req,res){
  Controller.get(req.params.id)
    .then((result) => {
      response.success(req,res,result,200)
    })
    .catch((err) => {
      response.error  (req,res,err.message,500)
    });
})

module.exports = router