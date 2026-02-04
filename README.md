# 🦝 Cachecoon — Memory Match Game

**Cachecoon** is a React + TypeScript + Tailwind CSS memory matching game. Flip cards, find pairs, and beat your best time.

![License](https://img.shields.io/github/license/NickTheDevOpsGuy/Games)
![Contributors](https://img.shields.io/github/contributors/NickTheDevOpsGuy/Games)
![Last Commit](https://img.shields.io/github/last-commit/NickTheDevOpsGuy/Games)
![Stars](https://img.shields.io/github/stars/NickTheDevOpsGuy/Games?style=social)

---

## 🚀 Features

- Flip cards and match pairs  
- Moves counter  
- Timer (starts on first flip, stops on win)  
- Win modal summarizing your performance  
- Reset / “Play Again” support  
- Responsive layout & dark mode support  

---

## 🖼 Preview

### Main App

![Counter App Screenshot](./Screenshots/CounterApp.png)

---

## 🛠 Tech Stack

- React + TypeScript  
- Tailwind CSS v4  
- `useReducer` for game state logic  
- Custom hooks for timer and effects  

---

## 📦 Getting Started

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd Apps/Rememberoon
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## 📂 Project Structure

<details>
<summary>📁 Click to expand project file structure</summary>

```plaintext
.
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── .DS_Store
│   └── app
│       ├── assets
│       │   └── counter.svg
│       ├── CachecoonApp.tsx
│       ├── features
│       │   ├── GameBoard
│       │   │   ├── Card.tsx
│       │   │   └── GameBoard.tsx
│       │   ├── GameResult
│       │   │   └── GameResultModal.tsx
│       │   └── ToolBar
│       │       ├── Timer.tsx
│       │       └── Toolbar.tsx
│       ├── hooks
│       │   ├── useGameState.ts
│       │   ├── useGameTimer.ts
│       │   └── useKeyboardControls.ts
│       ├── main.tsx
│       ├── styles
│       │   └── global.css
│       ├── types
│       │   └── game.d.ts
│       └── utils
│           ├── generateDeck.ts
│           └── shuffle.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

</details>

---

## 🧑‍💻 Usage

1. Click a card to flip it.
2. Flip a second card — if they match, they stay face-up; otherwise, they flip back after 600ms.
3. Moves increment on each pair attempt.
4. Game ends when all pairs are matched. A modal will display your time, moves, and option to play again.

---

🏗 Built For Learning

This project is a small practice app to learn how to combine:

- Managing game state via useReducer
- Designing pure reducer logic + effects
- Synchronizing UI and derived state (moves, timer)
- Handling asynchronous side-effects (delays)
- Tailwind styling & responsive design

---

## 🙋‍♂️ About the Author

Built with 💻 by [Nicholas Clark](https://www.linkedin.com/in/nickdoesdevops)

- Follow the journey: #NickDoesDevOPS

🧠 #NickDoesDevOps
🚀 #LearningInPublic
🔧 #WorldDominations

- GitHub: [NickTheDevOpsGuy](https://github.com/NickTheDevOpsGuy)

## 📄 License

MIT
