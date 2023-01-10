
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    // Why do we want to put it in its own folder
    public class TokenService
    {
        public IConfiguration _config;

        // IConfiguration _config giver adgang til appsettings.Development.json
        public TokenService(IConfiguration config)
        {
            _config = config;
        }
        // claims about the user eg. school, pets, nickname
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Email),
            };

            // the same key we use to encrypt something is the same we use to decrypt something, "secret key" at least 12 characters
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));

            // Man kan tjekke at token er sendt af sted med http-request ved at lave en POST og efterfølgende tjekke at man kan tilgå samme ting, der blev created med samme token

            // use the strongest hash-algorithm to sign our key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            // Check op på SecurityTokenDescriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),    // token last 7 days
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

            // Not how big companies will do it, probably out source it to third parts w. two-factor authentications           

        }
    }
}