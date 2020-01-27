class User {

    constructor(nom, conceptsVoted = []) {
        this.nom = nom;
        this.conceptsVoted = conceptsVoted;
    }

    voteLeft(concept) {
        concept.left()
        this.conceptsVoted.push(concept)
    }

    voteRight(concept) {
        concept.right()
        this.conceptsVoted.push(concept)
    }
    
}

module.exports = User