
const UserRepository = require("./userRepository")
const User = require('./user')

class UserService {

    constructor() {
        this.userRepository = new UserRepository()
    }

    createUser(nom) {
        return new Promise((resolve) => {
            resolve("TODO")
        })
    }

    findByNom(nom) {
        return new Promise((resolve) => {
            resolve("TODO")
        })
    }

    findAllUsers() {
        return new Promise((resolve) => {
            resolve("TODO")
        })
    }

    voteLeft(nom) {
        return new Promise((resolve) => {
            resolve("TODO")
        })
    }

    voteRight(nom) {
        return new Promise((resolve) => {
            resolve("TODO")
        })
    }


}

module.exports = UserService