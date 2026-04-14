using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Personal_Finance_Tracker.Services.DashboardService;
using System.Security.Claims;

namespace Personal_Finance_Tracker.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result = await dashboardService.GetDashboardAsync(userId);

            return Ok(result);
        }
        [Authorize]
        [HttpGet("chart")]
        public async Task<IActionResult> GetChart(int days = 7, string mode="daily")
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var data = await dashboardService.GetChartData(userId, days, mode);

            return Ok(data);
        }
    }
}
