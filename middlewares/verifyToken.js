const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
///.log(req.headers)
    if(!req.body.headers.authorization) return res.status(403).json({msg: "Not authorized. No token"})

    if(req.body.headers.authorization && req.body.headers.authorization.startsWith("Bearer ")){
        const token = req.body.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) return res.status(403).json({msg: "Wrong or expired token"})
            else {
                req.user = data 
                //console.log(data)
                next()
            }
        })
    }
}

module.exports = verifyToken