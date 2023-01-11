using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    // Join Entity for Many-to-Many relation between Pet and Account
    public class AccountPet
    {
        public string AccountId { get; set; }
        public Account Account { get; set; }

        public string PetId { get; set; }
        public Pet Pet { get; set; }
    }
}