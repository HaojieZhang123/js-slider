const pics = [
    {
      image: 'img/01.jpg',
      title: 'Svezia',
      text: 'Scandinavia\'s blend of nature and innovation.',
    }, {
      image: 'img/02.jpg',
      title: 'Norvegia',
      text: 'Fjords, mountains, and coastal charm in Nordic splendor.',
    }, {
      image: 'img/03.jpg',
      title: 'Alaska',
      text: 'Untamed wilderness and rugged beauty in the Last Frontier.',
    }, {
      image: 'img/04.jpg',
      title: 'Gran Canyon',
      text: 'Nature\'s masterpiece, a colorful tapestry of cliffs.',
    }, {
      image: 'img/05.jpg',
      title: "Skyrim",
      text: 'Epic Nordic fantasy with dragons and ancient magic.',
    }
];

// definizione funzione che crea la singola immagine
const createImage = (galleryImage) => {
  // destrutturiamo il parametro passato nelle sue proprieta'
  const { image, title, text } = galleryImage;
  // creo DOM HTML dell'immagine da inserire
  let img = `<figure>
              <img src="./${image}" alt="1">
                <figcaption>
                  <h2>${title}</h2>
                  <h3>${text}</h3>
                </figcaption>
            </figure>`;
  return img;
}

// funzione che crea la singola thumbnail
const createThumbnail = (galleryImage) => {
  // destrutturiamo il parametro passato nelle sue proprieta'
  const { image } = galleryImage;
  // creo DOM HTML della thumbnail da inserire
  let img = `<div class="thumbnail-card">
                <img src="./${image}" alt="">
            </div>`;
  return img;
}

// funzione di renderizzazione dell'immagine
const renderImages = (pics) => {
  let images = '';
  // prendo il container dove inserire le immagini
  const gallery = document.querySelector('.gallery');
  // per ogni immagine nell'array di oggetti
  for (let i = 0; i < pics.length; i++) {
    // creo la singola immagine
    images += createImage(pics[i]);
    // la inserisco nel container
    gallery.innerHTML = images;
  }
}

// funzione di renderizzazione della thumbnail
const renderThumbnails = (pics) => {
  let thumbnails = '';
  // prendo il container dove inserire le immagini
  const thumbnailsContainer = document.querySelector('#thumbnails');
  // per ogni immagine nell'array di oggetti
  for (let i = 0; i < pics.length; i++) {
    // creo la singola thumbnail
    thumbnails += createThumbnail(pics[i]);
    // la inserisco nel container
    thumbnailsContainer.innerHTML = thumbnails;
  }
}

renderImages(pics);

renderThumbnails(pics);



// funzione che manda in avanti alla prossima immagine
const nextImage = () => {
  // rimuovo la classe active dall'elemento attualmente attivo
  images[activeImage].classList.remove('active');
  // rimuovo la classe active-thumbnail dall'elemento attualmente attivo
  thumbnails[activeImage].classList.remove('active-thumbnail');

  // incremento l'indice
  activeImage++;
  // se l'indice è maggiore di 4, resetto l'indice a 0
  if (activeImage >= images.length) {
    activeImage = 0;
  }
  // aggiungo la classe active all'elemento attualmente attivo
  images[activeImage].classList.add('active');
  // aggiungo la classe active-thumbnail all'elemento attualmente attivo
  thumbnails[activeImage].classList.add('active-thumbnail');

}

// funzione all'indietro
const prevImage = () => {
  // rimuovo la classe active dall'elemento attualmente attivo
  images[activeImage].classList.remove('active');
  // rimuovo la classe active-thumbnail dall'elemento attualmente attivo
  thumbnails[activeImage].classList.remove('active-thumbnail');
  
  // incremento l'indice
  activeImage--;
  // se l'indice è maggiore di 4, resetto l'indice a 0
  if (activeImage < 0) {
    activeImage = images.length-1;
  }
  // aggiungo la classe active all'elemento attualmente attivo
  images[activeImage].classList.add('active');
  // aggiungo la classe active-thumbnail all'elemento attualmente attivo
  thumbnails[activeImage].classList.add('active-thumbnail');
}



// definisco il valore iniziale dell'indice
let activeImage = 0;
// vado a prendere tutte le immagini dal DOM
const images = document.querySelectorAll('#carousel figure');
console.log(images);
// rendo attiva la prima immagine
images[activeImage].classList.add('active');

// faccio lavoro simile per thumbail
const thumbnails = document.querySelectorAll('#thumbnails .thumbnail-card');
thumbnails[activeImage].classList.add('active-thumbnail');


// evento per cambiare immagine al click
// pulsante avanti\
const nextButton = document.querySelector('.fa-arrow-right');
nextButton.addEventListener('click', () => {
  nextImage ();
})

// pulsante indietro
const prevButton = document.querySelector('.fa-arrow-left');
prevButton.addEventListener('click', () => {
  prevImage ();
})

// autoplay
const autoplay = setInterval(() => {
  nextImage();
}, 2000);

// click sulla thumbnail porta direttamente l'immagine attiva alla thumbnail cliccata
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    // rimuovo la classe active dall'elemento attualmente attivo
    images[activeImage].classList.remove('active');
    // rimuovo la classe active-thumbnail dall'elemento attualmente attivo
    thumbnails[activeImage].classList.remove('active-thumbnail');
    // cambio l'indice attivo
    activeImage = index;
    // aggiungo la classe active all'elemento attualmente attivo
    images[activeImage].classList.add('active');
    // aggiungo la classe active-thumbnail all'elemento attualmente attivo
    thumbnails[activeImage].classList.add('active-thumbnail');

    // blocco autoplay per 10 secondi
    clearInterval(autoplay);
    setTimeout(() => {
      autoplay = setInterval(() => {
        nextImage();
      }, 2000);
    }, 10000);
  })
})