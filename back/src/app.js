const ConceptService = require("./concept/conceptService")
const UserService = require("./user/userService")
let conceptService = new ConceptService()
let userService = new UserService()

userService.createUser().then((todo) => {
    console.log(todo)
})
