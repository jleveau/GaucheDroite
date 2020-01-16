
/*
TODO : 
*Bouton Droite qui diminue le score de 1 

*Mise en page
Si le score est de gauche, le nom est ecrit en rouge
Si le score est de droite, le nom est ecrit en bleu

*/

var concepts = [
    {nom : "Lionel" , score : 1},
    {nom : "Victor" , score : 1},
    {nom : "Tifenn" , score : 1},
    {nom : "Julien" , score : 1},
]

const conceptRepository = new ConceptRepository()

//On va chercher les elements du HTML
// # permet de recuperer les elements par leur id
const newConceptButton = document.querySelector("#newConceptButton")
const newConceptInput = document.querySelector("#newConceptInput")
const listConcept = document.querySelector("#listConcept")

// Quand click sur le bouton, on appelle la fonction nouveauSympatisant, 
//comme si on faisait : nouveauSympatisant()
newConceptButton.addEventListener('click', handleNouveauButtonClick)

//Réactualise l'affichage
function afficherConcepts() {
    //On efface tous les li, pour ça
    //On prend le ul, et on enleve tous ses enfants jusqu'a ce que 
    //firstChild ne renvoi plus rien
    while (listConcept.firstChild) {
        listConcept.removeChild(listConcept.firstChild);
    }    
    for(const concept of concepts) {

        //On crée un item dans la liste
        const li = document.createElement('li')
        li.classList.add("concept-list-item")
        
        const spanNom = document.createElement('span')
        const spanScore = document.createElement('span')
        const buttonVoteGauche = document.createElement('button')
        const buttonVoteDroite = document.createElement('button')

        buttonVoteGauche.innerText = "Gauche"
        buttonVoteGauche.className = "button-vote"

        buttonVoteDroite.innerText = "Droite"
        buttonVoteDroite.className = "button-vote"


        //On ajoute une fonction au bouton. 
        buttonVoteGauche.addEventListener('click', function() {
            plusdegauche(concept)
        })

        buttonVoteDroite.addEventListener('click' , function() {
            plusdedroite(concept)
        })

        spanNom.innerText = concept.nom 
        spanScore.innerText = concept.score
        //On ajoute tous les sous composant dans le li
        li.appendChild(spanNom)
        li.appendChild(spanScore)
        li.appendChild(buttonVoteGauche)
        li.appendChild(buttonVoteDroite)
        // on ajoute le li au ul
        listConcept.appendChild(li)

        if (concept.score < 0) {
            spanNom.style.color = "blue";
        } else spanNom.style.color ="red"; 
    }
}

function handleNouveauButtonClick() {
    //On lit la valeur de l'iput newConceptInput
    //La valeur correspond au text dans l'input
    const nom = newConceptInput.value
    conceptRepository.
    concepts.push({
        nom: nom,
        score: 1
    })
    afficherConcepts()
}

function plusdegauche(concept) {
    concept.score++
    //On réactualise l'affichage
    afficherConcepts()
}

function plusdedroite(concept) {
    concept.score--
    afficherConcepts()
}

afficherConcepts()
