const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NotreBase', {useNewUrlParser: true});

const UserModel = mongoose.model('User', { 
    nom: String,
    conceptsVoted: [String]
});


class UserRepository {

    // la fonction save, de userDocument, retourne la promesse de sauvegarder les données mises dans userDocument.
    // Lorsque l'on fait return userDocument.save(), on retourne la promesse que la création sera faite plus tard.
    create(user) {
        let userDocument = new UserModel({
            nom: user.nom,
            conceptsVoted: []
        })
        return userDocument.save()
    }

    // Ici la fonction find prend un paramettre qui aide a filtrer les resultats.
    //Chaque attribut de l'objet en parametre de l'appel à find, represente un attribut de l'objet en base de données.
    // Si la valeur de l'objet est egale à celle donnée en valeur au filtre, alors, les données de l'objet en base sont retournées, sous la forme d'un Document.
    findByNom(nom) {
        return new Promise(resolve => {
            UserModel.find({
                //On filtre sur l'attribut nom, pour ne garder que les User qui ont un attribut nom egal à celui passé en parametre
                nom: nom
            })
            //La fonction find retourne un tableau, meme si il ne contient qu'un seul element.
            .then((userDocuments) => {
                //Si il n'y a pas de resultat, ou que le resultat est un tableau vide. Alors on ne retourne rien
                if (userDocuments === null || userDocuments.length === 0) {
                    resolve(null)
                } else {
                //Sinon, on retourne le premier element
                    resolve(userDocuments[0])
                }
            })       
        })
    }

    findAll() {
        // Un set est un ensemble sur lequel qui fonctionne comme un tableau, mais qui ne contient aucun doublon.
        // La fonction add, permet d'ajouter un element (pas de fonction push), la fonction has, permet de verifier la presence d'un element
        let userSeen = new Set()
        return UserModel.find({}).then(userDocuments => {
            let documents = userDocuments.filter((userDocument) => {
                if (userSeen.has(userDocument.nom)) {
                    return false
                } else {
                    userSeen.add(userDocument.nom)
                    return true
                }
            })
        })
    }

    //Sauvegarde un User tel que defini dans user.js, pour mettre à jour ses données.
    save(user) {
        return new Promise(resolve => {
            // On réutilise les fonctions écrites plus haut
            this.findByNom(user.nom).then(userDocument => {
                userDocument.nom = user.nom;
                userDocument.conceptsVoted = user.conceptsVoted
                userDocument.save().then(() => {
                    resolve()
                })
            })
        })
    }

}

module.exports = UserRepository