# AI Workplace Productivity Assistant

A modern, responsive, premium SaaS web application designed to help professionals automate repetitive workplace tasks using tailored AI workflows. Built with a clean, minimalist aesthetic inspired by platforms like Linear and Notion, this assistant centralizes daily professional workflows into a single, high-efficiency dashboard.

---

## 🚀 Project Overview

The **AI Workplace Productivity Assistant** bridges the gap between raw AI capabilities and structured professional workflows. Instead of relying on generic chatbot prompts, this application provides specialized modules with structured inputs (tone, length, focus, depth) to deliver instantly usable, highly contextual business assets. 

### Core Design Philosophy:
* **Scannability & Speed:** Minimal clutter, high contrast, and responsive sidebar navigation.
* **Interactivity:** Every piece of AI-generated content is instantly editable before exporting.
* **Responsible AI:** Built-in guardrails and reminders ensuring human-in-the-loop verification.

---

## ✨ Features

The platform consists of a centralized Dashboard Overview and five specialized AI productivity modules:

### 1. Central Dashboard
* **Quick Actions:** One-click routing to all specialized tools.
* **Recent Activity / Saved Tasks:** Tracks your recent generations and pinned workflows.

### 2. Smart Email Generator
* **Tailored Inputs:** Define recipient roles, key contexts, tone (Professional, Casual, Urgent, Persuasive), and length.
* **Smart Output:** Generates ready-to-send emails with instant copy-to-clipboard functionality.

### 3. Meeting Notes Summarizer
* **Flexible Input:** Supports raw text transcripts pasting and file upload drop-zones.
* **Custom Focus:** Toggle summary outputs between *Action Items Only*, *Executive Summary*, or *Full Detailed Notes*.
* **Markdown Output:** Renders beautiful, editable lists with interactive checkboxes for action items.

### 4. AI Task Planner
* **Prompt to Pipeline:** Type a high-level goal (e.g., "Launch Q3 marketing campaign") and receive a structured multi-phase project plan.
* **Inline Editing:** Add, remove, or check off tasks directly inside a mini-Kanban or structured checklist UI.

### 5. AI Research Assistant
* **Depth Control:** Choose between *Surface Level* quick lookups or *Deep Dive* comprehensive analyses.
* **Multi-Tab Workspace:** View results organized neatly across separate editable tabs: *Executive Summary*, *Key Findings*, and *Sources/Next Steps*.

### 6. AI Chatbot Interface
* **Conversational Hub:** A context-aware chat workspace for ad-hoc workplace queries.
* **Prompt Chips:** Quick-start suggestion pills (e.g., *"Draft a memo"*, *"Brainstorm project ideas"*) to eliminate blank-page syndrome.

---

## 🛠️ Tools & Tech Stack

The application is built using a modern, scalable frontend stack optimized for speed and developer experience:

* **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/) - For robust routing, layout management, and optimized rendering.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Using a sophisticated `Slate`/`Zinc` gray system with indigo/violet accents for a premium SaaS look.
* **Icons:** [Lucide React](https://lucide.dev/) - Clean, consistent, lightweight vector iconography.
* **State Management:** React Context API & Local Hooks (`useState`, `useEffect`) for managing app views, simulated generation loading states, and editable content arrays.

---

## 💻 Setup Instructions

Follow these steps to get a local development instance of the AI Workplace Productivity Assistant up and running.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and [npm](https://www.npmjs.com/) (or yarn/pnpm) installed.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/ai-workplace-productivity-assistant.git](https://github.com/your-username/ai-workplace-productivity-assistant.git)
cd ai-workplace-productivity-assistant
