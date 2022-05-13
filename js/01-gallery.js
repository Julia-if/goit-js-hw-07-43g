import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
const refs = {
    gallery: document.querySelector('.gallery'),
    image: document.querySelector('.gallery__image')
}

function galleryItemsMarkUp(galleryItems) {
    return galleryItems.map(
        ({ original, preview, description }) => { return `<div class="gallery__item">
    <a class="gallery__link" href=${original}>
      <img
        class="gallery__image"
        src=${preview}
        data-source=${original}
        alt=${description}
      />
    </a>
  </div>
    ` }
    ).join("");
};
const markUp = galleryItemsMarkUp(galleryItems);
refs.gallery.innerHTML = markUp;


refs.gallery.addEventListener("click", modalOpen);

function modalOpen(e) {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    };
    modalShow(e.target.dataset.source);

    function modalShow(src) {
        const instance = basicLightbox.create(`
    <div class="modal">
        <img src="${src}" width="800" height="600">
    </div>`, {
            onShow: () => {
                window.addEventListener('keydown', onEscapeClick)
            },
            onClose: () => {

                window.removeEventListener('keydown', onEscapeClick);

            }
        })

        function onEscapeClick(e) {
            if (e.code === "Escape") {
                instance.close()
            }
        }
        instance.show();
    };
}