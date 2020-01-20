class Concept {

    constructor(nom, score) {
        this.nom = nom;
        this.score = score;
    }

    left() {
        this.score++
    }
    right() {
        this.score--
    }
}

module.exports = Concept