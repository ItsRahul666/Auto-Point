const mongoose = require('mongoose')
const vehicleTypeSchema = mongoose.Schema({

    vehicleTypeId: { type: Number, default: 0 },
    
    name: { type: String, default: "" },
    image: { type: String, default: "vehicleType/default.jpg" },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})


const VehicleType = module.exports = mongoose.model('vehicleType', vehicleTypeSchema)
