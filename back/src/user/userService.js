
const UserRepository = require("./userRepository")
const User = require('./user')

class UserService {

    constructor() {
        this.userRepository = new UserRepository()
    }

    // La fonction retourne la promesse de la création d'un User. 
    //Le user créé suit la classe User, définie dans user.js, pas un document de base de donnée.
    createUser(nom) {
        return new Promise(resolve => {
            const user = new User(nom)
            this.userRepository.create(user).then(() => {
                resolve(user)
            })
        })
    }

    findByNom(nom) {
        return new Promise((resolve) => {
            this.userRepository.findByNom(nom).then(function(userData)  {
                resolve(new User(userData.nom, userData.conceptsVoted))
            })
        })
    }

    findAllUsers() {
        return new Promise((resolve) => {
            let users = []
            this.userRepository.findAll().then((usersData) => {
                for (const userData of usersData) {
                    users.push(new User(userData.nom, userData.conceptsVoted))
                }
                resolve(users)
            })
        })
    }

    // La fonction retourne la promesse d'aller demander au repository d'aller chercher un user en base de donnée. 
    // Puis Construit un User, tel que défini dans user.js
    // Puis la fonction demande au User créé de voter à gauche.
    // Enfin la fonction demande au repository, de mettre à jour les données du user.
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