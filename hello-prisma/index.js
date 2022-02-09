const express = require("express");
const app = express();
const auth = require("./routes/anmelden")
const mitarbeiter = require("./routes/mitarbeiter")
const createmitarbeiterfirm = require("./routes/mitarbeiterfirma")
//ctrl + c nodemon stop
app.use(express.json())

app.use("/api/user", require("./routes/company"))
app.use("/user/anmelden", auth)
app.use("/user/mitarbeiter", mitarbeiter)
app.use("/user", createmitarbeiterfirm)
var currenttime = new Date();
app.listen(5000,() =>{
    console.log("Listening on port 5000 " + currenttime.getHours() + "h " + currenttime.getMinutes() +"m")
})