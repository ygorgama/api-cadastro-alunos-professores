import { Router } from "express";
import {body, param} from 'express-validator'
import { authenticate } from "../middleware/authenticate";
import {cpf} from 'cpf-cnpj-validator';
import ErrorHandler from "../error-handler/ErrorHandler";
import Rooms from "../models/Room";
import StudentController from "../controllers/StudentController";
import Students from "../models/Students";
const routes = Router();


routes.post('/store', [
    body('cpf').custom((value, {req}) => {
        if (!cpf.isValid(value)) {
            const error = new ErrorHandler('Cpf is not valid!');
            error.setStatusCode(422);
            throw error;
        }
        return true;
    }).custom( async (value, {req}) => {
        const student = await Students.findOne({where: {cpf: value}});
        if (student) {
            const error = new ErrorHandler('Student already exist!');
            error.setStatusCode(422);
            throw error;
        }
        return true;
    }).isString().isLength({min: 11, max: 11}),
    body('name').isString().isLength({min: 4}),
    body('roomNumber').isInt()
],StudentController.store);

routes.get('/', StudentController.index);
routes.get('/:id', StudentController.indexOne);
routes.delete('/:id', StudentController.delete);

export default routes;