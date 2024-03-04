import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ErrorHandler from "../error-handler/ErrorHandler";
import Teachers from "../models/Teachers";
import Rooms from "../models/Room";

class TeacherController{
    static async store(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const error = new ErrorHandler(errors.array()[0].msg);
            error.setStatusCode(422);
            return next(error);
        }
        
        const {roomNumber, cpf, name, degree} = req.body

        try {
            const room = await Rooms.findByPk(roomNumber);

            if (!room) {
                const error = new ErrorHandler('Room does not exist!');
                error.setStatusCode(422);
                throw  error;
            }

            const hasTeacher = await Teachers.findOne({
                where: {
                    cpf: cpf
                }
            });

            if (hasTeacher) {
                const error = new ErrorHandler('Teacher already exist!');
                error.setStatusCode(422);
                throw  error;
            }

            const teacher = new Teachers({
                cpf: cpf,
                name: name,
                formacao: degree,
            })

            const newTeacher = await teacher.save();


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
}

export default TeacherController;