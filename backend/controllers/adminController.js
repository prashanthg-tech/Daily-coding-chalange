/**
 * @desc    Get Admin Dashboard
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin only)
 */
const getAdminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "🛠️ Admin dashboard loaded successfully",
      data: {
        user: req.user,
        stats: {
          totalUsers: 120, // sample static data
          totalFaculty: 12,
          totalStudents: 100,
          systemHealth: "✅ Healthy",
        },
      },
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err.message);
    res.status(500).json({ success: false, message: "Server error loading admin dashboard" });
  }
};

module.exports = { getAdminDashboard };
