import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ErrorHandler from "../error-handler/ErrorHandler";
import Students from "../models/Students";
import Rooms from "../models/Room";

interface Room {
  id: number;
  description?: string;
  StudentRoom: {
    student_id: number;
    room_id: number;
  };
}

class StudentController {
  static async store(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ErrorHandler(errors.array()[0].msg);
      error.setStatusCode(422);
      return next(error);
    }

    const { name, cpf, roomNumber } = req.body;

    try {
      const student = new Students({
        name: name,
        cpf: cpf,
      });

      const room = await Rooms.findByPk(roomNumber);

      if (!room) {
        const error = new ErrorHandler("Room number not found!");
        error.setStatusCode(422);
        throw error;
      }

      const studentSaved = await student.save();
      await studentSaved.$set("rooms", room);

      return res.status(201).json({
        message: "Student Created",
        student: studentSaved,
      });
    } catch (error) {
      if (!(error instanceof ErrorHandler)) {
        error = new ErrorHandler((error as Error).message);
      }
      return next(error);
    }
  }

  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await Students.findAll({
        attributes: ["id", "name", "cpf"],
      });

      return res.status(200).json({
        message: "Students fetched!",
        students: students,
      });
    } catch (error) {
      error = new ErrorHandler((error as Error).message);
      return next(error);
    }
  }

  static async indexOne(req: Request, res: Response, next: NextFunction) {
    const studentId = req.params.id;
    try {
      const student = await Students.findByPk(studentId, {
        attributes: ["id", "cpf", "name"],
        include: ["rooms"],
      });

      if (!student) {
        const error = new ErrorHandler("Student not found!");
        error.setStatusCode(404);
        throw error;
      }

      return res.json({
        message: "Students fetched!",
        student: student,
      });
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

  static async update(req: Request, res: Response, next: NextFunction){
    const studentId = req.params.id;
    const { name, cpf } = req.body;
    try {
      const student = await Students.findByPk(studentId, {include: ['rooms']});

      if (!student) {
        const error = new ErrorHandler("Student not found!");
        error.setStatusCode(404);
        throw error;
      }

      student.name = name;
      student.cpf = cpf;

      student.save();

      return res.status(200).json({
        message: "Students update!",
        removedStudent: student,
      });
      
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

  static async delete(req: Request, res: Response, next: NextFunction) {
    const studentId = req.params.id;
    try {
      const student = await Students.findByPk(studentId, {
        include: [{ model: Rooms, attributes: ["id"] }],
      });
      if (!student) {
        const error = new ErrorHandler("Student not found!");
        error.setStatusCode(404);
        throw error;
      }

      const roomsId = student.rooms.map((room) => {
        return room.id;
      });

      const rooms = await Rooms.findAll({
        where: {
          id: roomsId,
        },
      });

      await student.$remove("rooms", rooms);
      const removedStudent = await student.destroy();

      return res.json({
        message: "Students fetched!",
        removedStudent: removedStudent,
      });
    } catch (error) {
      error = new ErrorHandler((error as Error).message);
      return next(error);
    }
  }
}

export default StudentController;
