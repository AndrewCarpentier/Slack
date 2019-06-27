using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Slack.Tools.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Slack.Model
{
    public class Message
    {

        private int id;
        private string content;
        private DateTime date;
        private int idUser;

        public int Id { get => id; set => id = value; }
        public string Content { get => content; set => content = value; }
        public DateTime Date { get => date; set => date = value; }
        public int IdUser { get => idUser; set => idUser = value; }

        [JsonIgnore]
        public static IData data { get; set; }

        [ForeignKey("IdUser")]
        public User user { get; set; }

        public static IEnumerable<object> Gets()
        {
            return data.Messages.Include("user").Select(x => new { content = x.Content, dateAdded = x.Date, username = x.user.Username, id = x.Id }).ToList();
        }

        public bool Send()
        {
            Date = DateTime.Now;
            data.Messages.Add(this);
            return data.SaveChanges() > 0;
        }

        public bool Send(string token)
        {
            user = data.Users.FirstOrDefault(x => x.Token == token && token != null);
            if (user.Id > 0)
            {
                IdUser = user.Id;
                return Send();
            }
            else
                return false;
        }
    }
}
