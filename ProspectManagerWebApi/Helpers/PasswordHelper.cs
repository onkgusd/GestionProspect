using BCrypt.Net;

namespace ProspectManagerWebApi.Helpers
{

    public static class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
        }

        public static bool VerifyPassword(string? password, string? hashedPassword)
        {
            if  (password == null || hashedPassword == null)
                return false;

            return BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword);
        }
    }
}
