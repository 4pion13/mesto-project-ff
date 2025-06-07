// @todo: DOM узлы
import { showPopup } from "./modal.js";
import profileImage from "../../images/avatar.jpg";

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");

profile.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${profileImage})`;

// Функция изменения данных в профиле
function changingProfileData(popup, form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
    };
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.description;
    form.reset();
    showPopup(popup, false);
  });
}

export { profileTitle, profileDescription, changingProfileData };
