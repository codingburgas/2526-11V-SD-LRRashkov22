namespace Personal_Finance_Tracker.Models.CategoryDto
{
    public class CreateCategoryAdminDto
    {
        public bool IsIncome { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal BudgetLimit { get; set; }
    }
}
