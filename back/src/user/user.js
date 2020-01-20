const Concept = require("../concept/concept")
class User {

    constructor(nom) {
        this.nom = nom;
        this.concepts = [];
    }

    voteLeft(concept) {
        concept.left()
        this.concepts.push(concept)
    }
    voteRight(concept) {
        concept.right()
        this.concepts.push(concept)
    }
    
}

module.exports = User