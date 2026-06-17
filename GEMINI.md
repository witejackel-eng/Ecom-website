# Project Constraints

- **Scope:** All commands and tasks must be executed strictly within the `enterprise-tech-store-rollback` project.
- **Workflow:** After every fulfilled command, the following steps must be taken automatically:
  1. **Git:** Stage and commit changes (e.g., `git add .`, `git commit -m "Automated update"`).
  2. **Localhost:** Ensure the development server is running or restarted to reflect changes (e.g., check process or restart `npm run dev`).
