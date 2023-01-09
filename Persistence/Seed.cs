using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "User1", Bio="Bio1"},
                    new AppUser{DisplayName = "User2", Bio="Bio2"},
                    new AppUser{DisplayName = "User3", Bio="Bio3"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            //Don't need to seed if we have items in db
            if (context.Accounts.Any()) return;

            var accounts = new List<Account>
            {
                new Account
                {
                    Name = "Per",
                    Email = "per@mail.com",
                    Address = "per-vej1",
                    Password = "123",
                },
                new Account
                {
                    Name = "Bo",
                    Email = "bo@mail.com",
                    Address = "bo-vej1",
                    Password = "123",
                },
                new Account
                {
                    Name = "Poul",
                    Email = "poul@mail.com",
                    Address = "poul-vej1",
                    Password = "123",
                }
            };

            await context.Accounts.AddRangeAsync(accounts);
            await context.SaveChangesAsync();
        }
    }
}