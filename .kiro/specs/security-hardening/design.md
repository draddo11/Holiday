# Design Document

## Overview

This design addresses critical security vulnerabilities in the TravelSnap application by implementing proper secrets management, CORS security, environment-based configuration, and production-ready deployment settings. The solution focuses on immediate remediation of exposed credentials and insecure configurations while maintaining developer experience.

## Architecture

### Current Architecture Issues

- API keys stored in `.env` file committed to Git
- Flask CORS allows all origins (`CORS(app)`)
- Debug mode enabled with `0.0.0.0` binding
- Hardcoded localhost URLs in React frontend
- No environment differentiation

### Proposed Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Environment Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Development  │  │   Staging    │  │  Production  │      │
│  │  .env.local  │  │ .env.staging │  │ Env Variables│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Configuration Manager                       │
│  - Validates required variables                             │
│  - Loads environment-specific settings                      │
│  - Provides typed configuration access                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Flask Application                         │
│  - CORS with allowed origins list                           │
│  - Debug mode based on environment                          │
│  - Secure error handling                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
│  - Environment-based API URLs                               │
│  - Build-time configuration injection                       │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Git History Cleanup

**Purpose**: Remove exposed API keys from Git history

**Implementation**:
- Use `git filter-branch` or `BFG Repo Cleaner` to remove `.env` from history
- Force push cleaned history (coordinate with team)
- Rotate all exposed API keys immediately

**Files Affected**:
- `.git/` directory (history rewrite)
- All branches containing `.env`

### 2. Environment Template System

**Purpose**: Provide secure configuration template without exposing secrets

**Files**:
- `.env.example` - Template with placeholder values
- `.env` - Local developer file (gitignored, not committed)
- `README.md` - Setup instructions

**Template Structure**:
```bash
# .env.example
REPLICATE_API_TOKEN=your_replicate_token_here
SERPAPI_API_KEY=your_serpapi_key_here
GEMINI_API_KEY=your_gemini_key_here
FLASK_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 3. Configuration Manager (Python)

**Purpose**: Centralized, validated configuration loading

**File**: `backend/config.py`

**Interface**:
```python
class Config:
    def __init__(self):
        self.replicate_api_token: str
        self.serpapi_api_key: str
        self.gemini_api_key: str
        self.flask_env: str
        self.allowed_origins: List[str]
        self.debug: bool
        self.host: str
        self.port: int
    
    @classmethod
    def from_env(cls) -> Config:
        """Load and validate configuration from environment"""
        pass
    
    def validate(self) -> None:
        """Ensure all required values are present"""
        pass
```

**Validation Rules**:
- All API keys must be non-empty strings
- `FLASK_ENV` must be one of: development, staging, production
- `ALLOWED_ORIGINS` must be comma-separated valid URLs
- Fail fast on startup if validation fails

### 4. CORS Configuration

**Purpose**: Restrict API access to trusted origins

**Implementation in `app.py`**:
```python
from flask_cors import CORS

config = Config.from_env()

# Secure CORS configuration
CORS(app, 
     origins=config.allowed_origins,
     supports_credentials=True,
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'])
```

**Environment-Specific Origins**:
- Development: `http://localhost:3000`, `http://localhost:5173`, `http://127.0.0.1:5173`
- Production: Actual deployed frontend domain(s)

### 5. Debug Mode Configuration

**Purpose**: Disable debug features in production

**Implementation**:
```python
config = Config.from_env()

if __name__ == '__main__':
    app.run(
        host=config.host,
        port=config.port,
        debug=config.debug
    )
```

**Environment-Specific Settings**:
- Development: `debug=True`, `host='127.0.0.1'`
- Production: `debug=False`, `host='0.0.0.0'` (or specific IP)

### 6. React Environment Configuration

**Purpose**: Use correct backend URL per environment

**File**: `travelsnap-react/.env.example`
```bash
VITE_API_BASE_URL=http://127.0.0.1:5001
```

**File**: `travelsnap-react/src/services/api.js`
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5001';
```

**Build-time Configuration**:
- Vite injects `import.meta.env.VITE_*` variables at build time
- Different `.env` files for different environments
- Production builds use production API URL

## Data Models

### Configuration Schema

```typescript
interface AppConfig {
  // API Credentials
  replicateApiToken: string;
  serpapiApiKey: string;
  geminiApiKey: string;
  
  // Environment
  flaskEnv: 'development' | 'staging' | 'production';
  
  // CORS
  allowedOrigins: string[];
  
  // Server
  debug: boolean;
  host: string;
  port: number;
}
```

### Environment Variable Mapping

| Environment Variable | Type | Required | Default | Description |
|---------------------|------|----------|---------|-------------|
| `REPLICATE_API_TOKEN` | string | Yes | - | Replicate API authentication |
| `SERPAPI_API_KEY` | string | Yes | - | SerpAPI authentication |
| `GEMINI_API_KEY` | string | Yes | - | Google Gemini API authentication |
| `FLASK_ENV` | string | Yes | development | Environment mode |
| `ALLOWED_ORIGINS` | string | Yes | - | Comma-separated CORS origins |
| `FLASK_DEBUG` | boolean | No | auto | Override debug mode |
| `FLASK_HOST` | string | No | auto | Server bind address |
| `FLASK_PORT` | integer | No | 5001 | Server port |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Git history cleanliness
*For any* commit in the repository after cleanup, examining the commit contents should not reveal any `.env` files containing actual API keys.
**Validates: Requirements 1.1**

### Property 2: Environment variable requirement
*For any* application startup attempt, if required environment variables are missing, the application should fail immediately with a clear error message before processing any requests.
**Validates: Requirements 1.3**

### Property 3: CORS origin validation
*For any* HTTP request to the Flask API, if the request origin is not in the allowed origins list, the server should reject the request with appropriate CORS headers.
**Validates: Requirements 2.2**

### Property 4: Environment-specific CORS
*For any* environment mode (development, production), the CORS configuration should only allow origins appropriate for that environment.
**Validates: Requirements 2.3, 2.4**

### Property 5: Debug mode safety
*For any* production environment configuration, the debug mode should be disabled and error responses should not contain stack traces.
**Validates: Requirements 3.1, 3.2**

### Property 6: Configuration immutability
*For any* configuration change, switching between environments should not require code modifications, only environment variable changes.
**Validates: Requirements 4.3**

### Property 7: API URL consistency
*For any* React application build, the API base URL should match the target environment's backend URL.
**Validates: Requirements 4.5**

## Error Handling

### Configuration Errors

**Missing Environment Variables**:
```python
class ConfigurationError(Exception):
    """Raised when required configuration is missing or invalid"""
    pass

# On startup
try:
    config = Config.from_env()
    config.validate()
except ConfigurationError as e:
    logger.error(f"Configuration error: {e}")
    sys.exit(1)
```

**Invalid Values**:
- Log specific validation failure
- Exit with non-zero status code
- Provide actionable error message

### CORS Errors

**Blocked Origin**:
- Return 403 Forbidden
- Include CORS headers indicating rejection
- Log blocked origin for monitoring

### Production Error Responses

**Generic Error Format**:
```json
{
  "error": "An error occurred processing your request",
  "request_id": "uuid-here"
}
```

**Logging**:
- Full error details logged server-side
- Request ID for correlation
- No sensitive information in response

## Testing Strategy

### Unit Testing

**Configuration Loading**:
- Test valid configuration loads successfully
- Test missing required variables raise errors
- Test invalid values are rejected
- Test environment-specific defaults

**CORS Validation**:
- Test allowed origins are accepted
- Test disallowed origins are rejected
- Test wildcard handling (if implemented)

### Integration Testing

**Environment Simulation**:
- Test application startup in each environment mode
- Verify correct debug settings applied
- Verify correct CORS origins loaded

**API Request Testing**:
- Test requests from allowed origins succeed
- Test requests from blocked origins fail
- Test preflight OPTIONS requests

### Property-Based Testing

We will use `hypothesis` for Python property-based testing. Each property-based test should run a minimum of 100 iterations.

**Property Tests**:
1. Configuration validation property (Property 2)
2. CORS origin rejection property (Property 3)
3. Debug mode safety property (Property 5)

### Manual Verification

**Git History Check**:
```bash
git log --all --full-history --source --find-object=<blob-id>
git grep -i "api.*key" $(git rev-list --all)
```

**API Key Rotation**:
- Verify old keys no longer work
- Verify new keys work correctly
- Verify no downtime during rotation

### Security Testing

**Penetration Testing**:
- Attempt to access API from unauthorized origins
- Attempt to trigger debug mode in production
- Verify error messages don't leak information

## Implementation Notes

### Git History Cleanup Process

1. **Backup**: Create full repository backup
2. **Identify**: Find all commits containing `.env`
3. **Clean**: Use BFG Repo Cleaner or git filter-branch
4. **Verify**: Confirm no secrets remain
5. **Force Push**: Update remote repository
6. **Rotate**: Immediately rotate all exposed keys
7. **Notify**: Inform team to re-clone repository

### Key Rotation Checklist

- [ ] Generate new Replicate API token
- [ ] Generate new SerpAPI key
- [ ] Generate new Gemini API key
- [ ] Update production environment variables
- [ ] Update development `.env` files
- [ ] Revoke old keys
- [ ] Test application with new keys
- [ ] Document rotation in security log

### Deployment Considerations

**Environment Variables in Production**:
- Use platform-specific secrets management (e.g., Heroku Config Vars, AWS Secrets Manager)
- Never commit production credentials
- Use different keys for each environment
- Implement key rotation schedule

**CORS in Production**:
- Use exact domain matches (no wildcards unless necessary)
- Include all legitimate frontend domains
- Consider CDN domains if applicable
- Monitor for CORS errors in logs

### Developer Onboarding

**Setup Instructions** (add to README):
1. Clone repository
2. Copy `.env.example` to `.env`
3. Obtain API keys from team lead
4. Fill in `.env` with your keys
5. Run application

**Security Reminders**:
- Never commit `.env` files
- Never share API keys in chat/email
- Rotate keys if accidentally exposed
- Use separate keys for development
