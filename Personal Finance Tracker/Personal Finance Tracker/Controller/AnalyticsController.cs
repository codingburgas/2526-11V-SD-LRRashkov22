using Microsoft.AspNetCore.Authorization;   
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Personal_Finance_Tracker.Services.Analytics;
using System.Security.Claims;
namespace Personal_Finance_Tracker.Controller
{
    [Route("api/Analytics")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService analyticsService;

        public AnalyticsController(IAnalyticsService analyticsService)
        {
            this.analyticsService = analyticsService;
        }
        [Authorize]
        [HttpGet("budget")]
        public async Task<ActionResult> GetBudgetInformation() {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var result = await analyticsService.GetBudgetByUser(userId);
            return Ok(result);
        }

    }
}
