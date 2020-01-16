const DEFAULT_SCORE = 1
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NotreBase', {useNewUrlParser: true});

const ConceptModel = mongoose.model('Concept', { 
    name: String 
});

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

class ConceptRepository {
    
    constructor() {
        this.concepts = []
    }

    create(nom) {
        let newConcept = new Concept(nom, DEFAULT_SCORE)
        this.concepts.push(newConcept)
    }

    save(concept) {
        let newConcept = new ConceptModel({
            name: concept.nom
        })
        return newConcept.save()
    }

}