using Microsoft.AspNetCore.Authorization;
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
    [Authorize("logged")]
    public class MessageController : Controller
    {

        public MessageController(IData data)
        {
            Message.data = data;
        }

        [HttpPost, Route("send")]
        public IActionResult Send([FromBody]Message message, [FromHeader]string token)
        {
            return new JsonResult(new { success = message.Send(token) });
        }

        [HttpGet, Route("gets")]
        public IActionResult Gets()
        {
            return new JsonResult(new { messages = Message.Gets() });
        }
    }
}
