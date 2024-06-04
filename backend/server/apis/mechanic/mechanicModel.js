const mongoose = require('mongoose')
const mechanicSchema = mongoose.Schema({
    mechanicId: { type: Number, default: 0 },
    vehicleTypeId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'vehicleType'},
    userId: { type: mongoose.Schema.Types.ObjectId, default:null, ref:'user'},
    
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },

    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },

    description: { type: String, default: "" },
    speciality: { type: String, default: "" },
    image: { type: String, default: "mechanic/default.jpg" },

    gender: { type: String, default: "" },

    contact: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" }
})


const Mechanic = module.exports = mongoose.model('mechanic', mechanicSchema)
