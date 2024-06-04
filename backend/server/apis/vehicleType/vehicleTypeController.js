const VehicleType = require('./vehicleTypeModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await VehicleType.find(req.body).then(res => {
        resp.send({ success: true, status: 200, message: "All Vehicle Typess loaded", data: res })
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
    await VehicleType.findOne(query).then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "VehicleType loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No VehicleType Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })

}



exports.addVehicleType = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.image)
        validation += "image is required,"


    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await VehicleType.countDocuments()
        let vehicleTypeData = {
            vehicleTypeId: total + 1,
            name: formData.name,
            image: "vehicleType/" + formData.image
        }
        let vehicleType = new VehicleType(vehicleTypeData)
        let prevVehicleType = await VehicleType.findOne({ name: formData.name })
        if (prevVehicleType)
            resp.send({ success: false, status: 409, message: "VehicleType already exists with same name" })
        else
            vehicleType.save().then(res => {
                resp.send({ success: true, status: 200, message: "VehicleType added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.updateVehicleType = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await VehicleType.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.image){
                    helper.unlinkImage(res.image)
                    res.image = "vehicleType/" + formData.image
                }
                if (!!formData.status)
                    res.status = formData.status
                let id = res._id
                let prevVehicleType = await VehicleType.findOne({ $and: [{ name: res.name }, { _id: { $ne: id } }] })
                if (prevVehicleType)
                    resp.send({ success: false, status: 409, message: "VehicleType already exists with same name" })
                else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "VehicleType updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No VehicleType Found" })
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
        await VehicleType.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "vehicleType Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No vehicleType Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}