# Contributing to Git Snaps

Thank you for your interest in contributing to Git Snaps! Contributions are welcome, whether they are new content (posts & labs), bug fixes, new features, improvements to documentation, UI enhancements, or performance improvements.

This guide explains how to set up the project, make changes, and submit contributions.

# Getting Started

## Prerequisites

Make sure you have the following installed:
- Node.js (LTS version recommended)
- npm or another compatible package manager
- Git

## Setup

Clone the Repository:

```bash
git clone <repository-url>
cd git-snaps
```
Install Dependencies:

```bash
npm install
```
Start the Development Server:

```bash
npm run dev
```
The app will start in development mode and provide a local URL in the terminal.

Build the Project:

Before submitting changes, verify that the project builds successfully:
```bash
npm run build
```

## Project Structure

The project is organized to keep components, pages, and application logic separated.

## General guidelines:

- Post files should be placed in the `posts` directory.
- Lab files should be placed in the `labs` directory.
- Posts and labs thumbnails should be placed in the `public/images` directory.
- Reusable UI components should live in the components directory.
- Page-level components should contain routing-specific logic.
- Shared utilities should be placed in utility/helper directories.
- Avoid duplicating logic between pages.

## Development Guidelines

### Code Style

Please follow these practices:

- Write clean, readable, and maintainable code.
- Use meaningful variable and function names.
- Keep components small and focused.
- Avoid unnecessary dependencies.
- Follow the existing formatting and naming conventions.
- Remove unused imports and code before submitting changes.

### React Guidelines

When adding React functionality:

- Prefer reusable components over duplicated markup.
- Keep state management close to where it is needed.
- Use hooks appropriately.
- Avoid unnecessary re-renders.
- Keep side effects inside appropriate lifecycle hooks.

### UI Changes

When modifying the UI:

- Maintain the existing design language.
- Ensure responsive behavior works on different screen sizes.
- Use existing components and styles where possible.
- Test both light and dark themes if applicable.

## Adding New Features

Before implementing a major feature:

1. Open an issue describing the proposed change.
2. Explain the problem it solves.
3. Discuss possible implementation approaches.

For smaller improvements, a pull request with a clear explanation is usually sufficient.

for long-running operations such as import/export.

## Testing Your Changes

Before creating a pull request:

- Test the affected functionality manually.
- Verify navigation works correctly.
- Check browser console for errors.
- Confirm responsive layouts.
- Run:

```bash
npm run build
```

## Content Guidelines

When contributing content (posts or labs):
- Write in clear, concise language.
- Use proper formatting for code snippets.
- Write content in a valid markdown format.
- Include relevant diagrams using mermaid.
- Use headings and subheadings to structure content.
- Create the table of contents.
- Update `blogMetadata.js` with the new post or lab information.
- Update `markdown/README.md` file with the new post or lab information.

## Commit Guidelines

Write clear commit messages.

**Examples:**

feat: add bookmark export functionality
fix: prevent duplicate imported bookmarks
ui: improve bookmark button styling
docs: update contributing guide

**Recommended prefixes:**

- "feat" - New functionality
- "fix" - Bug fixes
- "ui" - Interface changes
- "refactor" - Code improvements without behavior changes
- "docs" - Documentation updates
- "chore" - Maintenance changes

## Pull Request Guidelines

A good pull request should:

- Have a clear title.
- Explain what changed and why.
- Include screenshots for UI changes when helpful.
- Mention testing performed.
- Keep changes focused on one purpose.

Please avoid combining unrelated changes in the same pull request.

## Reporting Issues

When reporting a bug, include:

- A clear description of the problem.
- Steps to reproduce it.
- Expected behavior.
- Actual behavior.
- Browser and operating system information.
- Screenshots or recordings if applicable.

## Code of Conduct

Be respectful and constructive when participating in the project.

Contributions should help create a welcoming environment for everyone.
