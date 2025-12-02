# Implementation Plan

- [ ] 1. Rotate API keys immediately
  - Generate new Replicate API token at https://replicate.com/account/api-tokens
  - Generate new SerpAPI key at https://serpapi.com/manage-api-key
  - Generate new Gemini API key at https://makersuite.google.com/app/apikey
  - Store new keys securely (password manager or secure notes)
  - _Requirements: 1.4_

- [ ] 2. Create environment configuration template
  - Create `.env.example` file in backend directory with placeholder values
  - Document all required environment variables with descriptions
  - Add setup instructions to README.md
  - _Requirements: 1.5_

- [ ] 3. Implement Python configuration manager
  - Create `backend/config.py` with Config class
  - Implement environment variable loading with validation
  - Add environment-specific defaults (debug, host, CORS origins)
  - Implement fail-fast validation on startup
  - _Requirements: 1.3, 4.1, 4.2, 4.4_

- [ ] 4. Update Flask application to use configuration manager
  - Import and initialize Config in `backend/app.py`
  - Replace hardcoded CORS with config-based allowed origins
  - Replace debug mode with environment-based configuration
  - Update server startup to use config values
  - Add startup logging for environment verification
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.3, 3.4, 3.5_

- [ ] 5. Implement production error handling
  - Create generic error response format
  - Add error handler that hides stack traces in production
  - Implement request ID generation for error tracking
  - Add comprehensive server-side error logging
  - _Requirements: 3.2_

- [ ] 6. Create React environment configuration
  - Create `.env.example` in travelsnap-react directory
  - Update `src/services/api.js` to use environment variable for API URL
  - Document environment variable setup in React README
  - _Requirements: 4.5_

- [ ] 7. Update .gitignore to ensure .env files are excluded
  - Verify `.env` is in .gitignore
  - Add `.env.local`, `.env.*.local` patterns
  - Add `.env.production` to gitignore
  - Test that .env files are properly ignored
  - _Requirements: 1.2_

- [ ] 8. Clean Git history of exposed credentials
  - Create full backup of repository
  - Use BFG Repo Cleaner to remove backend/.env from history
  - Verify no API keys remain in history using git grep
  - Force push cleaned history to remote
  - _Requirements: 1.1_

- [ ] 9. Update production environment with new keys
  - Set new API keys in production environment variables
  - Set FLASK_ENV=production
  - Set ALLOWED_ORIGINS to production frontend URL
  - Set FLASK_DEBUG=False explicitly
  - Test production deployment with new configuration
  - _Requirements: 1.4, 2.4, 3.1_

- [ ] 10. Revoke old exposed API keys
  - Revoke old Replicate API token
  - Revoke old SerpAPI key
  - Revoke old Gemini API key
  - Verify old keys no longer work
  - Document key rotation in security log
  - _Requirements: 1.4_

- [ ] 11. Test security configuration
  - Test application starts successfully with valid config
  - Test application fails fast with missing config
  - Test CORS blocks unauthorized origins
  - Test CORS allows authorized origins
  - Test debug mode is disabled in production
  - Test error responses don't leak information in production
  - Verify React app connects to correct backend URL
  - _Requirements: 1.3, 2.1, 2.2, 3.1, 3.2, 4.5_

- [ ] 12. Update team documentation
  - Add security setup section to README
  - Document environment variable configuration process
  - Add troubleshooting guide for common config errors
  - Create developer onboarding checklist
  - Document key rotation procedure
  - _Requirements: 1.5_
