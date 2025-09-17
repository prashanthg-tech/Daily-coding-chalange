async function loadDashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "student") {
    alert("Unauthorized access! Please log in again.");
    window.location.href = "login.html";
    return;
  }

  try {
    // Fetch student profile
    const profileRes = await fetch("http://localhost:3000/api/students/profile", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const profile = await profileRes.json();
    document.getElementById("studentName").textContent = profile.name;
    document.getElementById("studentRole").textContent = "Student";

    // Fetch progress stats
    const statsRes = await fetch("http://localhost:3000/api/students/stats", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const stats = await statsRes.json();
    document.getElementById("completedCount").textContent = stats.completed;
    document.getElementById("missedCount").textContent = stats.missed;
    document.getElementById("avgTime").textContent = stats.avgTime;

    // Fetch today's challenge
    const challengeRes = await fetch("http://localhost:3000/api/questions/today", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const challenge = await challengeRes.json();
    document.getElementById("challengeTitle").textContent = challenge.title;
    document.getElementById("challengeDescription").textContent = challenge.description;
    document.getElementById("challengeDifficulty").textContent = challenge.difficulty;
    document.getElementById("challengeTime").textContent = `⏱ ${challenge.estimatedTime} min`;

    // Fetch calendar progress
    const calendarRes = await fetch("http://localhost:3000/api/students/calendar", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const calendar = await calendarRes.json();
    document.getElementById("monthLabel").textContent = calendar.month;

    // Generate calendar dynamically
    const calendarHTML = `
      <div class="calendar">
        <div class="calendar-header">
          <div class="day-label">Sun</div>
          <div class="day-label">Mon</div>
          <div class="day-label">Tue</div>
          <div class="day-label">Wed</div>
          <div class="day-label">Thu</div>
          <div class="day-label">Fri</div>
          <div class="day-label">Sat</div>
        </div>
        <div class="calendar-grid">
          ${calendar.days.map(d => `
            <div class="calendar-day ${d.status}" title="${d.tooltip}">${d.date}</div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("calendarContainer").innerHTML = calendarHTML;

  } catch (err) {
    console.error("Error loading dashboard:", err);
    alert("⚠️ Failed to load dashboard data");
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

// Load dashboard on page load
loadDashboard();
