class User {

    constructor(nom, conceptsVoted = []) {
        this.nom = nom;
        this.conceptsNameVoted = conceptsVoted;
    }

    voteLeft(concept) {
        concept.left()
        this.conceptsNameVoted.push(concept.nom)
    }

    voteRight(concept) {
        concept.right()
        this.conceptsNameVoted.push(concept.nom)
    }
    
}

module.exports = User