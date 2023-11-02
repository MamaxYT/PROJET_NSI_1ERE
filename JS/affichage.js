var moyennes_list = JSON.parse(localStorage.getItem('moyennes'));
var coefficients = JSON.parse(localStorage.getItem('coefficients'));

if(coefficients == null){
    var b = document.getElementById("messagediv");
    var newP = document.createElement('p');
    newP.className = "messageici";
    newP.textContent = "Vous devez d'abord rentrer vos notes. Pour cela appuyer sur 'Nouveau Bulletin', puis completer les deux formulaires.";
    b.prepend(newP);
}
var tableau = document.getElementById("tableau");
var Somme = 0;
var Somme_Coef = 0;

var chart_list = [["Matiere", "Moyenne", { role: 'style' }]];

for(let i = 0; i < moyennes_list.length - 1; i += 2) {
    var ligne = document.createElement("tr");
    ligne.className = "ligne";
    ligne.matiere = moyennes_list[i];

    var nom = document.createElement("td");
    nom.innerHTML = moyennes_list[i];
    nom.className = "nom_matiere";

    var coeff = document.createElement("td");
    coeff.innerHTML = coefficients[i / 2];
    coeff.className = "coeff_matiere";

    var note = document.createElement("td");
    note.innerHTML = moyennes_list[i+1];
    note.className = "note_matiere";

    ligne.appendChild(nom);
    ligne.appendChild(coeff);
    ligne.appendChild(note);
    tableau.appendChild(ligne);

    var color = "#db1702";

    if(parseFloat(moyennes_list[i+1]) >= 10 && parseFloat(moyennes_list[i+1]) < 13) {
        color = "#f4661b";
    }
    if(parseFloat(moyennes_list[i+1]) >= 13 && parseFloat(moyennes_list[i+1]) < 17) {
        color = "#149414";
    }
    if(parseFloat(moyennes_list[i+1]) >= 17) {
        color = "#048b9a";
    }

    chart_list.push([moyennes_list[i], parseFloat(moyennes_list[i+1]), color])

    Somme += moyennes_list[i+1] * parseFloat(coefficients[i / 2]);
    Somme_Coef += parseFloat(coefficients[i / 2]);
}

var Moyenne_G = Somme/Somme_Coef;

ligne = document.createElement("tr");
ligne.className = "ligne";
ligne.matiere = "general";

var nom = document.createElement("td");
nom.innerHTML = "Moyenne générale";
nom.className = "nom_matiere";

var coeff = document.createElement("td");
coeff.className = "coeff_matiere";

arrondi = Moyenne_G*100;
arrondi = Math.round(arrondi);
arrondi = arrondi/100;    

var note = document.createElement("td");
note.innerHTML = arrondi.toString();
note.className = "note_matiere";

ligne.appendChild(nom);
ligne.appendChild(coeff);
ligne.appendChild(note);
tableau.appendChild(ligne);

chart_list.push(["Générale", arrondi, "#fcdc12"]);

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  	var data = google.visualization.arrayToDataTable(chart_list);

    var options = {
        title: "Moyennes",
        legend: 'none',
        width: 900,
        backgroundColor: '#2A2A2A',
        legendTextStyle: { color: '#FFF' },
        titleTextStyle: { color: '#FFF' },
        hAxis: {
            textStyle:{color: '#FFF', fontName: 'Poppins'},
        },
        vAxis: {
            viewWindow: {
                min: 0,
                max: 20
            },
            ticks: [0, 5, 10, 15, 20],
            textStyle:{color: '#FFF', fontName: 'Poppins'},
        },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
  	chart.draw(data, options);
}

localStorage.removeItem('matieres');
localStorage.removeItem('moyennes');
localStorage.removeItem('coefficients');
localStorage.removeItem('message');