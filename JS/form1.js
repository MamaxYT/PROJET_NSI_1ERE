var matieres = [];
var coefficients = [];

function envoie(){
    var inputs = document.getElementsByClassName("input");
    var coefs = document.getElementsByClassName("inputcoef");

    for(let i=0; i<inputs.length; i++){
        if(inputs[i].checked == true){
            matieres.push(inputs[i].value);
            coefficients.push(coefs[i].value);
        }
    }

    var JSONlistemat = JSON.stringify(matieres);
    localStorage.setItem('matieres', JSONlistemat)

    var JSONlistecoef = JSON.stringify(coefficients);
    localStorage.setItem('coefficients', JSONlistecoef)
}

function Affichage_Coef(matiere){
    if (document.getElementById(matiere + "_check").checked){
        document.getElementById(matiere).style.display = "block";
    }
    else {
        document.getElementById(matiere).style.display = "none";
    }
}

function pref1ere(){
    document.getElementById("Français").value = '10';
    document.getElementById("LVA").value = '5';
    document.getElementById("LVB").value = '5';
    document.getElementById("LVC").value = '5';
    document.getElementById("HG").value = '5';
    document.getElementById("EMC").value = '2';
    document.getElementById("ES").value = '5';
    document.getElementById("Spe1").value = '16';
    document.getElementById("Spe2").value = '16';
    document.getElementById("Spe3").value = '16';
    document.getElementById("Sport").value = '5';
    document.getElementById("Religion").value = '2';
}

function all_check(){
    var inputs = document.getElementsByClassName("input");
    var coefs = document.getElementsByClassName("inputcoef");

    if (document.getElementById("all_check").checked == true){
        for(let i=0; i<inputs.length; i++){
            inputs[i].checked = true;
        }
        for(let i=0; i<coefs.length; i++){
            document.getElementById(coefs[i].id).style.display = "block";
        }
    }
    else {
        for(let i=0; i<inputs.length; i++){
            inputs[i].checked = false;
        }
        for(let i=0; i<coefs.length; i++){
            document.getElementById(coefs[i].id).style.display = "none";
        }
    }        
}