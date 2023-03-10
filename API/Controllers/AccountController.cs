using Application.Accounts;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    public class AccountController: BaseApiController
    {

        [HttpGet] //api/Account
        public async Task<ActionResult<List<Account>>> GetAccounts(){
            return await Mediator.Send(new AccountList.Query()); // prøv med .Handle() i stedet
        }

        [HttpGet("{id}")] //api/Account/{id}
        public async Task<ActionResult<Account>> GetAccount(Guid id){
            return await Mediator.Send(new AccountDetail.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(Account account){
            return Ok(await Mediator.Send(new AccountCreate.Command{Account = account}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAccount(Guid id, Account account){
            account.Id = id;
            return Ok(await Mediator.Send(new AccountEdit.Command{Account = account}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id){
            return Ok(await Mediator.Send(new AccountDelete.Command{Id = id}));
        }


    }
}