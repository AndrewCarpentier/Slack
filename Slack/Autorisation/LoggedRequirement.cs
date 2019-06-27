using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Slack.Autorisation
{
    public class LoggedRequirement : AuthorizationHandler<LoggedRequirement>, IAuthorizationRequirement
    {
        private IHttpContextAccessor _accessor;

        public LoggedRequirement() { }

        public LoggedRequirement(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, LoggedRequirement requirement)
        {
            if (_accessor.HttpContext.Request.Headers["token"] != default(StringValues))
                return Task.Run(() =>
                {
                    context.Succeed(requirement);
                });
            else
                return Task.Run(() =>
                {
                    context.Fail();
                });
        }
    }
}
