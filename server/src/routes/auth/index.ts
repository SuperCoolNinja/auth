import express from 'express';
import MessageResponse from '../../interfaces/IMessageResponse';
import { AuthController } from '../../controllers/authController';
import { check } from 'express-validator';

const router = express.Router();

// POST: /auth/register
router.post<{}, MessageResponse>('/register', [
  check("pseudo", "Please provide a pseudo with a length of 3 character minimum.").isLength({min : 3}),
  check("email", "Please provide a valid email").isEmail(),
  check('password', "Please provide a password with a length of 6 character minimum.").isLength({min : 6})
], AuthController.createUser);

// POST: /auth/login
router.post<{}, MessageResponse>('/login', AuthController.login);
router.post<{}, MessageResponse>('/logout', AuthController.logout);


export default router;