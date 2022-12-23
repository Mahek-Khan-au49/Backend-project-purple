/*const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML =
     `
    <nav class="navbar" >
    <div class="nav">
        <img src="./images/Logo.jpg" class="brand-logo" alt="">
        <div class="nav-items">
            <div class="search">
                <input type="text" class="search-box" placeholder="search brand, product">
              <button class="search-btn">search</button>
            </div>
            <a>
            <img src="./images/User.jpg" alt="">
            <div class="login-logout-popup">
            <p class="account-info">Log in as, name</p>
            <button class="btn" id="user-btn">Log out</button>
            </div>
            </a>
            <a href="#"><img src="./images/cart.png" alt=""></a>
        </div>
    </div>

    <ul class="links-container">
        <li class="link-item"><a href="#" class="link">Home</a></li>
        <li class="link-item"><a href="#" class="link">Skincare</a></li>
        <li class="link-item"><a href="#" class="link">Makeup</a></li>
        <li class="link-item"><a href="#" class="link">Brand</a></li>
        <li class="link-item"><a href="#" class="link">Accessories</a></li>
    </ul>
   </nav>
    `;
}

createNav();*/

//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popupText = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click',() => {
    userPopup.classList.toggle('hide');
})

window.onload = ()=>{
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null){
        //user is logged in
        popupText.innerHTML = `Log in as, ${user.name}`;
        actionBtn.innerHTML = 'Log out';
        actionBtn.addEventListener('click',() =>{
            sessionStorage.clear();
            location.reload();
        })
    }else{
        //user is logged out
        popupText.innerHTML = 'Log in to place order';
        actionBtn.innerHTML = 'Log in';
        actionBtn.addEventListener('click', ()=>{
            location.href = '/login';
        })
    }
}


//search btn
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`
    }
})