const Booking = require('./bookingModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    // if (!!req.decoded && req.decoded.userType != 1)
     Booking.find(req.body).populate("vehicleTypeId")
        .populate("serviceId").populate("mechanicId").then(res => {
            console.log(res)
            resp.send({ success: true, status: 200, message: "All Bookings loaded", data: res })
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
    else {
        let query = { _id: formData._id }
        await Booking.findOne(query)
            .populate("vehicleTypeId")
            .populate("serviceId")
            .then(res => {
                if (!!res) {
                    resp.send({ success: true, status: 200, message: "Booking loaded Successfully", data: res })
                }
                else
                    resp.send({ success: false, status: 404, message: "No Booking Found" })
            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.addBooking = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.vehicleTypeId)
        validation += "vehicleTypeId is required,"
    if (!formData.serviceId)
        validation += "serviceId is required,"
    if (!formData.userId)
        validation += "userId is required,"
    if (!formData.mechanicId)
        validation += "mechanicId is required,"
    if (!formData.appointmentDate)
        validation += "appointmentDate is required,"
    if (!formData.appointmentTime)
        validation += "appointmentTime is required,"
    if (!formData.vehicleNumber)
        validation += "vehicleNumber is required,"
    if (!formData.modelName)
        validation += "modelName is required,"
    if (!formData.price)
        validation += "price is required,"
    if (!formData.instruction)
        validation += "instruction is required,"
    if (!formData.firstName)
        validation += "firstName is required,"
    // if (!formData.lastName)
    //     validation += "lastName is required,"
    if (!formData.contact)
        validation += "contact is required,"
    if (!formData.address)
        validation += "address is required,"
    if (!formData.email)
        validation += "email is required,"
    if (!formData.city)
        validation += "city is required,"
    if (!formData.state)
        validation += "state is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {

        
            let total = await Booking.countDocuments()
            let bookingData = {
                bookingId: total + 1,
                vehicleTypeId: formData.vehicleTypeId,
                serviceId: formData.serviceId,
                mechanicId: formData.mechanicId,
                userId: formData.userId,
                appointmentDate: formData.appointmentDate,
                appointmentTime: formData.appointmentTime,
                vehicleNumber: formData.vehicleNumber,
                modelName: formData.modelName,
                price: formData.price,
                instruction: formData.instruction,
                firstName: formData.firstName,
                lastName: '',
                address: formData.address,
                contact: formData.contact,
                email: formData.email,
                city: formData.city,
                state: formData.state
            }
            if (!formData.lastName)
                bookingData._doc.lastName= formData.lastName
            let booking = new Booking(bookingData)
            booking.save().then(res => {
                resp.send({ success: true, status: 200, message: "Booking added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })

        
    }
}


// exports.updateBooking = async (req, resp) => {
//     let formData = req.body
//     let validation = ""
//     if (!formData._id)
//         validation += "_id is required"
//     if (!!validation)
//         resp.send({ success: false, status: 422, message: validation })
//     else {
//         let query = { _id: formData._id }
//         await Booking.findOne(query).then(async res => {
//             if (!!res) {
//                 let isInValid = false
//                 if (!!formData.bookingStatus) {
//                     if (formData.bookingStatus == 5 && res.bookingStatus > 2) {
//                         isInValid = true
//                     } else {
//                         res.bookingStatus = formData.bookingStatus
//                     }
//                 }
//                 if (!!formData.trackingId)
//                     res.trackingId = formData.trackingId
//                 if (!!formData.shipmentUrl)
//                     res.shipmentUrl = formData.shipmentUrl
//                 if (isInValid)
//                     resp.send({ success: true, status: 200, message: "Booking cannot be cancelled" })
//                 else
//                     res.save().then(res => {
//                         resp.send({ success: true, status: 200, message: "Booking updated Successfully", data: res })

//                     }).catch(err => {
//                         resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
//                     })
//             }
//             else
//                 resp.send({ success: false, status: 404, message: "No Booking Found" })
//         }).catch(err => {
//             resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
//         })
//     }
//     //   }


// }

exports.changeStatus = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!formData.bookingStatus)
        validation += "bookingStatus is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Booking.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.bookingStatus)
                    res.bookingStatus = formData.bookingStatus
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Booking Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Booking Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}

