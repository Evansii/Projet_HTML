var card_list = []
card_list[0] = "never_used";
card_list[1] = "place_holder"
card_list[2] = ["img/02.BMP","img/15.BMP","img/28.BMP","img/41.BMP"]; // pierre x
card_list[3] = ["img/03.BMP","img/16.BMP","img/29.BMP","img/42.BMP"]; // fiole x
card_list[4] = ["img/04.BMP","img/17.BMP","img/30.BMP","img/43.BMP"]; // feu x
card_list[5] = ["img/05.BMP","img/18.BMP","img/31.BMP","img/44.BMP"]; // couteau x
card_list[6] = ["img/06.BMP","img/19.BMP","img/32.BMP","img/45.BMP"]; // saix
card_list[7] = ["img/07.BMP","img/20.BMP","img/33.BMP","img/46.BMP"]; // epee x
card_list[8] = ["img/08.BMP","img/21.BMP","img/34.BMP","img/47.BMP"]; // hache x
card_list[9] = ["img/09.BMP","img/22.BMP","img/35.BMP","img/48.BMP"]; // lance
card_list[10] = ["img/10.BMP","img/23.BMP","img/36.BMP","img/49.BMP", // guandao x
"img/11.BMP","img/24.BMP","img/37.BMP","img/50.BMP",
"img/12.BMP","img/25.BMP","img/38.BMP","img/51.BMP",
"img/13.BMP","img/26.BMP","img/39.BMP","img/52.BMP"];
card_list[11] = ["img/01.BMP","img/14.BMP","img/27.BMP","img/40.BMP"]; // kamehameha 


var index_point = 0;
var index_card = 0;
var index = 0;
var player_score = 0;
var bank_score = 0;
var score = 0;
var score_list_player = [];
var score_list_bank = [];

//ELEMENTS HTML
var divJS = document.getElementById('div2');
var player_card = document.getElementById("player_card");
var bank_card = document.getElementById("bank_card");
var updated = document.getElementById("Modified");
var updated2 = document.getElementById("Modified_bank");


function creerImg(chemin) {
    var img = document.createElement('img');
    img.src = chemin;
    return img;
}


function Pick_a_card(){
    index_point = Math.floor((Math.random()* 10)+2); // Recupere un nombre entre 2 et 11
    if (index_point==10){
        index_card = Math.floor((Math.random()*16));
    }
    else{
        index_card = Math.floor((Math.random()*4));
    }
    var new_card=card_list[index_point][index_card];
    while (new_card == "picked"){
        index_point = Math.floor((Math.random()* 10)+2); // Recupere un nombre entre 2 et 11
        if (index_point==10){
            index_card = Math.floor((Math.random()*16));
        }
        else{
            index_card = Math.floor((Math.random()*4));
        }
        new_card=card_list[index_point][index_card];
    }
    card_list[index_point][index_card] = "picked";
    return new_card
}


function getPlayerCard() {
    var player = Pick_a_card();
    var newImg = creerImg(player);
    divJS.appendChild(newImg);
    player_score = Player_count(score_list_player);
    if (player_score > 42){
        updated.textContent = "Vous avez "+ player_score;
        updated2.textContent = "Vous avez perdu.";
    }
    else {
        updated.textContent = "Vous avez "+ player_score +". Carte ou Reste?";
        
    }
    
}   

function getBankCard(){
    for (var i=0; i<7; i++) {
        var bank = Pick_a_card();    
        var newImg = creerImg(bank);
        divJS = document.getElementById('div1');
        divJS.appendChild(newImg);
        bank_score = Player_count(score_list_bank);
        if (bank_score > 42){
            updated2.textContent = "Vous avez gagne.";
            updated.textContent = "";
            break
            
        }
        else if (bank_score<42 & bank_score>player_score) {
            updated2.textContent = "Vous avez perdu";
            updated.textContent ="Vous avez "+ player_score;   
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

function Player_count(scored){
    var new_score = 0;
    scored.push(index_point);
    for (var i=0;i<scored.length;i++){
        new_score = scored[i] + new_score;
    }
    console.log(scored)
    if (new_score>42){
        for (var j=0;j<scored.length;j++){
            if (scored[j] == 11){   
                scored[j] = 1;
            }
        }
        new_score = scored[i] + new_score;
    } 
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