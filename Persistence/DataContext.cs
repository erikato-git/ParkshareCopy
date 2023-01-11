using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }

        // Many-to-Many relations Account - Pet
        public DbSet<AccountPet> AccountPet { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // make up a primary key thats a combination of AccountId and PetId
            builder.Entity<AccountPet>(x => x.HasKey(aa => new {aa.AccountId, aa.PetId}));

            // The two classes Account and Pet are binded to the join class
            builder.Entity<AccountPet>()
                .HasOne(u => u.Account)
                .WithMany(a => a.Pets)
                .HasForeignKey(aa => aa.AccountId);
            
            builder.Entity<AccountPet>()
                .HasOne(u => u.Pet)
                .WithMany(a => a.Accounts)
                .HasForeignKey(aa => aa.PetId);
        


        }
    }
}