using Microsoft.EntityFrameworkCore;
using ProspectManagerWebApi.Data;
using ProspectManagerWebApi.Models;

namespace ProspectManagerWebApi.Services
{
    public class UserService
    {
        private ProspectManagerDbContext _dbContext;
        private IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor, ProspectManagerDbContext db) {
            _dbContext = db;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Utilisateur> GetCurrentUser()
        {
            var login = _httpContextAccessor.HttpContext?.User.Identity?.Name;
            var utilisateur = await _dbContext.Utilisateurs.FirstOrDefaultAsync(u => u.Login == login);
            return utilisateur;
        }
    }
}
