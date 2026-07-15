function renderDashboard() {
  const completion = getCompletion();
  const gap = getGap();
  const readiness = getReadinessScore();
  const projects = normalizePortfolioProjects(state.portfolio);
  const verifiedProjects = projects.filter((project) => project.source !== "demo");
  const alignedProjects = verifiedProjects.filter((project) => portfolioAssessment(project).aligned);
  document.getElementById("dashboardRoleTitle").textContent = `${state.role} readiness plan`;
  document.getElementById("dashboardLead").textContent = currentRole().focus;
  document.getElementById("metricProgress").textContent = `${completion.percent}%`;
  document.getElementById("metricProgressBar").style.width = `${completion.percent}%`;
  document.getElementById("metricMatched").textContent = `${gap.matched.length}/${gap.required.length}`;
  document.getElementById("metricMatchedLabel").textContent =
    gap.missing.length === 0 ? "Target role requirements covered" : `${gap.missing.length} skills missing`;
  document.getElementById("metricPortfolio").textContent = `${verifiedProjects.length}/${projects.length} verified`;
  document.getElementById("metricMentorActions").textContent = String(openActionCount());
  document.getElementById("gpaSignal").textContent = gpaLabel();
  document.getElementById("githubSignal").textContent = state.github ? `github.com/${state.github}` : "Not linked";
  document.getElementById("insightRole").textContent = state.role;
  document.getElementById("insightNextAction").textContent = nextBestAction();
  document.getElementById("insightDemoReadiness").textContent = readiness >= 70 ? "Presentation-ready" : readiness >= 40 ? "Demo-ready" : "Needs evidence";
  document.getElementById("readinessScore").textContent = `${readiness}%`;
  const circle = document.getElementById("readinessCircle");
  if (circle) {
    const circumference = 2 * Math.PI * 48;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference - (readiness / 100) * circumference}`;
  }
  document.getElementById("dashboardMomentum").innerHTML = [
    ["route", "Roadmap milestones", `${completion.done}/${completion.total} completed`, "roadmap"],
    ["radar", "Skill coverage", `${gap.matched.length}/${gap.required.length} matched`, "gap"],
    ["bookmark-check", "Saved resources", `${(state.bookmarks || []).length} bookmarked`, "resources"]
  ]
    .map(([icon, label, value, target]) => `<button class="dashboard-signal" type="button" data-dashboard-jump="${target}"><i data-lucide="${icon}"></i><span><strong>${label}</strong><small>${value}</small></span><i data-lucide="chevron-right"></i></button>`)
    .join("");
  const openSessions = (state.sessions || []).filter((session) => session.status !== "Completed").length;
  document.getElementById("dashboardEvidence").innerHTML = [
    ["github", "GitHub profile", state.github ? `Linked as ${state.github}` : "Not linked", "portfolio"],
    ["briefcase-business", "Role-aligned projects", `${alignedProjects.length} verified`, "portfolio"],
    ["calendar-clock", "Open mentor sessions", `${openSessions} scheduled or active`, "workspace"]
  ]
    .map(([icon, label, value, target]) => `<button class="dashboard-signal" type="button" data-dashboard-jump="${target}"><i data-lucide="${icon}"></i><span><strong>${label}</strong><small>${value}</small></span><i data-lucide="chevron-right"></i></button>`)
    .join("");
  document.querySelectorAll("[data-dashboard-jump]").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.dashboardJump));
  });
  renderDashboardNotifications();
  renderDashboardSprint();
  refreshIcons();
}

function gpaLabel() {
  const gpa = Number(state.transcript.gpa || 0);
  if (gpa >= 3.5) return "Strong academic signal";
  if (gpa >= 3.0) return "Good foundation";
  if (gpa > 0) return "Needs stronger portfolio evidence";
  return "Not provided";
}

function openActionCount() {
  const taskCount = (state.tasks || []).filter((task) => task.lane !== "Done").length;
  const sessionCount = (state.sessions || []).filter((session) => session.status !== "Completed").length;
  return taskCount + sessionCount;
}

function getReadinessScore() {
  const completion = getCompletion().percent;
  const gap = getGap();
  const skillScore = Math.round((gap.matched.length / gap.required.length) * 100);
  const verified = normalizePortfolioProjects(state.portfolio).filter((project) => project.source !== "demo");
  const aligned = verified.filter((project) => portfolioAssessment(project).aligned).length;
  const portfolioScore = Math.min(100, aligned * 30 + (state.github ? 20 : 0));
  return Math.round(completion * 0.4 + skillScore * 0.4 + portfolioScore * 0.2);
}

function nextBestAction() {
  const urgent = getUrgentSkills().find((item) => !state.completed[item.id]);
  if (urgent) return urgent.title;
  if (!state.github) return "Link GitHub profile";
  if (getCompletion().percent < 50) return "Complete more roadmap nodes";
  return "Print skill gap report";
}

function renderDashboardNotifications() {
  const gap = getGap();
  const nextNode = getUrgentSkills().find((item) => !state.completed[item.id]);
  const personalized = [
    gap.missing.length
      ? { type: "Skill Gap", text: `${gap.missing.length} required skills are still missing for ${state.role}.`, time: "Now", target: "gap" }
      : { type: "Skill Gap", text: `All required ${state.role} skills are currently covered.`, time: "Now", target: "gap" },
    nextNode
      ? { type: "Roadmap", text: `Next recommended milestone: ${nextNode.title}.`, time: nextNode.duration, target: "roadmap" }
      : { type: "Roadmap", text: "All roadmap milestones are complete.", time: "Done", target: "roadmap" },
    !state.github
      ? { type: "Portfolio", text: "Link GitHub to replace demo evidence with verified projects.", time: "Recommended", target: "portfolio" }
      : null
  ].filter(Boolean);
  const saved = (state.notifications || []).map((item) => ({
    ...item,
    text: String(item.text || "").replace(/Cloud Architect/g, state.role),
    target: item.type === "Mentor Session" ? "workspace" : normalize(item.type).includes("market") ? "market" : "portfolio"
  }));
  const items = [...personalized, ...saved].slice(0, 4);
  document.getElementById("dashboardNotifications").innerHTML = items
    .map((item) => `
      <button class="notification-row" type="button" data-notification-jump="${escapeHtml(item.target || "dashboard")}">
        <strong>${escapeHtml(item.type)}</strong>
        <span>${escapeHtml(item.text)}</span>
        <small>${escapeHtml(item.time)}</small>
      </button>
    `)
    .join("");
  document.querySelectorAll("[data-notification-jump]").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.notificationJump));
  });
}

function renderDashboardSprint() {
  const urgent = getUrgentSkills().filter((item) => !state.completed[item.id]);
  const openNodes = currentRole().nodes.filter((item) => !state.completed[item.id]);
  const items = urgent.length ? urgent.slice(0, 4) : openNodes.slice(0, 4);
  document.getElementById("dashboardSprint").innerHTML = items
    .map((item, index) => `
      <div class="sprint-row">
        <span>${index + 1}</span>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.duration)} - ${escapeHtml(item.priority)} priority</small>
        </div>
      </div>
    `)
    .join("") || '<p class="empty-text">Roadmap complete. Add portfolio evidence or request mentor review.</p>';
}
