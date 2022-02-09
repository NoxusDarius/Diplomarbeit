const router = require("express").Router();
const { PrismaClient} = require("@prisma/client")
const { firma } = new PrismaClient()
router.get("/", async (req,res) =>{
    const firmas = await firma.findMany({
        select:{
            Firmenname : true,
            UID_Nummer: true
        }
    });
    res.json(firmas)
})
router.post("/", async (req,res) =>{
   const { Firmenname } = req.body;
    let { UID_Nummer }  = req.body;
    UID_Nummer = parseInt(UID_Nummer);
   
 
   const firmaexists = await firma.findUnique({
       where:{
           Firmenname
         
       },
       select:{
           Firmenname:true
       }
   });
   if(firmaexists){
       return res.status(400).json({
           msg: "Firma already exists"
       })
   }
   const firmare = await firma.create({
       data:{
           Firmenname,
           UID_Nummer
       }
   });
   res.json(firmare)
})

router.delete("/", async (req,res) =>{
    const { Firmenname} = req.body;
    const firmadelete = await firma.delete({
        where:{
            Firmenname
        }
      
        
    });
    res.json(firmadelete)
})

module.exports = router;