# Diary

A small diary and note-taking web app built as a learning project. It is a demo for practicing React, TypeScript, component-based UI, state management with React Context, and responsive CSS.

The app lets you create sheets and add different kinds of records to them. Your sheets and records are stored in the browser with `localStorage`, so they remain available after a page reload on the same browser.

## Features

- Create, select, rename, and delete sheets.
- Add records as plain text, headings, paragraphs, separators, lists, links, and checklists.
- Mark checklist items as complete.
- Reorder records by dragging them vertically.
- Use the responsive layout on desktop, tablet, and mobile screens, including a slide-out sheets menu on smaller screens.

## Tech stack

- React
- TypeScript
- Vite
- CSS Modules
- Browser `localStorage`

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Learning goals

This demo is useful for exploring how to:

- Split an interface into reusable React components.
- Model different record types with TypeScript.
- Share and update application state with React Context.
- Persist client-side data with `localStorage`.
- Build responsive layouts and interactive controls with CSS.

## Data and limitations

This is a front-end learning demo. It has no server, user accounts, or cloud sync. Data is stored only in the current browser, and clearing that browser's site data will remove it.
