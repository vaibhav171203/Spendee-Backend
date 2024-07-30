import express from 'express';
import { loginControllers, registerControllers, setAvatarController,forgotPasswordController,resetPasswordController } from '../controllers/userController.js';

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/setAvatar/:id").post(setAvatarController);
router.route("/forgotPassword").post(forgotPasswordController);
router.route("/resetPassword").post(resetPasswordController);



export default router;