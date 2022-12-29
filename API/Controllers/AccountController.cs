using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] //api/accounts
        public async Task<ActionResult<List<Account>>> GetAccounts(){
            return await _context.Accounts.ToListAsync();
        }

        [HttpGet("{id}")] //api/accounts/{id}
        public async Task<ActionResult<Account>> GetAccount(Guid id){
            return await _context.Accounts.FindAsync(id);
        }

        

    }
}