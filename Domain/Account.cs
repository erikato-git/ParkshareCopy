using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Account
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        //TODO: Parkingspot
        
        // initilize it to new List<AccountPet> will prevent 'null object errer'
        public ICollection<AccountPet> Pets { get; set; } = new List<AccountPet>();
    }
}