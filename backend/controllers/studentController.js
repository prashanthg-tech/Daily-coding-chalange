/**
 * @desc    Get Student Dashboard
 * @route   GET /api/student/dashboard
 * @access  Private (Student only)
 */
const getStudentDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "🎓 Student dashboard loaded successfully",
      data: {
        user: req.user,
        courses: ["Web Programming", "Data Structures", "Algorithms"], // sample data
      },
    });
  } catch (err) {
    console.error("Student Dashboard Error:", err.message);
    res.status(500).json({ success: false, message: "Server error loading student dashboard" });
  }
};

module.exports = { getStudentDashboard };
