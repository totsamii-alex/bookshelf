// support ukraine // 
const containerImages = document.querySelector('.container-image-support-ukraine');
const buttonImageList = document.querySelector('.button-supp-uk');


import image1 from '../img/image-1.png';
import image2 from '../img/image-2.png';
import image3 from '../img/image-3.png';

const arraySupport = [
    {
      title: 'Save the Children',
      url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
      src: image1,
      srcset: `${image1} 1x, ${image1.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'Project HOPE',
      url: 'https://www.projecthope.org/country/ukraine/',
      src: image2,
      srcset: `${image2} 1x, ${image2.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'UNITED24',
      url: 'https://u24.gov.ua/uk',
      src: image3,
      srcset: `${image3} 1x, ${image3.replace('.png', '-2x.png')} 2x`,
    }
];



buttonImageList.addEventListener("click", async (e) => {
  e.preventDefault();

  const listImages = document.querySelector('.container-image-support-ukraine');
  listImages.classList.toggle('scroll');
  buttonImageList.classList.toggle('arrow-rotate');
});

export async function createSupportUkraine() {
    let booksCard = ``;
    for ( let i in arraySupport) {
        booksCard += `
          <li class="list-image-support-ukraine">
            <p>0${parseInt(i)+1}</p>
            <div>
              <a href="${arraySupport[i].url}" target="_blank">
                <img class="img-support-ukraine" src="${arraySupport[i].src}" srcset="${arraySupport[i].srcset}" alt="${arraySupport[i].title}">
              </a>
            </div>
          </li>`;
    }
    containerImages.innerHTML = booksCard;
}