using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    // Identity får sin egen extension-class, da den er meget omfattende
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => 
            {   
                // sets pass-requirements
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            //make it able to query AppUsers in EntityFramework-store
            .AddEntityFrameworkStores<DataContext>();

            // important its the same keyword that uses to decrypt it to sign it
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => 
                {
                    // how do we want to validate our token
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true, // important! validates its a valid token
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
 


            // look up AddScoped regarded to tokens
            services.AddScoped<TokenService>();

            return services;
        }
    }
}