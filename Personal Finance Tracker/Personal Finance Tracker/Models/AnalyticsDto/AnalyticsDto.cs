namespace Personal_Finance_Tracker.Models.AnalyticsDto
{
    public class AnalyticsDto
    {
           public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public decimal BudgetAmount { get; set; }
        public decimal SpentAmount { get; set; }
        public decimal RemainingAmount => BudgetAmount - SpentAmount;
        public decimal PercentageUsed => BudgetAmount > 0 ? (SpentAmount / BudgetAmount) * 100 : 0;
    }
}
