using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Slack.Model;
using Slack.Tools.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Slack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllAccess")]
    public class UserController : Controller
    {
        public UserController(IData data)
        {
            Model.User.data = data;
        }

        [HttpPost, Route("register")]
        public IActionResult Register([FromBody]User user)
        {
            return new JsonResult(new { status = user.Register() });
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]User user)
        {
            return new JsonResult(new { token = user.Login() });
        }
    }
}
