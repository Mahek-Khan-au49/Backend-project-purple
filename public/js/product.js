const productImages = document.querySelectorAll(".product-images img"); 
const productImageSlide = document.querySelector(".image-slider"); 

let activeImageSlide = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => { 
        productImages[activeImageSlide].classList.remove('active'); 
        item.classList.add('active'); 
        productImageSlide.style.backgroundImage = `url('${item.src}')`; 
        activeImageSlide = i; 
    })
})

// size buttons

const sizeBtns = document.querySelectorAll('.shade-radio-btn'); 
let checkedBtn = 0; 
let shade;

sizeBtns.forEach((item, i) => { 
    item.addEventListener('click', () => { 
        sizeBtns[checkedBtn].classList.remove('check'); 
        item.classList.add('check'); 
        checkedBtn = i;
        shade=item.innerHTML;
    })
})

//wishlist cart
const wishlistBtn = document.querySelector('.wishlist-btn');
wishlistBtn.addEventListener('click' , () =>{
    wishlistBtn.innerHTML = add_product_to_cart_or_wishlist('.wishlist' , data);
})

const cartBtn = document.querySelector('.cart-btn');
cartBtn.addEventListener('click' , () =>{
    cartBtn.innerHTML = add_product_to_cart_or_wishlist('.wishlist' , data);
})