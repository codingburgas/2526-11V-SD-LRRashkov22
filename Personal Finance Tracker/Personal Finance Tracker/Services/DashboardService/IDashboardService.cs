
using Personal_Finance_Tracker.Models.DashboardChartDto;

namespace Personal_Finance_Tracker.Services.DashboardService
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync(int userId);
        Task<List<DashboardChartDto>> GetChartData(int userId, int days, string mode);
    }
}
