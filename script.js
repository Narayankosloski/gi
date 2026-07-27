// Estado do personagem
const character = {
    hair: 1,
    eyes: 1,
    shirt: 1,
    pants: 1,
    shoes: 1
};

// Quantidade de opções
const maxOptions = {
    hair: 3,
    eyes: 3,
    shirt: 3,
    pants: 3,
    shoes: 3
};

// Categoria aberta
let currentCategory = "hair";

// Abre uma categoria
function openCategory(category){

    currentCategory = category;

    const options = document.getElementById("options");

    options.innerHTML = "";

    let folder = category;
    let file = category;

    if(category === "shirt"){
        folder = "clothes";
        file = "shirt";
    }

    for(let i = 1; i <= maxOptions[category]; i++){

        options.innerHTML += `
            <div class="option" onclick="selectOption(${i})">
                <img src="img/${folder}/${file}${i}.png" alt="">
            </div>
        `;
    }

}

// Seleciona uma peça
function selectOption(option){

    character[currentCategory] = option;

    let folder = currentCategory;
    let file = currentCategory;

    if(currentCategory === "shirt"){
        folder = "clothes";
        file = "shirt";
    }

    document.getElementById(currentCategory).src =
    `img/${folder}/${file}${option}.png`;

}

// Abre cabelo ao iniciar
window.onload = () => {
    openCategory("hair");




        const btn = document.getElementById("download");

    btn.addEventListener("click", () => {

        html2canvas(document.querySelector(".personagem"),{
            backgroundColor:null,
            scale:4
        }).then(canvas => {

            const link = document.createElement("a");

            link.download = "personagem.png";
            link.href = canvas.toDataURL("image/png");

            link.click();

        });

    });

};  


