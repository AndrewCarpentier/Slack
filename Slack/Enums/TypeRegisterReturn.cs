using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Slack.Enums
{
    public enum TypeRegisterReturn
    {
        Added,
        Error,
        DuplicatedEmail,
        DuplicatedUsername
    }
}
