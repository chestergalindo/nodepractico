const bcrypt = require('bcrypt')
const auth = require('../../auth/index')

const TABLA = 'auth'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!injectedStore){
    store = require ('../../store/dummy')
  }

  async function login(username,password){
    const data = await store.query(TABLA,{username:username})

    bcrypt.compare(password,data.password)
    .then((sonIguales) => {
      if (sonIguales === true) {
        return auth.sign(data)
      } else {
        throw new Error ('invalid Information')
      }
    })
  }

  async function upsert(data){
    const authData={
      id:data.id
    }
    if(data.username) {
      authData.username = data.username
    }

    if(data.password) {
      authData.password = await bcrypt.hash(data.password,5)
      console.log(authData)
    }

    return store.upsert(TABLA, authData)

  }

  return{
    upsert,
    login,
  }

}