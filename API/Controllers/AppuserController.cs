using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppuserController : ControllerBase
    {
        // good idea to separate login-funktionality from the mediator in Application
        public UserManager<AppUser> _userManager;
        public AppuserController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

        }     

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var foo = loginDto;

            var user = await _userManager.FindByEmailAsync(loginDto.NormalizedEmail);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);



            if(result)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Token = "This will be a token",
                    Username = user.UserName
                };
            }

            return Unauthorized();
        }

    }
}






