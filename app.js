const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true });

const contactsSchema = {
  name: String,
  email: String,
  message: String
};

const Contact = mongoose.model("Contact", contactsSchema);


console.log("Database is active");


app.get("/", function(req, res){

    res.render("page");

});

app.get("/thanks", function(req, res){

    res.render("thanks");

});



app.post("/page", function(req, res){

    const personName = (req.body.cname); 
    const personEmail = (req.body.cemail);
    const personMessage = (req.body.cmessage);
  
    const contactform = new Contact ({
      name: personName,
      email: personEmail,
      message: personMessage
    });
    
    contactform.save()
    console.log("Successfully saved the document");

    res.redirect("/thanks");

});






let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully on Port" + port);
});