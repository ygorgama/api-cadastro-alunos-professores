import { Router } from "express";
import {body} from 'express-validator'
import { authenticate } from "../middleware/authenticate";
import RoomController from "../controllers/RoomController";
import Rooms from "../models/Room";
const routes = Router();


routes.post('/store', [
    body('roomNumber').custom( async (value, {req}) => {
        const room = await Rooms.findByPk(value);

        if (room) {
            const error = new Error("Rooms alredy exist!");
            throw error; 
        }

        return true;
    })
], authenticate ,RoomController.store);

routes.get('/index', RoomController.index)

export default routes;