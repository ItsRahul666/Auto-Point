const User = require('./userModel')
const helper = require('../../utilities/helpers')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const customerModel = require('../customer/customerModel');
const mechanicModel = require('../mechanic/mechanicModel');


exports.login = async (req, res) => {
    // console.log(req)
    let formData = req.body
    let validation = ""
    if (!formData.email && !formData.password)
        validation += "email and password is required"
    if (!!validation)
        res.send({ success: false, status: 422, message: validation })
    let query = { email: formData.email }
    await User.findOne(query).then(async userData => {
        if (!!userData) {
            if (bcrypt.compareSync(formData.password, userData.password) && userData.status == true) {
                var user = {
                    name: userData.name, email: userData.email, userType: userData.userType, _id: userData._id
                }
                let token = jwt.sign(user, helper.SECRET)
                // console.log(userData)
                // console.log(userData.userType)
                if(userData.userType == 1)
                {
                    res.send({ success: true, status: 200, message: "Login Successful", token: token, data: userData })
                }
                else if(userData.userType == 2)
                {
                    // console.log("customer works")
                    let cdata = await customerModel.findOne({userId:userData._id}).populate('userId').exec()

                    res.send({ success: true, status: 200, message: "Login Successful", token: token, data: cdata })
                }
                else if(userData.userType == 3)
                {
                    let cdata = await mechanicModel.findOne({userId:userData._id}).populate('userId').exec()
                    res.send({ success: true, status: 200, message: "Login Successful", token: token, data: cdata })
                }
                else{
                    res.send({ success: false, status: 422, message: "Login Unsuccessful", token: null, data: null })
                }
            }
            else res.send({ success: false, status: 403, message: "Invalid Credentials" })
        }
        else
            res.send({ success: false, status: 404, message: "No User Found" })
    }).catch(err => {
        res.send({ success: false, status: 404, message: !!err.message ? err.message : err })
    })


}


exports.getAll = async (req, resp) => {
    req.body.userType = 2
    await User.find(req.body).then(res => {
        resp.send({ success: true, status: 200, message: "All Users loaded", data: res })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}



exports.getSingle = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })

    let query = { _id: formData._id }
    await User.findOne(query).then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "User loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No User Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}




exports.addUser = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.email)
        validation += "email is required,"
    if (!formData.password)
        validation += "password is required,"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await User.countDocuments()
        let UserData = {
            userId: total + 1,
            name: formData.name,
            email: formData.email,
            password: bcrypt.hashSync(formData.password, salt),
            userType: 2
        }
        let user = new User(UserData)
        let prevUser = await User.findOne({ email: formData.email })
        if (prevUser)
            resp.send({ success: false, status: 409, message: "User already exists with same email" })
        else
            user.save().then(res => {
                resp.send({ success: true, status: 200, message: "User added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }

}



exports.updateUser = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await User.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.email)
                    res.email = formData.email
                if (!!formData.password)
                    res.password = bcrypt.hashSync(formData.password, salt)
                if (!!formData.status)
                    res.status = formData.status
                let id = res._id
                let prevUser = await User.findOne({ $and: [{ email: res.email }, { _id: { $ne: id } }] })
                if (prevUser)
                    resp.send({ success: false, status: 409, message: "User already exists with same email" })
                else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "User updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No User Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }



}

