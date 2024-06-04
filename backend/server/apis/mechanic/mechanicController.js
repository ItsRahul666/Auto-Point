const Mechanic = require('./mechanicModel')
const User = require('../user/userModel')
const helper = require('../../utilities/helpers')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')

// exports.login = async (req, resp) => {
//     let formData = req.body
//     let validation = ""
//     if (!formData.email && !formData.password)
//         validation += "email and password is required"
//     if (!!validation)
//         resp.send({ success: false, status: 422, message: validation })
//     else {
//         let query = { email: formData.email }
//         await Mechanic.findOne(query).then(res => {
//             if (!!res) {
//                 if (bcrypt.compareSync(formData.password, res.password)) {
//                     var user = {
//                         name: res.name, email: res.email, isAdmin: res.isAdmin, _id: res._id
//                     }
//                     let token = jwt.sign(user, helper.SECRET)
//                     resp.send({ success: true, status: 200, message: "Login Successful", token: token, data: res })
//                 }
//                 else resp.send({ success: false, status: 403, message: "Invalid Credentials" })
//             }
//             else
//                 resp.send({ success: false, status: 404, message: "No Mechanic Found" })
//         }).catch(err => {
//             resp.send({ success: false, status: 404, message: !!err.message ? err.message : err })
//         })
//     }

// }



exports.getAll = async (req, resp) => {
    await Mechanic.find(req.body).populate('vehicleTypeId').populate('userId').then(res => {
        resp.send({ success: true, status: 200, message: "All Mechanics loaded", data: res })
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

    let query = { userId: formData._id }
    await Mechanic.findOne(query).populate('vehicleTypeId').populate('userId').then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "Mechanic loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No Mechanic Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}


exports.addMechanic = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.vehicleTypeId)
        validation += "vehicleTypeId is required,"
    if (!formData.firstName)
        validation += "firstName is required,"
    if (!formData.address)
        validation += "address is required,"
    if (!formData.city)
        validation += "city is required,"
    if (!formData.state)
        validation += "state is required,"
    if (!formData.description)
        validation += "description is required,"
    if (!formData.speciality)
        validation += "speciality is required,"
    if (!formData.image)
        validation += "image is required,"
    if (!formData.gender)
        validation += "gender is required,"
        if (!formData.contact)
        validation += "contact is required,"
    if (!formData.email)
        validation += "email is required,"
    if (!formData.password)
        validation += "password is required,"
    
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
            let usertotal = await User.countDocuments()
            let UserData = {
                userId: usertotal + 1,
                name: formData.firstName,
                email: formData.email,
                password: bcrypt.hashSync(formData.password, salt),
                userType: 3,
                status: false
            }
            let user = new User(UserData)
            let prevUser = await User.findOne({ email: formData.email })
            if (prevUser)
                resp.send({ success: false, status: 409, message: "User already exists with same email" })
            else
                user.save().then(async res => {
                    let mechanictotal = await Mechanic.countDocuments()
                    let mechanicData = {}

                    mechanicData.mechanicId = mechanictotal + 1
                    mechanicData.vehicleTypeId = formData.vehicleTypeId
                    mechanicData.firstName = formData.firstName
                    if (!!formData.lastName)
                        mechanicData.lastName = formData.lastName
                    if (!!formData.address)
                    mechanicData.address = formData.address
                    mechanicData.city = formData.city
                    mechanicData.state = formData.state
                    mechanicData.description = formData.description
                    mechanicData.speciality = formData.speciality
                    mechanicData.image = "mechanic/" + formData.image
                    mechanicData.gender = formData.gender
                    mechanicData.contact = formData.contact
                    mechanicData.email = formData.email
                    mechanicData.password = bcrypt.hashSync(formData.password, salt)
                    mechanicData.userId = res._id
        
                    let mechanic = new Mechanic(mechanicData)
                    mechanic.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Mechanic added Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
                }).catch(err => {
                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                })
    }
}



exports.updateMechanic = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query1 = { userId: formData._id }
        await Mechanic.findOne(query1).then(async res => {
            if (!!res) {
                if (!!formData.vehicleTypeId)
                    res.vehicleTypeId = formData.vehicleTypeId
                if (!!formData.firstName)
                    res.firstName = formData.firstName
                if (!!formData.lastName)
                    res.lastName = formData.lastName
                if (!!formData.address)
                    res.address = formData.address
                if (!!formData.city)
                    res.city = formData.city
                if (!!formData.description)
                    res.description = formData.description
                if (!!formData.speciality)
                    res.speciality = formData.speciality
                if (!!formData.image){
                    helper.unlinkImage(res.image)
                    res.image = "mechanic/" + formData.image
                }
                if (!!formData.gender)
                    res.gender = formData.gender
                if (!!formData.contact)
                    res.contact = formData.contact
                if (!!formData.email)
                    res.email = formData.email
                if (!!formData.password)
                    res.password = bcrypt.hashSync(formData.password, salt)
                let id = res.userId
                let prevUser = await User.findOne({ $and: [{ email: res.email }, { _id: { $ne: id } }] })
                if (prevUser){
                    resp.send({ success: false, status: 409, message: "User already exists with same email" })
                }
                else
                    res.save().then(async mechanicData => {
                        let query2 = { _id: formData._id }
                        await User.findOne(query2).then(async UserData => {
                            if (!!UserData) {
                                if (!!formData.name)
                                    UserData.name = formData.firstName
                                if (!!formData.email)
                                    UserData.email = formData.email
                                if (!!formData.password)
                                    UserData.password = bcrypt.hashSync(formData.password, salt)
                                
                                    UserData.save().then(res => {
                                    resp.send({ success: true, status: 200, message: "Mechanic updated Successfully", data: mechanicData })
            
                                }).catch(err => {
                                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                                })
                            }
                            else
                            resp.send({ success: false, status: 404, message: "No User Found" })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
                
                }).catch(err => {
                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                })
            }
            else
                resp.send({ success: false, status: 404, message: "No Mechanic Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }



}

exports.changeStatus = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!formData.status)
        validation += "status is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await User.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "User Status Changed Successfully", data: res })

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