using Personal_Finance_Tracker.Models.AnalyticsDto;

namespace Personal_Finance_Tracker.Services.Analytics
{
    public interface IAnalyticsService
    {
        Task<List<AnalyticsDto>> GetBudgetByUser(int userId);
    }
}
