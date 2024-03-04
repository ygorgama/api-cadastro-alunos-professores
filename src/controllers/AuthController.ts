import { NextFunction, Request, Response } from "express";
import User from "../models/Users";
import { validationResult } from "express-validator";
import ErrorHandler from "../error-handler/ErrorHandler";
import {hash, compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'


interface UserInteface {
  email: string;
  password: string;
  name: string;
}

class AuthController {
  static async store(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    const { email, name, password }: UserInteface = req.body;
  
    try {
      if (!errors.isEmpty()) {
        console.log(errors)
        const error = new ErrorHandler(errors.array()[0].msg)
        error.setStatusCode(422)
        throw error;
      }

      const passwordHashed = await hash(password, 12);

      const user = new User({
        email: email,
        name: name,
        password: passwordHashed,
      });

      const newUser = await user.save();

      return res.status(201).json({
        message: "Sucessfull created a user!",
        user: newUser,
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

  static async index(req: Request, res: Response, next: NextFunction) {
    
    try {
      const users = await User.findAll();

      return res.status(200).json({
        message: "Users fetched!",
        user: users,
      });
    } catch (e) {
      const error = new ErrorHandler((e as Error).message);
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);
    const { email, password }: UserInteface = req.body;
  
    try {
      if (!errors.isEmpty()) {
        const error = new ErrorHandler(errors.array()[0].msg)
        error.setStatusCode(422)
        throw error;
      }

      const user = await User.findOne({where: {email: email}})
      
      if (!user) {
        const error = new ErrorHandler("Email not found!");
        error.setStatusCode(422)
        throw error;
      }
      
      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        const error = new ErrorHandler("Password Incorrect!");
        error.setStatusCode(422)
        throw error;
      }

      const JWT_SECRET = process.env.JWT_KEY as string
      const token = jwt.sign({userId: user.id, userName: user.name}, JWT_SECRET, {expiresIn: '2h'});

      return res.status(200).json({
        token: token,
        message: "User logged with sucess!",
        isAuth: true
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

  static async updatePassword(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);
    const { password }: UserInteface = req.body;
  
    try {
      if (!errors.isEmpty()) {
        const error = new ErrorHandler(errors.array()[0].msg)
        error.setStatusCode(422)
        throw error;
      }

      const user = await User.findByPk(req.userId);
      
      if (!user) {
        const error = new ErrorHandler("User not found");
        error.setStatusCode(404)
        throw error;
      }

      const hashedPassword = await hash(password, 12);

      user.password = hashedPassword;

      const newUser = await user.save();

      return res.status(200).json({
        message: "Password sucessfull updated!",
        user: newUser
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
  
}


export default AuthController;
