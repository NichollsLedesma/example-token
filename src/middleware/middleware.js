const jwt = require('jsonwebtoken');

const middleware = {
    loggedIn : (req, res, next)=>{
        let token = req.headers['authorization'];
        if(token===undefined){
            res.status(401).send( { error: "Necesario el token para ingresar"  } );
        }else {
            console.log(token);
            token=token.replace('Bearer','');
            req.token=token;
            next();
        }
    }
    // aca mas midd
}

module.exports = middleware;