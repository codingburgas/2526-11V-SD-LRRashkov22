using Personal_Finance_Tracker.Data;
using Personal_Finance_Tracker.Models.AnalyticsDto;
using Personal_Finance_Tracker.Models.CategoryDto;  
using Microsoft.EntityFrameworkCore;
namespace Personal_Finance_Tracker.Services.Analytics;

public class AnalyticsService : IAnalyticsService
{
    private readonly UserDbContext context;

    public AnalyticsService(UserDbContext context)
    {
        this.context = context;
    }

    public async Task<List<AnalyticsDto>> GetBudgetByUser(int userId)
    {
        var categoriesss = await context.Categories.ToListAsync();
        Console.WriteLine($"All categories: {categoriesss.Count}");

        var userCategories = categoriesss.Where(c => c.UserId == userId).ToList();
        Console.WriteLine($"User categories: {userCategories.Count}");

        var now = DateTime.Now;
        var categories = await context.Categories.Where(c => c.UserId == userId || c.UserId == null && !c.IsIncome).ToListAsync();
        var transactions = await context.Transactions
            .Where(t => t.UserId == userId && !t.IsIncome && t.Date.Month == now.Month &&
             t.Date.Year == now.Year)
            .ToListAsync();
        var result = new List<AnalyticsDto>();

        foreach (var c in categories) { 
        var spent = transactions.Where(t => t.CategoryId == c.Id).Sum(t => t.Amount);
             result.Add(new AnalyticsDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                BudgetAmount = c.BudgetLimit,
                SpentAmount = spent

            });
        }
        return result; 
    }

    public async Task<List<AnalyticsDto>> GetTargetByUser(int userId)
    {
        var categoriesss = await context.Categories.ToListAsync();
        Console.WriteLine($"All categories: {categoriesss.Count}");

        var userCategories = categoriesss.Where(c => c.UserId == userId).ToList();
        Console.WriteLine($"User categories: {userCategories.Count}");

        var now = DateTime.Now;
        var categories = await context.Categories.Where(c => c.UserId == userId || c.UserId == null && c.IsIncome).ToListAsync();
        var transactions = await context.Transactions
            .Where(t => t.UserId == userId && t.IsIncome && t.Date.Month == now.Month &&
             t.Date.Year == now.Year)
            .ToListAsync();
        var result = new List<AnalyticsDto>();

        foreach (var c in categories)
        {
            var spent = transactions.Where(t => t.CategoryId == c.Id).Sum(t => t.Amount);
            result.Add(new AnalyticsDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                BudgetAmount = c.BudgetLimit,
                SpentAmount = spent

            });
        }
        return result;
    }
}