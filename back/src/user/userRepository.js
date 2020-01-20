const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NotreBase', {useNewUrlParser: true});

const UserModel = mongoose.model('User', { 
    nom: String,
    concepts: [String]
});


class UserRepository {

    create(concept) {
        new UserModel({
            nom: concept.nom,
            score: concept.score
        }).save()
    }

    findByNom(nom) {
    }

    findAll() {
    }

    save(concept) {
    }

}

module.exports = UserRepository