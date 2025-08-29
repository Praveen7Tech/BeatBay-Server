import type { IEmailService } from "../../entities/services/IEmailService.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


export class EmailService implements IEmailService {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            secure:true,
            host:"smtp.gmail.com",
            port:465,
            auth:{
                user:process.env.API_EMAIL,
                pass:process.env.EMAIL_PASSWORD
            },
            tls:{
                rejectUnauthorized:false
            }
        })

        this.transporter.verify((error, success) => {
            if (error) {
                console.error("SMTP connection failed:", error);
            } else {
                console.log("SMTP server is ready to send messages ✅");
            }
        });

    }

    

    async sendOTP(email: string, otp: string): Promise<void> {
        console.log("email service reach",email)
        await this.transporter.sendMail({
            from:process.env.API_EMAIL,
            to:email,
            subject: "Your OTP Verification code",
            html: `Your Otp code is : ${otp}`
        })
        console.log("email sent success")
    }
}