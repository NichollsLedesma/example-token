const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const passtoken = 'LaPassSecret';

exports.index = (req, res) => {
    res.render('index');
}

exports.login = (req, res) => {
    res.render('login');
}

exports.usuario = (req,res)=>{
    res.render('addUser');
}

exports.addUser = async (req, res) => {
    let user = new User(req.body);
    let elUser = await user.save();
    res.redirect('/login');
}

exports.doLogin = async (req, res) => {
    let { username, password } = req.body;
    let encontrado = await User.find({ nick: username, pass: password });

    if (encontrado.length === 0) res.send('Usuario no encontrado');

    let laData = {
        username: username,
        apellido: encontrado[0].apellido,
        nombre: encontrado[0].nombre
    }
    let token = jwt.sign(laData, passtoken, {
        expiresIn: 60 * 10 // 10 min
    });
    // res.send(token);
    res.render('admin', {token: token})
}

exports.admin = (req, res) => {
    let token = req.token;
    jwt.verify(token, passtoken, (err, user) => {
        (err) ?
            res.status(401).send({ error: "Token inválido." }) :
            res.send(user);
    });
}