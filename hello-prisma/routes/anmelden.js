//npm install express
const router = require("express").Router();
//npm install @prisma/client
const { PrismaClient} = require("@prisma/client")
const { firma } = new PrismaClient()
//npm install express-validator
const {check, validationResult} = require("express-validator")
//npm install bcrypt
const bcrypt = require("bcrypt")
//npm install jsonwebtoken
const JWT = require("jsonwebtoken")

router.get('/',(req,res) =>{
    res.send("Hier wird gearbeitet")
})
router.post('/signup',[
    check("Firmenname", "Please Provide an FirmenID with the min length of 5 chars")
    .isLength({
        min: 5
        
    }),
    check("password","Please use a password with 6 characters at least")
    .isLength({
        min:6

    }),
    check("UID_Nummer","Geben Sie eine gültige UID_Nummer ein")
    .isLength({
        min:12
    })
], async (req,res) =>{
    const { password, Firmenname,UID_Nummer} = req.body;
    //let { UID_Nummer }  = req.body;
    //UID_Nummer = parseInt(UID_Nummer);
   
    console.log(password,Firmenname)
    //Validation for Firmenname
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //Check if Firma already exists
    const firmaexist = await firma.findUnique({
        where:{
            Firmenname
        },
        select:{
            Firmenname: true
        }
    });

    //If firma exists send error array 
    //Should be the same as always
    if(firmaexist){
        return res.status(400).json({
            
                "errors": [
                    {
                        "value": "Hall",
                        "msg": "This Name is already in use",
                        "param": "Firmenname",
                        "location": "body"
                    }
                ]
            
        })
    }
    const haschpassword = await bcrypt.hash(password,10)
    const firmacreate = await firma.create({
        data:{
            Firmenname,
            UID_Nummer,
            password: haschpassword
        }
    })
    
    const Firmen_ID = await firma.findUnique({
        where:{ Firmenname
        },
        select:{
            Firmen_ID:true
        }
    })
    const token = await JWT.sign({
        Firmenname,
        Firmen_ID
    }, "frefgrgrg452635654tfgtwgntugwtngtig",{
        expiresIn: 360000
    })

    res.json({token})
    res.json(firmacreate)
    
})

router.post("/login", async (req,res) =>{
    const { password, Firmenname} = req.body;
    const firmaexist = await firma.findUnique({
        where:{
            Firmenname
        },
        select:{
            Firmenname: true
        }
        
    });
    if(!firmaexist){
        return res.status(400).json({
            "errors": [
                {
                    
                    "msg": "Access Denied",
                    
                }
            ]
        })
    }
    const passwordDB = await firma.findUnique({
        where:{
            Firmenname
        },
        select:{
            password:true
        } 
    });
    console.log(passwordDB.password)
    console.log(password)
    const compare = bcrypt.compare(password,passwordDB.password)
    if(!compare){
        return res.status(400).json({
            "errors": [
                {
                    
                    "msg": "Access Denied",
                    
                }
            ]
        })
    }
    console.log("Hallo hier bin ich")
    //geändert zu let falls fehler
    const Firmen_ID = await firma.findUnique({
        where:{ Firmenname
        },
        select:{
            Firmen_ID:true
        }
    })
    console.log(Firmen_ID+"Dies ist die Frimen_ID")
    const token = await JWT.sign({
        Firmenname,
        Firmen_ID
    }, "frefgrgrg452635654tfgtwgntugwtngtig",{
        expiresIn: 360000
    })

    res.json({token})
})

module.exports = router;