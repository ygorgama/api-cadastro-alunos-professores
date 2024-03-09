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

            const teacher = new Teachers({
                cpf: cpf,
                name: name,
                degree: degree,
                roomId: roomNumber
            })

            const newTeacher = await teacher.save();

            return res.status(200).json({
                message: 'Teacher created with success',
                teacher: newTeacher
            })

        } catch (e) {
            let error;
            if (e instanceof ErrorHandler) {
              error = e;        
            }else{
               error = new ErrorHandler((e as Error).message);
            }
            return next(error);
        }
    }

    static async index(req: Request, res: Response, next: NextFunction){
        try {
            const teachers = await Teachers.findAll({include: Rooms, attributes: ['name', 'id', 'cpf']})
            return res.status(200).json({
                message: 'Teachers fetched with sucess!',
                teachers: teachers
            })
        } catch (error) {
            error = new ErrorHandler((error as Error).message);
        }
    }

    static async indexOne(req: Request, res: Response, next: NextFunction){
        const teacherId = req.params.id;
        try {
            const teacher = Teachers.findByPk(teacherId, {attributes: ['name', 'cpf', 'degree'], include: [{
                model: Rooms,
                attributes: ['id', 'description']
            }]})
            return res.status(200).json({
                message: 'Teacher fetched with sucess!',
                teachers: teacher
            })
        } catch (error) {
            error = new ErrorHandler((error as Error).message);
            return next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const error = new ErrorHandler(errors.array()[0].msg);
            error.setStatusCode(422);
            return next(error);
        }
        
        const teacherId = req.params.id;
        const {name, cpf, degree, roomNumber} = req.body
        try {
            const teacher = await Teachers.findByPk(teacherId);

            if (!teacher) {
                const error = new ErrorHandler('Teacher does not exist!');
                error.setStatusCode(404);
                throw  error;
            }

            teacher.name = name;
            teacher.cpf = cpf;
            teacher.degree = degree;
            teacher.roomId = roomNumber;

            const updatedTeacher = await teacher.save();
            
            return res.status(200).json({
                message: 'Teacher updated!',
                teachers: updatedTeacher
            });

        } catch (error) {
            if (!(error instanceof ErrorHandler)) {
                error = new ErrorHandler((error as Error).message);
            }
            return next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
        const teacherId = req.params.id;
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const error = new ErrorHandler(errors.array()[0].msg);
            error.setStatusCode(422);
            return next(error);
        }
        
        try {
            const teacher = await Teachers.findByPk(teacherId);

            if (!teacher) {
                const error = new ErrorHandler('Teacher does not exist!');
                error.setStatusCode(404);
                throw  error;
            }

            await teacher.destroy();

            return res.json({
                message: "Teacher deleted!"
            })

        } catch (error) {
            if (!(error instanceof ErrorHandler)) {
                error = new ErrorHandler((error as Error).message);
            }
            return next(error);
        }
    }
}

export default TeacherController;