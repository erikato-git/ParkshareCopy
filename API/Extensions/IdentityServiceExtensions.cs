using Domain;
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
            })
            //make it able to query AppUsers in EntityFramework-store
            .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication();

            return services;
        }
    }
}