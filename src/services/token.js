const jwt = require('jwt-simple');

const moment = require('moment');

const config = require('./config');

function createToken(user) {

    const payload = {

        //sub: user._id, //el id en realidad no se lo podemos mandar pq se crea en la base pero hay que mandarselo x el put
        //posible solución: hacer que la base busque por email (y por address en el caso de los restos) en vex de x id
        name: user.name,
        email: user.email,
        password: user.password,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix(),
    };

    return jwt.encode(payload, config.SECRET_TOKEN);

}
function decodeToken(token) { 
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            let usuario = {
                _id: payload.sub,
                name: payload.name,
                email: payload.email,
                iat: payload.iat,
                exp: payload.exp
            }
            resolve(usuario);
        } catch (err) { 
            console.log(err);
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    })
    return decoded;
}
function createRestoToken(resto){
    const payload = {
        name: resto.name,
        address: resto.address,
        Rtype: resto.Rtype,
        points: resto.points,
        dishes: resto.dishes,
        comments: resto.comments,
        votersList: resto.votersList,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
}
function validToken(token) { //este método se fija si la req TIENE un token o no, y si es valido
    decodeToken(token)
        .then(decoded => {
            if(decoded.exp<=moment().unix() || decoded.exp === undefined){ //chequea si el token tiene expiracion, y si es asi, si ya expiro.
                return false
            }
            return true
        })
        .catch(err => {
            console.log(err)
            return false;
        })
}
module.exports= {
    createToken, decodeToken, createRestoToken, validToken
}