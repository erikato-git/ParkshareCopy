// DTOs are only used to transfer one object from a process or context to another


namespace API.DTOs
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }        
    }
}