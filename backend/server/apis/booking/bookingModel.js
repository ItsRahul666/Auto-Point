const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    bookingId: { type: Number, default: 0 },
    vehicleTypeId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "vehicleType" },
    serviceId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "service" },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
    mechanicId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },

    appointmentdate: { type: Date, default: Date.now },
    appointmentTime: { type: String, default: '' },

    vehicleNumber: { type: String, default: "" },
    modelName: { type: String, default: "" },

    price: { type: Number, default: 0 },
    instruction: { type: String, default: "" },

    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    address: { type: String, default: "" },
    contact: { type: String, default: "" },
    email: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },

    bookingStatus: { type: String, default: 'pending' }, // in-progress, completed, canceled

    createdAt: { type: Date, default: Date.now }

})



const Booking = module.exports = mongoose.model('booking', bookingSchema)