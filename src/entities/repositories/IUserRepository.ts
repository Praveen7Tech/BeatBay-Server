
export interface IUserRepository {
    findByEmail(email: string): Promise<any | null>
    saveOTP(email: string, otp: string): Promise<void>
    createUser(data:{name: string, email:string, password: string}): Promise<any>
}