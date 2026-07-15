function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeUrl(value) {
  try {
    const url = new URL(String(value || ""), window.location.origin);
    return ["http:", "https:"].includes(url.protocol) ? escapeHtml(url.href) : "#";
  } catch {
    return "#";
  }
}

function projectStack(project) {
  const stack = Array.isArray(project.stack) ? project.stack : Array.isArray(project.techStack) ? project.techStack : [];
  return stack.filter(Boolean);
}

function evidenceScore(project) {
  const text = `${project.summary || ""} ${projectStack(project).join(" ")}`.toLowerCase();
  let score = project.summary?.length >= 70 ? 35 : 18;
  if (project.url && project.url !== "#") score += 20;
  if (/test|quality|coverage/.test(text)) score += 20;
  if (/deploy|cloud|docker|firebase|release|kubernetes/.test(text)) score += 15;
  if (projectStack(project).length >= 3) score += 10;
  return Math.min(100, score);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

async function loadPublicPortfolio() {
  const userId = new URLSearchParams(window.location.search).get("user");
  if (!userId) {
    renderError("This portfolio link is missing a student identifier.");
    return;
  }

  try {
    const response = await fetch(`/api/portfolio/${encodeURIComponent(userId)}`, { headers: { Accept: "application/json" } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || "Portfolio not found.");

    const student = payload.student || {};
    const projects = (Array.isArray(payload.projects) ? payload.projects : []).filter((project) => project.source !== "demo");
    const averageScore = projects.length ? Math.round(projects.reduce((sum, project) => sum + evidenceScore(project), 0) / projects.length) : 0;
    const technologies = new Set(projects.flatMap(projectStack));

    document.title = `${student.name || "Student"} Portfolio - SE Career Compass`;
    document.getElementById("publicStudentName").textContent = student.name || "Software Engineering Student";
    document.getElementById("publicRoleLead").textContent = `${student.targetRole || "Software Engineering"} candidate building evidence through focused learning and real projects.`;
    document.getElementById("publicUpdated").innerHTML = `<i data-lucide="clock-3"></i> Updated ${new Date(payload.generatedAt || Date.now()).toLocaleDateString()}`;

    const githubLink = document.getElementById("publicGithub");
    if (student.github) {
      githubLink.href = safeUrl(`https://github.com/${student.github}`);
      githubLink.classList.remove("hidden");
    }

    document.getElementById("publicStats").innerHTML = `
      <article class="section-kpi"><span>Verified projects</span><strong>${projects.length}</strong><small>Demo placeholders are not shown</small></article>
      <article class="section-kpi"><span>Evidence quality</span><strong>${averageScore}%</strong><small>Story, repository, testing and deployment</small></article>
      <article class="section-kpi"><span>Technology breadth</span><strong>${technologies.size}</strong><small>Technologies demonstrated across projects</small></article>
    `;

    document.getElementById("publicProjects").innerHTML = projects.length
      ? projects.map((project) => {
          const stack = projectStack(project);
          const score = evidenceScore(project);
          return `
            <article class="repo-card public-project-card">
              <div class="repo-card-head"><span class="source-badge ${escapeHtml(project.source || "github")}">${escapeHtml(project.source === "manual" ? "Manual evidence" : "Verified project")}</span><strong>${score}% evidence</strong></div>
              <h3>${escapeHtml(project.name)}</h3>
              <p>${escapeHtml(project.summary || "Project evidence aligned with the selected career role.")}</p>
              <div class="repo-score"><span style="width:${score}%"></span></div>
              <div class="repo-meta">${stack.map((item) => `<span class="tech-pill">${escapeHtml(item)}</span>`).join("")}</div>
              ${project.url && project.url !== "#" ? `<a href="${safeUrl(project.url)}" target="_blank" rel="noreferrer">Open project evidence</a>` : '<span class="muted-link">Repository link not published</span>'}
            </article>
          `;
        }).join("")
      : '<div class="empty-state"><i data-lucide="folder-search"></i><strong>No verified projects published yet</strong><span>The student can add manual evidence or synchronize public GitHub repositories.</span></div>';
    refreshIcons();
  } catch (error) {
    renderError(error.message);
  }
}

function renderError(message) {
  document.getElementById("publicStudentName").textContent = "Portfolio unavailable";
  document.getElementById("publicRoleLead").textContent = message;
  document.getElementById("publicStats").innerHTML = "";
  document.getElementById("publicProjects").innerHTML = '<div class="empty-state"><i data-lucide="circle-alert"></i><strong>Unable to load public portfolio</strong><span>Return to SE Career Compass and copy a new share link.</span></div>';
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", loadPublicPortfolio);
