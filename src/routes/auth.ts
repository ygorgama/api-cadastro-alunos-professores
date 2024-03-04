import { Router } from "express";
import AuthController from "../controllers/AuthController";
import {body} from 'express-validator'
import User from "../models/Users";
import { authenticate } from "../middleware/authenticate";
const routes = Router();

routes.post('/register', [
    body('email').isEmail().withMessage('Email Invalid')
    .custom(async (value, {req}) => {
        const user = await User.findOne({
            where: {email: value}
        }) 

        if (user) {
            const error = new Error('Email already exist on database');
            throw error;
        }
    }),
    body('password').isLength({min: 4, max: 16}).isAlphanumeric().withMessage('Password Invalid').trim().withMessage('Password invalid'),
    body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            const error = new Error("Passwords are not the same!");
            throw error; 
        }
        return true;
    }),
    body('name').isString().withMessage('Name invalid!'),
] ,AuthController.store);
routes.get('/index', AuthController.index);

routes.post('/login', AuthController.login);
routes.patch('/update-password', [
    body('password').isAlphanumeric().withMessage('Password invalid!').trim().isLength({min: 4, max: 16}).withMessage('Password invalid'),
], authenticate ,AuthController.updatePassword);

export default routes;