const ConceptService = require("./concept/conceptService")
const UserService = require("./user/userService")

// Pour lancer la base de données. 
// Dans un terminal de commande (cmd par exemple)
// mongod

//Pour consulter la base de données :
// Robo3T
// NotreBase -> Collections

let conceptService = new ConceptService()
let userService = new UserService()


userService.voteLeft("Vincent")
    // ici le then prend une fonction en parametre, cette fonction ne contient qu'une seule instruction
    // On peut donc ne pas mettre d'accolade ni de return. La fonction return la valeur de retour de l'instruction seule
    .then(() => userService.findAllUsers())
    // la fonction en paramettre de then reçoit le resultat de findAllUsers()
    .then((users) => console.log(users))
