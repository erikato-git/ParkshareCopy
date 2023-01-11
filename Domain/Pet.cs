using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Pet
    {
        public string Name { get; set; }

        // Many-to-Many between Accounts and Pets
        public ICollection<AccountPet> Accounts { get; set; }
    }
}