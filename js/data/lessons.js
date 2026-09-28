/**
 * GATE CSE 2027 Interactive Lessons
 * Follows: Level 0 -> Level 1 -> Level 2 -> Level 3
 * 7-Step Pedagogy:
 * Step 1: What is this? (Level 0 Intuition)
 * Step 2: Why does it work? (Visual Explanation)
 * Step 3: Algorithm & Rules (Step-by-Step)
 * Step 4: Step-by-Step Worked Example
 * Step 5: Complexity & Mathematical Analysis
 * Step 6: Common GATE Tricks & Traps
 * Step 7: Quick Practice (Interactive Check before unlocking PYQs)
 */

export const LESSONS_DATABASE = {
  "em-discrete-logic": {
    topicId: "em-discrete-logic",
    subjectId: "em",
    title: "Propositional & First-Order Logic",
    subtitle: "Day 1 Starting Topic: The Foundation of Mathematical Reasoning",
    levels: {
      0: {
        badge: "Level 0: Absolute Beginner",
        intro: "Welcome to computer science! In regular English, sentences can be vague, emotional, or poetic. But computers and mathematical proofs cannot handle ambiguity. Logic is the clean mathematical tool that allows us to determine absolute truth without doubt.",
        steps: [
          {
            step: 1,
            title: "What is a Proposition?",
            content: `A **proposition** is simply a declarative statement that is either strictly **TRUE (T)** or strictly **FALSE (F)**, but **never both** and never in-between.
            
#### Everyday Examples:
* *"2 + 2 = 4"* → This is a proposition (Truth value: **True**).
* *"Paris is the capital of France"* → This is a proposition (Truth value: **True**).
* *"The sun revolves around the Earth"* → This is a proposition (Truth value: **False**).

#### What is NOT a proposition?
* *"What time is it?"* → A question (has no truth value).
* *"Please close the window."* → A command.
* *"x + 5 = 10"* → An open sentence (we cannot know if it's true or false until someone specifies what $x$ is!).`
          },
          {
            step: 2,
            title: "Why does it work? The Intuition of Truth",
            content: `Think of a proposition like an electrical light switch:
* **ON (1 / True)**
* **OFF (0 / False)**

Just like you can wire two light switches in **series** (both must be ON for the bulb to glow $\\rightarrow$ **AND**) or in **parallel** (if either is ON, the bulb glows $\\rightarrow$ **OR**), logic allows us to combine simple propositions into complex circuits and algorithms.`
          },
          {
            step: 3,
            title: "The 5 Core Connectives",
            content: `We connect propositions $p$ and $q$ using 5 basic operators:
1. **Negation (NOT) $\\neg p$**: Flips truth value. If $p$ is True, $\\neg p$ is False.
2. **Conjunction (AND) $p \\land q$**: True ONLY when **both** $p$ and $q$ are True.
3. **Disjunction (OR) $p \\lor q$**: True if **at least one** of $p$ or $q$ is True.
4. **Conditional (Implication) $p \\rightarrow q$**: Read as *"If $p$, then $q$"*. False **ONLY** when $p$ is True and $q$ is False! (If the premise is false, the implication is vacuously true!).
5. **Biconditional (Double Implication) $p \\leftrightarrow q$**: True when $p$ and $q$ have the **same** truth value.`
          },
          {
            step: 4,
            title: "Step-by-Step Truth Table Construction",
            content: `Let's build a truth table for $(p \\lor q) \\rightarrow p$:

| $p$ | $q$ | $p \\lor q$ | $(p \\lor q) \\rightarrow p$ |
|:---:|:---:|:-----------:|:----------------------------:|
| T   | T   | T           | **T**                        |
| T   | F   | T           | **T**                        |
| F   | T   | T           | **F**                        |
| F   | F   | F           | **T**                        |

Notice row 3: $p \\lor q$ is True, but $p$ is False. Hence $T \\rightarrow F$ evaluates to **False**!
Because this statement is neither all True nor all False, it is called a **Contingency**.`
          },
          {
            step: 5,
            title: "Special Formulas & Tautologies",
            content: `* **Tautology**: A compound proposition that is **ALWAYS TRUE** regardless of the truth values of its variables. Example: $p \\lor \\neg p$.
* **Contradiction**: A compound proposition that is **ALWAYS FALSE**. Example: $p \\land \\neg p$.
* **Contingency**: Can be True or False depending on assignments.
* **De Morgan's Laws**:
  $$\\neg (p \\land q) \\equiv \\neg p \\lor \\neg q$$
  $$\\neg (p \\lor q) \\equiv \\neg p \\land \\neg q$$
* **Crucial Implication Identity**:
  $$p \\rightarrow q \\equiv \\neg p \\lor q$$`
          },
          {
            step: 6,
            title: "Common GATE Traps in Logic",
            content: `> ⚠️ **GATE Trap 1: The Vacuous Truth of Implication**
In $p \\rightarrow q$, beginners frequently think that if $p$ is False, the statement must be False. **NO!** If $p$ is False, $p \\rightarrow q$ is **AUTOMATICALLY TRUE**!
Example: *"If pigs fly, then $2 + 2 = 5$"* is **TRUE** in logic!

> ⚠️ **GATE Trap 2: Converse vs Contrapositive**
* Implication: $p \\rightarrow q$
* Converse: $q \\rightarrow p$ (NOT equivalent to $p \\rightarrow q$!)
* Inverse: $\\neg p \\rightarrow \\neg q$ (NOT equivalent to $p \\rightarrow q$!)
* **Contrapositive: $\\neg q \\rightarrow \\neg p$ (ALWAYS EQUIVALENT to $p \\rightarrow q$!)**`
          },
          {
            step: 7,
            title: "Quick Practice: Concept Check",
            quiz: [
              {
                id: "q1",
                question: "Which of the following is equivalent to $p \\rightarrow q$?",
                options: [
                  "$\\neg p \\lor q$",
                  "$p \\land \\neg q$",
                  "$\\neg q \\rightarrow p$",
                  "$q \\rightarrow p$"
                ],
                correctIndex: 0,
                explanation: "By definition, $p \\rightarrow q \\equiv \\neg p \\lor q$. Its contrapositive is $\\neg q \\rightarrow \\neg p$."
              },
              {
                id: "q2",
                question: "If $p$ is False and $q$ is False, what is the truth value of $p \\rightarrow q$?",
                options: ["False", "True", "Indeterminate", "Contradiction"],
                correctIndex: 1,
                explanation: "When $p$ is False, the implication $p \\rightarrow q$ is vacuously TRUE regardless of $q$."
              },
              {
                id: "q3",
                question: "The statement $p \\lor \\neg p$ is classified as a:",
                options: ["Contingency", "Contradiction", "Tautology", "Predicate"],
                correctIndex: 2,
                explanation: "Either $p$ is True or $\\neg p$ is True. Thus $p \\lor \\neg p$ is always True for every assignment, which is a Tautology."
              }
            ]
          }
        ]
      }
    }
  },
  "algo-searching-sorting": {
    topicId: "algo-searching-sorting",
    subjectId: "algo",
    title: "Searching & Sorting: Binary Search & Beyond",
    subtitle: "Divide and Conquer, Logarithmic Search, and Comparative Sorting",
    levels: {
      0: {
        badge: "Level 0: Absolute Beginner",
        intro: "Suppose you are looking for the word 'Elephant' in a 1,000-page dictionary. Would you read page 1, then page 2, then page 3? Of course not! You open the dictionary roughly in the middle. If you see 'Monkey', you know 'Elephant' comes before it, so you ignore the entire right half. That is the genius of Binary Search.",
        steps: [
          {
            step: 1,
            title: "What is Binary Search?",
            content: `**Binary Search** is an extremely fast search algorithm that finds the position of a target element in a **SORTED array**.
            
#### Core Rule:
The input array **MUST BE SORTED**! If the array is unsorted, Binary Search **CANNOT** be used.

#### Comparison:
* **Linear Search**: Checks each element one by one. If there are 1,000,000 elements, it might take 1,000,000 comparisons!
* **Binary Search**: Halves the search space at every single step. In 1,000,000 elements, it takes at most **20 comparisons**! (Because $2^{20} \\approx 1,000,000$).`
          },
          {
            step: 2,
            title: "Why does it work? The Power of Logarithms",
            content: `Every time we compare our target with the middle element:
1. If $A[mid] == target$, we are done!
2. If $target < A[mid]$, the target can only exist in the left half $[low, mid - 1]$.
3. If $target > A[mid]$, the target can only exist in the right half $[mid + 1, high]$.

At each step, the remaining problem size is:
$$N \\rightarrow \\frac{N}{2} \\rightarrow \\frac{N}{4} \\rightarrow \\frac{N}{8} \\rightarrow \\dots \\rightarrow 1$$
How many divisions by 2 can we do before reaching 1?
$$\\frac{N}{2^k} = 1 \\implies N = 2^k \\implies k = \\log_2 N$$`
          },
          {
            step: 3,
            title: "The Algorithm in Clean C Code",
            content: `\`\`\`c
int binarySearch(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        // Prevent integer overflow: low + (high - low) / 2 instead of (low + high) / 2
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid; // Target found!
        else if (arr[mid] < target)
            low = mid + 1; // Discard left half
        else
            high = mid - 1; // Discard right half
    }
    return -1; // Target not present
}
\`\`\``
          },
          {
            step: 4,
            title: "Step-by-Step Example Walkthrough",
            content: `Let's search for **target = 23** in sorted array:
\`arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\` (Size $N = 10$, indices 0 to 9)

* **Iteration 1**:
  * $low = 0, high = 9$
  * $mid = 0 + (9 - 0) / 2 = 4 \\implies arr[4] = 16$
  * Is $23 == 16$? No. Since $23 > 16$, search right: $low = mid + 1 = 5$.
* **Iteration 2**:
  * $low = 5, high = 9$
  * $mid = 5 + (9 - 5) / 2 = 7 \\implies arr[7] = 56$
  * Is $23 == 56$? No. Since $23 < 56$, search left: $high = mid - 1 = 6$.
* **Iteration 3**:
  * $low = 5, high = 6$
  * $mid = 5 + (6 - 5) / 2 = 5 \\implies arr[5] = 23$
  * Match found! Returns index **5** in just **3 comparisons**!`
          },
          {
            step: 5,
            title: "Complexity Analysis",
            content: `* **Time Complexity**:
  * **Best Case**: $\\mathcal{O}(1)$ (Target is sitting right at the initial middle).
  * **Average Case**: $\\mathcal{O}(\\log n)$.
  * **Worst Case**: $\\mathcal{O}(\\log n)$ (Element not present or found at last step).
* **Space Complexity**:
  * **Iterative Binary Search**: $\\mathcal{O}(1)$ auxiliary memory (only requires 3 index variables).
  * **Recursive Binary Search**: $\\mathcal{O}(\\log n)$ stack space due to recursive call stack.`
          },
          {
            step: 6,
            title: "Common GATE Tricks & Traps",
            content: `> ⚠️ **GATE Trap 1: Integer Overflow in Mid Calculation**
Writing \`mid = (low + high) / 2\` fails when \`low + high\` exceeds $2^{31}-1$ (maximum signed 32-bit int).
Always write \`mid = low + (high - low) / 2\`.

> ⚠️ **GATE Trap 2: Number of Comparisons for Unsuccessful Search**
In an array of $n$ elements, the maximum number of comparisons for an unsuccessful search is:
$$\\lfloor \\log_2 n \\rfloor + 1$$
Example for $n = 10$: $\\lfloor \\log_2 10 \\rfloor + 1 = 3 + 1 = 4$ comparisons.`
          },
          {
            step: 7,
            title: "Quick Practice: Concept Check",
            quiz: [
              {
                id: "bs-q1",
                question: "What is the maximum number of comparisons to search in a sorted array of 128 elements using Binary Search?",
                options: ["7", "8", "14", "64"],
                correctIndex: 1,
                explanation: "For $n = 128 = 2^7$, maximum comparisons for an unsuccessful search is $\\lfloor \\log_2 128 \\rfloor + 1 = 7 + 1 = 8$."
              },
              {
                id: "bs-q2",
                question: "Which of the following is a prerequisite for executing Binary Search on an array?",
                options: ["Array size must be a power of 2", "Elements must be in sorted order", "Array must contain unique elements", "Memory must be dynamically allocated"],
                correctIndex: 1,
                explanation: "Binary Search strictly requires that the array elements are sorted so that comparison with the middle element permits discarding one half."
              }
            ]
          }
        ]
      }
    }
  },
  "coa-pipelining": {
    topicId: "coa-pipelining",
    subjectId: "coa",
    title: "Instruction Pipelining & Hazards",
    subtitle: "Overlapping Execution, Throughput, and Resolving Pipeline Hazards",
    levels: {
      0: {
        badge: "Level 0: Absolute Beginner",
        intro: "Imagine doing your laundry: Wash (30 min) -> Dry (30 min) -> Fold (30 min). If you wait until load 1 is completely washed, dried, and folded before putting load 2 in the washer, 4 loads will take 6 hours. But when load 1 moves to the dryer, you can put load 2 in the washer! That is pipelining: overlapping different stages of different tasks.",
        steps: [
          {
            step: 1,
            title: "What is Instruction Pipelining?",
            content: `A CPU executes each instruction through distinct stages:
1. **IF**: Instruction Fetch
2. **ID**: Instruction Decode & Register Read
3. **EX**: Execution / Effective Address
4. **MEM**: Memory Access
5. **WB**: Write Back to Register

Without pipelining, the CPU is idle most of the time. With pipelining, while Instruction 1 is in **EX**, Instruction 2 is in **ID**, and Instruction 3 is in **IF**!`
          },
          {
            step: 2,
            title: "Why does it work? Clock Cycle & Speedup",
            content: `* **Pipeline Stage Delay**: The clock period $\\tau$ is bounded by the slowest stage plus buffer delay:
$$\\tau = \\max(\\text{stage delays}) + \\text{register delay}$$
* **Time for $n$ instructions on $k$-stage pipeline**:
$$T_{pipe} = [k + (n - 1)] \\times \\tau$$
(The first instruction takes $k$ cycles to fill the pipe; each subsequent instruction finishes 1 cycle later!)
* **Ideal Speedup** over non-pipelined execution:
$$\\text{Speedup } S = \\frac{T_{non-pipe}}{T_{pipe}} = \\frac{n \\times k \\times \\tau}{[k + (n - 1)] \\tau} \\xrightarrow{n \\to \\infty} k$$`
          },
          {
            step: 3,
            title: "The 3 Types of Pipeline Hazards",
            content: `Hazards prevent the next instruction from executing in its designated clock cycle:
1. **Structural Hazard (Resource Conflict)**: Two instructions need the same hardware resource simultaneously (e.g. single memory port for both instruction fetch and data read).
2. **Data Hazard (Data Dependency)**: An instruction depends on the result of a previous instruction that hasn't written back yet (RAW, WAR, WAW).
3. **Control Hazard (Branch Penalty)**: A branch or jump changes the Program Counter, rendering already fetched instructions invalid.`
          },
          {
            step: 4,
            title: "Operand Forwarding: Solving RAW Hazards",
            content: `Consider:
\`\`\`assembly
I1: ADD R1, R2, R3   ; R1 <- R2 + R3 (produced at EX stage)
I2: SUB R4, R1, R5   ; Needs R1 at ID stage
\`\`\`
* Without forwarding: I2 must stall until I1 reaches **WB** (clock cycle 5). Stalls = 2 cycles.
* **With Operand Forwarding**: Hardware routes the output of ALU in cycle 3 directly to the ALU input in cycle 4! **Zero stalls needed!**`
          },
          {
            step: 5,
            title: "Mathematical Formulas for GATE",
            content: `* **Throughput**: Number of instructions completed per unit time:
$$\\text{Throughput} = \\frac{n}{[k + (n - 1) + \\text{Stalls}] \\times \\tau}$$
* **CPI (Cycles Per Instruction)**:
$$\\text{CPI} = 1 + \\text{Average Stalls per Instruction}$$
$$\\text{Speedup} = \\frac{\\text{Non-pipe execution time}}{\\text{Pipe execution time}} = \\frac{k}{\\text{CPI}} \\times \\frac{\\tau_{non-pipe}}{\\tau_{pipe}}$$`
          },
          {
            step: 6,
            title: "Common GATE Traps in Pipelining",
            content: `> ⚠️ **GATE Trap 1: Clock Cycle Time with Stage Delays**
If stage delays are $250\\text{ ps}, 300\\text{ ps}, 200\\text{ ps}, 400\\text{ ps}, 350\\text{ ps}$ and intermediate latch delay is $20\\text{ ps}$, the clock period is:
$$\\tau = \\max(250, 300, 200, 400, 350) + 20 = 400 + 20 = 420\\text{ ps}$$
Students often add all delays together—that is for non-pipelined!

> ⚠️ **GATE Trap 2: Load-Use Hazard Cannot Be Fully Resolved by Forwarding**
A \`LOAD\` instruction produces data only at the end of the **MEM** stage. An immediately following instruction needing that register MUST stall for at least 1 cycle even with forwarding!`
          },
          {
            step: 7,
            title: "Quick Practice: Concept Check",
            quiz: [
              {
                id: "pipe-q1",
                question: "In an ideal 5-stage pipeline with clock period 2 ns, how much time is taken to execute 100 instructions?",
                options: ["1000 ns", "208 ns", "200 ns", "500 ns"],
                correctIndex: 1,
                explanation: "Time = [k + (n - 1)] * tau = [5 + (100 - 1)] * 2 ns = [5 + 99] * 2 = 104 * 2 = 208 ns."
              },
              {
                id: "pipe-q2",
                question: "Which of the following data hazards is the only true dependency in an in-order pipeline?",
                options: ["WAR (Write After Read)", "WAW (Write After Write)", "RAW (Read After Write)", "RAR (Read After Read)"],
                correctIndex: 2,
                explanation: "RAW (Read After Write) is a true data dependency where an instruction depends on a value produced by an earlier instruction."
              }
            ]
          }
        ]
      }
    }
  },
  "os-scheduling": {
    topicId: "os-scheduling",
    subjectId: "os",
    title: "CPU Scheduling Algorithms",
    subtitle: "Gantt Charts, Turnaround Time, Waiting Time, and Starvation",
    levels: {
      0: {
        badge: "Level 0: Absolute Beginner",
        intro: "Suppose a hospital doctor has 5 patients waiting outside. Who should be treated first? The one who arrived first (FCFS)? The one whose treatment takes just 2 minutes so they can leave quickly (SJF)? Or should the doctor give 10 minutes to each patient in a circle (Round Robin)? That is the exact problem an Operating System solves for CPU scheduling.",
        steps: [
          {
            step: 1,
            title: "Basic Definitions You Must Know",
            content: `* **Arrival Time (AT)**: Time when process arrives in the Ready Queue.
* **Burst Time (BT)**: CPU time required by process to complete execution.
* **Completion Time (CT)**: Instant when process finishes execution.
* **Turnaround Time (TAT)**: Total time spent in the system:
  $$\\text{TAT} = \\text{CT} - \\text{AT}$$
* **Waiting Time (WT)**: Time spent sitting in ready queue doing nothing:
  $$\\text{WT} = \\text{TAT} - \\text{BT}$$`
          },
          {
            step: 2,
            title: "The 4 Core Scheduling Algorithms",
            content: `1. **FCFS (First-Come, First-Served)**: Non-preemptive. Simple, but suffers from the **Convoy Effect** (short processes wait behind a massive CPU-heavy process).
2. **SJF (Shortest Job First - Non-preemptive)**: Picks process with smallest burst time. **Gives minimum average waiting time among all non-preemptive algorithms!**
3. **SRTF (Shortest Remaining Time First - Preemptive SJF)**: Preempts current process if a new process arrives with a shorter remaining burst. Gives minimum average waiting time overall!
4. **Round Robin (RR)**: Preemptive based on a fixed **Time Quantum (TQ)**. Fair, excellent response time for interactive systems.`
          },
          {
            step: 3,
            title: "Gantt Chart Construction Walkthrough",
            content: `Consider 3 processes:
* $P_1$: $AT = 0, BT = 8$
* $P_2$: $AT = 1, BT = 4$
* $P_3$: $AT = 2, BT = 2$

#### Under SRTF (Preemptive):
* At $t=0$: Only $P_1$ is here. $P_1$ runs.
* At $t=1$: $P_2$ arrives with $BT=4$. $P_1$ has $8 - 1 = 7$ remaining. Since $4 < 7$, **preempt $P_1$**, run $P_2$!
* At $t=2$: $P_3$ arrives with $BT=2$. $P_2$ has $4 - 1 = 3$ remaining. Since $2 < 3$, **preempt $P_2$**, run $P_3$!
* At $t=4$: $P_3$ finishes ($CT = 4$). Remaining: $P_2 (3), P_1 (7)$. Run $P_2$.
* At $t=7$: $P_2$ finishes ($CT = 7$). Run $P_1$.
* At $t=14$: $P_1$ finishes ($CT = 14$).`
          },
          {
            step: 4,
            title: "Metrics Calculation Table",
            content: `| Process | AT | BT | CT | TAT (CT - AT) | WT (TAT - BT) |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $P_1$ | 0 | 8 | 14 | 14 | 6 |
| $P_2$ | 1 | 4 | 7 | 6 | 2 |
| $P_3$ | 2 | 2 | 4 | 2 | 0 |

* **Average Turnaround Time**: $(14 + 6 + 2) / 3 = 22 / 3 = 7.33$
* **Average Waiting Time**: $(6 + 2 + 0) / 3 = 8 / 3 = 2.67$`
          },
          {
            step: 5,
            title: "Round Robin Quantum Sensitivity",
            content: `* If **Time Quantum (TQ) is very large**: Round Robin degrades into **FCFS**.
* If **Time Quantum (TQ) is very small**: Context switch overhead dominates, drastically reducing CPU throughput.
* Rule of Thumb: Set TQ such that 80% of CPU bursts are shorter than TQ.`
          },
          {
            step: 6,
            title: "Common GATE Traps in CPU Scheduling",
            content: `> ⚠️ **GATE Trap 1: Forgetting Idle CPU Slots**
If the first process arrives at $t = 2$, the CPU is IDLE from $t = 0$ to $t = 2$! Never assume execution begins at $t=0$ if arrival times say otherwise.

> ⚠️ **GATE Trap 2: Starvation in SJF/SRTF**
Long processes can suffer indefinite delay (starvation) if short processes keep arriving. Aging (increasing priority with waiting time) is the standard solution.`
          },
          {
            step: 7,
            title: "Quick Practice: Concept Check",
            quiz: [
              {
                id: "os-q1",
                question: "Which CPU scheduling algorithm guarantees the minimum average waiting time for a given set of processes?",
                options: ["FCFS", "Round Robin", "Shortest Remaining Time First (SRTF)", "Priority Scheduling"],
                correctIndex: 2,
                explanation: "SRTF (preemptive shortest job first) is mathematically proven to produce the minimal average waiting time."
              },
              {
                id: "os-q2",
                question: "What happens in Round Robin scheduling if the time quantum is chosen to be extremely large (larger than the largest burst time)?",
                options: ["It becomes SRTF", "It degrades to FCFS", "Deadlock occurs", "Context switches increase to infinity"],
                correctIndex: 1,
                explanation: "When time quantum is larger than any burst time, each process runs to completion on its first turn, behaving identically to FCFS."
              }
            ]
          }
        ]
      }
    }
  }
};
