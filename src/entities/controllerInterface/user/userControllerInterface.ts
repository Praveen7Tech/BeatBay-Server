import type { Request, Response } from "express";

export interface IUserController {
    signup(req:Request, res:Response) : Promise<void>
    verifyOtp(req:Request, res:Response) : Promise<void>
}