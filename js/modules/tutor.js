/**
 * GATE CSE AI Personal Tutor Engine
 * Provides level-adaptive pedagogical tutoring, Socratic hints,
 * concept breakdowns, beginner analogies, and mistake explanations.
 */

export const TutorEngine = {
  // Built-in intelligent knowledge base for instant offline answers
  knowledgeBase: [
    {
      keywords: ["recursion", "recursive", "call stack"],
      level0: "Imagine standing between two mirrors where you see reflections inside reflections. In programming, recursion is when a function solves a small piece of a problem and calls itself to solve the rest! **The Golden Rule:** Every recursion MUST have a **Base Case** (the stopping condition), otherwise it runs forever until the computer runs out of memory (Stack Overflow).",
      level2: "In GATE, recursion questions test: 1) Tracing static vs local variables in the runtime stack frames, 2) Converting tree recursion to recurrence relations like T(n) = 2T(n/2) + O(n), and 3) Tail call optimization.",
      sampleQuestion: "Trace this C code: `int f(int n) { if (n <= 1) return 1; return n + f(n - 2); }`. What does `f(5)` return?",
      answerNudge: "Work backwards: f(1) = 1; f(3) = 3 + f(1) = 4; f(5) = 5 + f(3) = 9."
    },
    {
      keywords: ["binary search", "search", "divide and conquer"],
      level0: "Think of finding a word in a dictionary. You don't read page by page from the start. You split the book in the middle. If your word is alphabetically before, you throw away the right half! You repeat this until you find it. That's why it is so fast.",
      level2: "GATE examines the boundary conditions: `mid = low + (high - low) / 2` to prevent 32-bit integer overflow, and unsuccessful search comparisons = floor(log2 n) + 1.",
      sampleQuestion: "Why does Binary Search require the array to be sorted?",
      answerNudge: "Because sorting establishes the invariant: if target < A[mid], the target can NEVER exist anywhere in A[mid ... high]."
    },
    {
      keywords: ["pipelining", "hazards", "structural", "raw", "branch"],
      level0: "Pipelining is like an automobile assembly line. While one worker installs the engine on car #1, another worker paints car #2, and another welds car #3. All workers work simultaneously!",
      level2: "GATE hazards: 1) Structural (resource collision), 2) Data Hazards: RAW (Read After Write - solved via Operand Forwarding), 3) Control Hazards (branches - solved via delayed branch or branch prediction).",
      sampleQuestion: "Can operand forwarding completely eliminate the stall cycle for a LOAD instruction followed by an ALU operation?",
      answerNudge: "No! Load data only arrives at the end of the MEM stage, but ALU needs it at the start of EX. A 1-cycle stall is unavoidable."
    },
    {
      keywords: ["cpu scheduling", "sjf", "srtf", "round robin", "fcfs"],
      level0: "CPU scheduling decides which program gets to use the brain (CPU) of the computer when multiple programs are waiting in line. FCFS is first-come-first-served. Round Robin gives everyone a small turn (quantum).",
      level2: "SRTF (Preemptive Shortest Remaining Time First) gives the mathematically minimal average waiting time. Round Robin avoids starvation. FCFS suffers from Convoy Effect.",
      sampleQuestion: "What is the Convoy Effect in FCFS scheduling?",
      answerNudge: "When a CPU-heavy process monopolizes the CPU for a long burst, causing multiple fast I/O-bound processes to wait helplessly behind it."
    },
    {
      keywords: ["b-tree", "b+ tree", "indexing", "dbms"],
      level0: "A B+ tree is like a multi-level table of contents in a huge encyclopedia. The internal pages only tell you which page volume to jump to; the actual text entries are all neatly chained together at the very bottom leaf layer.",
      level2: "In a B+ Tree, leaf nodes are linked via a doubly-linked list for ultra-fast range queries (`SELECT * WHERE age BETWEEN 20 AND 30`). Internal nodes store only keys and block pointers.",
      sampleQuestion: "Why is B+ Tree preferred over Binary Search Tree for disk database indexing?",
      answerNudge: "Disk access is slow. A B+ Tree has a massive branching factor (fan-out of 100+), keeping the tree height tiny (3-4 levels) and minimizing slow disk I/O seek times."
    },
    {
      keywords: ["dijkstra", "negative", "shortest path"],
      level0: "Dijkstra is like water expanding uniformly in all directions through pipes. It always claims the closest unexplored intersection first.",
      level2: "Dijkstra fails on negative edge weights because it greedily assumes once a vertex's distance is finalized, it can never become smaller. Use Bellman-Ford for negative weights!",
      sampleQuestion: "Can Bellman-Ford detect negative weight cycles in a directed graph?",
      answerNudge: "Yes! If after |V| - 1 relaxations, any distance can still be relaxed on the |V|-th iteration, a negative cycle exists."
    }
  ],

  generateResponse(userQuery, studentLevel = 0, currentTopic = "") {
    const qLower = userQuery.toLowerCase().trim();

    // Check query intent
    if (qLower.includes("explain this like i'm a beginner") || qLower.includes("level 0") || qLower.includes("simple")) {
      return this.findBeginnerExplanation(qLower, currentTopic);
    }
    if (qLower.includes("test me") || qLower.includes("quiz me") || qLower.includes("give me a question")) {
      return this.generatePracticeChallenge(qLower, currentTopic);
    }
    if (qLower.includes("why is this answer wrong") || qLower.includes("why option") || qLower.includes("mistake")) {
      return "To diagnose your mistake effectively: Did you make a **conceptual error** (misunderstanding the definition), a **calculation slip** (arithmetic/indexing error), or did you fall for a **GATE trap** (such as vacuous truth, 0-indexing, or edge conditions)? Share the specific question numbers and let's dissect the logic step-by-step!";
    }

    // Match keywords from knowledge base
    for (const item of this.knowledgeBase) {
      if (item.keywords.some(k => qLower.includes(k))) {
        if (studentLevel === 0) {
          return `🤖 **GATE Personal Tutor (Beginner Friendly Mode):**\n\n${item.level0}\n\n💡 *Ready to test your intuition?* Ask me: **"Test me on this!"**`;
        } else {
          return `🤖 **GATE Personal Tutor (GATE Exam Depth):**\n\n${item.level2}\n\n📌 **Key GATE Takeaway:** Focus on edge cases and mathematical bounds.`;
        }
      }
    }

    // Default intelligent pedagogical fallback
    return `🤖 **GATE Personal Tutor:**\n\nGreat question regarding **"${userQuery}"**! 
    
In GATE CSE, questions on this topic typically focus on:
1. Formal mathematical definition and invariant conditions.
2. Best, worst, and average-case boundaries.
3. Edge cases that test your depth (e.g., empty sets, overflow, negative weights).

Would you like:
* A simple everyday analogy (Level 0)?
* The formal GATE definition with formulas (Level 1-2)?
* A quick interactive practice question to test yourself?`;
  },

  findBeginnerExplanation(query, currentTopic) {
    for (const item of this.knowledgeBase) {
      if (item.keywords.some(k => query.includes(k))) {
        return `🌟 **Beginner Level 0 Intuition:**\n\n${item.level0}\n\n*Notice how intuitive this becomes when stripped of heavy jargon?*`;
      }
    }
    return `🌟 **Level 0 Intuition:**\n\nEvery computer science concept originates from an everyday problem. Start with the problem it was created to solve, rather than memorizing the algorithm. Once you understand the *why*, the math and code will follow naturally!`;
  },

  generatePracticeChallenge(query, currentTopic) {
    for (const item of this.knowledgeBase) {
      if (item.keywords.some(k => query.includes(k))) {
        return `🎯 **Quick Concept Check:**\n\n${item.sampleQuestion}\n\n*Think through it carefully! When you have your answer, ask me:* **"What is the hint?"**`;
      }
    }
    return `🎯 **Quick Concept Check:**\n\nIn a binary tree with $N$ leaves, how many nodes of degree 2 exist?\n\n*Answer hint: In any strict binary tree, $N_2 = N_0 - 1$.*`;
  }
};
