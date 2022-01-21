import User from "../models/user.js"
import Manager from "../models/manager.js"


const createManager = (req, res) => {

    const {
        username,
        email,
        password,
    } = req.body;

    const UserData = {
        email,
        password,
        role : "MANAGER",

    }

    const user = new User(UserData);
    user.save((err, User) => {
        if (err) {
            return res.status(400).send(err)
        }
        const ManagerData = {
            username: username,
            _id: User.id
        }
            const manager = new Manager(ManagerData);
            manager.save()
        return res.json({
            user,
            manager
        })

    })
}
const removemanager = async (req,res)=>{
   
        const {
            id,
        } = req.params
       
       await User.findOneAndRemove({_id: id})
       await Manager.findOneAndRemove({_id: id})    
            res.json({
                msg:"deleted with success"
            })
        }




export {
    createManager,
    removemanager
}