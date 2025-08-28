import { error } from "console";
import type { IUserRepository } from "../../entities/repositories/IUserRepository.js";
import type { IEmailService } from "../../entities/services/IEmailService.js";


export class UserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private emailService: IEmailService)
    {}

    async signUp(email: string) : Promise<void> {
        const existUser = await this.userRepo.findByEmail(email)
        if(existUser){
            throw new Error("User already exists")
        }

        const otp = Math.floor(100000 + Math.random()* 900000).toString()

        await this.userRepo.saveOTP(email,otp)
        console.log("otp save")
        await this.emailService.sendOTP(email, otp)
        console.log("otp sent")
    }
}