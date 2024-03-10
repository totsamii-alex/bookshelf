// support ukraine // 
const support = document.querySelector('.support-ukraine');
const arraySupport = [
    {
      title: 'Save the Children',
      url:
        'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
      img: './img/image-1.png',
    },
    {
      title: 'Project HOPE',
      url: 'https://www.projecthope.org/country/ukraine/',
      img: './img/image-2.png',
    },
    {
      title: 'UNITED24',
      url: 'https://u24.gov.ua/uk',
      img: './img/image-3.png',
    },
    {
      title: 'International Medical Corps',
      url: 'https://internationalmedicalcorps.org/country/ukraine/',
      img: './img/image-4.png',
    },
    {
      title: 'Medicins Sans Frontieres',
      url: 'https://www.msf.org/ukraine',
      img: './img/image-5.png',
    },
    {
      title: 'RAZOM',
      url: 'https://www.razomforukraine.org/',
      img: './img/image-6.png',
    },
    {
      title: 'Action against hunger',
      url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
      img: './img/image-7.png',
    },
    {
      title: 'World vision',
      url: 'https://www.wvi.org/emergencies/ukraine',
      img: './img/image-8.png',
    },
    {
      title: 'Serhiy Prytula Charity Foundation',
      url: 'https://prytulafoundation.org/en',
      img: './img/image-9.png',
    },
]

async function createSupportUkraine() {
    let booksCard = `
    <div class="list-all-image-support">
        <div class="main-image-supp-ua"><img class="img-support-ukraine" src="./img/main-image.png" alt="support ukraine"></div>
        <ul class="container-image-support-ukraine">`;
    for ( let i in arraySupport) {
        booksCard += `
            <li class="list-image-support-ukraine">
                <p>0${parseInt(i)+1}</p>
                <div>
                    <a href="${arraySupport[i].url}" target="_blank">
                        <img class="img-support-ukraine" src="${arraySupport[i].img}" alt="${arraySupport[i].title}">
                    </a>
                </div>
            </li>`;
    }
    booksCard += `
        </ul>
    </div>`;
    support.innerHTML = booksCard;
}