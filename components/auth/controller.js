// const auth = require('../../auth')

const TABLA = 'auth'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!injectedStore){
    store = require ('../../store/dummy')
  }

  async function login(username,password){
    const data = await store.query(TABLA,{username:username})
    console.log(data)
    
    if (data.password === password) {
      return 'TOKEN'
    } else {
      throw new Error ('invalid Information 2')
    }
  }

  function upsert(data){
    const authData={
      id:data.id
    }
    if(data.username) {
      authData.username = data.username
    }

    if(data.password) {
      authData.password = data.password
    }

    return store.upsert(TABLA, authData)

  }

  return{
    upsert,
    login,
  }

}