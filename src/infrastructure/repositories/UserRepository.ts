import type { IUserRepository } from "../../entities/repositories/IUserRepository.js";
import OtpModel from "../../framework/database/models/OtpModel.js";
import UserModel from "../../framework/database/models/UserModel.js";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string){
        return OtpModel.findOne({email})
    }

    async saveOTP(name:string,email: string, otp: string, password:string){
        await OtpModel.findOneAndUpdate(
            {email},
            {name,email,otp,password, createdAt: new Date()},
            {upsert: true}
        )
    }

    async createUser(data :{name: string, email: string, password: string, role:string, isBlocked: boolean, createdAt:Date}){
        const user = new UserModel(data)
        user.save()
    }
}