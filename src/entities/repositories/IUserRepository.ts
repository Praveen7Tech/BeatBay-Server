
export interface IUserRepository {
    findByEmail(email: string): Promise<any | null>
    findByEmailOTP(email: string) : Promise<any | null>
    saveOTP(name: string,email: string, otp: string, password:string): Promise<void>
    createUser(data:{name: string, email:string, password: string, role:string, isBlocked:boolean, createdAt:Date}): Promise<any>
}