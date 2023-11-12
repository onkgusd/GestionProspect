import { environment } from "src/environments/environment";

export class PasswordHelper{
    public static generatePassword(): string {
        const length = environment.passwordLength;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
        let password = "";
    
        for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
        }

        return password;
    }
}