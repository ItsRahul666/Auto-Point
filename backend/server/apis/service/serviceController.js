const Service = require('./serviceModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    // console.log(req.body)
    await Service.find(req.body)
        .populate("vehicleTypeId")
        .populate("mechanicId")
        .then(res => {
            resp.send({ success: true, status: 200, message: "All Services loaded", data: res })
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
        await Service.findOne(query)
            .populate("vehicleTypeId")
            .populate("mechanicId").then(res => {
                if (!!res) {
                    resp.send({ success: true, status: 200, message: "Service loaded Successfully", data: res })
                }
                else
                    resp.send({ success: false, status: 404, message: "No Service Found" })
            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.addService = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.image)
        validation += "image is required,"
    if (!formData.vehicleTypeId)
        validation += "vehicleTypeId is required,"
    if (!formData.mechanicId)
        validation += "mechanicId is required,"
    if (!formData.price)
        validation += "price is required,"
    if (!formData.description)
        validation += "description is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Service.countDocuments()
        let serviceData = {
            serviceId: total + 1,
            price: formData.price,
            vehicleTypeId: formData.vehicleTypeId,
            mechanicId: formData.mechanicId,
            name: formData.name,
            description: formData.description,
            image: "service/" + formData.image
        }
        let service = new Service(serviceData)
            service.save().then(res => {
                resp.send({ success: true, status: 200, message: "Service added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }
}



exports.updateService = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Service.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.image){
                    helper.unlinkImage(res.image)
                    res.image = "service/" + formData.image
                }
                if (!!formData.vehicleTypeId)
                    res.vehicleTypeId = formData.vehicleTypeId
                if (!!formData.mechanicId)
                    res.mechanicId = formData.mechanicId
                if (!!formData.price)
                    res.price = formData.price
                if (!!formData.description)
                    res.description = formData.description
                res.save().then(res => {
                    resp.send({ success: true, status: 200, message: "Service updated Successfully", data: res })

                }).catch(err => {
                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                })
            }
            else
                resp.send({ success: false, status: 404, message: "No Service Found" })
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
        await Service.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Service Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Service Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}