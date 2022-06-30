import { customSelector, getData } from './utils.js';
import { countries } from './data.js';




// OOP Way: Ajax
function Tab(container, url, currentItem) {
    this.currentItem = currentItem;
    this.buttonsContainer = container.querySelector('.tab-buttons');
    this.tabContentContainer = container.querySelector('.tab-content');
    this.buttons = undefined;
    this.tabContents = undefined;

    this.changeContent = function () {
        const length = this.buttons.length;
        for (let i = 0; i < length; i++) {
            this.buttons[i].classList.remove('active');
            this.tabContents[i].classList.remove('active');
        }
        this.buttons[this.currentItem].classList.add('active');
        this.tabContents[this.currentItem].classList.add('active');
    }
    this.eventListeners = function (buttons) {
        for (let i = 0; i < buttons.length; i++) {
            const $this = this;
            buttons[i].addEventListener('click', function () {
                const newButtons = [...buttons];
                for (let i = 0; i < newButtons.length; i++) {
                    if (this === newButtons[i]) {
                        $this.currentItem = i;
                    }
                }
                $this.changeContent();
            });
        }
    }
    this.renderContent = function (data) {
        const { countries } = data;

        const buttonsHTML = countries.map(country => `<button>${country.name}</button>`)
        const contentHTML = countries.map(country => {
            return `
                <div>
                    <h3>
                        ${country.name}
                    </h3>
                    <p>
                        ${country.content}
                    </p>
                </div>
            `
        });
        this.buttonsContainer.innerHTML = buttonsHTML.join('');
        this.tabContentContainer.innerHTML = contentHTML.join('');

        this.buttons = this.buttonsContainer.children;
        this.tabContents = this.tabContentContainer.children;

        this.changeContent();

        this.eventListeners(this.buttons);
    }

    this.tabActivate = function () {
        getData(url, this.renderContent.bind(this))
    }
    this.tabActivate();

}

// Functional Way: Ajax

// function tab(container, url) {
//     const buttonsContainer = container.querySelector('.tab-buttons');
//     const tabContentContainer = container.querySelector('.tab-content');
//     let currentItem = 0;
//     let buttons;
//     let tabContents;
//     function eventListeners() {
//         for (let i = 0; i < buttons.length; i++) {
//             buttons[i].addEventListener('click', function () {
//                 for (let i = 0; i < buttons.length; i++) {
//                     if (this === buttons[i]) {
//                         currentItem = i;
//                     }
//                 }
//                 changeContent(currentItem);
//             });
//         }
//     }
//     function changeContent(index) {
//         const length = buttons.length;
//         for (let i = 0; i < length; i++) {
//             buttons[i].classList.remove('active');
//             tabContents[i].classList.remove('active');
//         }
//         buttons[index].classList.add('active');
//         tabContents[index].classList.add('active');
//     }
//     function renderContent(data) {
//         const { countries } = data;

//         const buttonsHTML = countries.map(country => `<button>${country.name}</button>`)
//         const contentHTML = countries.map(country => {
//             return `
//                 <div>
//                     <h3>
//                         ${country.name}
//                     </h3>
//                     <p>
//                         ${country.content}
//                     </p>
//                 </div>
//             `
//         });
//         buttonsContainer.innerHTML = buttonsHTML.join('');
//         tabContentContainer.innerHTML = contentHTML.join('');

//         buttons = buttonsContainer.children;
//         tabContents = tabContentContainer.children;

//         changeContent(currentItem);

//         eventListeners(buttons);


//     }
//     function tabActivate() {
//         getData(url, renderContent);
//     }
//     tabActivate();

// }






// Functional Way 2: Object Data
// function tab(container,countries) {
//     const buttonsContainer = container.querySelector('.tab-buttons');
//     const tabContentContainer = container.querySelector('.tab-content');
//     let currentItem = 0;
//     let buttons = buttonsContainer.children;
//     let tabContents = tabContentContainer.children;
//     function changeContent(index) {
//         const length = buttons.length;
//         for (let i = 0; i < length; i++) {
//             buttons[i].classList.remove('active');
//             tabContents[i].classList.remove('active');
//         }
//         buttons[index].classList.add('active');
//         tabContents[index].classList.add('active');
//     }
//     function eventListeners() {
//         for (let i = 0; i < buttons.length; i++) {
//             buttons[i].addEventListener('click', function () {
//                 for (let i = 0; i < buttons.length; i++) {
//                     if (this === buttons[i]) {
//                         currentItem = i;
//                     }
//                 }
//                 changeContent(currentItem);
//             });
//         }
//     }
//     const buttonsHTML = countries.map(country => `<button>${country.name}</button>`)
//     const contentHTML = countries.map(country => {
//         return `
//             <div>
//                 <h3>
//                     ${country.name}
//                 </h3>
//                 <p>
//                     ${country.content}
//                 </p>
//             </div>
//         `
//     });
//     buttonsContainer.innerHTML = buttonsHTML.join('');
//     tabContentContainer.innerHTML = contentHTML.join('');

//     changeContent(currentItem);
//     eventListeners(buttons);
// }

// Functional Way 3: Normal Javascript
function tab(container, currentItem) {
    const buttonsContainer = container.querySelector('.tab-buttons');
    const tabContentContainer = container.querySelector('.tab-content');
    let buttons = buttonsContainer.children;
    let tabContents = tabContentContainer.children;

    function changeContent(index) {
        const length = buttons.length;
        for (let i = 0; i < length; i++) {
            buttons[i].classList.remove('active');
            tabContents[i].classList.remove('active');
        }
        buttons[currentItem].classList.add('active');
        tabContents[currentItem].classList.add('active');
    }
    function eventListeners() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                for (let i = 0; i < buttons.length; i++) {
                    if (this === buttons[i]) {
                        currentItem = i;
                    }
                }
                changeContent(currentItem);
            });
        }
    }

    changeContent(currentItem);
    eventListeners(buttons);
}


// Functional Way:
function accordion(container) {
    let allItems = Array.from(container.children);
    let titles = allItems.map(function (item) { return item.children[0] });

    titles.forEach(function (title) {
        title.addEventListener('click', function () {
            const item = this.parentElement;
            const itemContent = item.children[1];

            // Way 1
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                const height = itemContent.children[0].offsetHeight;
                itemContent.style.height = height + 'px';
            } else {
                itemContent.style.height = 0;
            }

            // Way 2             
            // if (item.classList.contains('active')) {
            //     item.classList.remove('active');
            //     itemContent.style.height = 0;
            // } else {
            //     item.classList.add('active');
            //     const height = itemContent.children[0].offsetHeight;
            //     itemContent.style.height = height + 'px'; 
            // }


            // Hide Others
            const otherItems = allItems.filter(function (element) { return element !== item });;
            for (let i = 0; i < otherItems.length; i++) {
                otherItems[i].children[1].style.height = 0;
                otherItems[i].classList.remove('active');
            }

        })
    });
}

// OOP Way: 
function Accordion(container, url) {
    this.allItems = Array.from(container.children);
    this.titles = this.allItems.map(function (title) { return title.children[0] });
    this.eventListeners = function () {
        this.titles.forEach(function (title) {
            const $this = this;
            title.addEventListener('click', function () {
                const item = this.parentElement;
                const itemContent = item.children[1];
                // Way 1
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    const height = itemContent.children[0].offsetHeight;
                    itemContent.style.height = height + 'px';
                } else {
                    itemContent.style.height = 0;
                }
                // Way 2             
                // if (item.classList.contains('active')) {
                //     item.classList.remove('active');
                //     itemContent.style.height = 0;
                // } else {
                //     item.classList.add('active');
                //     const height = itemContent.children[0].offsetHeight;
                //     itemContent.style.height = height + 'px'; 
                // }
                // Hide Others
                const otherItems = $this.allItems.filter(function (element) { return element !== item });;
                for (let i = 0; i < otherItems.length; i++) {
                    otherItems[i].children[1].style.height = 0;
                    otherItems[i].classList.remove('active');
                }
            })
        }.bind(this));
    }
    this.activateAccordion = function () {
        getData(url, function (data) {
            this.renderContent(data);
            this.allItems = Array.from(container.children);
            this.titles = this.allItems.map(function (title) { return title.children[0] });
            this.eventListeners();
        }.bind(this))
    }
    this.renderItem = function (object) {
        const itemString = `
            <div>
            <div>
            <h3>
            ${object.title}
            </h3>
            <svg viewBox="0 0 495 495">
            <polygon
            points="495,227.5 267.5,227.5 267.5,0 227.5,0 227.5,227.5 0,227.5 0,267.5 227.5,267.5 227.5,495 267.5,495 267.5,267.5 495,267.5" />
            </svg>
            <svg viewBox="0 0 83 83">
            <path
            d="M81,36.166H2c-1.104,0-2,0.896-2,2v6.668c0,1.104,0.896,2,2,2h79c1.104,0,2-0.896,2-2v-6.668C83,37.062,82.104,36.166,81,36.166z" />
            </svg>
            </div>
            <div>
            <div>
            <p>
            ${object.content}
            </p>
            </div>
            </div>
            </div>
            `;
        container.innerHTML += itemString;
    }
    this.renderContent = function (data) {
        container.innerHTML = '';
        const objects = data;
        objects.forEach(function (object) {
            this.renderItem(object);
        }.bind(this));
    }
    this.activateAccordion();
}
document.addEventListener('DOMContentLoaded', function () {
    const accordionContainer = document.querySelector('.accordion');
    new Accordion(accordionContainer, './assets/js/accordion.json');
})