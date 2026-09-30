# 🎯 GATE CSE 2027 Interactive Training Platform

> **Target Exam:** GATE 2027 — Computer Science & Information Technology (CSE)  
> **Preparation Start Date:** October 1, 2026  
> **Target Audience:** Students starting from **Level 0 (Zero prior knowledge)** to **Rank 1**.

An intelligent, interactive GATE CSE learning platform designed to guide an absolute beginner systematically from fundamental intuition to GATE exam mastery.

---

## 🔄 Primary Learning Cycle

```
LEARN ➔ UNDERSTAND ➔ PRACTICE ➔ PYQs ➔ MOCK TEST ➔ ANALYZE ➔ REVISE
```

Every single topic follows a structured 7-step pedagogical ladder:
1. **Step 1: What is this?** (Level 0 plain English, intuitive metaphors, zero assumptions)
2. **Step 2: Why does it work?** (Visual intuition, mathematical proof sketched simply)
3. **Step 3: Algorithm & Rules** (Formal rules, C code, invariants)
4. **Step 4: Step-by-Step Worked Example** (Detailed trace through sample inputs)
5. **Step 5: Complexity & Rigorous Analysis** (Best, Average, Worst case, Space)
6. **Step 6: Common GATE Tricks & Traps** (Pitfalls frequently tested in GATE)
7. **Step 7: Quick Practice** (Interactive check questions to unlock authentic GATE PYQs)

---

## ⚡ Key Features

- **GATE 2027 Real-Time Countdown:** Tracks days elapsed since October 1, 2026 and exact days remaining until GATE 2027.
- **Hybrid AI Personal Tutor (Google Gemini + Offline KB):**
  - **Dynamic Model Discovery:** Automatically queries and connects to the fastest available model (e.g., `gemini-2.0-flash`).
  - **Socratic Guidance & Level Adaptation:** Explains concepts from Level 0 (intuitive analogies) up to Level 3 (advanced proofs & corner cases).
  - **Zero-Config Shared Key:** Seamlessly shares your existing Gemini API key across projects.
  - **Resilient Offline Fallback:** Full built-in knowledge base for instant answers, hints, and quiz prompts even without an API key or internet connection.
- **4-Level Mastery System:**
  - **Level 0:** Absolute Beginner (analogies, what is this?, why does efficiency matter?)
  - **Level 1:** Foundation (definitions, standard formulas, mechanics)
  - **Level 2:** GATE Standard (numerical problems, standard traps, standard PYQ patterns)
  - **Level 3:** Advanced GATE (difficult multi-concept, tricky corner cases)
- **Authentic GATE PYQ Database:** Official GATE questions from 2020–2024, labeled with year, marks, negative marking, official keys, and comprehensive step-by-step solutions.
- **Socratic PYQ Learning Mode:** Progressive hints (Hint 1 ➔ Hint 2 ➔ Full Solution) and mistake categorization (*Conceptual, Calculation, Misread, Formula, Guess*).
- **Interactive Visualizers:**
  - *Sorting Visualizer:* Bubble, Selection, Insertion, Quick Sort with step-by-step stepping and speed control.
  - *Binary Search Tree (BST) Visualizer:* Live node insertions, coordinate tree layout, and Inorder/Preorder/Postorder traversals.
  - *Cache Memory Simulator:* Direct & Set-Associative mapping, tag evaluation, hit/miss detection.
- **Full GATE Mock Exam Simulation:**
  - 65 questions, 100 marks, 180-minute countdown timer.
  - Section A (General Aptitude) + Section B (Technical CSE).
  - Official GATE Question Navigation Palette (Answered, Not Answered, Marked for Review, Visited).
  - Built-in **Official GATE Scientific Calculator** modal.
- **Automatic GATE Error Notebook:** Collects every missed question for targeted spaced revision.
- **GATE Formula & Theorem Book:** Categorized formulas with KaTeX mathematical rendering, variable definitions, and common traps.
- **Spaced Repetition Engine:** Automatically schedules reviews at 1d, 3d, 7d, 14d, and 30d intervals.
- **Admin Content Studio:** Add questions, formulas, and lessons with live preview and JSON backup export/import.

---

## 🚀 Quick Start

### Windows (One-Click)
Double-click:
```bat
start.bat
```
This automatically starts the local web server and launches the platform in your default browser.

### Manual Launch (Python)
```bash
python server.py
```
Or directly open `index.html` in any modern web browser.

---

## 📁 Project Architecture

```
gate_training/
├── index.html                 # Main web application entry point
├── start.bat                  # One-click Windows startup batch script
├── server.py                  # Local Python server with automatic browser launch
├── css/
│   └── style.css              # Modern dark-mode responsive design system
├── js/
│   ├── app.js                 # Central UI router, AI settings & event controller
│   ├── data/
│   │   ├── syllabus.js        # Complete 10-subject GATE CSE syllabus hierarchy
│   │   ├── lessons.js         # 7-step pedagogical lessons database
│   │   ├── pyqs.js            # Authentic GATE CSE Previous Year Questions
│   │   ├── mockTests.js       # Topic mocks & Full 65-question exam simulation
│   │   └── formulas.js        # GATE Formula & Theorem book
│   └── modules/
│       ├── storage.js         # LocalStorage persistence & JSON import/export
│       ├── visualizers.js     # Sorting, BST, and Cache interactive simulators
│       ├── examEngine.js      # Official GATE exam engine & virtual calculator
│       ├── tutor.js           # Hybrid Gemini AI + Offline KB Tutor Engine
│       ├── analytics.js       # Heatmaps, streak, and countdown calculations
│       └── admin.js           # Content creation and database management studio
└── README.md
```

---

## 📚 Complete Syllabus Coverage

1. **Engineering Mathematics** (Discrete Logic, Sets & Relations, Combinatorics, Graph Theory, Linear Algebra, Calculus, Probability)
2. **Digital Logic** (Boolean Algebra, K-Maps, Combinational & Sequential Circuits, Number Representations)
3. **Computer Organization & Architecture** (Machine Instructions, Addressing Modes, Cache Mapping, Pipelining, Hazards, I/O)
4. **Programming & Data Structures** (C Language, Pointers, Recursion, Linked Lists, Stacks, Queues, Trees, BST, Heaps, Hashing)
5. **Algorithms** (Asymptotic Analysis, Master Theorem, Searching, Sorting, Greedy, Dynamic Programming, Shortest Paths, MST)
6. **Theory of Computation** (DFA, NFA, Regular Expressions, CFG, Pushdown Automata, Turing Machines, Decidability)
7. **Compiler Design** (Lexical Analysis, LL/LR Parsing, SDT, Intermediate Code, Code Optimization)
8. **Operating Systems** (Processes, Threads, CPU Scheduling, Synchronization, Semaphores, Deadlocks, Virtual Memory, Paging)
9. **Databases (DBMS)** (ER Models, Relational Algebra, SQL, Normalization, 1NF–BCNF, Transactions, Concurrency, B+ Trees)
10. **Computer Networks** (OSI/TCP-IP, Data Link Layer, Sliding Window, CSMA/CD, IP Addressing & CIDR, Routing, TCP/UDP, DNS, Security)

---

## 🛠️ Tech Stack
- **Frontend:** Vanilla HTML5, ES6 Modules, Modern CSS with Design Tokens
- **AI Engine:** Google Gemini API (Dynamic discovery, Flash priority, Multi-turn context) + Offline Fallback
- **Math Rendering:** KaTeX (LaTeX math expressions)
- **Markdown:** Marked.js + Custom Regex fallback
- **Local Server:** Python HTTP Server with fallback to direct browser launch
- **Storage:** LocalStorage with JSON backup/restore