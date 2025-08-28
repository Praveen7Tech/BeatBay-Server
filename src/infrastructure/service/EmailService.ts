import type { IEmailService } from "../../entities/services/IEmailService.js";
import nodemailer from "nodemailer"


export class EmailService implements IEmailService {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.API_EMAIL,
                pass:process.env.EMAIL_PASSWORD
            }
        })
    }

    async sendOTP(email: string, otp: string): Promise<void> {
        console.log("email service reach",email)
        await this.transporter.sendMail({
            from:process.env.API_EMAIL,
            to:email,
            subject: "Your OTP Verification code",
            text: `Your Otp code is : ${otp}`
        })
        console.log("email sent success")
    }
}