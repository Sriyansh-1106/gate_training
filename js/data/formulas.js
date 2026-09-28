/**
 * GATE CSE Formula & Core Theorem Book
 * Categorized by subject with variable definitions, usage scenarios, examples, and common traps.
 */

export const FORMULA_DATABASE = [
  {
    id: "f-em-de-morgan",
    subjectId: "em",
    subjectName: "Engineering Mathematics",
    topic: "Discrete Mathematics: Logic",
    title: "De Morgan's Laws for Logic & Sets",
    formula: "\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q \\quad \\text{and} \\quad \\neg(p \\lor q) \\equiv \\neg p \\land \\neg q",
    variables: [
      { name: "p, q", meaning: "Propositional statements or sets in set theory." },
      { name: "\\neg", meaning: "Logical NOT (or set complement in set theory)." },
      { name: "\\land, \\lor", meaning: "AND (intersection) and OR (union)." }
    ],
    whenToUse: "When negating compound conditional statements or simplifying boolean expressions and SQL WHERE clauses.",
    example: "Negating 'He is smart and hardworking' gives 'He is NOT smart OR he is NOT hardworking'.",
    commonTrap: "Forgetting to flip the connective from AND to OR (or vice versa) during negation."
  },
  {
    id: "f-em-euler-planar",
    subjectId: "em",
    subjectName: "Engineering Mathematics",
    topic: "Graph Theory",
    title: "Euler's Planar Graph Formula",
    formula: "v - e + f = 2 \\quad \\text{and} \\quad e \\le 3v - 6 \\text{ (for } v \\ge 3 \\text{ simple connected planar graph)}",
    variables: [
      { name: "v", meaning: "Number of vertices in the connected planar graph." },
      { name: "e", meaning: "Number of edges in the graph." },
      { name: "f", meaning: "Number of regions (faces) including the unbounded outer face." }
    ],
    whenToUse: "To check whether a given graph can be drawn on a plane without edge crossings, or to find missing regions/edges.",
    example: "For a cube graph ($v=8, e=12$): $8 - 12 + f = 2 \\implies f = 6$ faces.",
    commonTrap: "Forgetting to count the infinite unbounded exterior region as one of the faces!"
  },
  {
    id: "f-algo-master-theorem",
    subjectId: "algo",
    subjectName: "Algorithms",
    topic: "Asymptotic Analysis",
    title: "Master Theorem for Divide & Conquer",
    formula: "T(n) = a T(n/b) + \\Theta(n^k \\log^p n) \\implies \\begin{cases} \\Theta(n^{\\log_b a}) & \\text{if } \\log_b a > k \\\\ \\Theta(n^k \\log^{p+1} n) & \\text{if } \\log_b a = k, p > -1 \\\\ \\Theta(n^k \\log^p n) & \\text{if } \\log_b a < k, p \\ge 0 \\end{cases}",
    variables: [
      { name: "a", meaning: "Number of subproblems ($a \\ge 1$)." },
      { name: "b", meaning: "Factor by which input size is divided ($b > 1$)." },
      { name: "n^k \\log^p n", meaning: "Work done outside the recursive calls." }
    ],
    whenToUse: "Instantly determining the time complexity of divide-and-conquer recurrences like Merge Sort ($a=2, b=2, k=1$).",
    example: "For $T(n) = 4T(n/2) + n$: $\\log_2 4 = 2 > 1 \\implies \\Theta(n^2)$.",
    commonTrap: "Applying Master Theorem when $a < 1$, $b \\le 1$, or when the subproblem reduction is additive ($T(n) = T(n-1) + n$) instead of multiplicative."
  },
  {
    id: "f-coa-pipeline-speedup",
    subjectId: "coa",
    subjectName: "Computer Organization & Architecture",
    topic: "Pipelining",
    title: "Pipeline Speedup & Clock Period",
    formula: "S = \\frac{n \\cdot k \\cdot \\tau}{[k + (n - 1) + \\text{Stalls}] \\cdot \\tau} \\quad \\text{where } \\tau = \\max(\\text{stage delays}) + t_{\\text{latch}}",
    variables: [
      { name: "k", meaning: "Number of pipeline stages." },
      { name: "n", meaning: "Number of instructions to execute." },
      { name: "t_latch", meaning: "Register / intermediate latch delay." },
      { name: "Stalls", meaning: "Number of stall cycles due to hazards." }
    ],
    whenToUse: "Calculating execution speedup, maximum possible clock frequency, and pipeline efficiency under hazard stalls.",
    example: "For $n \\to \\infty$ without stalls, $S \\to k$ (ideal speedup equals number of stages).",
    commonTrap: "Summing all stage delays to get the clock cycle time instead of picking the maximum stage delay!"
  },
  {
    id: "f-os-effective-amat",
    subjectId: "os",
    subjectName: "Operating Systems",
    topic: "Memory Management",
    title: "Effective Memory Access Time (EMAT with TLB)",
    formula: "\\text{EMAT} = h_{\\text{TLB}} \\times (t_{\\text{TLB}} + m) + (1 - h_{\\text{TLB}}) \\times (t_{\\text{TLB}} + 2m)",
    variables: [
      { name: "h_TLB", meaning: "TLB Hit ratio (between 0 and 1)." },
      { name: "t_TLB", meaning: "TLB access search time." },
      { name: "m", meaning: "Main memory access time for 1-level paging." }
    ],
    whenToUse: "Calculating average memory access time when virtual address translation is accelerated using a TLB.",
    example: "If $h=0.9, t_{\\text{TLB}}=10\\text{ns}, m=100\\text{ns}$: $\\text{EMAT} = 0.9(110) + 0.1(210) = 99 + 21 = 120\\text{ns}$.",
    commonTrap: "Forgetting that on a TLB miss, we first access the TLB, then the page table in RAM ($m$), then the actual word in RAM ($m$) = $t_{\\text{TLB}} + 2m$."
  },
  {
    id: "f-cn-csmacd-frame",
    subjectId: "cn",
    subjectName: "Computer Networks",
    topic: "Ethernet & Physical Layer",
    title: "CSMA/CD Minimum Frame Size",
    formula: "L_{\\min} \\ge 2 \\times T_p \\times B = 2 \\times \\left(\\frac{d}{v}\\right) \\times B",
    variables: [
      { name: "L_min", meaning: "Minimum frame size in bits." },
      { name: "T_p", meaning: "One-way propagation delay ($d / v$)." },
      { name: "B", meaning: "Bandwidth (Transmission speed in bps)." },
      { name: "d", meaning: "Maximum cable distance between stations." },
      { name: "v", meaning: "Signal propagation speed in medium (typically $2 \\times 10^8\\text{ m/s}$)." }
    ],
    whenToUse: "To ensure that a transmitting station does not finish transmission before a collision signal returns from the farthest station.",
    example: "If $T_p = 25.6\\ \\mu\\text{s}$ and $B = 10\\text{ Mbps}$, $L_{\\min} = 2 \\times (25.6 \\times 10^{-6}) \\times 10^7 = 512\\text{ bits} = 64\\text{ bytes}$ (Standard Ethernet!).",
    commonTrap: "Missing the factor of 2 (it is round-trip time $2 T_p$ to detect the worst-case collision)!"
  },
  {
    id: "f-dbms-bplus-order",
    subjectId: "dbms",
    subjectName: "Databases (DBMS)",
    topic: "Indexing & B+ Trees",
    title: "B+ Tree Node Order Condition",
    formula: "p \\cdot P + (p - 1) \\cdot K \\le B_{\\text{size}}",
    variables: [
      { name: "p", meaning: "Order of the internal node (maximum block pointers)." },
      { name: "P", meaning: "Size of each block / child pointer in bytes." },
      { name: "K", meaning: "Size of each search key in bytes." },
      { name: "B_size", meaning: "Disk block size in bytes." }
    ],
    whenToUse: "Calculating the maximum order $p$ and fan-out of a B+ tree internal index node to fit into a single disk block.",
    example: "If $B=512\\text{ B}, K=10\\text{ B}, P=6\\text{ B}$: $6p + 10(p - 1) \\le 512 \\implies 16p \\le 522 \\implies p = 32$.",
    commonTrap: "An internal node with $p$ pointers contains at most $p - 1$ search keys, not $p$ keys!"
  }
];
