
const ConceptRepository = require("./conceptRepository")
const Concept = require('./concept')
const DEFAULT_SCORE = 1

class ConceptService {

    constructor() {
        this.conceptRepository = new ConceptRepository()
    }

    createConcept(nom) {
        const concept = new Concept(nom, DEFAULT_SCORE)
        return this.conceptRepository.create(concept)
    }

    findByNom(nom) {
        return new Promise((resolve) => {
            this.conceptRepository.findByNom(nom).then(function(conceptData)  {
                resolve(new Concept(conceptData.nom, conceptData.score))
            })
        })
    }

    findAllConcepts() {
        return new Promise((resolve) => {
            let concepts = []
            this.conceptRepository.findAll().then(function(conceptsData) {
                if (conceptsData === null) {
                    resolve(null)
                    return
                }
                for(const conceptData of conceptsData) {
                    concepts.push(new Concept(conceptData.nom, conceptData.score))
                }
                resolve(concepts)
            })
        })
    }


    left(nom) {
        return new Promise(resolve => {
            this.findByNom(nom)
            .then(concept => {
                concept.left()
                return this.conceptRepository.save(concept)
            })
            .then(concept => {
                resolve(concept)
            })
        })
    }

    right(nom) {
        return new Promise(resolve => {
            this.findByNom(nom)
            .then(concept => {
                concept.right()
                return this.conceptRepository.save(concept)
            })
            .then(concept => {
                resolve(concept)
            })
        })
    }


}

module.exports = ConceptService