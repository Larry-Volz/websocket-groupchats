const express = require('express');
const ExpressError = require("./expressError")
const nunjucks = require("nunjucks");
app = express();

nunjucks.configure('public', {
    autoescape: true,
    express: app
});


app.set('view engine', 'html');



//___ ___  ____  ___    ___    _        ___ __    __   ____  ____     ___ 
//|   |   ||    ||   \  |   \  | |      /  _]  |__|  | /    ||    \   /  _]
//| _   _ | |  | |    \ |    \ | |     /  [_|  |  |  ||  o  ||  D  ) /  [_ 
//|  \_/  | |  | |  D  ||  D  || |___ |    _]  |  |  ||     ||    / |    _]
//|   |   | |  | |     ||     ||     ||   [_|  `  '  ||  _  ||    \ |   [_ 
//|   |   | |  | |     ||     ||     ||     |\      / |  |  ||  .  \|     |
//|___|___||____||_____||_____||_____||_____| \_/\_/  |__|__||__|\_||_____|
 //                                                                        

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use("/public", express.static('public'));    




//____   ___   __ __  ______    ___  _____
//|    \ /   \ |  |  ||      |  /  _]/ ___/
//|  D  )     ||  |  ||      | /  [_(   \_ 
//|    /|  O  ||  |  ||_|  |_||    _]\__  |
//|    \|     ||  :  |  |  |  |   [_ /  \ |
//|  .  \     ||     |  |  |  |     |\    |
//|__|\_|\___/  \__,_|  |__|  |_____| \___|
//                                         


app.get("/chat", (req, res) => {

    console.log('RECEIVED REQUEST');
    return res.render("chat");
})



    
module.exports = app;




//_      ____ _____ ______    ___  ____     ___  ____  
//| |    |    / ___/|      |  /  _]|    \   /  _]|    \ 
//| |     |  (   \_ |      | /  [_ |  _  | /  [_ |  D  )
//| |___  |  |\__  ||_|  |_||    _]|  |  ||    _]|    / 
//|     | |  |/  \ |  |  |  |   [_ |  |  ||   [_ |    \ 
//|     | |  |\    |  |  |  |     ||  |  ||     ||  .  \
//|_____||____|\___|  |__|  |_____||__|__||_____||__|\_|
//                                                      


app.listen(3000, function(){
  console.log("Server starting on port 3000")
})  //MUST BE AT BOTTOM