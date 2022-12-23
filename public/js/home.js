const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.next-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item,i) => {
    let containerDimensions = item.getBoundingClientRect(); 
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click',() => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click',() => {
        item.scrollLeft -= containerWidth;
    })

})

//cart and wishlist
const add_product_to_cart_or_wishlist = (type,product) => {
    let data = JSON.parse(localStorage.getItem(type));
    if(data == null){
        data=[];
    }

    product = {
        item :1,
        name: product.name,
        sellPrice : product.sellPrice,
        size :size || null,
        shortDes : product.shortDes,

    }

    data.push(product);
    console.log(data);
    return 'added'
}