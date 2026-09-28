/**
 * GATE CSE 2027 Complete Official Syllabus & Subject Hierarchy
 * Level 0 to Rank 1 Structured Framework
 */

export const SYLLABUS_DATA = [
  {
    id: "em",
    name: "Engineering Mathematics",
    shortName: "Math",
    icon: "calculator",
    color: "#6366f1",
    weightageMarks: "13-15 Marks",
    priority: "High",
    description: "Foundational mathematics for computer science. Scoring and essential for algorithms and TOC.",
    topics: [
      {
        id: "em-discrete-logic",
        title: "Discrete Mathematics: Propositional & First-Order Logic",
        difficulty: "Foundation",
        estimatedHours: 12,
        weight: 3,
        prerequisites: [],
        levels: ["Level 0: What is Logic & Truth Values", "Level 1: Connectives, Truth Tables, Tautology", "Level 2: Inference Rules, Predicates & Quantifiers", "Level 3: Advanced GATE Equivalence & Valid Arguments"],
        subtopics: ["Propositions & Truth Values", "Logical Connectives", "Equivalences & Tautologies", "Predicates & Quantifiers", "Rules of Inference", "Normal Forms: CNF & DNF"]
      },
      {
        id: "em-discrete-sets",
        title: "Discrete Mathematics: Sets, Relations & Functions",
        difficulty: "Foundation",
        estimatedHours: 14,
        weight: 3,
        prerequisites: ["em-discrete-logic"],
        levels: ["Level 0: Sets & Venn Diagrams", "Level 1: Equivalence Relations & Partial Orders", "Level 2: Lattices, Injective/Surjective Functions", "Level 3: Counting Equivalence Classes & Hassee Diagrams"],
        subtopics: ["Set Operations & Power Sets", "Cartesian Products & Relations", "Reflexive, Symmetric, Transitive Relations", "Equivalence Relations & Partitions", "Partial Order Relations & Posets", "Lattices & Distributive Lattices", "Functions: Injective, Surjective, Bijective"]
      },
      {
        id: "em-discrete-combinatorics",
        title: "Discrete Mathematics: Combinatorics & Recurrences",
        difficulty: "Moderate",
        estimatedHours: 15,
        weight: 4,
        prerequisites: ["em-discrete-sets"],
        levels: ["Level 0: Counting & Pigeonhole Principle", "Level 1: Permutations, Combinations & Inclusions", "Level 2: Recurrence Relations & Generating Functions", "Level 3: Derangements & Catalan Numbers in GATE"],
        subtopics: ["Pigeonhole Principle", "Permutations & Combinations", "Inclusion-Exclusion Principle", "Linear Recurrence Relations", "Generating Functions"]
      },
      {
        id: "em-discrete-graph",
        title: "Discrete Mathematics: Graph Theory",
        difficulty: "High",
        estimatedHours: 16,
        weight: 4,
        prerequisites: ["em-discrete-sets"],
        levels: ["Level 0: What is a Graph? Vertices, Edges, Paths", "Level 1: Connectivity, Handshaking Lemma, Degrees", "Level 2: Planar Graphs, Euler Formula, Chromatic Number", "Level 3: Bipartite Matching, Hamiltonian & Eulerian Graphs"],
        subtopics: ["Handshaking Lemma & Degree Sequences", "Bipartite Graphs & Trees", "Eulerian & Hamiltonian Graphs", "Planar Graphs & Euler's Formula", "Graph Coloring & Chromatic Number", "Isomorphism & Connectivity"]
      },
      {
        id: "em-linear-algebra",
        title: "Linear Algebra",
        difficulty: "Moderate",
        estimatedHours: 14,
        weight: 3,
        prerequisites: [],
        levels: ["Level 0: What is a Matrix? Vectors & Systems", "Level 1: Determinants, Matrix Multiplication, Rank", "Level 2: Systems of Linear Equations (AX = B)", "Level 3: Eigenvalues, Eigenvectors & Cayley-Hamilton"],
        subtopics: ["Matrix Operations & Determinants", "Rank of Matrix & Consistency of Equations", "Eigenvalues & Eigenvectors", "Cayley-Hamilton Theorem", "LU Decomposition"]
      },
      {
        id: "em-calculus",
        title: "Calculus",
        difficulty: "Moderate",
        estimatedHours: 10,
        weight: 2,
        prerequisites: [],
        levels: ["Level 0: What is a Limit & Slope?", "Level 1: Continuity & Differentiability", "Level 2: Maxima & Minima, Mean Value Theorems", "Level 3: Definite Integrals & Area under Curve"],
        subtopics: ["Limits & L'Hopital's Rule", "Continuity & Differentiability", "Maxima & Minima of Single Variable", "Mean Value Theorems", "Evaluation of Integrals"]
      },
      {
        id: "em-probability",
        title: "Probability & Statistics",
        difficulty: "High",
        estimatedHours: 16,
        weight: 4,
        prerequisites: ["em-discrete-combinatorics"],
        levels: ["Level 0: Intuition of Chance & Sample Space", "Level 1: Conditional Probability & Bayes Theorem", "Level 2: Random Variables & Expectation/Variance", "Level 3: Distributions: Uniform, Normal, Exponential, Poisson, Binomial"],
        subtopics: ["Conditional Probability & Independence", "Bayes Theorem", "Discrete & Continuous Random Variables", "Expectation, Variance, Standard Deviation", "Poisson, Exponential & Normal Distributions"]
      }
    ]
  },
  {
    id: "dl",
    name: "Digital Logic",
    shortName: "Digital",
    icon: "cpu",
    color: "#3b82f6",
    weightageMarks: "5-6 Marks",
    priority: "High",
    description: "The hardware foundation of computers. Highly objective and 100% scoring with clear rules.",
    topics: [
      {
        id: "dl-boolean-algebra",
        title: "Boolean Algebra & K-Maps",
        difficulty: "Foundation",
        estimatedHours: 10,
        weight: 2,
        prerequisites: ["em-discrete-logic"],
        levels: ["Level 0: 0s and 1s, High and Low voltages", "Level 1: Boolean Laws & DeMorgan's Theorems", "Level 2: SOP, POS, Canonical Forms, 3 & 4 Variable K-Maps", "Level 3: Don't Care Conditions & Prime Implicants"],
        subtopics: ["Boolean Axioms & DeMorgan's Laws", "SOP and POS Minimization", "K-Maps up to 4-variables", "Essential Prime Implicants"]
      },
      {
        id: "dl-combinational",
        title: "Combinational Circuits",
        difficulty: "Moderate",
        estimatedHours: 12,
        weight: 2,
        prerequisites: ["dl-boolean-algebra"],
        levels: ["Level 0: Building circuits without memory", "Level 1: Half Adder, Full Adder, Subtractors", "Level 2: Multiplexers (MUX as Universal Logic)", "Level 3: Decoders, Encoders, Priority Encoders & Tree MUX"],
        subtopics: ["Half & Full Adders/Subtractors", "Ripple Carry vs Carry Lookahead Adder", "Multiplexers (2:1, 4:1, 8:1) & Function Implementation", "Decoders & Demultiplexers"]
      },
      {
        id: "dl-sequential",
        title: "Sequential Circuits: Flip-Flops & Counters",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["dl-combinational"],
        levels: ["Level 0: Why do we need memory in circuits?", "Level 1: Latches vs Flip-Flops (SR, JK, D, T)", "Level 2: Characteristic & Excitation Tables, Race-Around", "Level 3: Synchronous & Asynchronous Counter Design, Mod-N States"],
        subtopics: ["Latches vs Flip-Flops", "JK Master-Slave & Race-around Condition", "Synchronous Counters", "Ripple Counters & Modulo Count", "Finite State Machines: Moore vs Mealy"]
      },
      {
        id: "dl-number-representation",
        title: "Number Representation & Computer Arithmetic",
        difficulty: "Foundation",
        estimatedHours: 8,
        weight: 2,
        prerequisites: [],
        levels: ["Level 0: Decimal to Binary & Hexadecimal", "Level 1: 1's and 2's Complement Arithmetic", "Level 2: Overflow Detection in Signed Binary", "Level 3: IEEE 754 Floating Point (Single & Double Precision)"],
        subtopics: ["Radix Conversions", "Signed Magnitude & 2's Complement", "Overflow Conditions", "IEEE 754 Standard: Sign, Exponent, Mantissa"]
      }
    ]
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture",
    shortName: "COA",
    icon: "hard-drive",
    color: "#06b6d4",
    weightageMarks: "8-10 Marks",
    priority: "High",
    description: "How software talks to hardware: CPU pipelines, cache memories, and instruction sets.",
    topics: [
      {
        id: "coa-instructions",
        title: "Machine Instructions & Addressing Modes",
        difficulty: "Foundation",
        estimatedHours: 10,
        weight: 2,
        prerequisites: ["dl-number-representation"],
        levels: ["Level 0: What is an Assembly Instruction?", "Level 1: Opcode, Operands, 0/1/2/3 Address Machines", "Level 2: Immediate, Direct, Indirect, Indexed, PC-Relative Addressing", "Level 3: Calculating Effective Address in Complex Instructions"],
        subtopics: ["Instruction Formats & Expansion of Opcodes", "Addressing Modes (Immediate, Direct, Register, Relative)", "Instruction Cycle: Fetch, Decode, Execute"]
      },
      {
        id: "coa-memory-cache",
        title: "Memory Hierarchy & Cache Mapping",
        difficulty: "High",
        estimatedHours: 16,
        weight: 4,
        prerequisites: ["coa-instructions"],
        levels: ["Level 0: Why CPU needs Cache (The Speed Gap)", "Level 1: Direct Mapping: Tag, Line, Word Offset", "Level 2: Associative & Set-Associative Mapping, Hit/Miss Penalty", "Level 3: Multi-level Caches, Write Policies, Replacement (LRU/FIFO)"],
        subtopics: ["Locality of Reference (Spatial & Temporal)", "Direct, Fully Associative, Set-Associative Mapping", "Cache Hit Ratio & Average Memory Access Time (AMAT)", "Write-Through vs Write-Back", "LRU, FIFO Replacement Policies"]
      },
      {
        id: "coa-pipelining",
        title: "Instruction Pipelining & Hazards",
        difficulty: "High",
        estimatedHours: 14,
        weight: 3,
        prerequisites: ["coa-instructions"],
        levels: ["Level 0: The Laundry Metaphor for Pipelining", "Level 1: Ideal Pipeline, Clock Cycle Time, Speedup & Efficiency", "Level 2: Structural & Data Hazards (RAW, WAR, WAW) & Operand Forwarding", "Level 3: Control Hazards, Branch Stalls, Delayed Branching"],
        subtopics: ["Pipeline Stages & Clock Period Calculation", "Speedup, Throughput & Efficiency", "Structural Hazards", "Data Hazards & Operand Forwarding", "Control Hazards & Branch Penalties"]
      },
      {
        id: "coa-io-interrupts",
        title: "I/O Organization & Interrupts",
        difficulty: "Moderate",
        estimatedHours: 8,
        weight: 2,
        prerequisites: ["coa-instructions"],
        levels: ["Level 0: How devices communicate with CPU", "Level 1: Programmed I/O vs Interrupt-Driven I/O", "Level 2: Direct Memory Access (DMA): Cycle Stealing & Burst Mode", "Level 3: Interrupt Service Routines & Vector Interrupts"],
        subtopics: ["Programmed I/O & Polling", "Vectored vs Non-vectored Interrupts", "DMA Controller Architecture", "Cycle Stealing vs Burst Transfer"]
      }
    ]
  },
  {
    id: "pds",
    name: "Programming & Data Structures",
    shortName: "DSA-1",
    icon: "code",
    color: "#10b981",
    weightageMarks: "10-12 Marks",
    priority: "Crucial",
    description: "Core programming in C, pointers, recursion, and primary data structures.",
    topics: [
      {
        id: "pds-c-programming",
        title: "C Programming & Pointer Arithmetic",
        difficulty: "Foundation",
        estimatedHours: 14,
        weight: 3,
        prerequisites: [],
        levels: ["Level 0: Variables, Data Types & RAM Memory layout", "Level 1: Control Statements, Loops & Functions", "Level 2: Pointers, Array of Pointers, Pointer to Arrays, String manipulations", "Level 3: Function Pointers, Scope Rules, Storage Classes, GATE C Output questions"],
        subtopics: ["Data Types, Operators & Precedence", "Pointers, Dereferencing & Pointer Arithmetic", "Arrays, Strings & 2D Arrays in Memory", "Structures, Unions & Dynamic Memory Allocation"]
      },
      {
        id: "pds-recursion",
        title: "Recursion & Call Stack",
        difficulty: "Moderate",
        estimatedHours: 10,
        weight: 3,
        prerequisites: ["pds-c-programming"],
        levels: ["Level 0: What is Recursion? The Russian Nesting Dolls", "Level 1: Base Case, Recursive Step & Call Stack Frames", "Level 2: Tracing Tree Recursion & Static/Global variables in recursion", "Level 3: Tail Recursion & Converting Recursion to Iteration"],
        subtopics: ["Stack Frame Allocation", "Tracing Recursive C Functions", "Static Variables in Recursion", "Tower of Hanoi & Divide-and-Conquer Recurrences"]
      },
      {
        id: "pds-linear-ds",
        title: "Linked Lists, Stacks & Queues",
        difficulty: "Foundation",
        estimatedHours: 14,
        weight: 3,
        prerequisites: ["pds-c-programming"],
        levels: ["Level 0: Contiguous Array vs Node Pointers", "Level 1: Singly, Doubly & Circular Linked List Operations", "Level 2: Stack Applications: Infix to Postfix, Evaluation, Parentheses", "Level 3: Circular Queue using Array, Implementing Queue with 2 Stacks"],
        subtopics: ["Linked List Insertions, Deletions, Reversals", "Stack LIFO Properties & Expression Conversions", "Queue FIFO, Circular Queue Condition", "Monotonic Stacks in GATE"]
      },
      {
        id: "pds-trees",
        title: "Binary Trees & Binary Search Trees (BST)",
        difficulty: "High",
        estimatedHours: 18,
        weight: 4,
        prerequisites: ["pds-linear-ds", "pds-recursion"],
        levels: ["Level 0: What is a Tree? Root, Parent, Leaf, Depth", "Level 1: Full, Complete, Strict Binary Trees & Properties", "Level 2: Traversals (Inorder, Preorder, Postorder) & Reconstructing Trees", "Level 3: BST Search, Insert, Delete, AVL Trees & Rotation Rules"],
        subtopics: ["Binary Tree Properties & Node Formulas", "Inorder, Preorder, Postorder & Level-order Traversals", "BST Invariant & Inorder Successor/Predecessor", "AVL Tree Balance Factor & Single/Double Rotations"]
      },
      {
        id: "pds-heaps-hashing",
        title: "Heaps & Hashing",
        difficulty: "Moderate",
        estimatedHours: 12,
        weight: 3,
        prerequisites: ["pds-trees"],
        levels: ["Level 0: What is a Priority Queue & Heap?", "Level 1: Min-Heap, Max-Heap, Array Representation of Heaps", "Level 2: Heapify, Heap Insert/Extract-Min, Build-Heap O(n)", "Level 3: Hashing: Chaining, Open Addressing (Linear, Quadratic, Double Hashing)"],
        subtopics: ["Min/Max Heap Properties & Array Mapping", "Build-Heap Algorithm Time Complexity", "Hash Functions & Collision Resolution", "Load Factor & Search Complexity"]
      }
    ]
  },
  {
    id: "algo",
    name: "Algorithms",
    shortName: "Algo",
    icon: "git-branch",
    color: "#8b5cf6",
    weightageMarks: "8-10 Marks",
    priority: "Crucial",
    description: "Design and analysis of algorithms, asymptotic notations, greedy, DP, and graphs.",
    topics: [
      {
        id: "algo-asymptotic",
        title: "Asymptotic Analysis & Recurrences",
        difficulty: "Foundation",
        estimatedHours: 12,
        weight: 3,
        prerequisites: ["em-discrete-combinatorics"],
        levels: ["Level 0: Why Efficiency Matters? Input Size n Growth", "Level 1: Big-O, Omega, Theta, Little-o, Little-omega Definitions", "Level 2: Master Theorem (Standard & Extended) & Recurrence Trees", "Level 3: Comparing Complexities (Log factors, Factorials, Super-polynomials)"],
        subtopics: ["Big-O, Omega, Theta Formal Definitions", "Master Theorem Cases & Exceptions", "Substitution & Recursion Tree Methods", "Asymptotic Order Ranking"]
      },
      {
        id: "algo-searching-sorting",
        title: "Searching & Sorting Algorithms",
        difficulty: "Moderate",
        estimatedHours: 14,
        weight: 3,
        prerequisites: ["algo-asymptotic"],
        levels: ["Level 0: Finding items: Linear Search vs Binary Search", "Level 1: Bubble, Selection, Insertion Sort mechanics", "Level 2: Merge Sort & Quick Sort (Partitioning, Best/Worst Case)", "Level 3: Non-comparison Sorts (Counting Sort, Radix Sort), Lower Bound of Sorting O(n log n)"],
        subtopics: ["Binary Search Variations & Predicates", "Merge Sort Divide-and-Conquer Analysis", "Quick Sort Pivot Selection & In-place Partitioning", "Stability & Space Complexity Comparison"]
      },
      {
        id: "algo-greedy-dp",
        title: "Greedy & Dynamic Programming",
        difficulty: "High",
        estimatedHours: 18,
        weight: 4,
        prerequisites: ["algo-asymptotic", "pds-recursion"],
        levels: ["Level 0: Greedy choice vs Exhaustive search", "Level 1: Fractional Knapsack, Huffman Coding, Activity Selection", "Level 2: Optimal Substructure & Overlapping Subproblems in DP", "Level 3: 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication"],
        subtopics: ["Greedy Choice Property", "Huffman Tree Construction & Bits Calculation", "Memoization vs Tabulation", "0/1 Knapsack Dynamic Programming", "LCS & Edit Distance Tables"]
      },
      {
        id: "algo-graphs",
        title: "Graph Algorithms: Shortest Paths & MST",
        difficulty: "High",
        estimatedHours: 16,
        weight: 4,
        prerequisites: ["algo-asymptotic", "em-discrete-graph", "pds-heaps-hashing"],
        levels: ["Level 0: Traversing a Maze: Breadth First vs Depth First", "Level 1: BFS & DFS Properties, Edge Classification (Tree, Back, Cross, Forward)", "Level 2: Minimum Spanning Trees: Kruskal & Prim Algorithms", "Level 3: Dijkstra Algorithm, Bellman-Ford, Floyd-Warshall & Negative Cycles"],
        subtopics: ["BFS & DFS Traversal Applications", "Topological Sort & DAG Cycle Detection", "Kruskal (Disjoint Set Union) & Prim MST", "Dijkstra Single Source Shortest Path", "Bellman-Ford & Negative Weight Detection"]
      }
    ]
  },
  {
    id: "toc",
    name: "Theory of Computation",
    shortName: "TOC",
    icon: "network",
    color: "#ec4899",
    weightageMarks: "8-9 Marks",
    priority: "Crucial",
    description: "Automata, formal languages, grammars, Turing machines, and decidability.",
    topics: [
      {
        id: "toc-regular-languages",
        title: "Finite Automata & Regular Languages",
        difficulty: "Moderate",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["em-discrete-sets"],
        levels: ["Level 0: What is a State Machine? Turnstile Metaphor", "Level 1: DFA Definition, Transition Function, Language Acceptance", "Level 2: NFA to DFA Subset Construction, Minimization of DFA (Myhill-Nerode)", "Level 3: Regular Expressions to Automata, Closure Properties of Regular Languages"],
        subtopics: ["Deterministic Finite Automata (DFA)", "Nondeterministic Finite Automata (NFA)", "Equivalence of NFA & DFA", "Minimization of DFA", "Regular Expressions & Identities", "Pumping Lemma for Regular Languages"]
      },
      {
        id: "toc-cfg-pda",
        title: "Context-Free Grammars & Pushdown Automata",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["toc-regular-languages"],
        levels: ["Level 0: Why Regular Languages can't match parentheses a^n b^n", "Level 1: Context-Free Grammars, Derivations, Parse Trees & Ambiguity", "Level 2: Pushdown Automata (PDA): Stack Operations & Acceptance", "Level 3: Deterministic CFLs vs Non-Deterministic CFLs, Closure Properties"],
        subtopics: ["Context-Free Grammars (CFG)", "Ambiguous Grammars & Language Inherent Ambiguity", "Pushdown Automata (PDA: Final State vs Empty Stack)", "DCFL vs CFL Properties", "Chomsky Normal Form (CNF)"]
      },
      {
        id: "toc-turing-decidability",
        title: "Turing Machines & Decidability",
        difficulty: "High",
        estimatedHours: 14,
        weight: 3,
        prerequisites: ["toc-cfg-pda"],
        levels: ["Level 0: What is Computation? The Infinite Tape", "Level 1: Turing Machine Definition, Recursive vs Recursively Enumerable", "Level 2: Halting Problem & Undecidability Proofs", "Level 3: Rice's Theorem & Chomsky Hierarchy Closure Table"],
        subtopics: ["Standard Turing Machine Model", "Recursive (Decidable) vs Recursively Enumerable Languages", "Halting Problem of Turing Machine", "Rice's Theorem (Part 1 & Part 2)", "Chomsky Hierarchy Comparison Table"]
      }
    ]
  },
  {
    id: "cd",
    name: "Compiler Design",
    shortName: "Compiler",
    icon: "file-code",
    color: "#f59e0b",
    weightageMarks: "4-5 Marks",
    priority: "Moderate",
    description: "Lexical analysis, parsing, syntax-directed translation, and code optimization.",
    topics: [
      {
        id: "cd-lexical",
        title: "Lexical Analysis",
        difficulty: "Foundation",
        estimatedHours: 6,
        weight: 1,
        prerequisites: ["toc-regular-languages"],
        levels: ["Level 0: How Compiler Reads Code: Characters to Tokens", "Level 1: Tokens, Patterns, Lexemes & Recognizing Keywords/Identifiers", "Level 2: Regular Expressions in Lex & Handling White Space/Comments", "Level 3: Lexical Errors & Longest Prefix Matching Rule"],
        subtopics: ["Token, Pattern & Lexeme Distinction", "Transition Diagrams for Tokens", "Input Buffering: Sentinels", "Lexical Error Detection"]
      },
      {
        id: "cd-parsing",
        title: "Syntax Analysis & Parsing (LL & LR)",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["cd-lexical", "toc-cfg-pda"],
        levels: ["Level 0: Grammars and Sentence Structure in Programming", "Level 1: Top-down vs Bottom-up Parsing, Left Recursion Elimination", "Level 2: FIRST and FOLLOW Sets, LL(1) Parsing Table Construction", "Level 3: LR(0), SLR(1), LALR(1), CLR(1) Item Sets & Shift-Reduce Conflicts"],
        subtopics: ["FIRST and FOLLOW Computation", "LL(1) Grammar Verification", "LR(0) and SLR(1) Canonical Collections", "CLR(1) & LALR(1) Parsing Tables", "Shift-Reduce and Reduce-Reduce Conflicts"]
      },
      {
        id: "cd-sdt-codegen",
        title: "SDT, Intermediate Code & Optimization",
        difficulty: "Moderate",
        estimatedHours: 12,
        weight: 2,
        prerequisites: ["cd-parsing"],
        levels: ["Level 0: Generating meaning from parse trees", "Level 1: Syntax Directed Definitions: S-attributed vs L-attributed", "Level 2: Three-Address Code (TAC), Quadruples, Triples", "Level 3: Basic Blocks, Control Flow Graphs, Common Subexpression & Loop Optimization"],
        subtopics: ["Synthesized vs Inherited Attributes", "S-attributed and L-attributed SDT", "Three-Address Code (3AC) Generation", "Basic Blocks and Flow Graphs", "Optimization: Constant Folding, Dead Code, Loop Invariants"]
      }
    ]
  },
  {
    id: "os",
    name: "Operating Systems",
    shortName: "OS",
    icon: "terminal",
    color: "#ef4444",
    weightageMarks: "8-10 Marks",
    priority: "Crucial",
    description: "Processes, CPU scheduling, concurrency, deadlocks, virtual memory, and file systems.",
    topics: [
      {
        id: "os-processes-threads",
        title: "Processes, Threads & System Calls",
        difficulty: "Foundation",
        estimatedHours: 10,
        weight: 2,
        prerequisites: ["coa-instructions"],
        levels: ["Level 0: What is an OS? The Master Manager", "Level 1: Process States, PCB, Context Switch Overhead", "Level 2: User-level vs Kernel-level Threads, Fork System Call Tree", "Level 3: Counting Child Processes in Nested Fork Loops with Output"],
        subtopics: ["Process Control Block (PCB) & Context Switching", "Process State Transition Diagram", "Fork() System Call Tracing", "User vs Kernel Threads"]
      },
      {
        id: "os-scheduling",
        title: "CPU Scheduling Algorithms",
        difficulty: "Moderate",
        estimatedHours: 12,
        weight: 3,
        prerequisites: ["os-processes-threads"],
        levels: ["Level 0: The Doctor's Waiting Room Metaphor", "Level 1: Arrival Time, Burst Time, Completion, Turnaround, Waiting Time", "Level 2: FCFS, SJF (Non-preemptive), SRTF (Preemptive SJF), Round Robin (Quantum)", "Level 3: Priority Scheduling with Aging, Multilevel Feedback Queue"],
        subtopics: ["Gantt Chart Construction", "Turnaround Time & Waiting Time Formulas", "SJF & SRTF Optimality & Starvation", "Round Robin Time Quantum Effects"]
      },
      {
        id: "os-synchronization",
        title: "Process Synchronization & Semaphores",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["os-processes-threads"],
        levels: ["Level 0: Two people editing the same document: Race Conditions", "Level 1: Critical Section Problem: Mutual Exclusion, Progress, Bounded Waiting", "Level 2: Peterson's Solution, Counting & Binary Semaphores (Wait/Signal)", "Level 3: Classical Problems: Producer-Consumer, Dining Philosophers, Readers-Writers"],
        subtopics: ["Race Conditions & Critical Section Requirements", "Peterson's Algorithm for 2 Processes", "Counting vs Binary Semaphores", "Producer-Consumer Bounded Buffer Solution", "Deadlocks vs Livelocks in Synchronization"]
      },
      {
        id: "os-deadlocks",
        title: "Deadlocks & Banker's Algorithm",
        difficulty: "Moderate",
        estimatedHours: 10,
        weight: 2,
        prerequisites: ["os-synchronization"],
        levels: ["Level 0: Gridlock at a 4-way Traffic Intersection", "Level 1: 4 Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait", "Level 2: Resource Allocation Graph (RAG) & Cycle Detection", "Level 3: Banker's Algorithm for Deadlock Avoidance: Safe Sequence Matrix"],
        subtopics: ["4 Necessary Conditions for Deadlock", "Resource Allocation Graph (RAG)", "Deadlock Prevention Techniques", "Banker's Algorithm Safety State Calculation"]
      },
      {
        id: "os-memory-virtual",
        title: "Memory Management & Virtual Memory",
        difficulty: "High",
        estimatedHours: 16,
        weight: 4,
        prerequisites: ["coa-memory-cache"],
        levels: ["Level 0: Why do we have Virtual Memory? Running huge apps in small RAM", "Level 1: Fixed vs Variable Partitioning, Internal & External Fragmentation", "Level 2: Paging: Page Table, Logical to Physical Address Translation, Multi-level Paging", "Level 3: TLB Hit/Miss Effective Access Time, Page Replacement: FIFO, LRU, Optimal, Thrashing"],
        subtopics: ["Paging Hardware & Address Translation", "Multi-level Paging Formulas & Page Table Size", "Translation Lookaside Buffer (TLB) & Effective Memory Access Time", "Page Fault Handling & Replacement (FIFO, Optimal, LRU)", "Belady's Anomaly & Thrashing Working Set"]
      }
    ]
  },
  {
    id: "dbms",
    name: "Databases (DBMS)",
    shortName: "DBMS",
    icon: "database",
    color: "#14b8a6",
    weightageMarks: "7-8 Marks",
    priority: "Crucial",
    description: "Relational models, SQL, relational algebra, normalization, transactions, and indexing.",
    topics: [
      {
        id: "dbms-er-relational",
        title: "ER Model & Relational Algebra",
        difficulty: "Moderate",
        estimatedHours: 12,
        weight: 2,
        prerequisites: ["em-discrete-sets"],
        levels: ["Level 0: What is a Database? Tables, Rows, Keys", "Level 1: ER Diagrams: Entities, Relationships, Cardinality (1:1, 1:N, M:N)", "Level 2: Converting ER Diagrams to Minimal Tables", "Level 3: Relational Algebra: Selection, Projection, Cartesian Product, Natural Join, Division"],
        subtopics: ["Entity-Relationship Model & Cardinality Constraints", "Converting ER to Relational Tables", "Basic Relational Algebra Operators", "Theta Join, Natural Join & Division Operator"]
      },
      {
        id: "dbms-sql",
        title: "SQL Queries & Aggregations",
        difficulty: "Moderate",
        estimatedHours: 12,
        weight: 2,
        prerequisites: ["dbms-er-relational"],
        levels: ["Level 0: Asking questions from data using English-like syntax", "Level 1: SELECT, FROM, WHERE, ORDER BY basics", "Level 2: GROUP BY, HAVING, Aggregate Functions (COUNT, SUM, AVG)", "Level 3: Nested Subqueries, Correlated Subqueries, IN, EXISTS, NULL logic"],
        subtopics: ["Basic SQL Statements & Filtering", "Aggregate Functions with GROUP BY & HAVING", "Subqueries & Correlated Subqueries", "Joins: Inner, Left Outer, Right Outer, Full Outer", "Three-Valued Logic with NULLs"]
      },
      {
        id: "dbms-normalization",
        title: "Functional Dependencies & Normalization",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["dbms-er-relational"],
        levels: ["Level 0: Why do bad databases duplicate data? Redundancy & Anomalies", "Level 1: Functional Dependencies & Attribute Closure X+", "Level 2: Finding Candidate Keys, Minimal Cover / Canonical Cover", "Level 3: Normal Forms: 1NF, 2NF, 3NF, BCNF, Lossless Join & Dependency Preservation"],
        subtopics: ["Armstrong's Axioms & Attribute Closure", "Finding all Candidate Keys of a Relation", "Minimal Cover Calculation", "1NF, 2NF, 3NF, BCNF Checking", "Lossless Join Decomposition & Dependency Preservation Test"]
      },
      {
        id: "dbms-transactions",
        title: "Transactions, Concurrency & Indexing",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["dbms-normalization"],
        levels: ["Level 0: ATM Bank Withdrawal: Why atomic transactions matter", "Level 1: ACID Properties, Read/Write Operations in Schedules", "Level 2: Conflict Serializability (Precedence Graph) & View Serializability", "Level 3: 2-Phase Locking (2PL), Recoverable & Cascadeless Schedules, B & B+ Tree Indexing"],
        subtopics: ["ACID Properties", "Conflict Serializability & Precedence Graphs", "Recoverable, Cascadeless, Strict Schedules", "Two-Phase Locking (Basic, Strict, Rigorous 2PL)", "B-Tree and B+ Tree Node Formats, Order & Capacity Calculations"]
      }
    ]
  },
  {
    id: "cn",
    name: "Computer Networks",
    shortName: "Networks",
    icon: "globe",
    color: "#0ea5e9",
    weightageMarks: "8-9 Marks",
    priority: "Crucial",
    description: "Layered architecture, error control, IP addressing, routing, TCP/UDP, and application protocols.",
    topics: [
      {
        id: "cn-layers-datalink",
        title: "Layered Models & Data Link Layer",
        difficulty: "Moderate",
        estimatedHours: 14,
        weight: 3,
        prerequisites: [],
        levels: ["Level 0: How an Email travels from Tokyo to New York", "Level 1: OSI 7-Layer vs TCP/IP Protocol Stack, Functions of each layer", "Level 2: Error Detection: CRC (Cyclic Redundancy Check) & Checksum", "Level 3: Flow Control: Stop-and-Wait, Go-Back-N, Selective Repeat (Window size & Efficiency)"],
        subtopics: ["OSI & TCP/IP Layer Functions", "Framing & Bit/Byte Stuffing", "CRC Polynomial Division", "Stop-and-Wait Flow Control Efficiency", "Go-Back-N vs Selective Repeat Window Sizes"]
      },
      {
        id: "cn-ethernet-ip",
        title: "Ethernet, Switching & IP Addressing",
        difficulty: "High",
        estimatedHours: 16,
        weight: 3,
        prerequisites: ["cn-layers-datalink"],
        levels: ["Level 0: Local WiFi vs Global Internet Addresses", "Level 1: CSMA/CD Minimum Frame Size formula (L >= 2 * Tp * B)", "Level 2: IPv4 Header Fields, Classful vs Classless Inter-Domain Routing (CIDR)", "Level 3: Subnet Masking, Variable Length Subnet Masking (VLSM), IP Address Allocation"],
        subtopics: ["CSMA/CD & Exponential Backoff Algorithm", "Hubs, Bridges, Switches, Routers", "IPv4 Header Format & Fragmentation", "CIDR Subnetting & Supernetting Calculations"]
      },
      {
        id: "cn-routing-transport",
        title: "Routing Protocols & TCP/UDP",
        difficulty: "High",
        estimatedHours: 16,
        weight: 4,
        prerequisites: ["cn-ethernet-ip"],
        levels: ["Level 0: GPS for the Internet: How packets find paths", "Level 1: Distance Vector Routing (Bellman-Ford) vs Link State Routing (Dijkstra)", "Level 2: TCP 3-Way Handshake, Sequence & Acknowledgment Numbers", "Level 3: TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Additive Increase/Multiplicative Decrease)"],
        subtopics: ["Distance Vector & Count-to-Infinity Problem", "Link State Routing Protocol (OSPF)", "TCP vs UDP Differences", "TCP 3-Way Handshake & Connection Termination", "TCP Congestion Window Dynamics (Threshold, Packet Drops)"]
      },
      {
        id: "cn-application-security",
        title: "Application Layer & Network Security",
        difficulty: "Foundation",
        estimatedHours: 10,
        weight: 2,
        prerequisites: ["cn-routing-transport"],
        levels: ["Level 0: What happens when you type google.com in a browser", "Level 1: DNS: Recursive vs Iterative Resolution, Hierarchy", "Level 2: HTTP 1.0 vs HTTP 1.1 Persistent Connections, Email (SMTP, POP3, IMAP)", "Level 3: Symmetric vs Asymmetric Cryptography, RSA Algorithm, Digital Signatures"],
        subtopics: ["DNS Record Types & Resolution Steps", "HTTP Request/Response & Round Trip Times (RTT)", "RSA Encryption/Decryption Calculations", "Public Key Certificates & Firewalls"]
      }
    ]
  }
];

export const TOTAL_SYLLABUS_HOURS = SYLLABUS_DATA.reduce(
  (total, subject) => total + subject.topics.reduce((sum, t) => sum + t.estimatedHours, 0),
  0
);

export const TOTAL_TOPICS_COUNT = SYLLABUS_DATA.reduce(
  (total, subject) => total + subject.topics.length,
  0
);
