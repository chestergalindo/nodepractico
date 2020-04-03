const {nanoid} = require('nanoid')
const auth = require('../auth/index')

const TABLA = 'user'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!injectedStore){
    store = require ('../../store/dummy')
  }

  function list () {
    return store.list(TABLA)
  }

  function get (id) {
    return store.get(TABLA,id)
  }

  async function upsert (body) {
    const user = {
      name:body.name,
      name:body.username
    }
    if (body.id) {
      user.id = body.id
    }else{
      user.id=nanoid()
    }

    if (body.password || body.username){
      await auth.upsert({
        id: user.id,
        userName: user.username,
        password: body.password
      })
    }

    return store.upsert(TABLA, user)
  }
  
  function remove (id) {
    return store.remove(TABLA,id)
  }

  return{
    list,
    get,
    upsert,
    remove,
  }
}