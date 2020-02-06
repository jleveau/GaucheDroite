
const UserRepository = require("./userRepository")
const User = require('./user')

class UserService {

    constructor(conceptService) {
        this.userRepository = new UserRepository()
        this.conceptService = conceptService
        //this.selectNextVoteStrategy = firstElementStrategy
        // this.selectNextVoteStrategy = mostPopularStrategy    
         this.selectNextVoteStrategy = leastPopular
        //this.selectNextVoteStrategy = randomStrategy
    }

    // La fonction retourne la promesse de la création d'un User. 
    //Le user créé suit la classe User, définie dans user.js, pas un document de base de donnée.
    createUser(nom) {
        return new Promise(resolve => {
            const user = new User(nom)
            this.userRepository.create(user).then(() => {
                resolve(user)
            })
        })
    }

    findByNom(nom) {
        return new Promise((resolve) => {
            this.userRepository.findByNom(nom).then(function(userData)  {
                resolve(new User(userData.nom, userData.conceptsVoted))
            })
        })
    }

    findAllUsers() {
        return new Promise((resolve) => {
            let users = []
            this.userRepository.findAll().then((usersData) => {
                for (const userData of usersData) {
                    users.push(new User(userData.nom, userData.conceptsVoted))
                }
                resolve(users)
            })
        })
    }

    // La fonction retourne la promesse d'aller demander au repository d'aller chercher un user en base de donnée. 
    // Puis Construit un User, tel que défini dans user.js
    // Puis la fonction demande au User créé de voter à gauche.
    // Enfin la fonction demande au repository, de mettre à jour les données du user.
    voteLeft(conceptName, userName) {
        let user;
        let concept;

        return this.findByNom(userName)
        .then(userFound => {
            user = userFound
            return this.conceptService.findByNom(conceptName)
        })
        .then(conceptFound => {
            concept = conceptFound
            return this.conceptService.left(conceptName)
        })
        .then(() => {
            user.voteLeft(concept)
            return this.userRepository.save(user)
        })
    }

    voteRight(userName, conceptName) {
        let user;
        let concept;

        return this.findByNom(userName)
        .then(userFound => {
            user = userFound
            return this.conceptService.findByNom(conceptName)
        })
        .then(conceptFound => {
            concept = conceptFound
            return this.conceptService.right(conceptName)
        })
        .then(() => {
            user.voteRight(concept)
            return this.userRepository.save(user)
        })
    }

    getUserConceptsVoted(userName) {
        return new Promise(resolve => {
            this.findByNom(userName).then(user => {
                const conceptPromises = []
                for (const conceptName of user.conceptsNameVoted) {
                    conceptPromises.push(this.conceptService.findByNom(conceptName))
                }
                return Promise.all(conceptPromises)
            }).then(concepts => {
                resolve(concepts)
            })
        })
    }

    getUserConceptsNotVoted(userName) {
        let allConcepts
        let votedConcepts

        return new Promise(resolve => {
            this.conceptService.findAllConcepts().then(allConceptsFound => {
                allConcepts = allConceptsFound
                return this.getUserConceptsVoted(userName)
            })
            .then(votedConceptFound => {
                votedConcepts = votedConceptFound

                for (const votedConcept of votedConcepts) {
                    for (let i = 0; i < allConcepts.length; ++i) {
                        if (allConcepts[i].nom === votedConcept.nom) {
                            allConcepts.splice(i, 1)
                            break
                        }
                    }
                }
                resolve(allConcepts)
            })
        })
    }

    getNextConceptToVote(userName) {
        return new Promise(resolve => {
            this.getUserConceptsNotVoted(userName).then(concepts => {
                let concept = this.selectNextVoteStrategy(concepts)
                resolve(concept)
            })
        })
    }

}

function randomStrategy(concepts) {
    let random_index = Math.floor(Math.random() * concepts.length)
    return concepts[random_index]
}

function firstElementStrategy(concepts) {
    return concepts[0];

} 

function mostPopularStrategy(concepts) {
    for(concept of concepts) {
        for(let i=0; i<concepts.length; ++i) {
            var max = Math.max(concepts[i].score);
        } 
        if (concept.score >= max) {
             return concept
        }  
     }
}
        

function leastPopular(concepts) {
    for(concept of concepts) {
        for(let i=0; i<concepts.length; ++i) {
            var min = Math.min(concepts[i].score);
        } 
        if (concept.score <= min) {
            return concept
        }  
    }
}


module.exports = UserService