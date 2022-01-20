const Admin = require('../models/admin')
const User = require('../models/user')
const Manager = require('../models/Manager')
const jwt = require('jsonwebtoken')
const signup = (req, res) => {

    const admin = new Admin(req.body);
    admin.save((err, admin) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(admin)
    })

}
const signin = (req, res) => {

    const {
        email,
        password
    } = req.body;
    Admin.findOne({
        email
    }, (err, admin) => {
        if (err || !admin) {
            return res.status(400).json({
                error: 'User not Found with this email@'
            })
        }
        if (!admin.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and Password dont Match !'
            })
        }
        const token = jwt.sign({
            data: admin
        }, process.env.JWT_SecretAdmin, {
            expiresIn: "24h"
        })
        res.cookie('token', token, {
            expires: new Date(Date.now() + 4 * 3600000)
        })
        return res.json({
            token,
            admin
        })

    })


}
const createmanager =  (req,res)=>{
    const {
        username,
        email,
        password,
        role,
      } = req.body;

      const UserData = {
        email,
        password,
        role,

      }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            return res.status(400).send(err)
        }
        const ManagerData = {
            username :username,
            _id: User.id
          }
        res.send()
        const manager = new Manager(ManagerData);
        manager.save()
    })
    
}
const signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Admin Logout"
    })
}

export {
    signup,
    signin,
    createmanager,
    signout
}