-- CREATE DATABASE CareerOrientationPlatform;
-- USE CareerOrientationPlatform;

-- =========================================================================
-- MODULE 1: AUTHENTICATION & USER MANAGEMENT (UC01 - UC05, UC61, UC62, UC77)
-- =========================================================================
CREATE TABLE [Users] (
    [UserID] INT IDENTITY(1,1) PRIMARY KEY,
    [Email] NVARCHAR(150) NOT NULL UNIQUE,
    [PasswordHash] NVARCHAR(255) NULL, -- Nullable to fully support Google OAuth (UC77)
    [Role] NVARCHAR(50) NOT NULL,      -- 'Student', 'Academic Counselor', 'Industry Mentor', 'Administrator'
    [CreatedAt] DATETIME DEFAULT GETDATE(),
    [IsActive] BIT DEFAULT 1
);

-- =========================================================================
-- MODULE 2: USER PROFILES (UC06 - UC15)
-- =========================================================================
CREATE TABLE [StudentProfiles] (
    [StudentID] INT PRIMARY KEY, -- 1-1 Relationship with Users
    [FullName] NVARCHAR(100) NOT NULL,
    [AvatarUrl] NVARCHAR(255) NULL,
    [PhoneNumber] VARCHAR(20) NULL,
    [Address] NVARCHAR(255) NULL,
    [AcademicBackground] NVARCHAR(MAX) NULL,
    [TranscriptUrl] NVARCHAR(255) NULL, -- Path to uploaded transcript file (UC10, UC71)
    [CvUrl] NVARCHAR(255) NULL,         -- Path to uploaded CV file (UC11)
    [GitHubUsername] NVARCHAR(100) NULL, -- Linked GitHub account (UC12, UC13)
    [GitHubLinkedAt] DATETIME NULL,
    FOREIGN KEY ([StudentID]) REFERENCES [Users]([UserID]) ON DELETE CASCADE
);

CREATE TABLE [StaffProfiles] (
    [StaffID] INT PRIMARY KEY, -- 1-1 Relationship with Users (Counselor / Mentor)
    [FullName] NVARCHAR(100) NOT NULL,
    [Specialization] NVARCHAR(255) NULL,
    [Organization] NVARCHAR(255) NULL, -- Company name or Faculty department
    [Bio] NVARCHAR(MAX) NULL,
    FOREIGN KEY ([StaffID]) REFERENCES [Users]([UserID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 3: CAREER PATHS & SKILLS TAXONOMY (UC16 - UC20, UC63, UC64)
-- =========================================================================
CREATE TABLE [CareerPaths] (
    [CareerPathID] INT IDENTITY(1,1) PRIMARY KEY,
    [Title] NVARCHAR(100) NOT NULL, -- E.g., 'Backend Developer', 'DevOps Engineer', 'AI Engineer'
    [Description] NVARCHAR(MAX) NULL,
    [IsActive] BIT DEFAULT 1
);

CREATE TABLE [SkillNodes] (
    [SkillNodeID] INT IDENTITY(1,1) PRIMARY KEY,
    [SkillName] NVARCHAR(100) NOT NULL,
    [Category] NVARCHAR(100) NULL,  -- E.g., 'Programming Language', 'Database', 'Cloud'
    [Description] NVARCHAR(MAX) NULL
);

-- Many-to-Many junction matrix for Career Roadmap Requirements
CREATE TABLE [CareerPathSkills] (
    [CareerPathID] INT NOT NULL,
    [SkillNodeID] INT NOT NULL,
    [RequiredLevel] NVARCHAR(50) DEFAULT 'Basic', -- 'Basic', 'Intermediate', 'Advanced'
    PRIMARY KEY ([CareerPathID], [SkillNodeID]),
    FOREIGN KEY ([CareerPathID]) REFERENCES [CareerPaths]([CareerPathID]) ON DELETE CASCADE,
    FOREIGN KEY ([SkillNodeID]) REFERENCES [SkillNodes]([SkillNodeID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 4: PERSONALIZED LEARNING ROADMAPS (UC21 - UC25, UC73, UC74)
-- =========================================================================
CREATE TABLE [Roadmaps] (
    [RoadmapID] INT IDENTITY(1,1) PRIMARY KEY,
    [StudentID] INT NOT NULL,
    [CareerPathID] INT NOT NULL,
    [TargetGoal] NVARCHAR(MAX) NULL, -- Student's custom goals/milestones (UC17)
    [GeneratedAt] DATETIME DEFAULT GETDATE(),
    [Status] NVARCHAR(50) DEFAULT 'Active', -- 'Active', 'Completed', 'Archived'
    FOREIGN KEY ([StudentID]) REFERENCES [StudentProfiles]([StudentID]),
    FOREIGN KEY ([CareerPathID]) REFERENCES [CareerPaths]([CareerPathID]) ON DELETE CASCADE
);

CREATE TABLE [RoadmapProgress] (
    [ProgressID] INT IDENTITY(1,1) PRIMARY KEY,
    [RoadmapID] INT NOT NULL,
    [SkillNodeID] INT NOT NULL,
    [Status] NVARCHAR(50) DEFAULT 'Not Started', -- 'Not Started', 'In Progress', 'Completed'
    [LastUpdated] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([RoadmapID]) REFERENCES [Roadmaps]([RoadmapID]) ON DELETE CASCADE,
    FOREIGN KEY ([SkillNodeID]) REFERENCES [SkillNodes]([SkillNodeID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 5: LEARNING RESOURCES & PROGRESS TRACKING (UC26 - UC30, UC65, UC66, UC75)
-- =========================================================================
CREATE TABLE [LearningResources] (
    [ResourceID] INT IDENTITY(1,1) PRIMARY KEY,
    [SkillNodeID] INT NOT NULL, -- Maps learning resources directly onto specific skills
    [Title] NVARCHAR(255) NOT NULL,
    [ResourceType] NVARCHAR(50) NOT NULL, -- 'Course', 'Book', 'Documentation', 'Video'
    [Provider] NVARCHAR(100) NULL,       -- 'Coursera', 'Udemy', 'roadmap.sh'
    [Url] NVARCHAR(500) NOT NULL,
    [Description] NVARCHAR(MAX) NULL,
    FOREIGN KEY ([SkillNodeID]) REFERENCES [SkillNodes]([SkillNodeID]) ON DELETE CASCADE
);

CREATE TABLE [StudentCourses] (
    [StudentID] INT NOT NULL,
    [ResourceID] INT NOT NULL,
    [IsFavorite] BIT DEFAULT 0,            -- UC28: Save Favorite Resources
    [Status] NVARCHAR(50) DEFAULT 'Enrolled', -- 'Enrolled', 'In Progress', 'Completed' (UC29, UC30)
    [RegisteredAt] DATETIME DEFAULT GETDATE(),
    [LastAccessedAt] DATETIME NULL,
    PRIMARY KEY ([StudentID], [ResourceID]),
    FOREIGN KEY ([StudentID]) REFERENCES [StudentProfiles]([StudentID]) ON DELETE CASCADE,
    FOREIGN KEY ([ResourceID]) REFERENCES [LearningResources]([ResourceID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 6: PORTFOLIO & DEEP GITHUB INTEGRATION (UC12 - UC14, UC39, UC40, UC72, UC76, UC78-UC80)
-- =========================================================================
CREATE TABLE [Portfolios] (
    [PortfolioID] INT IDENTITY(1,1) PRIMARY KEY,
    [StudentID] INT UNIQUE NOT NULL,
    [Summary] NVARCHAR(MAX) NULL,          -- Compiled natively by AI Recommendation Engine (UC76)
    [ShareToken] VARCHAR(100) NULL UNIQUE, -- For public access link generation (UC40)
    [IsApproved] BIT DEFAULT 0,            -- Verification flag by Industry Mentors (UC58)
    [CreatedAt] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([StudentID]) REFERENCES [StudentProfiles]([StudentID]) ON DELETE CASCADE
);

CREATE TABLE [GitHubRepositories] (
    [RepoID] INT IDENTITY(1,1) PRIMARY KEY,
    [StudentID] INT NOT NULL,
    [RepoName] NVARCHAR(150) NOT NULL,
    [HtmlUrl] NVARCHAR(255) NULL,
    [Description] NVARCHAR(MAX) NULL,
    [PrimaryLanguage] NVARCHAR(50) NULL, -- Main language determined by GitHub API (UC80)
    [ReadmeContent] NVARCHAR(MAX) NULL,  -- Cached content for AI evaluation models (UC79)
    [SyncedAt] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([StudentID]) REFERENCES [StudentProfiles]([StudentID]) ON DELETE CASCADE
);

-- ADDED FOR DEEP API SYNC: Break down repo tech stacks for granular profile building
CREATE TABLE [GitHubRepoLanguages] (
    [RepoID] INT NOT NULL,
    [LanguageName] NVARCHAR(50) NOT NULL,
    [BytesWritten] INT NOT NULL, -- Size of code footprint for data visualization
    PRIMARY KEY ([RepoID], [LanguageName]),
    FOREIGN KEY ([RepoID]) REFERENCES [GitHubRepositories]([RepoID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 7: APPOINTMENTS & CONSULTATION FEEDBACK (UC47 - UC57)
-- =========================================================================
CREATE TABLE [ConsultationSessions] (
    [SessionID] INT IDENTITY(1,1) PRIMARY KEY,
    [StudentID] INT NOT NULL,
    [CounselorOrMentorID] INT NOT NULL,      -- References StaffProfiles(StaffID)
    [ScheduledAt] DATETIME NOT NULL,
    [Status] NVARCHAR(50) DEFAULT 'Pending',   -- 'Pending', 'Approved', 'Completed', 'Cancelled' (UC48, UC51)
    [MeetingLink] NVARCHAR(255) NULL,          -- Remote conference tool handle (Google Meet / Zoom)
    [NotesOrComments] NVARCHAR(MAX) NULL,      -- Initial query description by student
    FOREIGN KEY ([StudentID]) REFERENCES [StudentProfiles]([StudentID]),
    FOREIGN KEY ([CounselorOrMentorID]) REFERENCES [StaffProfiles]([StaffID])
);

-- ADDED FOR GRANULAR FEEDBACK: Differentiates session requests from official evaluations
CREATE TABLE [ConsultationFeedbacks] (
    [FeedbackID] INT IDENTITY(1,1) PRIMARY KEY,
    [SessionID] INT UNIQUE NOT NULL,           -- 1-1 with completed session
    [MentorFeedback] NVARCHAR(MAX) NULL,       -- Actionable tips from experts (UC47, UC57)
    [StudentRating] INT NULL,                  -- Satisfaction evaluation score
    [SubmittedAt] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([SessionID]) REFERENCES [ConsultationSessions]([SessionID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 8: LABOR MARKET TRENDS (UC31 - UC35, UC67, UC81, UC82)
-- =========================================================================
CREATE TABLE [JobTrends] (
    [TrendID] INT IDENTITY(1,1) PRIMARY KEY,
    [CareerPathID] INT NOT NULL,
    [AverageSalary] DECIMAL(18, 2) NULL,       -- Standard income analysis data (UC33)
    [DemandLevel] NVARCHAR(50) NULL,           -- 'High', 'Medium', 'Low' (UC32)
    [TopRequiredTechnologies] NVARCHAR(MAX) NULL, -- List aggregated by Job Portal APIs (UC34, UC81)
    [LastUpdated] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([CareerPathID]) REFERENCES [CareerPaths]([CareerPathID]) ON DELETE CASCADE
);

-- =========================================================================
-- MODULE 9: SYSTEM UTILITIES, NOTIFICATIONS & AI AUDITING (UC68, UC69, UC71-UC76)
-- =========================================================================
-- ADDED FOR CONFIG MANAGEMENT: Store prompt templates and engine metrics (UC68)
CREATE TABLE [AIConfigurations] (
    [ConfigID] INT IDENTITY(1,1) PRIMARY KEY,
    [EngineKey] NVARCHAR(100) NOT NULL UNIQUE, -- E.g., 'RoadmapGenerator', 'PortfolioSummarizer'
    [ModelVersion] NVARCHAR(50) DEFAULT 'gpt-4o',
    [PromptTemplate] NVARCHAR(MAX) NOT NULL,
    [Temperature] FLOAT DEFAULT 0.2,
    [LastModified] DATETIME DEFAULT GETDATE()
);

-- ADDED FOR AUDITING LOGS: High frequency token traffic and caching audit
CREATE TABLE [AIAnalysisLogs] (
    [LogID] INT IDENTITY(1,1) PRIMARY KEY,
    [StudentID] INT NOT NULL,
    [AnalysisType] NVARCHAR(100) NOT NULL,     -- 'Transcript', 'GitHub', 'SkillGap' (UC71, UC72)
    [InputSnapshot] NVARCHAR(MAX) NULL,        -- Metadata input
    [OutputResult] NVARCHAR(MAX) NOT NULL,      -- Generated structured response string
    [TokensUsed] INT NULL,
    [ExecutedAt] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([StudentID]) REFERENCES [StudentProfiles]([StudentID]) ON DELETE CASCADE
);

-- ADDED FOR CORE NON-FUNCTIONAL REQUIREMENTS: System alert synchronization across clients
CREATE TABLE [Notifications] (
    [NotificationID] INT IDENTITY(1,1) PRIMARY KEY,
    [UserID] INT NOT NULL,
    [Title] NVARCHAR(200) NOT NULL,
    [Message] NVARCHAR(MAX) NOT NULL,
    [IsRead] BIT DEFAULT 0,
    [CreatedAt] DATETIME DEFAULT GETDATE(),
    FOREIGN KEY ([UserID]) REFERENCES [Users]([UserID]) ON DELETE CASCADE
);
