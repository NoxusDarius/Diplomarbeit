const { check, validationResult, body} = require("express-validator");

module.exports = [
    check("Username", "Please Provide an Username that fits the requirements")
    .isLength({
        min:6
    }),
    check("password", "Please Provide a password that fits the requirements")
    .isLength({
        min:6
    })
] ,async (req, res, next) =>{
    next();
}
