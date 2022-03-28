//Create reference DOM
const rowCards = document.querySelector('#rowCards');
const formData = document.querySelector('#formData');



// peticiones al api
// TODOS LOS PERSONAJES

const getCharacter = async () => {

    try {
        const response  = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
   // buscar por nombre
const getCharacterName = async (nameCharacter) => {

    try{
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nameCharacter}`);
    const data = await response.json();
    return data;
    } catch (error) {
        throw error;
    }  
};

// clean row
const cleanRow = () => {
    rowCards.innerHTML = '';
  }
// function de inicio punto de arranque
const init = async () => {
    const character = await getCharacter();
    console.log(character.results);
    // otra forma de realizarlo getCharacter().then(r=> console.log(r));
    // funcion para crear las primeras 20 cards
    createCards(character.results);

};

init(); // llamada a la funcion que inicia la app

/** End petitions */

//Cards
cardCharacter = (character) => {
    // create elements html
    const cardBootstrap= document.createElement('div');
    const imgCard =  document.createElement('img');
    const cardBody = document.createElement('div');
    const titleCharacter = document.createElement('h5');
    const btnByIdCharacter = document.createElement('a');


    // text of elements
    const nameCharacter = document.createTextNode(character.name);
    const textButtonCharacter = document.createTextNode('Ir al personaje');

    //class css for elements

    cardBootstrap.classList.add('card', 'mt-4','col-sm-12', 'col-md-3');
    imgCard.classList.add('card-img-top', 'mt-2');
    cardBody.classList.add('card-body');
    titleCharacter.classList.add('card-title', 'text-center');
    btnByIdCharacter.classList.add('btn','btn-secondary', 'mb-2');


    // reference (href)

    btnByIdCharacter.href=`personaje.html?id=${character.id}`;

    //text
    titleCharacter.appendChild(nameCharacter);
    btnByIdCharacter.appendChild(textButtonCharacter);
    imgCard.src= character.image;

    // renderizado
    cardBootstrap.append(imgCard, cardBody, btnByIdCharacter);
    cardBody.append(titleCharacter);
    rowCards.append(cardBootstrap);
}

const createCards = (character) => {
    character.map(personaje => cardCharacter(personaje));
}

// form for search character

formData.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    event.preventDefault();
    console.log(this); // this form
    const form = new FormData(this);
    // clean first 20 personajes
    cleanRow();
    //console.log(form.get('character'));

    getCharacterName(form.get('character')).then(data => createCards(data.results)).catch(err=> console.error(err))
}