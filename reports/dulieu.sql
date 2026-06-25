-- KHỞI TẠO CƠ SỞ DỮ LIỆU NỀN TẢNG ĐỊNH HƯỚNG NGHỀ NGHIỆP
CREATE DATABASE CareerRoadmapDB;
GO
USE CareerRoadmapDB;
GO

-- 1. Bảng users
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL,
    full_name NVARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CONSTRAINT CHK_UserRole CHECK (role IN ('STUDENT', 'MENTOR', 'ADMIN')),
    avatar_url VARCHAR(255) NULL,
    github_username VARCHAR(100) NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);

-- 2. Bảng tech_paths
CREATE TABLE tech_paths (
    id INT IDENTITY(1,1) PRIMARY KEY,
    role_name NVARCHAR(100) NOT NULL UNIQUE,
    description NVARCHAR(MAX) NULL,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);

-- 3. Bảng skill_nodes (Tự tham chiếu phân cấp cây)
CREATE TABLE skill_nodes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tech_path_id INT NOT NULL,
    parent_node_id INT NULL,
    skill_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX) NULL,
    priority_level INT NOT NULL CONSTRAINT CHK_NodePriority CHECK (priority_level BETWEEN 1 AND 3),
    CONSTRAINT FK_skill_nodes_tech_paths FOREIGN KEY (tech_path_id) REFERENCES tech_paths(id) ON DELETE CASCADE,
    CONSTRAINT FK_skill_nodes_parent FOREIGN KEY (parent_node_id) REFERENCES skill_nodes(id) ON DELETE NO ACTION
);

-- 4. Bảng course_resources
CREATE TABLE course_resources (
    id INT IDENTITY(1,1) PRIMARY KEY,
    skill_node_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    resource_type VARCHAR(30) NOT NULL CONSTRAINT CHK_ResType CHECK (resource_type IN ('YOUTUBE', 'DOCUMENTATION', 'UDEMY', 'COURSERA')),
    url VARCHAR(500) NOT NULL,
    is_premium BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_course_resources_nodes FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id) ON DELETE CASCADE
);

-- 5. Bảng user_roadmaps
CREATE TABLE user_roadmaps (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    tech_path_id INT NOT NULL,
    gpa_at_creation FLOAT NULL CONSTRAINT CHK_UserGPA CHECK (gpa_at_creation BETWEEN 0.0 AND 4.0),
    status VARCHAR(20) DEFAULT 'ACTIVE' CONSTRAINT CHK_RoadmapStatus CHECK (status IN ('ACTIVE', 'ARCHIVED')),
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_user_roadmaps_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_user_roadmaps_paths FOREIGN KEY (tech_path_id) REFERENCES tech_paths(id) ON DELETE NO ACTION
);

-- 6. Bảng user_skill_progress
CREATE TABLE user_skill_progress (
    user_roadmap_id INT NOT NULL,
    skill_node_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'TODO' CONSTRAINT CHK_ProgStatus CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),
    completed_at DATETIME NULL,
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT PK_user_skill_progress PRIMARY KEY (user_roadmap_id, skill_node_id),
    CONSTRAINT FK_progress_roadmaps FOREIGN KEY (user_roadmap_id) REFERENCES user_roadmaps(id) ON DELETE CASCADE,
    CONSTRAINT FK_progress_nodes FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id) ON DELETE NO ACTION
);

-- 7. Bảng user_skills
CREATE TABLE user_skills (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    skill_name NVARCHAR(100) NOT NULL,
    verified_source VARCHAR(30) DEFAULT 'MANUAL' CONSTRAINT CHK_VerSource CHECK (verified_source IN ('MANUAL', 'GITHUB_SYNC', 'ASSESSMENT')),
    acquired_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_user_skills_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Bảng quizzes
CREATE TABLE quizzes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    skill_node_id INT NOT NULL,
    question_text NVARCHAR(MAX) NOT NULL,
    options_json NVARCHAR(MAX) NOT NULL,
    correct_option VARCHAR(10) NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL CONSTRAINT CHK_QuizDiff CHECK (difficulty_level IN ('FRESHER', 'JUNIOR')),
    CONSTRAINT FK_quizzes_nodes FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id) ON DELETE CASCADE
);

-- 9. Bảng coding_challenges
CREATE TABLE coding_challenges (
    id INT IDENTITY(1,1) PRIMARY KEY,
    skill_node_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    problem_statement NVARCHAR(MAX) NOT NULL,
    starter_code NVARCHAR(MAX) NULL,
    test_cases_json NVARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_challenges_nodes FOREIGN KEY (skill_node_id) REFERENCES skill_nodes(id) ON DELETE CASCADE
);

-- 10. Bảng mentor_sessions
CREATE TABLE mentor_sessions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    mentor_id INT NOT NULL,
    meeting_time DATETIME NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CONSTRAINT CHK_MenSessionStatus CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED')),
    notes NVARCHAR(MAX) NULL,
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_sessions_student_user FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE NO ACTION,
    CONSTRAINT FK_sessions_mentor_user FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE NO ACTION
);

-- 11. Bảng mentor_messages (Lịch sử hội thoại AI Virtual Mentor)
CREATE TABLE mentor_messages (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    sender_type VARCHAR(20) NOT NULL CONSTRAINT CHK_MsgSender CHECK (sender_type IN ('USER', 'AI_MENTOR')),
    message_content NVARCHAR(MAX) NOT NULL,
    sent_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_messages_users_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 12. Bảng job_trends
CREATE TABLE job_trends (
    id INT IDENTITY(1,1) PRIMARY KEY,
    keyword VARCHAR(100) NOT NULL,
    job_portal VARCHAR(50) NOT NULL,
    frequency_count INT DEFAULT 1,
    salary_range VARCHAR(50) NULL,
    experience_level VARCHAR(50) NULL,
    scraped_date DATE DEFAULT CAST(GETDATE() AS DATE)
);

-- 13. Bảng portfolios
CREATE TABLE portfolios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    share_slug VARCHAR(100) NOT NULL UNIQUE,
    is_public BIT DEFAULT 1,
    views_count INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_portfolios_users_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 14. Bảng portfolio_projects
CREATE TABLE portfolio_projects (
    id INT IDENTITY(1,1) PRIMARY KEY,
    portfolio_id INT NOT NULL,
    repo_name VARCHAR(150) NOT NULL,
    repo_url VARCHAR(255) NOT NULL,
    extracted_tech_stack NVARCHAR(MAX) NULL,
    ai_summary NVARCHAR(MAX) NULL,
    synchronized_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_projects_portfolios_id FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
);

-- 15. Bảng github_sync_logs
CREATE TABLE github_sync_logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    sync_status VARCHAR(20) NOT NULL CONSTRAINT CHK_SyncStatus CHECK (sync_status IN ('SUCCESS', 'FAILED', 'PENDING')),
    repos_synced_count INT DEFAULT 0,
    error_message NVARCHAR(MAX) NULL,
    triggered_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_sync_logs_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
GO

-- THIẾT LẬP CÁC CHỈ MỤC TỐI ƯU HÓA TRUY VẤN (INDEXES)
CREATE NONCLUSTERED INDEX IX_users_lookup ON users(email, github_username);
CREATE NONCLUSTERED INDEX IX_skill_nodes_hierarchy ON skill_nodes(tech_path_id, parent_node_id);
CREATE NONCLUSTERED INDEX IX_user_skill_progress_roadmap ON user_skill_progress(user_roadmap_id, status);
CREATE NONCLUSTERED INDEX IX_job_trends_date_keyword ON job_trends(scraped_date, keyword);
CREATE NONCLUSTERED INDEX IX_portfolios_slug_search ON portfolios(share_slug, is_public);
CREATE NONCLUSTERED INDEX IX_github_sync_user ON github_sync_logs(user_id, triggered_at DESC);
GO