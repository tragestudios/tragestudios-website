USE EventTracker;
GO

CREATE TABLE projects (
  id         INT IDENTITY(1,1) PRIMARY KEY,
  name       NVARCHAR(100) NOT NULL UNIQUE,
  domain     NVARCHAR(300),
  created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE events (
  id          INT IDENTITY(1,1) PRIMARY KEY,
  project     NVARCHAR(100) NOT NULL,
  event_type  NVARCHAR(100) NOT NULL,
  page        NVARCHAR(500),
  element     NVARCHAR(300),
  ip          NVARCHAR(50),
  user_agent  NVARCHAR(1000),
  referrer    NVARCHAR(500),
  session_id  NVARCHAR(100),
  extra       NVARCHAR(MAX),
  created_at  DATETIME DEFAULT GETDATE()
);
GO

CREATE INDEX IX_events_project    ON events(project);
CREATE INDEX IX_events_event_type ON events(event_type);
CREATE INDEX IX_events_created_at ON events(created_at);
CREATE INDEX IX_events_session    ON events(session_id);
GO
