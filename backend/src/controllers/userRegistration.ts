import { Response, Request } from "express";
import Users from "../models/Users";
import bcrypt from 'bcrypt'

interface User{
    firstName: string,
    secondName: string,
    email: string,
    password: string,
    role: string
}

export default class UsersController {
    static async userRegistration(req: Request, res: Response){
        try {
            const { firstName, secondName, email, password, role }: User = req.body;
            const existanceOfuser = await Users.findOne({email: email});
            if(existanceOfuser){
                res.status(400).json({
                    status: "Registraction Failed",
                    message: "Email already exist !"
                })
            }

            const hashedPassword = bcrypt.hashSync(password, 10)

            // new user
            const newuser = new Users(
                {
                    firstName,
                    secondName,
                    email,
                    password: hashedPassword,
                    role
                }
            );

            await newuser.save();
             res.status(500).json({
                status: "Fail",
                Message: "Internal server Error"
            })
        } catch (error) {
            console.log("Internal srver Error !")
        }
    }
}