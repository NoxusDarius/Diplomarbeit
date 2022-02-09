const JWT = require("jsonwebtoken")


module.exports = async (req,res,next) =>{
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(400).json({
            
            "errors": [
                {
                    
                    "msg": "No Token found"
                    
                    
                }
            ]
        
         })
    }
    try{
        let user = await JWT.verify(token,"frefgrgrg452635654tfgtwgntugwtngtig")
        req.user = user.Mitarbeiter_ID;
        req.username = user.Username;
        req.Firmenname = user.Firmenname;
        console.log(JSON.stringify(user)+"Hier das User Objekt")
        console.log(JSON.stringify(user.Mitarbeiter_ID)+" Nach Valtiedierung user ID Ausgegeben")
        next();

    } catch (error){
        return res.status(400).json({
            
            "errors": [
                {
                    
                    "msg": "Token invalid"
                    
                    
                }
            ]
        
         })
    }
    
    
}