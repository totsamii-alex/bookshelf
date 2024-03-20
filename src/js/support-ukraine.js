// support ukraine // 
const containerImages = document.querySelector('.container-image-support-ukraine');
const buttonImageList = document.querySelector('.button-supp-uk');

const arraySupport = [
    {
      title: 'Save the Children',
      url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
      src: './img/image-1.png',
      srcset: './img/image-1.png 1x, ./img/image-1-2x.png 2x',
    },
    {
      title: 'Project HOPE',
      url: 'https://www.projecthope.org/country/ukraine/',
      src: './img/image-2.png',
      srcset: './img/image-2.png 1x, ./img/image-2-2x.png 2x',
    },
    {
      title: 'UNITED24',
      url: 'https://u24.gov.ua/uk',
      src: './img/image-3.png',
      srcset: './img/image-3.png 1x, ./img/image-3-2x.png 2x',
    },
    {
      title: 'International Medical Corps',
      url: 'https://internationalmedicalcorps.org/country/ukraine/',
      src: './img/image-4.png',
      srcset: './img/image-4.png 1x, ./img/image-4-2x.png 2x',
    },
    {
      title: 'Medicins Sans Frontieres',
      url: 'https://www.msf.org/ukraine',
      src: './img/image-5.png',
      srcset: './img/image-5.png 1x, ./img/image-5-2x.png 2x',
    },
    {
      title: 'RAZOM',
      url: 'https://www.razomforukraine.org/',
      src: './img/image-6.png',
      srcset: './img/image-6.png 1x, ./img/image-6-2x.png 2x',
    },
    {
      title: 'Action against hunger',
      url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
      src: './img/image-7.png',
      srcset: './img/image-7.png 1x, ./img/image-7-2x.png 2x',
    },
    {
      title: 'World vision',
      url: 'https://www.wvi.org/emergencies/ukraine',
      src: './img/image-8.png',
      srcset: './img/image-8.png 1x, ./img/image-8-2x.png 2x',
    },
    {
      title: 'Serhiy Prytula Charity Foundation',
      url: 'https://prytulafoundation.org/en',
      src: './img/image-9.png',
      srcset: './img/image-9.png 1x, ./img/image-9-2x.png 2x',
    },
]


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
                <img class="img-support-ukraine" src="./img/main-image.png" srcset="./img/main-image.png 1x, ./img/main-image-2x.png 2x" alt="${arraySupport[i].title}">
              </a>
            </div>
          </li>`;
    }
    containerImages.innerHTML = booksCard;
}