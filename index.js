var concepts = [
    "jospin",
    "mergez"
]

concepts.push("Victor", "Tifenn", "Julien")


/*
TODO
AJouter un element dans la liste des sympatisants
Pour cela, on pourra utiliser la fonction push.
Par exemple en faisant : concepts.push(MonNouveauSympatisant)

On veut pouvoir utiliser :
node index ajouter Victor
pour afficher  ["jospin", "mergez", "Victor"]
*/

//Permet de recuperer les variable en argument de la commande. 
// example : node index jospin    <-- process.argv[0] = node, process.argv[1] = index,  process.argv[2] = jospin
var command = process.argv[2]
var command2 = process.argv[3]



//On declare la fonction "degauche", qui prend en parametre "dequionparle"
// On pourra la reutiliser avec degauche("toto"), ici dequionparle = "toto"
function degauche(dequionparle){
    for (var i = 0; i < concepts.length; i++) {
        if(concepts[i] === dequionparle){
            //Arrete la fonction, et retourne la valeur
            return true 
        }
    }
    return false 
}

function displayList() {
    // 1 => initialisation, on declare i qui vaut 0
    // 2 => condition de fin, on arrete lorsque i n'est plus plus petit que la longueur du tableau
    // 3 => i avance de 1 en 1, i++ peut se lire i = i+1
    for (var i = 0; i < concepts.length; i++) {
        console.log(concepts[i])
    }
}

//Si l'argument utilisé est "list"
if (command === "list") {
    displayList()

// Si c'est autre chose
} else {
    //On recupere la valeur retournée par la fonction
    var bilan = degauche(command)

    //On vérifie le resultat de la fonction
    if (bilan === true) {
        console.log("de gauche")
    } else {
        console.log("de droite")
    }
}

console.log(concepts)

