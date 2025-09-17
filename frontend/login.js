document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop normal form submit

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        console.log("Token:", data.token);

        // Save token for later requests
        localStorage.setItem("token", data.token);

        // Redirect student to dashboard
        if (role === "student") {
          window.location.href = "student-dashboard.html";
        } else if (role === "faculty") {
          window.location.href = "faculty-dashboard.html";
        } else if (role === "admin") {
          window.location.href = "admin-dashboard.html";
        }
      } else {
        alert("❌ Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Server error, please try again later.");
    }
  });
});
