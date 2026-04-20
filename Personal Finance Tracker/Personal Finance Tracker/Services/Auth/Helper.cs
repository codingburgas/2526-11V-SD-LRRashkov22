namespace Personal_Finance_Tracker.Services.Auth;

public static class DemoGuard
{
    public static int DemoUserId = 19;

    public static bool IsDemo(int userId)
    {
        return userId == DemoUserId;
    }
}
