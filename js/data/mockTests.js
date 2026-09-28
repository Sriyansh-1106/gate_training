/**
 * GATE CSE Mock Tests Database
 * Includes Topic Mocks (15-20 Qs) and Full GATE CSE 65-Question Simulation (100 Marks, 180 Mins)
 */

export const MOCK_TESTS_DATABASE = [
  {
    id: "mock-em-logic",
    title: "Topic Mock 01: Discrete Mathematics - Logic",
    subjectId: "em",
    topicId: "em-discrete-logic",
    type: "Topic Mock",
    totalQuestions: 10,
    durationMinutes: 20,
    totalMarks: 15,
    description: "Evaluates your conceptual grip on Propositional Logic, Quantifiers, and Inference Rules before proceeding to Sets & Relations.",
    questions: [
      {
        id: "tm1-q1",
        type: "MCQ",
        marks: 1,
        negativeMarks: 0.33,
        question: "Which of the following propositions is a TAUTOLOGY?",
        options: [
          "$(p \\rightarrow q) \\rightarrow p$",
          "$p \\rightarrow (q \\rightarrow p)$",
          "$(p \\land q) \\rightarrow \\neg p$",
          "$p \\lor (p \\rightarrow q)$"
        ],
        correctAnswer: 1,
        topic: "Propositional Logic",
        explanation: "$p \\rightarrow (q \\rightarrow p) \\equiv \\neg p \\lor (\\neg q \\lor p) \\equiv (\\neg p \\lor p) \\lor \\neg q \\equiv T \\lor \\neg q \\equiv T$. This is always True (Tautology)."
      },
      {
        id: "tm1-q2",
        type: "MCQ",
        marks: 1,
        negativeMarks: 0.33,
        question: "What is the contrapositive of the implication: 'If it rains, then the match is canceled'?",
        options: [
          "If the match is canceled, then it rains.",
          "If it does not rain, then the match is not canceled.",
          "If the match is not canceled, then it does not rain.",
          "If the match is canceled, then it does not rain."
        ],
        correctAnswer: 2,
        topic: "Propositional Logic",
        explanation: "Contrapositive of $p \\rightarrow q$ is $\\neg q \\rightarrow \\neg p$. Thus 'If match is not canceled, then it does not rain'."
      },
      {
        id: "tm1-q3",
        type: "NAT",
        marks: 2,
        negativeMarks: 0,
        question: "How many distinct truth assignments make the compound proposition $(p \\rightarrow q) \\land (q \\rightarrow r)$ evaluate to TRUE for three boolean variables $p, q, r$?",
        correctRange: [5, 5],
        officialAnswerText: "5",
        topic: "Truth Tables",
        explanation: "Total assignments = $2^3 = 8$. The formula is False only when $p \\rightarrow q$ is False (1 case: p=T, q=F, r=T/F -> 2 cases) or when $q \\rightarrow r$ is False with $p \\rightarrow q$ True (1 case: p=F, q=T, r=F -> 1 case). Total False cases = 3. True cases = $8 - 3 = 5$."
      },
      {
        id: "tm1-q4",
        type: "MSQ",
        marks: 2,
        negativeMarks: 0,
        question: "Which of the following statements is/are logically VALID? (Select all that apply)",
        options: [
          "$(\\forall x P(x) \\lor \\forall x Q(x)) \\rightarrow \\forall x (P(x) \\lor Q(x))$",
          "$\\exists x (P(x) \\land Q(x)) \\rightarrow (\\exists x P(x) \\land \\exists x Q(x))$",
          "$\\forall x (P(x) \\lor Q(x)) \\rightarrow (\\forall x P(x) \\lor \\forall x Q(x))$",
          "$(\\exists x P(x) \\land \\exists x Q(x)) \\rightarrow \\exists x (P(x) \\land Q(x))$"
        ],
        correctAnswer: [0, 1],
        topic: "First-Order Logic",
        explanation: "Options A and B are valid. Options C and D are invalid (e.g. let P(x) be 'x is even' and Q(x) be 'x is odd' in integers: every integer is even or odd, but not all integers are even nor are all odd)."
      },
      {
        id: "tm1-q5",
        type: "MCQ",
        marks: 1,
        negativeMarks: 0.33,
        question: "The boolean function $(A \\lor B) \\land (\\neg A \\lor C) \\land (B \\lor C)$ can be simplified using the Consensus Theorem to:",
        options: [
          "$(A \\lor B) \\land (\\neg A \\lor C)$",
          "$(A \\lor B) \\land (B \\lor C)$",
          "$(\\neg A \\lor C) \\land (B \\lor C)$",
          "$A \\land B \\land C$"
        ],
        correctAnswer: 0,
        topic: "Boolean Logic",
        explanation: "By the dual of the Consensus Theorem: $(A+B)(\\bar{A}+C)(B+C) = (A+B)(\\bar{A}+C)$. The redundant consensus term $(B+C)$ drops out."
      }
    ]
  },
  {
    id: "mock-full-gate-2027-sim1",
    title: "All-India Full Length Mock Test 01 (GATE CSE 2027 Pattern)",
    subjectId: "full",
    type: "Full Length Mock",
    totalQuestions: 65,
    durationMinutes: 180,
    totalMarks: 100,
    description: "Complete 180-minute official simulation matching IIT GATE standard: 10 General Aptitude Qs (15 marks) + 55 CSE Technical Qs (85 marks) with official marking scheme.",
    sections: [
      { id: "sec-ga", name: "General Aptitude", questionCount: 10, marks: 15 },
      { id: "sec-cs", name: "Computer Science & IT", questionCount: 55, marks: 85 }
    ],
    questions: [
      {
        id: "fl-q1",
        section: "sec-ga",
        qNumber: 1,
        type: "MCQ",
        marks: 1,
        negativeMarks: 0.33,
        question: "Choose the word most nearly opposite in meaning to **CANDID**:",
        options: ["Deceitful", "Blunt", "Frank", "Honest"],
        correctAnswer: 0,
        explanation: "Candid means truthful and straightforward. Its direct antonym is deceitful."
      },
      {
        id: "fl-q2",
        section: "sec-ga",
        qNumber: 2,
        type: "NAT",
        marks: 1,
        negativeMarks: 0,
        question: "If $20\\%$ of a number is $50$, what is $50\\%$ of that number?",
        correctRange: [125, 125],
        officialAnswerText: "125",
        explanation: "Let the number be $x$. $0.2 x = 50 \\implies x = 250$. Then $50\\%$ of $x = 0.5 \\times 250 = 125$."
      },
      {
        id: "fl-q3",
        section: "sec-cs",
        qNumber: 3,
        type: "MCQ",
        marks: 1,
        negativeMarks: 0.33,
        question: "What is the worst-case time complexity to search for an element in a balanced Binary Search Tree (AVL tree) with $n$ nodes?",
        options: ["$\\mathcal{O}(1)$", "$\\mathcal{O}(\\log n)$", "$\\mathcal{O}(n)$", "$\\mathcal{O}(n \\log n)$"],
        correctAnswer: 1,
        explanation: "AVL trees are height-balanced: height is strictly bounded by $1.44 \\log_2 n$. Hence search takes $\\mathcal{O}(\\log n)$ time even in worst case."
      },
      {
        id: "fl-q4",
        section: "sec-cs",
        qNumber: 4,
        type: "NAT",
        marks: 2,
        negativeMarks: 0,
        question: "A computer system uses 32-bit logical addresses and 4 KB page size. How many bits are used for the **Page Offset**?",
        correctRange: [12, 12],
        officialAnswerText: "12",
        explanation: "Page size = $4\\text{ KB} = 4 \\times 2^{10}\\text{ bytes} = 2^{12}\\text{ bytes}$. The page offset requires $\\log_2(2^{12}) = 12$ bits."
      },
      {
        id: "fl-q5",
        section: "sec-cs",
        qNumber: 5,
        type: "MSQ",
        marks: 2,
        negativeMarks: 0,
        question: "Which of the following problem(s) is/are UNDECIDABLE? (Select all that apply)",
        options: [
          "Halting problem of a Turing Machine",
          "Emptiness problem for Context-Free Grammars",
          "Equivalence of two arbitrary Context-Free Grammars",
          "Finiteness problem for Regular Languages"
        ],
        correctAnswer: [0, 2],
        explanation: "TM Halting is famously undecidable. Equivalence of CFGs is undecidable. Emptiness of CFG is decidable (O(V+E)). Finiteness of Regular Languages is decidable."
      },
      {
        id: "fl-q6",
        section: "sec-cs",
        qNumber: 6,
        type: "MCQ",
        marks: 2,
        negativeMarks: 0.66,
        question: "Consider a direct-mapped cache with 64 cache lines and 16 bytes per line. For a 32-bit physical address, what is the number of bits in the **Tag** field?",
        options: ["20 bits", "22 bits", "24 bits", "26 bits"],
        correctAnswer: 1,
        explanation: "Block size = 16 bytes = $2^4$ bytes $\\implies$ Offset = 4 bits. Number of cache lines = 64 = $2^6 \\implies$ Line Index = 6 bits. Tag bits = $32 - (6 + 4) = 32 - 10 = 22$ bits."
      },
      {
        id: "fl-q7",
        section: "sec-cs",
        qNumber: 7,
        type: "MCQ",
        marks: 1,
        negativeMarks: 0.33,
        question: "In relational algebra, which operator is NOT a fundamental (primitive) operator?",
        options: ["Select ($\\sigma$)", "Project ($\\pi$)", "Cartesian Product ($\\times$)", "Natural Join ($\\bowtie$)"],
        correctAnswer: 3,
        explanation: "Natural join is a derived operator defined as a composition of Cartesian product, selection, and projection."
      },
      {
        id: "fl-q8",
        section: "sec-cs",
        qNumber: 8,
        type: "NAT",
        marks: 2,
        negativeMarks: 0,
        question: "What is the maximum number of edges in a simple bipartite graph with 10 vertices?",
        correctRange: [25, 25],
        officialAnswerText: "25",
        explanation: "In a bipartite graph $G=(V_1, V_2, E)$ with $|V_1| + |V_2| = 10$, max edges occurs when $|V_1| = |V_2| = 5$, giving $|V_1| \\times |V_2| = 5 \\times 5 = 25$ edges."
      }
    ]
  }
];
