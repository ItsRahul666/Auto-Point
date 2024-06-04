const mongoose = require('mongoose')
const serviceSchema = mongoose.Schema({
    serviceId: { type: Number, default: 0 },

    mechanicId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    vehicleTypeId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'vehicleType' },
    price: { type: Number, default: 0 },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "service/default.jpg" },
    
    status: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now }

})


const service = module.exports = mongoose.model('service', serviceSchema)
