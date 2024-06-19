const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/sign-in',UserController.loginUser);
router.post('/sign-up',UserController.createUser);
router.post('/log-out',UserController.logoutUser);
router.put('/update-user/:id',UserController.updateUser);
router.delete('/delete-user/:id',authMiddleware,UserController.deleteUser);
router.get('/getAll',authMiddleware,UserController.getAllUser);
router.get('/getAllFilter',UserController.getAllUserFilter);
router.get('/get-details/:id',authUserMiddleware,UserController.getDetailsUser);
router.post('/refresh-token',UserController.refreshToken);
router.post('/forget-password',UserController.forgetPassword);
router.post('/reset-password',UserController.resetPassword);

module.exports = router;