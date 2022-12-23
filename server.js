//path
const express = require ('express');
const admin = require ('firebase-admin');
const bcrypt = require ('bcrypt');
const path = require('path');
const { request } = require('http');

//firebase


let serviceAccount = require("./ecom-website.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();


//static path
let staticPath = path.join(__dirname,"public");

//express.js
const app = express();


//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//home routes
app.get("/",(req,res) =>{
    res.sendFile(path.join(staticPath, "index.html"))
})

//signup
app.get("/signup",(req,res) =>{
    res.sendFile(path.join(staticPath, "signup.html"))
})

app.post('/signup', (req,res) =>{
    let {name, email, password, number, tac, notification} = req.body;

    //form validation

    if(name.length < 3 ){
        return res.json({'alert':'Name must be 3 letters long'});
    }else if (!email.length){
        return res.json({'alert':'Enter your Email'});
    } else if (!password.length){
        return res.json({'alert':'Enter your password and it should be 8 letters long'});
    }else if (!number.length){
        return res.json({'alert':'Enter your phone number'});
    }else if (!Number(number.length) || number.length <10){
        return res.json({'alert':'Invalid number, Please enter valid number'});
    }else if(!tac){
        return res.json({'alert':'You should agree to our terms and conditions'});
    }
    //store in user db
    db.collection('users').doc(email).get()
    .then(user =>{
        if(user.exists){
            return res.json({'alert': 'email already exists'});
        }else {
            //encrypt
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(password, salt, (err, hash) =>{
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data => {
                        res.json({
                            name : req.body.name,
                            email : req.body.email,
                            seller : req.body.seller,
                        })
                    })
                })
            })

        }
    })


  
})


//login
app.get('/login',(req,res) =>{
    res.sendFile(path.join(staticPath, "login.html"));
})


app.post('/login', (req,res) =>{
    let {email, password} = req.body;
    if(!email.length || !password.length){
        return res.json({'alert': 'Fill all the inputs'})
    }
    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            //email does not exists
            return res.json({'alert':'Email does not exists'})
        }else {
            bcrypt.compare(password, user.data().password, (err,result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name : data.name,
                        email : data.email,
                        seller : data.seller,
                    })
                }else {
                    return res.json({'alert':'Password is incorrect'})
                }
            })
        }
    })
    
})

//seller
app.get('/seller', (req,res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req,res) => {
    let {name, about, address, number, tac, legit, email} = req.body;
    if(!name.length || !address.length || !about.length || number.length <10 || !Number(number)){
        return res.json({'alert' : 'Some information(s) is/are invalid'});
    }else if (!tac || !legit){
        return res.json({'alert' : 'You must agree to our terms and conditions!!'})
    }else {
        //upade user seller status
        db.collection('sellers').doc(email).set(req.body)
        .then(data => {
            db.collection('users').doc(email).update({
                seller : true
             }).then(data => {
                res.json(true)
            })
        })
    }
})


//add product
app.get('/add-product', (req,res) => {
    res.sendFile(path.join(staticPath, "addproduct.html"));
})

app.post('/add-product' , (req,res) => {
    let { name, shortDes, des, shades, actualPrice, discount, sellPrice, stock, tag, tac, email} = req.body;
//validation
if(!name.length){
    return res.json({'alert' :'Enter product name'});
} else if (shortDes.length > 100 || shortDes.length < 10){
   return res.json({'alert' :'Short description must be between 10 to 100 letters long'});
} else if (!des.length){
   return res.json({'alert' :'Enter detail description about the product'});
} else if (!shades.length){
   return res.json ({'alert' :'Select at least one shades'});
}else if (!actualPrice.length || !discount.length || !sellPrice.length){
   return res.json({'alert' :'You must add pricings'});
} else if (stock.value < 20 ){
   return res.json ({'alert' :'You should have atleast 20 items in stock '});
} else if (!tag.length) {
   return res.json ({'alert' :'Enter few tags to help ranking your product in search'});
} else if (!tac){
   return res.json({'alert' :'You must agree to out terms and conditions'});
}
//add product
let docName = `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
db.collection('products').doc(docName).set(req.body)
.then(data => {
    res.json({'product': name});
})

.catch(err => {
    return res.json({'alert' : 'Some error occured. Try again!'});
}
    
)

})

//product page

app.get('/product', (req,res) => {
    res.sendFile(path.join(staticPath, "product.html"));
})

app.get('/search' , (req,res) => {
    res.sendFile(path.join(staticPath, "search.html"))
})

//404
app.get('/404',(req,res) =>{
    res.sendFile(path.join(staticPath,"404.html"));
})


app.use((req,res) => {
    res.redirect('/404');
})


app.listen(8000,() =>{
    console.log("server is running" , "secessfully connected DB");
})