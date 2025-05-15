// @todo: Темплейт карточки
function cardTempalte(card) {
    const cardTempalte = document.querySelector('#card-template').content;
    const cardElement = cardTempalte.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    deleteCardButton.addEventListener('click', (evt) => {
        cardDelete(evt.target.parentElement)
    })

    likeCardButton.addEventListener('click', (evt) => {
        evt.target.classList.add('card__like-button_is-active')
  
    })
    return cardElement
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function cardDelete(card) {
    card.remove(card)
}

// @todo: Вывести карточки на страницу

function renderCards(cardContent) {
    const cardList = document.querySelector('.places__list');
    cardContent.forEach(element => {
        cardList.append(cardTempalte(element))
    });
}

renderCards(initialCards)