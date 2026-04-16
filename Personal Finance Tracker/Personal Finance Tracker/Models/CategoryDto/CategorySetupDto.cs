namespace Personal_Finance_Tracker.Models.CategoryDto
{
    public class CategorySetupDto
    {
        public List<int> DefaultCategoryIds { get; set; } = new();
        public List<CreateCategoryDto> CustomCategories { get; set; } = new();
    }
}
