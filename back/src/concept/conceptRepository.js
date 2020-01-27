const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/NotreBase', {useNewUrlParser: true});

const ConceptModel = mongoose.model('Concept', { 
    nom: String,
    score: Number
});


class ConceptRepository {

    create(concept) {
        return new ConceptModel({
            nom: concept.nom,
            score: concept.score
        }).save()
    }

    findByNom(nom) {
        return new Promise(resolve => {
            ConceptModel.find({
                nom: nom
            }).then((conceptDocuments) => {
                if (conceptDocuments === null || conceptDocuments.length === 0) {
                    resolve(null)
                } else {
                    resolve(conceptDocuments[0])
                }
            })       
        })
    }

    findAll() {
        return ConceptModel.find({})
    }

    save(concept) {
        this.findByNom(concept.nom).then(conceptDocument => {
            conceptDocument.nom = concept.nom
            conceptDocument.score = concept.score
            return conceptDocument.save()
        })
    }

}

module.exports = ConceptRepository