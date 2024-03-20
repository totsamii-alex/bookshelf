// support ukraine // 
const containerImages = document.querySelector('.container-image-support-ukraine');
const buttonImageList = document.querySelector('.button-supp-uk');


import image1 from '../img/image-1.png';
import image2 from '../img/image-2.png';
import image3 from '../img/image-3.png';
import image4 from '../img/image-4.png';
import image5 from '../img/image-5.png';
import image6 from '../img/image-6.png';
import image7 from '../img/image-7.png';
import image8 from '../img/image-8.png';
import image9 from '../img/image-9.png';

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
      title: 'International Medical Corps',
      url: 'https://internationalmedicalcorps.org/country/ukraine/',
      src: image3,
      srcset: `${image3} 1x, ${image3.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'RAZOM ',
      url: 'https://www.razomforukraine.org/',
      src: image4,
      srcset: `${image4} 1x, ${image4.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'Action against hunger Medicins Sans Frontieres',
      url: 'https://www.msf.org/ukraine',
      src: image5,
      srcset: `${image5} 1x, ${image5.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'Serhiy Prytula Charity Foundation',
      url: 'https://prytulafoundation.org/en',
      src: image6,
      srcset: `${image6} 1x, ${image6.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'Action against hunger',
      url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
      src: image7,
      srcset: `${image7} 1x, ${image7.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'UNITED24',
      url: 'https://u24.gov.ua/uk',
      src: image8,
      srcset: `${image8} 1x, ${image8.replace('.png', '-2x.png')} 2x`,
    },
    {
      title: 'World vision',
      url: 'https://www.wvi.org/emergencies/ukraine ',
      src: image9,
      srcset: `${image9} 1x, ${image9.replace('.png', '-2x.png')} 2x`,
    },
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