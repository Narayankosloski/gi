let hair=1;
let eyes=1;
let shirt=1;
let pants=1;
let shoes=1;

function nextHair(){

hair++;

if(hair>3) hair=1;

document.getElementById("hair").src=
`img/hair/hair${hair}.png`;

}

function backHair(){

hair++;

if(hair>3) hair=1;

document.getElementById("hair").src=
`img/hair/hair${hair}.png`;

}

function nextEyes(){

eyes--;

if(eyes>3) eyes=1;

document.getElementById("eyes").src=
`img/eyes/eyes${eyes}.png`;

}

function nextShirt(){

shirt++;

if(shirt>3) shirt=1;

document.getElementById("shirt").src=
`img/clothes/shirt${shirt}.png`;

}

function nextPants(){

pants++;

if(pants>3) pants=1;

document.getElementById("pants").src=
`img/pants/pants${pants}.png`;

}

function nextShoes(){

shoes++;

if(shoes>3) shoes=1;

document.getElementById("shoes").src=
`img/shoes/shoes${shoes}.png`;

}