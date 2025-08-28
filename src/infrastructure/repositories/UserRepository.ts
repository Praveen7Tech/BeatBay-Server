import type { IUserRepository } from "../../entities/repositories/IUserRepository.js";
import OtpModel from "../../framework/database/models/OtpModel.js";
import UserModel from "../../framework/database/models/UserModel.js";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string){
        return UserModel.findOne({email})
    }

    async saveOTP(email: string, otp: string){
        await OtpModel.findOneAndUpdate(
            {email},
            {otp, createdAt: new Date()},
            {upsert: true}
        )
    }

    async createUser(data :{name: string, email: string, password: string}){
        const user = new UserModel(data)
        user.save()
    }
}