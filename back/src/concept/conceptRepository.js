const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/NotreBase', {useNewUrlParser: true});

const ConceptModel = mongoose.model('Concept', { 
    nom: String,
    score: Number
});


class ConceptRepository {

    create(concept) {
        new ConceptModel({
            nom: concept.nom,
            score: concept.score
        }).save()
    }

    findByNom(nom) {
        return new Promise(resolve => {
            ConceptModel.find({
                nom: nom
            }).then((conceptsMongoose) => {
                if (conceptsMongoose === null || conceptsMongoose.length === 0) {
                    resolve(null)
                } else {
                    resolve(conceptsMongoose[0])
                }
            })       
        })
    }

    findAll() {
        return ConceptModel.find({})
    }

    save(concept) {
        this.findByNom(concept.nom).then(conceptMongoose => {
            conceptMongoose.nom = concept.nom
            conceptMongoose.score = concept.score
            return conceptMongoose.save()
        })
    }

}

module.exports = ConceptRepository