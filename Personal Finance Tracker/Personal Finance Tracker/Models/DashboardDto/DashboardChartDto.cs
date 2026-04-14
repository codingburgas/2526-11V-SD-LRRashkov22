namespace Personal_Finance_Tracker.Models.DashboardChartDto
{
    public class DashboardChartDto
    {
        public DateTime Date { get; set; }
        public string Label { get; set; } = string.Empty;
        public decimal Income { get; set; }
        public decimal Expense { get; set; }
        public decimal Balance { get; set; }
    }

}
