using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        // validate input before registering

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        // must contain at least number, must contain at leat a lowercase character, must contain at leat a uppercase character, must be at least 4-8 character long
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage ="Password must be complex")]
        public string Password { get; set; }

        public string DisplayName { get; set; }
        
        [Required]
        public string Username { get; set; }
    }
}