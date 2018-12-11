var card_array=["img/01.BMP","img/02.BMP","img/03.BMP","img/04.BMP","img/05.BMP","img/06.BMP","img/07.BMP",
"img/08.BMP","img/09.BMP","img/10.BMP","img/11.BMP","img/11.BMP","img/12.BMP","img/13.BMP","img/14.BMP","img/15.BMP",
"img/16.BMP","img/17.BMP","img/18.BMP","img/19.BMP","img/20.BMP","img/21.BMP","img/22.BMP","img/23.BMP","img/24.BMP",
"img/25.BMP","img/26.BMP","img/27.BMP","img/28.BMP","img/29.BMP","img/30.BMP","img/31.BMP","img/32.BMP","img/33.BMP",
"img/34.BMP","img/35.BMP","img/36.BMP","img/37.BMP","img/38.BMP","img/39.BMP","img/40.BMP","img/41.BMP","img/42.BMP",
"img/43.BMP","img/44.BMP","img/45.BMP","img/46.BMP","img/47.BMP","img/48.BMP","img/49.BMP","img/51.BMP","img/52.BMP"];

var score_array=[1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10];

var index = 0;
var player_score = 0;
var bank_score = 0;
var score = 0;

//ELEMENTS HTML
var divJS = document.getElementById('div2');
var player_card = document.getElementById("player_card");
var bank_card = document.getElementById("bank_card");
var updated = document.getElementById("Modified")
var updated2 = document.getElementById("Modified_bank");


function creerImg(chemin) {
    var img = document.createElement('img');
    img.src = chemin;
    return img;
}


function Pick_a_card(index){
    var new_card=card_array[index];
    while (new_card == "picked"){
        index = Math.floor((Math.random() * 52));
        new_card=card_array[index];
    }
    card_array[index] = "picked";
    return new_card
}


function getPlayerCard() {
    index = Math.floor((Math.random() * 52)); // Recupere un nombre entre 0 et 52
    var player = Pick_a_card(index)
    var newImg = creerImg(player);
    divJS.appendChild(newImg);
    player_score = Player_count(index,player_score,player);
    if (player_score > 21){
        updated.textContent = "";
        updated2.textContent = "Vous avez perdu.";
    }
    else {
        updated.textContent = "Vous avez "+ player_score +". Carte ou Reste?";

    }
    
}   

function getBankCard(){
    for (var i=0; i<4; i++) {
        var index2 = Math.floor((Math.random() * 52)); // Recupere un nombre entre 0 et 52
        var bank = Pick_a_card(index2);    
        var newImg = creerImg(bank);
        var divJS = document.getElementById('div1');
        divJS.appendChild(newImg);
        bank_score = Player_count(index2,bank_score,bank);
        if (bank_score > 21){
            updated2.textContent = "Vous avez gagne.";
            updated.textContent = "";
            break
            
        }
        else if (bank_score<21 & bank_score>player_score) {
            updated2.textContent = "Vous avez perdu"
            updated.textContent ="";   
            break    
        }
        else {
            updated2.textContent = "La banque a "+ bank_score;
        }
    if (bank_score < player_score){
        updated2.textContent = "Vous avez gagne.";
        updated.textContent = "";
    }
    if (bank_score == player_score){
        updated2.textContent = "Egalite";
        updated.textContent = "";  
    }    
    }   
}

function Player_count(index,scored,card){
    if (card == "img/01.BMP" || card == "14.BMP" || card == "27.BMP" || card =="40.BMP"){
        var add_score = 1
    }
    else {
        var add_score = score_array[index-1];
    }
    new_score = scored + add_score ;
    return new_score
}

function Reset_game(){
    location.reload();
}

function setupListeners() {
    var play = document.getElementById("card_button");
    var pass = document.getElementById("stop_button");
    var reset = document.getElementById("restart_button")
    play.addEventListener("click",getPlayerCard);
    pass.addEventListener("click",getBankCard)
    reset.addEventListener("click",Reset_game)
}

window.addEventListener("load",setupListeners); 