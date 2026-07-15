const STORAGE_KEY = "seCareerCompassState";
const BACKEND_TOKEN_KEY = "seCareerCompassApiToken";
const API_BASE = "";

const DEMO_ACCOUNT = {
  id: "acct-demo-student",
  name: "AnNDH2",
  email: "anndh2@fpt.edu.vn",
  role: "Student",
  salt: "demo-student-salt"
};

let state = loadAuthState();

function loadAuthState() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    saved = {};
  }
  return normalizeAuthState(saved);
}

function normalizeAuthState(raw) {
  const normalized = { ...raw };
  const accounts = Array.isArray(normalized.accounts) ? normalized.accounts : [];
  normalized.accounts = accounts
    .filter((account) => account && account.email)
    .map((account) => {
      const provider = account.provider || account.authProvider || "Email/Password";
      const passwordManaged = Boolean(account.passwordManaged);
      const passwordSalt = account.passwordSalt || account.salt || `salt-${accountIdFromEmail(account.email)}`;
      const passwordHash =
        account.passwordHash || (provider === "Google OAuth 2.0" || passwordManaged ? "" : hashPassword("careercompass", passwordSalt));
      return {
        id: account.id || accountIdFromEmail(account.email),
        name: account.name || displayNameFromEmail(account.email),
        email: normalizeEmail(account.email),
        role: account.role || "Student",
        provider,
        passwordSalt,
        passwordHash,
        createdAt: account.createdAt || "Migrated local record",
        lastLogin: account.lastLogin || "",
        status: account.status || "Active",
        twoFactor: Boolean(account.twoFactor),
        passwordManaged
      };
    });

  if (!normalized.accounts.some((account) => account.email === DEMO_ACCOUNT.email)) {
    normalized.accounts.unshift(defaultAccounts()[0]);
  }

  const current =
    normalized.accounts.find((account) => normalized.user && account.id === normalized.user.id) ||
    normalized.accounts.find((account) => normalized.user && account.email === normalizeEmail(normalized.user.email)) ||
    normalized.accounts[0];

  normalized.user = {
    id: normalized.user?.id || current.id,
    name: normalized.user?.name || current.name,
    email: normalizeEmail(normalized.user?.email || current.email),
    role: normalized.user?.role || current.role,
    authProvider: normalized.user?.authProvider || current.provider,
    lastLogin: normalized.user?.lastLogin || current.lastLogin || "",
    signedIn: Boolean(normalized.user?.signedIn),
    remember: Boolean(normalized.user?.remember)
  };
  normalized.loginEvents = Array.isArray(normalized.loginEvents) ? normalized.loginEvents.slice(0, 8) : [];
  return normalized;
}

async function apiRequest(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {})
  };
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem(BACKEND_TOKEN_KEY);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE}/api${path}`, {
      method: options.method || "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });
  } catch (error) {
    error.offline = true;
    throw error;
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  if (!response.ok) {
    const error = new Error(data.message || "Backend request failed.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function accountFromBackendUser(user) {
  return {
    id: user.id || accountIdFromEmail(user.email),
    name: user.name || displayNameFromEmail(user.email),
    email: normalizeEmail(user.email),
    role: user.role || "Student",
    provider: user.provider || "Email/Password",
    passwordSalt: "",
    passwordHash: "",
    createdAt: user.createdAt || new Date().toLocaleString(),
    lastLogin: user.lastLogin || "",
    status: user.status || "Active",
    twoFactor: false,
    passwordManaged: true
  };
}

function upsertAccount(account) {
  const accounts = state.accounts || [];
  const index = accounts.findIndex((item) => normalizeEmail(item.email) === normalizeEmail(account.email));
  if (index >= 0) {
    accounts[index] = { ...accounts[index], ...account };
  } else {
    accounts.unshift(account);
  }
  state.accounts = accounts;
  return index >= 0 ? accounts[index] : account;
}

function persistBackendSession(payload, remember = true) {
  if (payload.token) {
    localStorage.setItem(BACKEND_TOKEN_KEY, payload.token);
  }
  const account = upsertAccount(accountFromBackendUser(payload.user));
  state.user = {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    authProvider: account.provider,
    lastLogin: account.lastLogin || new Date().toLocaleString(),
    signedIn: true,
    remember: Boolean(remember)
  };
  addLoginEvent(account.provider, `${account.email} signed in through backend API`);
  saveAuthState();
}

function defaultAccounts() {
  return [
    {
      id: DEMO_ACCOUNT.id,
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      role: DEMO_ACCOUNT.role,
      provider: "Email/Password",
      passwordSalt: DEMO_ACCOUNT.salt,
      passwordHash: hashPassword("careercompass", DEMO_ACCOUNT.salt),
      createdAt: "Seeded demo account",
      lastLogin: "",
      status: "Active",
      twoFactor: false
    }
  ];
}

function restoreDemoAccount() {
  const demo = defaultAccounts()[0];
  const existingIndex = (state.accounts || []).findIndex((account) => account.email === DEMO_ACCOUNT.email);
  if (existingIndex >= 0) {
    state.accounts[existingIndex] = {
      ...state.accounts[existingIndex],
      ...demo,
      lastLogin: state.accounts[existingIndex].lastLogin || demo.lastLogin
    };
    return state.accounts[existingIndex];
  }
  state.accounts = [demo, ...(state.accounts || [])];
  return demo;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function accountIdFromEmail(email) {
  const slug = normalizeEmail(email).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `acct-${slug || "local-user"}`;
}

function displayNameFromEmail(email) {
  const [name] = normalizeEmail(email).split("@");
  return name ? name.replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Student";
}

function initials(name) {
  const parts = String(name || "Student")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 1 && parts[0].length > 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts.map((part) => part[0]).join("") || "ST").toUpperCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function hashPassword(password, salt) {
  const source = `${salt}:${password}`;
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function findAccountByEmail(email) {
  const target = normalizeEmail(email);
  return (state.accounts || []).find((account) => normalizeEmail(account.email) === target);
}

function googleAccountChoices() {
  const choices = [
    {
      name: "Nguyen Hoang Nhat",
      email: "hoangnhat.ut@gmail.com",
      status: "Signed in"
    },
    {
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      status: "School account"
    },
    ...(state.accounts || [])
      .filter((account) => account.provider === "Google OAuth 2.0")
      .map((account) => ({
        name: account.name,
        email: account.email,
        status: "Saved account"
      }))
  ];
  const seen = new Set();
  return choices.filter((choice) => {
    const email = normalizeEmail(choice.email);
    if (seen.has(email)) return false;
    seen.add(email);
    return true;
  });
}

function mergeGoogleChoices(...groups) {
  const seen = new Set();
  return groups
    .flat()
    .filter((choice) => choice && choice.email)
    .filter((choice) => {
      const email = normalizeEmail(choice.email);
      if (seen.has(email)) return false;
      seen.add(email);
      return true;
    });
}

async function loadGoogleAccountChoices() {
  try {
    const data = await apiRequest("/oauth/google/accounts");
    return mergeGoogleChoices(data.accounts || [], googleAccountChoices());
  } catch {
    return googleAccountChoices();
  }
}

function makeAccount({ name, email, password, role, provider }) {
  const normalizedEmail = normalizeEmail(email);
  const salt = `salt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id: accountIdFromEmail(normalizedEmail),
    name: name.trim() || displayNameFromEmail(normalizedEmail),
    email: normalizedEmail,
    role: role || "Student",
    provider: provider || "Email/Password",
    passwordSalt: salt,
    passwordHash: password ? hashPassword(password, salt) : "",
    createdAt: new Date().toLocaleString(),
    lastLogin: "",
    status: "Active",
    twoFactor: false
  };
}

function signInAccount(account, provider, remember) {
  const loginTime = new Date().toLocaleString();
  account.lastLogin = loginTime;
  account.provider = provider;
  state.user = {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    authProvider: provider,
    lastLogin: loginTime,
    signedIn: true,
    remember: Boolean(remember)
  };
  addLoginEvent(provider, `${account.email} signed in`);
  saveAuthState();
  window.location.href = nextTarget();
}

async function signInWithGoogleAccount({ name, email }) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    setGoogleOAuthStatus("Enter a valid Google account email.");
    return;
  }

  try {
    setGoogleOAuthStatus("Connecting to Google account...");
    const payload = await apiRequest("/auth/google", {
      method: "POST",
      body: {
        name: name || displayNameFromEmail(normalizedEmail),
        email: normalizedEmail
      }
    });
    persistBackendSession(payload, true);
    closeGoogleDialog();
    window.location.href = nextTarget();
    return;
  } catch (error) {
    if (!error.offline) {
      setGoogleOAuthStatus(error.message);
      return;
    }
  }

  let account = findAccountByEmail(normalizedEmail);
  if (!account) {
    account = makeAccount({
      name: name || displayNameFromEmail(normalizedEmail),
      email: normalizedEmail,
      password: "",
      role: "Student",
      provider: "Google OAuth 2.0"
    });
    state.accounts = [account, ...(state.accounts || [])];
  } else {
    account.provider = "Google OAuth 2.0";
    account.name = account.name || name || displayNameFromEmail(normalizedEmail);
  }
  closeGoogleDialog();
  setAuthStatus("loginStatus", "Google account selected. Signing in...");
  signInAccount(account, "Google OAuth 2.0", true);
}

function addLoginEvent(type, detail) {
  state.loginEvents = [
    {
      type,
      detail,
      time: new Date().toLocaleString()
    },
    ...(state.loginEvents || [])
  ].slice(0, 8);
}

function passwordStrength(password) {
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 12
  ];
  const score = checks.filter(Boolean).length;
  const label = score >= 5 ? "Strong" : score >= 3 ? "Good" : score >= 1 ? "Weak" : "Waiting";
  return { score, label, percent: Math.min(100, score * 20) };
}

function saveAuthState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function nextTarget() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  if (next && /^(?:\.\/)?index\.html(?:#[a-z0-9_-]+)?$/i.test(next)) {
    return next.replace(/^\.\//, "");
  }
  return "index.html#view-dashboard";
}

function setupTabs() {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activateAuthTab(button.dataset.authTab);
    });
  });
}

function activateAuthTab(mode) {
  document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authTab === mode);
  });
  document.getElementById("loginForm").classList.toggle("hidden", mode !== "login");
  document.getElementById("registerForm").classList.toggle("hidden", mode !== "register");
  refreshIcons();
}

function setupPasswordToggle(buttonId, inputId) {
  document.getElementById(buttonId).addEventListener("click", () => {
    const input = document.getElementById(inputId);
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    document.getElementById(buttonId).innerHTML = `<i data-lucide="${visible ? "eye" : "eye-off"}"></i>`;
    document.getElementById(buttonId).title = visible ? "Show password" : "Hide password";
    refreshIcons();
  });
}

async function renderGoogleAccountList() {
  const choices = await loadGoogleAccountChoices();
  document.getElementById("googleAccountList").innerHTML = choices
    .map((account) => `
      <button class="oauth-account" type="button" data-google-email="${escapeAttribute(account.email)}" data-google-name="${escapeAttribute(account.name)}">
        <span class="oauth-avatar">${escapeHtml(initials(account.name))}</span>
        <span>
          <strong>${escapeHtml(account.name)}</strong>
          <small>${escapeHtml(account.email)}</small>
        </span>
        <span class="oauth-status">${escapeHtml(account.status)}</span>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-google-email]").forEach((button) => {
    button.addEventListener("click", () => {
      signInWithGoogleAccount({
        name: button.dataset.googleName,
        email: button.dataset.googleEmail
      });
    });
  });
}

async function openGoogleDialog() {
  document.getElementById("googleOAuthDialog").classList.remove("hidden");
  document.getElementById("googleAccountList").innerHTML = `<div class="oauth-loading">Loading accounts...</div>`;
  document.getElementById("googleOtherForm").classList.add("hidden");
  document.getElementById("googleEmailInput").value = "";
  setGoogleOAuthStatus("");
  await renderGoogleAccountList();
  refreshIcons();
}

function closeGoogleDialog() {
  document.getElementById("googleOAuthDialog").classList.add("hidden");
}

function setupGoogleDialog() {
  document.getElementById("closeGoogleDialog").addEventListener("click", closeGoogleDialog);
  document.getElementById("googleOAuthDialog").addEventListener("click", (event) => {
    if (event.target.id === "googleOAuthDialog") {
      closeGoogleDialog();
    }
  });
  document.getElementById("useOtherGoogleAccount").addEventListener("click", () => {
    document.getElementById("googleOtherForm").classList.remove("hidden");
    document.getElementById("googleEmailInput").focus();
  });
  document.getElementById("googleOtherForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = normalizeEmail(document.getElementById("googleEmailInput").value);
    signInWithGoogleAccount({
      name: displayNameFromEmail(email),
      email
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGoogleDialog();
    }
  });
}

function setGoogleOAuthStatus(message) {
  document.getElementById("googleOAuthStatus").textContent = message;
}

function setAuthStatus(id, message) {
  document.getElementById(id).textContent = message;
}

function updatePasswordStrength() {
  const password = document.getElementById("registerPassword").value;
  const strength = passwordStrength(password);
  const wrapper = document.querySelector(".password-strength");
  wrapper.classList.toggle("good", strength.score >= 3 && strength.score < 5);
  wrapper.classList.toggle("strong", strength.score >= 5);
  document.getElementById("passwordStrengthBar").style.width = `${strength.percent}%`;
  document.getElementById("passwordStrengthText").textContent = `Password strength: ${strength.label}`;
}

function setupForms() {
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = normalizeEmail(document.getElementById("emailInput").value);
    const password = document.getElementById("passwordInput").value;
    const remember = document.getElementById("rememberMe").checked;
    let account = findAccountByEmail(email);

    if (!email || !email.includes("@")) {
      setAuthStatus("loginStatus", "Enter a valid email address.");
      return;
    }

    try {
      setAuthStatus("loginStatus", "Checking backend account...");
      const payload = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password }
      });
      persistBackendSession(payload, remember);
      window.location.href = nextTarget();
      return;
    } catch (error) {
      if (!error.offline) {
        setAuthStatus("loginStatus", error.message);
        return;
      }
    }

    if (email === DEMO_ACCOUNT.email && password === "careercompass") {
      account = restoreDemoAccount();
    }
    if (!account) {
      setAuthStatus("loginStatus", "No account found for this email. Create one first.");
      return;
    }
    if (!account.passwordHash) {
      setAuthStatus("loginStatus", "This account is managed by backend or Google sign-in.");
      return;
    }
    if (account.passwordHash !== hashPassword(password, account.passwordSalt)) {
      setAuthStatus("loginStatus", "Incorrect password for this local account.");
      return;
    }

    setAuthStatus("loginStatus", "Signing in...");
    signInAccount(account, "Email/Password", remember);
  });

  document.getElementById("googleLogin").addEventListener("click", () => {
    openGoogleDialog();
  });

  document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("registerName").value.trim();
    const email = normalizeEmail(document.getElementById("registerEmail").value);
    const password = document.getElementById("registerPassword").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();
    const role = document.getElementById("registerRole").value;
    const accepted = document.getElementById("termsCheck").checked;
    const strength = passwordStrength(password);

    if (!name) {
      setAuthStatus("registerStatus", "Enter the student full name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setAuthStatus("registerStatus", "Enter a valid school email.");
      return;
    }
    if (findAccountByEmail(email)) {
      setAuthStatus("registerStatus", "This email already has an account.");
      return;
    }
    if (strength.score < 3) {
      setAuthStatus("registerStatus", "Use at least 8 characters with mixed letters and numbers.");
      return;
    }
    if (password !== confirm) {
      setAuthStatus("registerStatus", "Password confirmation does not match. Use the eye buttons to check both fields.");
      return;
    }
    if (!accepted) {
      setAuthStatus("registerStatus", "Confirm localStorage storage for this demo account.");
      return;
    }

    let account;
    try {
      setAuthStatus("registerStatus", "Creating account through backend...");
      const payload = await apiRequest("/auth/register", {
        method: "POST",
        body: { name, email, password, role }
      });
      account = upsertAccount(accountFromBackendUser(payload.user));
      addLoginEvent("Account created", `${account.email} created a backend account`);
    } catch (error) {
      if (!error.offline) {
        setAuthStatus("registerStatus", error.message);
        return;
      }
      account = makeAccount({ name, email, password, role, provider: "Email/Password" });
      state.accounts = [account, ...(state.accounts || [])];
      addLoginEvent("Account created", `${account.email} created a local account`);
    }

    saveAuthState();
    event.target.reset();
    updatePasswordStrength();
    document.getElementById("emailInput").value = account.email;
    document.getElementById("passwordInput").value = "";
    setAuthStatus("loginStatus", "Account created. Enter your new password to sign in.");
    setAuthStatus("registerStatus", "New accounts are stored locally for the demo.");
    activateAuthTab("login");
    document.querySelector(".login-panel").scrollIntoView({ block: "start", behavior: "smooth" });
    document.getElementById("passwordInput").focus();
  });
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function init() {
  setupTabs();
  setupPasswordToggle("toggleLoginPassword", "passwordInput");
  setupPasswordToggle("toggleRegisterPassword", "registerPassword");
  setupPasswordToggle("toggleConfirmPassword", "confirmPassword");
  document.getElementById("registerPassword").addEventListener("input", updatePasswordStrength);
  setupGoogleDialog();
  setupForms();
  if (state.user.signedIn) {
    setAuthStatus("loginStatus", `Signed in as ${state.user.email}. Sign in again to continue.`);
  }
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);
