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
        public async Task<IActionResult> GetAccounts(){
            return HandleResult(await Mediator.Send(new AccountList.Query())); // prøv med .Handle() i stedet
        }

        [HttpGet("{id}")] //api/Account/{id}
        // IActionResult allows us to return http-responses
        public async Task<IActionResult> GetAccount(Guid id){
            var result = await Mediator.Send(new AccountDetail.Query{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(Account account){
            return HandleResult(await Mediator.Send(new AccountCreate.Command{Account = account}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAccount(Guid id, Account account){
            account.Id = id;
            return HandleResult(await Mediator.Send(new AccountEdit.Command{Account = account}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id){
            return HandleResult(await Mediator.Send(new AccountDelete.Command{Id = id}));
        }


    }
}