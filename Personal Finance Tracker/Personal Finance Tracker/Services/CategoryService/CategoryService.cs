using Personal_Finance_Tracker.Models.CategoryDto;
using Personal_Finance_Tracker.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Personal_Finance_Tracker.Models.Entities;
namespace Personal_Finance_Tracker.Services.CategoryService;

public class CategoryService : ICategoryService
{
    private readonly UserDbContext context;

    public CategoryService(UserDbContext context)
    {
        this.context = context;
    }
    //public async Task<(List<Category> cat, string? error)> GetChartCategory(int userId) { 
    
    //}
    public async Task<(List<Category> cat, string? error)> GetCategory()
    {
        var categories = await context.Categories.ToListAsync();

        if (!categories.Any())
            return (new List<Category>(), "No categories found");

        return (categories, null);
    }
    public async Task<(Category? cat, string? error)> CreateCategoryAdminOnly(CreateCategoryDto request)
    {
        if (string.IsNullOrEmpty(request.Name)) return (null, "Category name cannot be null");
        if (await context.Categories.AnyAsync(cat => cat.Name == request.Name)) return (null, "Category name already exists");
        if (request.BudgetLimit < 0) return (null, "Budget limit cannot be negative");
        var category = new Category
        {
            Name = request.Name,
            BudgetLimit = request.BudgetLimit,
            IsIncome = request.IsIncome
        };

        context.Categories.Add(category);
        await context.SaveChangesAsync();

        return (category, null);
    }

    public async Task<(Category? cat, string? error)> AddCategoryBudgetByUser(int userId, SetBudgetDto request)
    {
        if (request.Amount < 0)return (null, "Budget limit cannot be negative");
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == request.CategoryId);
        if (category == null) return (null, "Category not found");
        category.BudgetLimit = request.Amount;
        await context.SaveChangesAsync();
        return (category, null);
    }

    public async Task<(Category? cat, string? error)> UpdateCategoryAdminOnly(CategoryDto request)
    {
            if (request.BudgetLimit < 0) return (null, "Budget limit cannot be negative");
            if (string.IsNullOrEmpty(request.Name)) return (null, "Category name cannot be null");
           
            var category = await context.Categories.FindAsync(request.Id);

            if (category == null)
                return (null, "Category not found");

            category.Name = request.Name;
            category.BudgetLimit = request.BudgetLimit;
            category.IsIncome = request.IsIncome;

            await context.SaveChangesAsync();
            return (category, null);    
    }

    public async Task<(Category? cat, string? error)> DeleteCategoryAdminOnly(CategoryDto request) { 
        var category = await context.Categories.FindAsync(request.Id);
        if (category == null)
            return (null, "Category not found");

        context.Categories.Remove(category);
        await context.SaveChangesAsync();
        return (null, null);
    }
}
