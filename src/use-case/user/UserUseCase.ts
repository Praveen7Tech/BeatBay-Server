import { error } from "console";
import bcrypt from "bcrypt"
import type { IUserRepository } from "../../entities/repositories/IUserRepository.js";
import type { IEmailService } from "../../entities/services/IEmailService.js";


export class UserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private emailService: IEmailService)
    {}

    async signUp(name:string,email: string, password:string) : Promise<void> {
        const existUser = await this.userRepo.findByEmail(email)
        if(existUser){
            throw new Error("User already exists")
        }

        const otp = Math.floor(1000 + Math.random()* 9000).toString()

        await this.userRepo.saveOTP(name,email,otp,password)
        console.log("otp save-",otp)
        await this.emailService.sendOTP(email, otp)
        console.log("otp sent")
    }

    async verifyOTP(email:string, otp: string,) : Promise<void> {
        console.log("1 reach",email, otp)
        const storedOtp = await this.userRepo.findByEmail(email)
        console.log("stored-",storedOtp)
        if(!storedOtp || storedOtp.otp !== otp){
            throw new Error("Invalid or Expired otp")
        }
        const password = storedOtp.password, name = storedOtp.name
        const hashPassword = await bcrypt.hash(password, 10)
        console.log("detail-",name,email,password)

        await this.userRepo.createUser({
            name,
            email,
            password:hashPassword,
            role:"user",
            isBlocked:false,
            createdAt:new Date()
        })

        console.log("user created successfully")
    }
}