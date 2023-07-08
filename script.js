const search = document.getElementById('search');
const products = document.querySelectorAll('.product');
const notFound = document.getElementById('not-found');
const suggest = document.querySelector('.suggest');
const main = document.querySelector('.main');


//Get Input value 
const searchValue = ({target}) => {
   const value = target.value.toLowerCase();
   
   fillter(value.trim());
};
search.addEventListener('input', searchValue);


//Filter 
const fillter = (value) => {
    let searchCounter = 0;
    
    for (let i = 0; i< products.length; i++) {
        const name = products[i].querySelector('.name ').innerText.toLowerCase()
        const data = products[i].querySelector('.name').dataset.name.toLowerCase();
        //Matching Search Value
        if (name || data) {
            if(name.indexOf(value) >= 0 || data.indexOf(value) >= 0) {
                products[i].style.display = 'flex';
            }else {
                products[i].style.display = 'none';
                searchCounter++;
            };
        };
    };
    
    //Show notfound if result not match
    if (searchCounter >= products.length) {
        notFound.style.display = 'inline';
    }else {
        notFound.style.display = 'none';
    };
  
};



const getValue = ({target}) => {
    //Inserting reset button
    if ((suggest.childElementCount == 3 && target.innerText == 'Mobile') || 
        (suggest.childElementCount == 3 && target.innerText == 'Watch')) {
        const resetBtn = document.createElement('span');
        resetBtn.innerText = 'Reset';
        suggest.append(resetBtn);
    };
    //filter with target Value
    if (target.innerText == 'Mobile') {
        fillter(target.innerText.toLowerCase());
    }else if (target.innerText == 'Watch') {
        fillter(target.innerText.toLowerCase());
    }else if (target.innerText == 'Reset') {
        target.remove();
        fillter('');
    }
};
suggest.addEventListener('click', getValue);


const scrolling = ({target}) => {
    const span = suggest.children;
    const scroll = parseInt(target.scrollTop);
    if (scroll >= 10) {
        suggest.style.background = 'rgba(0, 0, 0, 0.8)';
        for(let i in span) {
            span[i].style.color = '#fff';
        };
    }else {
        suggest.style.background = null;
        for (let i in span) {
            span[i].style.color = null;
        };
    };
    //background: rgba(0, 0, 0, 0.3)
};
main.addEventListener('scroll', scrolling);


//Kshapi