import {Router} from 'express';
import {
    renderSignUpForm,
    signup,
    renderSigninForm,
    signin,
    logout
} from '../controllers/users.controllers.js';
const router = Router();
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);
router.get('/users/signin', renderSigninForm);
router.post('/users/signin', signin);
router.get('/users/logout', logout);
export default router;