using Microsoft.EntityFrameworkCore;
using Slack.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Slack.Tools.Interfaces
{
    public interface IData
    {
        DbSet<User> Users { get; set; }
        DbSet<Message> Messages { get; set; }

        int SaveChanges();
    }
}
