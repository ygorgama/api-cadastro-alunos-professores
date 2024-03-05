import { NextFunction, Request, Response } from "express";
import Rooms from "../models/Room";
import ErrorHandler from "../error-handler/ErrorHandler";
import { validationResult } from "express-validator";
import Teachers from "../models/Teachers";
import Students from "../models/Students";

class RoomController{
    static async store(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new ErrorHandler(errors.array()[0].msg);
            error.setStatusCode(422);
            return next(error);
        }

        const {roomNumber, description} = req.body;
        
        const rooms = new Rooms({
            id: roomNumber
        })

        if (typeof description !== 'undefined') {
            rooms.description = description;
        }

        try {
            const createdRoom = await rooms.save();

            res.status(201).json({
                message: "Room created with sucess!",
                room: createdRoom
            });
        } catch (e) {
            let error;
            if (e instanceof ErrorHandler) {
              error = e;        
            }else{
              error = error = new ErrorHandler((e as Error).message);
            }
            return next(error);
        }
    }

    static async index(req: Request, res: Response, next: NextFunction){
        try {
            const rooms = await Rooms.findAll({
                include: [Teachers]
            });

            let message = 'No room found!'

            if (rooms.length > 0) {
                message: "Rooms sucessfully fetched!"
            }

            res.status(200).json({
                message: message,
                rooms: rooms
            });
        } catch (e) {
            const error = new ErrorHandler((e as Error).message);
            return next(error); 
        }
    }
}

export default RoomController;