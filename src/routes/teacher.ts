import { Router } from "express";
import {body, param} from 'express-validator'
import { authenticate } from "../middleware/authenticate";
import Teacher from "../models/Teachers";
import {cpf} from 'cpf-cnpj-validator';
import ErrorHandler from "../error-handler/ErrorHandler";
import TeacherController from "../controllers/TeacherController";
import Rooms from "../models/Room";
const routes = Router();


routes.post('/store', [
    body('cpf').trim().custom((value, {req}) => {
        if (!cpf.isValid(value)) {
            const error = new ErrorHandler('Cpf is not valid!');
            error.setStatusCode(422);
            throw error;
        }
        return true;
    }).custom( async (value, {req}) => {
        const teacher = await Teacher.findOne({where: {cpf: value}});
        if (teacher) {
            const error = new ErrorHandler('Teacher already exist!');
            error.setStatusCode(422);
            throw error;
        }
        return true;
    }).isString().isLength({min: 11, max: 11}),
    body('name').isString().isLength({min: 4}),
    body('degree').isString().isLength({min: 4}),
    body('roomNumber').isInt()
],TeacherController.store);

routes.get('/', TeacherController.index);
routes.get('/:id', TeacherController.index);

routes.put('/:id', [
    body('cpf').trim().custom((value, {req}) => {
        if (!cpf.isValid(value)) {
            const error = new ErrorHandler('Cpf is not valid!');
            error.setStatusCode(422);
            throw error;
        }
        return true;
    }).isString().isLength({min: 11, max: 11}),
    body('name').isString().isLength({min: 4}),
    body('degree').isString().isLength({min: 4}),
    body('roomNumber').isInt().custom(async (value, {req}) => {
        const room = await Rooms.findByPk(value)
        if (!room) {
            const error = new ErrorHandler('Room not found!');
            error.setStatusCode(404);
            throw error;
        }
    }),
    param('id').isInt()
],TeacherController.update);

routes.delete('/:id', param('id').isInt() ,TeacherController.delete)

export default routes;