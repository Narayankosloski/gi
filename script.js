// Estado padrão do personagem (usado também pelo botão Reiniciar)
const defaultCharacter = {
    body: 1,
    hair: 1,
    eyes: 1,
    shirt: 1,
    pants: 1,
    shoes: 1
};

// Estado atual do personagem
const character = { ...defaultCharacter };

// Quantidade de opções por categoria
const maxOptions = {
    body: 3,
    hair: 4,
    eyes: 3,
    shirt: 3,
    pants: 3,
    shoes: 3
};

// Categoria aberta no momento
let currentCategory = "hair";

// Resolve pasta/arquivo (a camisa fica dentro da pasta "clothes")
function resolvePath(category){
    if(category === "shirt"){
        return { folder: "clothes", file: "shirt" };
    }
    return { folder: category, file: category };
}

// Abre uma categoria e desenha as opções disponíveis
function openCategory(category){

    currentCategory = category;

    // Marca o botão da categoria como ativo
    document.querySelectorAll(".categorias button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === category);
    });

    const options = document.getElementById("options");
    options.innerHTML = "";

    const { folder, file } = resolvePath(category);

    for(let i = 1; i <= maxOptions[category]; i++){

        const option = document.createElement("div");
        option.className = "option" + (character[category] === i ? " selected" : "");
        option.innerHTML = `<img src="img/${folder}/${file}${i}.png" alt="Opção ${i} de ${category}">`;
        option.addEventListener("click", () => selectOption(i));

        options.appendChild(option);
    }
}

// Seleciona uma peça dentro da categoria aberta
function selectOption(option){

    character[currentCategory] = option;

    const { folder, file } = resolvePath(currentCategory);

    document.getElementById(currentCategory).src =
        `img/${folder}/${file}${option}.png`;

    // Atualiza o destaque visual da opção escolhida
    document.querySelectorAll("#options .option").forEach((el, index) => {
        el.classList.toggle("selected", index + 1 === option);
    });
}

// Aplica um estado completo ao personagem (usado no reset)
function applyCharacterState(state){
    Object.keys(state).forEach(category => {
        const { folder, file } = resolvePath(category);
        const img = document.getElementById(category);
        if(img){
            img.src = `img/${folder}/${file}${state[category]}.png`;
        }
    });
}

// Reinicia o personagem para as opções padrão
function resetCharacter(){
    Object.assign(character, defaultCharacter);
    applyCharacterState(character);
    openCategory(currentCategory);
}

// Menu mobile (hambúrguer)
function setupMobileNav(){
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");

    if(!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => menu.classList.remove("open"));
    });
}

// Substitui fotos da galeria que ainda não existem por um retrato ilustrativo
function setupGalleryFallback(){
    document.querySelectorAll(".galeria-foto img").forEach(img => {
        img.addEventListener("error", () => {
            img.src = img.dataset.fallback;
        }, { once: true });
    });
}

// Esconde o vídeo do hero se o arquivo ainda não existir, mantendo a textura de fundo
function setupHeroVideo(){
    const video = document.querySelector(".hero-video");
    if(!video) return;

    video.addEventListener("error", () => {
        video.style.display = "none";
    }, true);
}

window.onload = () => {

    openCategory("hair");
    setupMobileNav();
    setupGalleryFallback();
    setupHeroVideo();

    document.getElementById("download").addEventListener("click", () => {

        html2canvas(document.querySelector(".personagem"), {
            backgroundColor: null,
            scale: 4
        }).then(canvas => {

            const link = document.createElement("a");
            link.download = "personagem.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });

    document.getElementById("reset").addEventListener("click", resetCharacter);
};