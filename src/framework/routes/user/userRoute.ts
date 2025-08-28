import { UserRepository } from "../../../infrastructure/repositories/UserRepository.js";
import { EmailService } from "../../../infrastructure/service/EmailService.js";
import { UserController } from "../../../interface-adapters/controllers/users/UserController.js";
import { UserUseCase } from "../../../use-case/user/UserUseCase.js";
import { BaseRoute } from "../baseRoutes.js";

const userRepo = new UserRepository()
const emailService = new EmailService()
const userUseCase = new UserUseCase(userRepo,emailService)
const userController = new UserController(userUseCase)

export class UserRoutes extends BaseRoute {
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.post("/signup",(req,res)=>{
            userController.signup(req,res)
        })
    }
}