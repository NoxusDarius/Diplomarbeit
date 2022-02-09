const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const checkauth = require("../middleware/checkauth")
const { mitarbeiter } = new PrismaClient();
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")

router.get('/private' , checkauth, async (req,res) =>{
        
        console.log(req.user.Firmen_ID+"Hier der Nutzer in der anderen Sicht")
        firma_ID = req.user.Firmen_ID;
        const allmitarbeiter = await mitarbeiter.findMany({
            where:{
                firma_ID
            },
            select:{
                Mitarbeiter_ID: true,
                Vorname: true,
                Nachname: true
            }

        })
        res.json(allmitarbeiter)
    
})
router.post('/private/signmi', checkauth, async (req,res) =>{
    const{ Vorname, Nachname, password } = req.body;
    const firma_ID = req.user.Firmen_ID;

    const mitarbeiteresxists = mitarbeiter.findFirst({
        where: {
            Nachname
        },
        select:{
            Nachname:true
        }
    })
    if(!mitarbeiteresxists){
        return res.status(400).json({
            
                "errors": [
                    {
                        
                        "msg": "This Lastname is already in use",
                        
                    }
                ]
            
        })
    }

    const haschpassword = await bcrypt.hash(password,10)
    const createmitarbeiter = await mitarbeiter.create({
        data:{
            Vorname,
            Nachname,
            firma_ID,
            password: haschpassword
        }
    })
    const Mitarbeiter_ID = await mitarbeiter.findFirst({
        where:{
            Nachname
        },
        select:{
            Mitarbeiter_ID:true
        }
    })
    const token = await JWT.sign({
        Mitarbeiter_ID
    }, "edfwrgthzrjzujzutjzhtgregregth",{
        expiresIn: 3600000
    })
    res.json({token})
    res.json(createmitarbeiter)

})
router.post("/private/logmi",checkauth, async (req,res) =>{
    const { password, Nachname } = req.body;
    
    const mitarbeiterexists = await mitarbeiter.findFirst({
        where:{
            Nachname
        },
        select:{
            Nachname:true
        }
    })
    if(!mitarbeiterexists){
        return res.status(400).json({
            "errors": [
                {
                    
                    "msg": "Access Denied",
                    
                }
            ]
        })
    }
    const passwordmi_Db = await mitarbeiter.findFirst({
        where:{
            Nachname
        },
        select:{
            password:true
        }
    });
    const compare = bcrypt.compare(password, passwordmi_Db.password)
    if(!compare){
        return res.status(400).json({
            "errors": [
                {
                    
                    "msg": "Access Denied",
                    
                }
            ]
        })
    }
    const Mitarbeiter_ID = await mitarbeiter.findFirst({
        where:{
            Nachname
        },
        select:{
            Mitarbeiter_ID:true
        }
    })
    const token = await JWT.sign({
        Mitarbeiter_ID
    }, "edfwrgthzrjzujzutjzhtgregregth",{
        expiresIn: 3600000
    })
    res.json({token})


})

module.exports = router;