/**
 * Authentic GATE CSE Previous Year Questions Database
 * Strict adherence to GATE Official Keys, Question Types, and Detailed Explanations
 * Authenticity labeling: "GATE PYQ — GATE YYYY" vs "GATE-STYLE Practice Question"
 */

export const PYQ_DATABASE = [
  {
    id: "pyq-gate2024-cs-01",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2024",
    subjectId: "em",
    subjectName: "Engineering Mathematics",
    topicId: "em-discrete-logic",
    topicName: "Propositional & First-Order Logic",
    year: 2024,
    type: "MCQ", // MCQ, MSQ, NAT
    marks: 1,
    negativeMarks: 0.33,
    difficulty: "Medium",
    question: "Consider the following first-order logic formula:\n$$\\phi = (\\forall x [P(x) \\rightarrow Q(x)]) \\rightarrow (\\forall x P(x) \\rightarrow \\forall x Q(x))$$\nWhich one of the following statements is TRUE?",
    options: [
      "$\\phi$ is valid (a tautology).",
      "$\\phi$ is satisfiable but not valid.",
      "$\\phi$ is unsatisfiable (a contradiction).",
      "None of the above."
    ],
    correctAnswer: 0, // Option A
    hint1: "Assume the antecedent $(\\forall x [P(x) \\rightarrow Q(x)])$ and $(\\forall x P(x))$ are both True. Does that force every element in the domain to satisfy $Q(x)$?",
    hint2: "By Modus Ponens, for any arbitrary element $c$, if $P(c) \\rightarrow Q(c)$ and $P(c)$ holds, then $Q(c)$ must hold universally.",
    explanation: {
      stepByStep: `1. To check if $\\phi$ is valid, let us examine whether it can ever be False.
2. A conditional statement $A \\rightarrow (B \\rightarrow C)$ can only be False if $A$ is True, $B$ is True, and $C$ is False.
3. Here:
   * $A = \\forall x [P(x) \\rightarrow Q(x)]$
   * $B = \\forall x P(x)$
   * $C = \\forall x Q(x)$
4. Suppose $A$ is True and $B$ is True in some interpretation with domain $D$.
   * Since $B$ is True, for every element $d \\in D$, $P(d)$ is True.
   * Since $A$ is True, for every element $d \\in D$, $P(d) \\rightarrow Q(d)$ is True.
   * Applying Modus Ponens for each $d \\in D$: since $P(d)$ is True and $P(d) \\rightarrow Q(d)$ is True, $Q(d)$ MUST be True!
   * Since $Q(d)$ holds for every $d \\in D$, $\\forall x Q(x)$ is True.
5. Thus $C$ cannot be False whenever $A$ and $B$ are True. Therefore, the formula can never evaluate to False under any interpretation.
6. Hence, $\\phi$ is **valid** (tautology).`,
      whyCorrect: "Universal distribution over implication preserves validity in this direction: $(\\forall x [P(x) \\rightarrow Q(x)]) \\rightarrow (\\forall x P(x) \\rightarrow \\forall x Q(x))$ is a well-known valid schema in First-Order Predicate Calculus.",
      whyOthersWrong: {
        1: "A formula that is true under all possible interpretations is valid, not merely satisfiable.",
        2: "An unsatisfiable formula is never true; here it is always true.",
        3: "Option A is definitively true."
      },
      conceptTested: "First-Order Logic Validity and Universal Quantifier Distribution over Implication",
      commonTrap: "Confusing this with the converse: $(\\forall x P(x) \\rightarrow \\forall x Q(x)) \\rightarrow \\forall x [P(x) \\rightarrow Q(x)]$, which is NOT valid!"
    }
  },
  {
    id: "pyq-gate2023-cs-algo",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2023",
    subjectId: "algo",
    subjectName: "Algorithms",
    topicId: "algo-asymptotic",
    topicName: "Asymptotic Analysis & Recurrences",
    year: 2023,
    type: "NAT",
    marks: 2,
    negativeMarks: 0,
    difficulty: "Medium",
    question: "Consider the recurrence relation:\n$$T(n) = 2 T\\left(\\left\\lfloor\\frac{n}{2}\\right\\rfloor\\right) + n \\log_2 n$$\nfor $n > 1$, with base case $T(1) = 1$.\nThe asymptotic complexity of $T(n)$ is $\\Theta(n^a \\log_2^b n)$. What is the value of $a + b$?",
    correctRange: [3, 3], // Value is 3 (a = 1, b = 2)
    officialAnswerText: "3",
    hint1: "Apply Master Theorem for divide-and-conquer recurrences: $T(n) = a T(n/b) + f(n)$ where $a=2, b=2, f(n) = n \\log n$.",
    hint2: "Compute $n^{\\log_b a} = n^{\\log_2 2} = n^1$. Compare $f(n) = n \\log n$ with $n^1$.",
    explanation: {
      stepByStep: `1. Form: $T(n) = a T(n/b) + f(n)$ where $a = 2, b = 2, f(n) = n \\log n$.
2. Compute $n^{\\log_b a} = n^{\\log_2 2} = n^1 = n$.
3. Notice that $f(n) = \\Theta(n^{\\log_b a} \\cdot \\log^k n)$ where $k = 1$.
4. By Master Theorem Case 2 (Extended):
   If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for $k \\ge 0$, then:
   $$T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$$
5. Substituting our values:
   $$T(n) = \\Theta(n^1 \\log^{1+1} n) = \\Theta(n \\log^2 n)$$
6. Matching with $\\Theta(n^a \\log^b n)$:
   * $a = 1$
   * $b = 2$
7. Therefore, $a + b = 1 + 2 = 3$.`,
      whyCorrect: "Master Theorem extended case 2 gives $T(n) = \\Theta(n \\log^2 n)$, making $a=1, b=2 \\implies a+b=3$.",
      whyOthersWrong: {},
      conceptTested: "Master Theorem Extended Case 2 for Recurrence Relations",
      commonTrap: "Trying to apply standard Master Theorem case 1 or 3 without checking for the extra $\\log n$ factor."
    }
  },
  {
    id: "pyq-gate2024-cs-pipelining",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2024",
    subjectId: "coa",
    subjectName: "Computer Organization & Architecture",
    topicId: "coa-pipelining",
    topicName: "Instruction Pipelining & Hazards",
    year: 2024,
    type: "NAT",
    marks: 2,
    negativeMarks: 0,
    difficulty: "Hard",
    question: "A 5-stage pipelined processor has stage delays of $150\\text{ ps}, 120\\text{ ps}, 180\\text{ ps}, 160\\text{ ps}$, and $140\\text{ ps}$. The inter-stage register delay is $20\\text{ ps}$.\nAssume there are no pipeline stalls. The time required (in picoseconds) to execute $100$ independent instructions is:",
    correctRange: [20800, 20800],
    officialAnswerText: "20800",
    hint1: "The clock period $\\tau$ is determined by the maximum stage delay plus the register delay.",
    hint2: "Total execution time for $n$ instructions on a $k$-stage pipeline is $[k + (n - 1)] \\times \\tau$.",
    explanation: {
      stepByStep: `1. Calculate the clock period $\\tau$:
   $$\\tau = \\max(150, 120, 180, 160, 140) + 20\\text{ ps} = 180 + 20 = 200\\text{ ps}$$
2. Number of stages $k = 5$.
3. Number of instructions $n = 100$.
4. Total cycles required:
   $$\\text{Cycles} = k + (n - 1) = 5 + (100 - 1) = 5 + 99 = 104\\text{ cycles}$$
5. Total execution time:
   $$\\text{Time} = 104 \\times 200\\text{ ps} = 20800\\text{ ps}$$`,
      whyCorrect: "The first instruction takes 5 clock cycles to exit the pipeline; the remaining 99 instructions finish at the rate of 1 instruction per cycle.",
      whyOthersWrong: {},
      conceptTested: "Pipeline Clock Period Calculation and Multi-instruction Execution Time",
      commonTrap: "Using the average or sum of stage delays instead of $\\max(\\text{stages}) + \\text{register delay}$."
    }
  },
  {
    id: "pyq-gate2023-cs-os",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2023",
    subjectId: "os",
    subjectName: "Operating Systems",
    topicId: "os-scheduling",
    topicName: "CPU Scheduling Algorithms",
    year: 2023,
    type: "MCQ",
    marks: 2,
    negativeMarks: 0.66,
    difficulty: "Medium",
    question: "Consider three processes $P_1, P_2, P_3$ with arrival times $0, 1, 2$ and CPU burst times $7, 4, 1$ respectively.\nUsing Shortest Remaining Time First (SRTF) scheduling algorithm, what is the average waiting time (in time units)?",
    options: [
      "2.0",
      "3.0",
      "4.0",
      "5.33"
    ],
    correctAnswer: 1, // Option B (3.0)
    hint1: "Draw the preemptive Gantt chart by re-evaluating remaining burst times at each process arrival (t=0, t=1, t=2).",
    hint2: "Waiting Time = Turnaround Time - Burst Time = (Completion Time - Arrival Time) - Burst Time.",
    explanation: {
      stepByStep: `1. Process timeline analysis:
   * **t = 0**: $P_1$ arrives (burst 7). Runs from 0 to 1. Remaining burst: $7 - 1 = 6$.
   * **t = 1**: $P_2$ arrives (burst 4). Compare $P_2 (4)$ vs $P_1 (6)$. $P_2$ is smaller! $P_2$ preempts $P_1$ and runs from 1 to 2. Remaining burst of $P_2$: $4 - 1 = 3$.
   * **t = 2**: $P_3$ arrives (burst 1). Compare $P_3 (1)$, $P_2 (3)$, $P_1 (6)$. $P_3$ is smallest! $P_3$ preempts $P_2$ and runs from 2 to 3.
   * **t = 3**: $P_3$ completes ($CT = 3$). Remaining: $P_2 (3), P_1 (6)$. $P_2$ runs from 3 to 6.
   * **t = 6**: $P_2$ completes ($CT = 6$). Remaining: $P_1 (6)$. $P_1$ runs from 6 to 12.
   * **t = 12**: $P_1$ completes ($CT = 12$).
2. Completion Times:
   * $P_1: CT = 12$
   * $P_2: CT = 6$
   * $P_3: CT = 3$
3. Turnaround Times (TAT = CT - AT):
   * $P_1: 12 - 0 = 12$
   * $P_2: 6 - 1 = 5$
   * $P_3: 3 - 2 = 1$
4. Waiting Times (WT = TAT - BT):
   * $P_1: 12 - 7 = 5$
   * $P_2: 5 - 4 = 1$
   * $P_3: 1 - 1 = 0$
5. Average Waiting Time:
   $$\\text{Avg WT} = \\frac{5 + 1 + 0}{3} = \\frac{9}{3} = 3.0$$`,
      whyCorrect: "The Gantt chart properly accounts for two preemption events at t=1 and t=2, leading to waiting times of 5, 1, and 0.",
      whyOthersWrong: {
        0: "Underestimates waiting time by missing P1 waiting during P2 and P3 execution.",
        2: "Calculation error in turnaround time.",
        3: "Result of non-preemptive SJF or FCFS instead of SRTF."
      },
      conceptTested: "Shortest Remaining Time First (SRTF) Preemptive Scheduling",
      commonTrap: "Failing to preempt P2 when P3 arrives at t=2."
    }
  },
  {
    id: "pyq-gate2022-cs-toc",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2022",
    subjectId: "toc",
    subjectName: "Theory of Computation",
    topicId: "toc-regular-languages",
    topicName: "Finite Automata & Regular Languages",
    year: 2022,
    type: "MSQ", // Multiple Select Question
    marks: 2,
    negativeMarks: 0,
    difficulty: "Hard",
    question: "Which of the following languages is/are REGULAR over the alphabet $\\Sigma = \\{a, b\\}$?\n(Select all correct options)",
    options: [
      "$L_1 = \\{a^n b^m \\mid n \\ge 0, m \\ge 0 \\text{ and } n + m \\text{ is even}\\}$",
      "$L_2 = \\{a^n b^n \\mid n \\ge 0\\}$",
      "$L_3 = \\{w \\in \\{a, b\\}^* \\mid \\text{the number of } a\\text{'s in } w \\text{ is divisible by 3}\\}$",
      "$L_4 = \\{w w^R \\mid w \\in \\{a, b\\}^*\\}$"
    ],
    correctAnswer: [0, 2], // Options A and C
    hint1: "Can a finite state machine with limited memory count parity (even/odd) or modulo 3? Yes!",
    hint2: "Can a finite state machine match unbounded powers like $a^n b^n$ or palindrome $w w^R$ without a stack?",
    explanation: {
      stepByStep: `1. Analyze $L_1$:
   * $n + m$ is even means either (both $n$ and $m$ are even) OR (both $n$ and $m$ are odd).
   * Regular expression: $(aa)^*(bb)^* + a(aa)^* b(bb)^*$.
   * A DFA with 4 states can easily track parities of $n$ and $m$. Thus $L_1$ is **REGULAR**!
2. Analyze $L_2$:
   * $L_2 = \\{a^n b^n \\mid n \\ge 0\\}$ requires unbounded counting to ensure the number of $a$'s equals the number of $b$'s.
   * By Pumping Lemma, this is a classic non-regular CFL. Thus $L_2$ is **NOT regular**.
3. Analyze $L_3$:
   * Counting modulo 3 requires only 3 states: (count mod 3 = 0, count mod 3 = 1, count mod 3 = 2).
   * A 3-state DFA accepts exactly when in state 0. Thus $L_3$ is **REGULAR**!
4. Analyze $L_4$:
   * $L_4 = \\{w w^R\\}$ is the set of even-length palindromes. It requires unbounded memory to match characters in reverse order.
   * This is a deterministic/non-deterministic CFL, NOT regular.
5. Therefore, the regular languages are $L_1$ and $L_3$.`,
      whyCorrect: "Finite automata have finite memory and can track modulo and parity conditions, but cannot remember arbitrary counts or reverse sequences.",
      whyOthersWrong: {
        1: "$L_2$ requires unbounded memory; violated pumping lemma.",
        3: "$L_4$ requires LIFO stack memory for palindromes; cannot be recognized by DFA."
      },
      conceptTested: "Regular Languages, DFA Memory Limits, and Pumping Lemma",
      commonTrap: "Assuming that because $n + m$ involves arithmetic, $L_1$ is not regular (parity modulo 2 is always regular!)."
    }
  },
  {
    id: "pyq-gate2024-cs-dbms",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2024",
    subjectId: "dbms",
    subjectName: "Databases (DBMS)",
    topicId: "dbms-normalization",
    topicName: "Functional Dependencies & Normalization",
    year: 2024,
    type: "MCQ",
    marks: 2,
    negativeMarks: 0.66,
    difficulty: "Medium",
    question: "Consider a relation schema $R(A, B, C, D, E)$ with functional dependencies:\n$$F = \\{A \\rightarrow B, B \\rightarrow C, C \\rightarrow D, D \\rightarrow E, E \\rightarrow A\\}$$\nWhat is the total number of candidate keys for $R$?",
    options: [
      "1",
      "2",
      "5",
      "10"
    ],
    correctAnswer: 2, // Option C (5)
    hint1: "Notice the circular chain of dependencies: $A \\rightarrow B \\rightarrow C \\rightarrow D \\rightarrow E \\rightarrow A$.",
    hint2: "Compute the attribute closure for each individual single attribute: $A^+, B^+, C^+, D^+, E^+$.",
    explanation: {
      stepByStep: `1. Let us compute attribute closures:
   * $A^+ = \\{A, B, C, D, E\\} \\implies A$ is a candidate key.
   * $B^+ = \\{B, C, D, E, A\\} \\implies B$ is a candidate key.
   * $C^+ = \\{C, D, E, A, B\\} \\implies C$ is a candidate key.
   * $D^+ = \\{D, E, A, B, C\\} \\implies D$ is a candidate key.
   * $E^+ = \\{E, A, B, C, D\\} \\implies E$ is a candidate key.
2. Each of the 5 attributes alone can determine all attributes of the relation.
3. Since each individual attribute is minimal, no composite key can be a candidate key (as it would violate minimality).
4. Thus, there are exactly **5 candidate keys**: $\\{A\\}, \\{B\\}, \\{C\\}, \\{D\\}, \\{E\\}$.`,
      whyCorrect: "The cyclic dependency graph $A \\to B \\to C \\to D \\to E \\to A$ allows any single attribute to reach all 5 attributes through transitivity.",
      whyOthersWrong: {
        0: "A is not the only key; the cycle makes every single attribute a valid minimal key.",
        1: "Arbitrary undercount.",
        3: "Counting pairs, which are superkeys, NOT candidate keys."
      },
      conceptTested: "Candidate Key Finding and Attribute Closure in Cyclic FDs",
      commonTrap: "Confusing superkeys with candidate keys (candidate keys must be minimal!)."
    }
  },
  {
    id: "pyq-gate2023-cs-cn",
    isAuthenticPYQ: true,
    exam: "GATE CSE 2023",
    subjectId: "cn",
    subjectName: "Computer Networks",
    topicId: "cn-ethernet-ip",
    topicName: "Ethernet, Switching & IP Addressing",
    year: 2023,
    type: "NAT",
    marks: 2,
    negativeMarks: 0,
    difficulty: "Medium",
    question: "An IPv4 packet with an MTU (Maximum Transmission Unit) of $1500$ bytes arrives at a router. The length of the packet is $4420$ bytes including a $20$-byte IP header.\nThe router fragments the packet into fragments of maximum allowed size.\nWhat is the value of the **Fragment Offset** field (as an integer) in the **third** fragment?",
    correctRange: [370, 370],
    officialAnswerText: "370",
    hint1: "Remember that the Fragment Offset is measured in units of 8 bytes!",
    hint2: "Each fragment's data payload must be a multiple of 8 bytes.",
    explanation: {
      stepByStep: `1. Total packet size = 4420 bytes, IP Header = 20 bytes.
   Data payload to fragment = $4420 - 20 = 4400$ bytes.
2. MTU = 1500 bytes. With a 20-byte IP header, maximum data payload per fragment = $1500 - 20 = 1480$ bytes.
   Notice that $1480$ is divisible by 8: $1480 / 8 = 185$.
3. Fragment breakdown:
   * **Fragment 1**:
     * Data size = 1480 bytes (bytes 0 to 1479).
     * Fragment Offset = $0 / 8 = 0$.
     * More Fragments (MF) = 1.
   * **Fragment 2**:
     * Data size = 1480 bytes (bytes 1480 to 2959).
     * Fragment Offset = $1480 / 8 = 185$.
     * More Fragments (MF) = 1.
   * **Fragment 3**:
     * Data size = remaining $4400 - (1480 + 1480) = 4400 - 2960 = 1440$ bytes (bytes 2960 to 4399).
     * Fragment Offset = $\\frac{\\text{bytes before this fragment}}{8} = \\frac{2960}{8} = 370$.
     * More Fragments (MF) = 0.
4. Therefore, the fragment offset in the 3rd fragment is **370**.`,
      whyCorrect: "Offset = (Number of data bytes preceding the fragment) / 8 = 2960 / 8 = 370.",
      whyOthersWrong: {},
      conceptTested: "IPv4 Fragmentation and Fragment Offset Scaling Factor (8-byte units)",
      commonTrap: "Forgetting to divide the byte count by 8, or including the 20-byte IP header in the offset calculation."
    }
  }
];
