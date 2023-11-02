// On récupère les matières avec les coefficients choisis dans le form1
var matieres = JSON.parse(localStorage.getItem('matieres'));

// Transforme les listes JSON en listes normales
var matieres_tab = [];

var matieres_dict = [];
var coef_dict = [];

matieres.forEach((matiere) => { matieres_tab.push(matiere); });

// On récupère l'élément <tableau>
var tableau = document.getElementById("tableau");
// On crée une liste qui contiendra toutes les lignes du tableau
var lignes = []

// On crée les lignes du tableau
for(let i = 0; i < matieres_tab.length; i++) {
    // On initialise le nombre de notes de toutes les matières à 0
    matieres_dict[matieres_tab[i]] = [0];

    // On crée un élément ligne
    var ligne = document.createElement("tr");
    ligne.className = "ligne";
    ligne.matiere = matieres_tab[i];

    // On ajoute la ligne dans la liste de lignes
    lignes.push(ligne);

    // On crée la case du nom de la matière
    var nom = document.createElement("td");
    nom.innerHTML = matieres_tab[i];
    nom.className = "nom_matiere";

    // On crée la case des inputs de note et de coefficient
    var hp = document.createElement("td");
    hp.className = 'hp';

    // On ajoute les cases créées à la ligne
    ligne.appendChild(nom);
    ligne.appendChild(hp);

    // On crée les inputs vides de note et de coefficient
    newNote(matieres_tab[i]);

    // On ajoute la ligne au tableau
    tableau.appendChild(ligne);
}

/* Fonction newNote :
Effet : Crée et ajoute un nouvel input de note et de coefficient à la ligne correspondante à la matière donnée en entrée.
Entrée : Une chaîne de caractère (le nom de la matière à laquelle on veut ajouter un input note et coefficient).
*/

function newNote(matiere) {
    // On ajoute un au nombre de notes de la matière
    matieres_dict[matiere][0] += 1;

    // On crée l'élément <input> pour la note
    var note_input = document.createElement("input");
    note_input.type = "text";
    note_input.id = matiere + matieres_dict[matiere][0];
    note_input.placeholder = "Note"
    note_input.matiere = matiere;
    note_input.number = matieres_dict[matiere][0];
    note_input.className = "canon";
    note_input.addEventListener("input", noteEntree);

    // On crée l'élément <input> pour le coefficient
    var coeff_input = document.createElement("input");
    coeff_input.type = "text";
    coeff_input.id = matiere + matieres_dict[matiere][0];
    coeff_input.className = "canon";
    coeff_input.placeholder = "Coeff.";
    coeff_input.value = "1";

    // On crée une <div> dans laquelle on va mettre les inputs de la note et du coefficient
    var div = document.createElement("div");
    div.id = "note";

    // On met les inputs de la note et du coefficient dans la <div>
    div.appendChild(note_input);
    div.appendChild(coeff_input);

    // On ajoute la <div> à la ligne correspondant à la bonne matière
    lignes.forEach((ligne) => {
        if(ligne.matiere == matiere) {
            ligne.childNodes[1].appendChild(div);
        }
    });
}

/* Fonction noteEntree :
Effet : Une fonction qui s'appelle à chaque fois que l'utilisateur entre un caractère dans l'input note.
        Si l'input est vide, crée un nouvel input note est coefficient dans la ligne.
        Si l'input est rempli et que l'utilisateur l'efface, supprime cet input.
*/

function noteEntree(event) {
    // Le cas où l'input est vide
    if(event.target.number == matieres_dict[event.target.matiere][0]) {
        newNote(event.target.matiere);
    }

    // Le cas où l'utilisateur supprime le contenu de l'input
    if(event.target.value == '') {
        // On cherche la ligne correspondante à la matière de l'input
        lignes.forEach((ligne) => {
            // On teste si la matière de la ligne correspond à la matière de l'input et si l'input n'est pas le premier de la ligne
            if(ligne.matiere == event.target.matiere && event.target.number != 0) {
                // On récupère la <div> de la note qui vient d'être supprimée
                var child = ligne.childNodes[1].childNodes[event.target.number - 1];
                // On supprime cette <div>
                ligne.childNodes[1].removeChild(child);
                
                // On enlève 1 au numéro de chaque input qui se situe après celui qui vient d'être supprimé
                for(let i = event.target.number; i < matieres_dict[event.target.matiere][0]; i++){
                    ligne.childNodes[1].childNodes[i - 1].childNodes[0].number -= 1;
                }

                // On enlève 1 au nombre de notes de la matière correspondante à l'input qui vient d'être supprimé
                matieres_dict[event.target.matiere][0] -= 1;
            }
        });
    }
} 

/* Fonction calculs :
Effet : Récupère les notes et coefficients de tout les inputs puis fait la moyenne de chaque matière
*/

function calculs() {
    var coef_dict = [];

    lignes.forEach((ligne) => {
        coef_dict[ligne.matiere] = [];
        for (let j = 0; j < matieres_dict[ligne.matiere][0]; j++){
            inputNote = ligne.childNodes[1].childNodes[j].childNodes[0];
            matieres_dict[inputNote.matiere].push(inputNote.value);

            inputCoeff = ligne.childNodes[1].childNodes[j].childNodes[1];
            coef_dict[inputNote.matiere].push(inputCoeff.value);
        }
        //Pour enlever les valeurs résiduelles
        matieres_dict[ligne.matiere].pop();
        coef_dict[ligne.matiere].pop();
    });

    var moyennes_list = [];
    
    var i = 0;
    for (matiere in matieres_dict){
        var somme = 0;
        var somme_coef = 0;
        var moyenne_note = 0;

        for (let j = 1; j < matieres_dict[matiere].length; j++){
            note = matieres_dict[matiere][j].replace(',', '.');
            coeff = coef_dict[matiere][j-1].replace(',', '.');

            somme += parseFloat(note) * parseFloat(coeff);
            somme_coef += parseFloat(coeff);
        }  

        moyenne_note = (somme)/(somme_coef);
        moyenne_note *= 100;
        moyenne_note = Math.ceil(moyenne_note);
        moyenne_note /= 100; 

        moyennes_list[i] = matiere;
        moyennes_list[i+1] = moyenne_note;
        i += 2;
    }
 
    var JSONmoyenne_list = JSON.stringify(moyennes_list);
    localStorage.setItem('moyennes', JSONmoyenne_list);
    var message = 1;
    localStorage.setItem('message', message);
}

