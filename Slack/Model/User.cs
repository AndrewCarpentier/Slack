using Newtonsoft.Json;
using Slack.Enums;
using Slack.Tools;
using Slack.Tools.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Slack.Model
{
    public class User
    {
        private int id;
        private string username;
        private string password;
        private string email;
        private string token;

        [JsonIgnore]
        public static IData data { get; set; }

        public int Id { get => id; set => id = value; }
        [Required]
        public string Username { get => username; set => username = value; }
        [Required]
        public string Password { get => password; set => password = value; }
        public string Email { get => email; set => email = value; }
        public string Token { get => token; set => token = value; }

        [JsonIgnore]
        public ICollection<Message> messages { get; set; }

        public TypeRegisterReturn Register()
        {
            if (data.Users.FirstOrDefault(x => x.Username == Username) != null)
                return TypeRegisterReturn.DuplicatedUsername;
            if (data.Users.FirstOrDefault(x => x.Email == Email) != null)
                return TypeRegisterReturn.DuplicatedEmail;
            else
            {
                Password = Encoder.GenerateSHA512String(Password);
                data.Users.Add(this);
                if (data.SaveChanges() > 0)
                    return TypeRegisterReturn.Added;
                else
                    return TypeRegisterReturn.Error;
            }
        }

        public string Login()
        {
            Password = Encoder.GenerateSHA512String(Password);
            User user = data.Users.FirstOrDefault(x => x.Username == Username && x.Password == Password);
            if (user != null)
            {
                user.Token = Encoder.GenerateSHA512String(Guid.NewGuid());
                if (data.SaveChanges() > 0)
                    Token = user.Token;
            }
            return Token;
        }
    }
}
