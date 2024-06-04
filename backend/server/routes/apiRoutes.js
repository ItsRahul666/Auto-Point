const router = require('express').Router()
const helper = require('../utilities/helpers')


//controllers
const userController = require('../apis/user/userController')
const customerController = require('../apis/customer/customerController')
const mechanicController = require('../apis/mechanic/mechanicController')

const vehicleTypeController = require('../apis/vehicleType/vehicleTypeController')
const contactController = require('../apis/contact/contactController')
const serviceController = require('../apis/service/serviceController')
const bookingController = require('../apis/booking/bookingController')
const feedbackController = require('../apis/feedback/feedbackController')
const dashboardController = require('../apis/dashboard/dashboardController')

//auth
router.post('/user/login', userController.login)


//customer
router.post('/customer/add', customerController.addCustomer)
router.post('/customer/update', customerController.updateCustomer)

//mechanic
router.post('/mechanic/add', helper.uploadImageFun.single('mechanic_image'), mechanicController.addMechanic)
router.post('/mechanic/all', mechanicController.getAll)
router.post('/mechanic/single', mechanicController.getSingle)

//vehicleType
router.post('/vehicleType/all', vehicleTypeController.getAll)
router.post('/vehicleType/single', vehicleTypeController.getSingle)

// contact
router.post('/contact/add',  contactController.addContact)


//service
router.post('/service/all', serviceController.getAll)
router.post('/service/single', serviceController.getSingle)


router.use(require('../middleware/tokenChecker'))

//dashboard
router.get('/dashboard', dashboardController.dashboard)


//customer
router.post('/customer/all', customerController.getAll)
router.post('/customer/single', customerController.getSingle)
router.post('/customer/changeStatus', customerController.changeStatus)

//mechanic
router.post('/mechanic/update', helper.uploadImageFun.single('mechanic_image'), mechanicController.updateMechanic)
router.post('/mechanic/changeStatus', mechanicController.changeStatus)

//vehicleType

router.post('/vehicleType/add', helper.uploadImageFun.single('vehicleType_image'), vehicleTypeController.addVehicleType)
router.post('/vehicleType/update', helper.uploadImageFun.single('vehicleType_image'), vehicleTypeController.updateVehicleType)
router.post('/vehicleType/changeStatus', vehicleTypeController.changeStatus)
//contact

router.post('/contact/all', contactController.getAll)
router.post('/contact/single', contactController.getSingle)
// router.post('/contact/update', contactController.updateContact)

//service

router.post('/service/add', helper.uploadImageFun.single('service_image'), serviceController.addService)
router.post('/service/update', helper.uploadImageFun.single('service_image'), serviceController.updateService)
router.post('/service/changeStatus', serviceController.changeStatus)

//customer
router.post('/booking/all', bookingController.getAll)
router.post('/booking/single', bookingController.getSingle)
router.post('/booking/add', bookingController.addBooking)
// router.post('/booking/update', bookingController.updateBooking)
router.post('/booking/changeStatus', bookingController.changeStatus)


router.post('/feedback/all', feedbackController.getAll)
router.post('/feedback/single', feedbackController.getSingle)
router.post('/feedback/add', feedbackController.addFeedback)
// router.post('/feedback/update', feedbackController.updateBooking)
router.post('/feedback/changeStatus', feedbackController.changeStatus)


router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router