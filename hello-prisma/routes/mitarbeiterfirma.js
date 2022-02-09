const router = require("express").Router();
const {PrismaClient} = require("@prisma/client");
const  {mitarbeiter} = new PrismaClient();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validatemi = require("../middleware/validatemit");
const checkauth = require("../middleware/checkauth");
const { validationResult} = require("express-validator");


router.get("/mitarbeiter/getadmin",checkauth, async (req,res) =>{
    const admin = checkIfAdmin(req.user);
    if(!admin){
        fehler(res,"No user with this id found")
    }
    if(admin.isAdmin == false){
        fehler(res,"You need to be admin")
    }
    
    const allmitarbeiter = await mitarbeiter.findMany({
        where:{
            Firmenname: req.Firmenname
        }
    })
    res.json(allmitarbeiter)
})


router.post("/mitarbeiter/signup",validatemi,checkauth, async (req,res) =>{
    const {Username,Vorname, Nachname, password, Firmenname} = req.body;
    console.log(req.username+" Hier ist der Usename Wichtig!")

    console.log(JSON.stringify(req.user) +"Hier die ID mit req.id")
   /* const lookadmin = await mitarbeiter.findUnique({
        where:{
            Mitarbeiter_ID: req.user
        },
        select:{
            "isAdmin":true
        }
    })*/
    const admin = checkIfAdmin(req.user);
    if(!admin){
        fehler(res,"No user with this id found")
    }
    if(admin.isAdmin == false){
        fehler(res,"You need to be admin")
    }
    
    console.log(Username,Vorname,Nachname,password,Firmenname);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const mitarbeiterexists = await mitarbeiter.findUnique({
        where:{
            Username

        },
        select:{
            Username: true
        }
    });
    if(mitarbeiterexists){
       fehler(res,"Username already in use")
    }
   
    const haschpassword = await bcrypt.hash(password,10);
    const createmitarbeiter = await mitarbeiter.create({
        data:{
            Username,
            Vorname,
            Nachname,
            password: haschpassword,
            Firmenname:  req.Firmenname,
            "isAdmin": false
        }
    })
    res.json(createmitarbeiter);
})
router.post("/mitarbieter/signin", async (req,res) =>{
    const { Username,password} = req.body;
    console.log(Username,password)

    /*const mitarbeiterexists = await mitarbeiter.findUnique({
        where:{
            Username
        },
        slesct:{
            Username:true
        }
    })*/
    const checkvalue = await mitcheckexists(Username);
    if(!checkvalue){
       fehler(res,"Access Denied")
    }
    const passwordDB = await mitarbeiter.findUnique({
        where:{
            Username
        },
        select:{
            password:true,
            "Mitarbeiter_ID":true,
            "Firmenname": true
        }
    });
    const compare = bcrypt.compare(password,passwordDB.password)
    if(!compare){
       fehler(res,"Acces Denied")
    }
    else{
        console.log("A")
    }
    const token = await JWT.sign({
        Username,
        Mitarbeiter_ID: passwordDB.Mitarbeiter_ID,
        Firmenname: passwordDB.Firmenname

    }, "frefgrgrg452635654tfgtwgntugwtngtig",{
        expiresIn: 360000
    })
    res.json({token})

    
})

function fehler(res,fehlermeldung){
    return res.status(400).json({
        "errors": [
            {
                
                "msg": fehlermeldung,
                
            }
        ]
    })
}
function mitcheckexists(Username){
    const mitarbeiterexists =  mitarbeiter.findUnique({
        where:{
            Username
        },
        select:{
            Username:true
        }
    })
    return mitarbeiterexists;
}
function checkIfAdmin(id){
    const lookadmin =  mitarbeiter.findUnique({
        where:{
            Mitarbeiter_ID: id
        },
        select:{
            "isAdmin":true
        }
    })
    return lookadmin;
}
module.exports = router;