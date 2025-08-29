import type { Request, Response } from "express";
import type { IUserController } from "../../../entities/controllerInterface/user/userControllerInterface.js";
import type { UserUseCase } from "../../../use-case/user/UserUseCase.js";

export class UserController implements IUserController {
    constructor(private userUseCase: UserUseCase){}

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const {name,email,password} = req.body
            console.log("body",email)
            if(!email){
                res.status(400).json({success: false, message: "Email required"})
                return
            }

            await this.userUseCase.signUp(name,email,password)
            res.status(200).json({success: true, message:"OTP sent"})
        } catch (error: any) {
            res.status(400).json({success: false, message: error.message})
        }
    }

    async verifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const {email, otp} = req.body
            console.log("body-",req.body)
            await this.userUseCase.verifyOTP(email, otp)

            res.status(200).json({success:true, message: "OTP verified successfully and user created"})
        } catch (error: any) {
            res.status(400).json({success: false, message: error.message})
        }
    }
}