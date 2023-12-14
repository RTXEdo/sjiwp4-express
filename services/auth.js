const  JWT_SECRET_KEY="S8PzcbiL31Mb7miHYGAtmjb2r2gj3Jjx4V38xbG1FMQFlivhK5YR9KpirQfspQjvXLo4lk2ABagQoLefb7aIqt176vfKl5HlOlhKy5xcRkGgeclubZEeQYjkbpoBGHFI";

const jwt = require("jsonwebtoken")

function getUserJwt(id, email, name, role, expDays = 7){
    const tokenData = {
        uid: id,
        email: email,
        name: name,
        role: role,
        time: Date.now()
    };

    const tokenOptions = {
        expiresIn: expDays * 24 * 60 * 60
    };
    const token = jwt.sign(tokenData, JWT_SECRET_KEY, tokenOptions);

    return token;

}

//MIDDLEWARE FOR AUTH COOKIE CHECK
function checkAuthCookie(req, res, nex){
    const token = req.cookies["auth"];
    console.log("COOKIE CHECK", token);

    const result = jwt.verify(token, JWT_SECRET_KEY);
    console.log("TOKEN CHECK", result);

}

module.exports = {
    getUserJwt,
    checkAuthCookie
};