using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppuserController : ControllerBase
    {
        // good idea to separate login-funktionality from the mediator in Application
        public UserManager<AppUser> _userManager;
        public TokenService _tokenService;
        public AppuserController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }     

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var foo = loginDto;

            // _userManager.FindByEmailAsync() doesn't work 
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(result)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
                // Visit jws.ms to se the decoded token. JWT-tokens are easy to decode - never put some vulnurable information in a token.
                // The token will be send in a http-header every request. The API-server will check the signature. If the token has been modified, the signature will change and the will become invalid
            }

            return Unauthorized();
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Check if we have a duplicate Username
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("User is already taken");
            }

            // Check if we have a duplicate Email
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("User is already taken");
            }

            // create new AppUser
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            // save new AppUser to db
            var result = await _userManager.CreateAsync(user, registerDto.Password);


            // check if result has succeeded by returning UserDto with token
            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName
                };
            }

            return BadRequest("Problem registering user");
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // using security claims by FindFirstValue(ClaimTypes.Email)
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        }

    }
}






