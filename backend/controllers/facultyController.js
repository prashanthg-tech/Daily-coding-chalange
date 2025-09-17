/**
 * @desc    Get Faculty Dashboard
 * @route   GET /api/faculty/dashboard
 * @access  Private (Faculty only)
 */
const getFacultyDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "👩‍🏫 Faculty dashboard loaded successfully",
      data: {
        user: req.user,
        classes: ["CS101", "CS201", "CS301"], // sample data
      },
    });
  } catch (err) {
    console.error("Faculty Dashboard Error:", err.message);
    res.status(500).json({ success: false, message: "Server error loading faculty dashboard" });
  }
};

module.exports = { getFacultyDashboard };
