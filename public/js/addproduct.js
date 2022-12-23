/*let user = JSON.parse(sessionStorage.user ||  null);
let loader = document.querySelector('.loader');

//user is logged in or not
window.onload = () => {
    if(user){
        if(!compareToken(user.authToken, user.email)){
            location.replace('/login');
        }
    } /*else {
        location.replace('/login');
    }} */



    
//price inputs

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if(discountPercentage.value > 100) {
        discountPercentage.value = 90;
    } else {
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) *100;
    discountPercentage.value = discount;
})

//upload img
let uploadImages = document.querySelector('.fileupload');
let imagePaths = []; //will store uploaded img



//form submission
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let shades= []; //store all shades

const stock = document.querySelector('#stock');
const tag = document.querySelector('#tags');
const tac = document.querySelector('#tac');

//buttons
const addproductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');

//store shades function
const storeShades = () => {
    shades=[];
    let shadesCheckBox = document.querySelectorAll('.shade-checkbox');
    shadesCheckBox.forEach (item => {
        if (item.checked) {
            shades.push(item.value);
        }
    })
}

const validateForm = () => {
    if(!productName.value.length){
         return showAlert('Enter product name');
    } else if (shortLine.value.length > 100 || shortLine.value.length < 10){
        return showAlert('Short description must be between 10 to 100 letters long');
    } else if (!des.value.length){
        return showAlert('Enter detail description about the product');
    } else if (!shades.length){
        return showAlert ('Select at least one shades');
    }else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length){
        return showAlert('You must add pricings');
    } else if (stock.value < 20 ){
        return showAlert ('You should have atleast 20 items in stock ');
    } else if (!tag.value.length) {
        return showAlert ('Enter few tags to help ranking your product in search');
    } else if (!tac.checked){
        return showAlert('You must agree to out terms and conditions');
    }
return true;
}

const productData = () => {
    return data = {
        name : productName.value,
        shortDes : shortLine.value,
        des : des.value,
        shades : shades,
        actualPrice : actualPrice.value,
        discount : discountPercentage.value,
        sellingPrice : sellingPrice.value,
        stock : stock.value,
        tag : tag.value,
        tag : tac.checked,
        //email : email.value

    }
}

addproductBtn.addEventListener('click', () =>  {
    storeShades();
     
    //validate form
    if(validateForm()) {
        //loader.style.display = 'block';
        let data = productData();
        sendData('/add-product' , data);
       
    }
})

