const ConceptService = require("./concept/conceptService")
const UserService = require("./user/userService")

// Pour lancer la base de données. 
// Dans un terminal de commande (cmd par exemple)
// mongod

//Pour consulter la base de données :
// Robo3T
// NotreBase -> Collections

let conceptService = new ConceptService()
let userService = new UserService(conceptService)

userService.getNextConceptToVote("Vincent").then(concept => console.log(concept))
