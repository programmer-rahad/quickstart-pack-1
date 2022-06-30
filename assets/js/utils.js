export const customSelector = (selector, areAll) => {
    return areAll ? document.querySelectorAll(selector) : document.querySelector(selector);
}
export const randomIndex = arr => {
    return Math.floor(Math.random() * arr.length);

    // Code for Handle Duplicate Index

    // Way 1
    //  if (lastIndex === index) {
    //     if (lastIndex === colors.length - 1) {
    //         index = index - 1;
    //     } else {
    //         index = index + 1;
    //     }
    // }
    // Way 2
    // if(this.index === this.lastIndex) {    
    //     const indexes = [...colors].map((el,i) => i);          
    //     indexes.splice(this.index,1);
    //     this.index = indexes[randomIndex(indexes)]
    // }

}
export function getData(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        const data = JSON.parse(this.response);
        callback(data)
    }
    xhr.open('get', url, true);
    xhr.send();
}

