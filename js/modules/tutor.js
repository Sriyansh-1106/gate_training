/**
 * GATE CSE 2027 AI Personal Tutor Engine
 * Hybrid Gemini AI + Offline Fallback Architecture
 */

// ── Gemini API State ────────────────────────────────────────────
const GEMINI_MODELS_PRIORITY = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro'
];

let _geminiActiveModel = GEMINI_MODELS_PRIORITY[0];
let _discoveredModels = null;
let _lastDiscoveryKey = null;

const GATE_TUTOR_KEY = 'gate2027_gemini_key';

// ── Gemini Key Manager ──────────────────────────────────────────
export const GeminiKeyManager = {
  getKey() {
    let key = localStorage.getItem(GATE_TUTOR_KEY) || '';
    if (!key) {
      try {
        const coach = JSON.parse(localStorage.getItem('sriyansh_coach_v2') || '{}');
        if (coach && coach.apiKey) key = coach.apiKey;
      } catch (e) {}
    }
    if (!key) {
      key = localStorage.getItem('gemini_api_key') || '';
    }
    return key ? key.trim() : '';
  },
  saveKey(key) {
    if (key && key.trim().length > 8) {
      localStorage.setItem(GATE_TUTOR_KEY, key.trim());
      _discoveredModels = null;
      _lastDiscoveryKey = null;
    }
  },
  clearKey() {
    localStorage.removeItem(GATE_TUTOR_KEY);
    try {
      const coach = JSON.parse(localStorage.getItem('sriyansh_coach_v2') || '{}');
      if (coach && coach.apiKey) {
        delete coach.apiKey;
        localStorage.setItem('sriyansh_coach_v2', JSON.stringify(coach));
      }
    } catch (e) {}
    _discoveredModels = null;
    _lastDiscoveryKey = null;
  },
  hasKey() {
    return this.getKey().length > 8;
  },
  getActiveModel() {
    return _geminiActiveModel;
  }
};

// ── Dynamic Model Discovery ─────────────────────────────────────
export async function discoverGeminiModels(apiKey) {
  const cleanKey = apiKey.trim();
  if (_discoveredModels && _lastDiscoveryKey === cleanKey) return _discoveredModels;
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + cleanKey);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data && data.models)) {
        const supported = data.models
          .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => (m.name || '').replace(/^models\//, ''))
          .filter(name => name && !/embedding|tts|audio|imagen|aqa|whisper/i.test(name));
        if (supported.length > 0) {
          supported.sort((a, b) => {
            const score = n => {
              let s = 0;
              const low = n.toLowerCase();
              if (low.includes('flash')) s += 100;
              if (low.includes('2.0') || low.includes('2.5')) s += 50;
              if (low.includes('lite')) s += 10;
              if (low.includes('pro')) s += 5;
              if (low.includes('exp') || low.includes('preview')) s -= 20;
              return s;
            };
            return score(b) - score(a);
          });
          _discoveredModels = supported;
          _lastDiscoveryKey = cleanKey;
          _geminiActiveModel = supported[0];
          console.log('[GATE Tutor] Models:', supported.slice(0, 3).join(', '));
          return supported;
        }
      }
    }
  } catch (err) { console.warn('[GATE Tutor] Discovery failed:', err.message); }
  return GEMINI_MODELS_PRIORITY;
}

// ── Core Gemini API Call ────────────────────────────────────────
async function callGemini(apiKey, prompt, maxTokens) {
  maxTokens = maxTokens || 1400;
  if (!apiKey || apiKey.trim().length < 8) throw new Error('No API key');
  const cleanKey = apiKey.trim();
  const candidates = _discoveredModels || await discoverGeminiModels(cleanKey);
  const modelsToTry = [_geminiActiveModel].concat(candidates.filter(function(m) { return m !== _geminiActiveModel; }));

  let lastErr = null;
  for (let mi = 0; mi < modelsToTry.length; mi++) {
    const model = modelsToTry[mi];
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + cleanKey;
    for (let attempt = 0; attempt <= 1; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.75, maxOutputTokens: maxTokens }
          })
        });
        if (!res.ok) {
          const errBody = await res.json().catch(function() { return {}; });
          const errMsg = (errBody.error && errBody.error.message) || res.statusText;
          const notFound = res.status === 404 || (res.status === 400 && /model|not supported|not found/i.test(errMsg));
          if (notFound) { lastErr = new Error('Model ' + model + ' not available'); break; }
          if (res.status === 429 && attempt === 0) {
            await new Promise(function(r) { setTimeout(r, 1500); });
            continue;
          }
          throw new Error('Gemini ' + res.status + ': ' + errMsg);
        }
        const data = await res.json();
        const text = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
        if (!text) throw new Error('Empty Gemini response');
        _geminiActiveModel = model;
        return text;
      } catch (err) {
        lastErr = err;
        if (attempt === 0 && err.message.indexOf('not available') < 0) {
          await new Promise(function(r) { setTimeout(r, 700); });
        }
      }
    }
  }
  throw lastErr || new Error('All Gemini models failed');
}

// ── Validate API Key ────────────────────────────────────────────
export async function validateGeminiKey(apiKey) {
  try {
    const models = await discoverGeminiModels(apiKey.trim());
    if (!models || models.length === 0) return false;
    const reply = await callGemini(apiKey, 'Reply with only the word: READY', 15);
    return typeof reply === 'string' && reply.trim().length > 0;
  } catch (err) {
    console.warn('[GATE Tutor] Key validation failed:', err.message);
    return false;
  }
}

// ── System Prompt Builder ───────────────────────────────────────
function buildSystemPrompt(studentLevel, currentTopic, history) {
  const levelDesc = ({
    0: 'absolute beginner with zero prior CS knowledge. Use everyday analogies and avoid jargon.',
    1: 'has basic intuition. Can handle formal definitions and pseudocode.',
    2: 'GATE exam level. Focus on numerical problems, edge cases, and standard GATE patterns.',
    3: 'advanced level. Discuss complex multi-concept proofs and hard corner cases.'
  })[studentLevel] || 'absolute beginner with zero prior CS knowledge.';

  const topicCtx = currentTopic ? ('The student is currently studying: "' + currentTopic + '".') : '';

  let histCtx = '';
  if (history.length > 0) {
    histCtx = '\n\nConversation context:\n' + history.slice(-8).map(function(m) {
      return (m.role === 'user' ? 'Student' : 'Tutor') + ': ' + m.text;
    }).join('\n');
  }

  return 'You are a world-class GATE CSE 2027 personal tutor. Your student is a ' + levelDesc + '\n' +
    topicCtx + '\n\n' +
    'YOUR TEACHING RULES:\n' +
    '1. Match language to student level. Level 0: everyday analogies first, no jargon. Level 2+: formal, precise, GATE-exam focused.\n' +
    '2. Use markdown: **bold** for key terms, bullet points for lists, `code blocks` for C/pseudocode.\n' +
    '3. For mathematics use LaTeX: inline $formula$ and display $$formula$$ (KaTeX renders them automatically).\n' +
    '4. Keep responses 150-350 words unless a detailed worked example is requested.\n' +
    '5. End every response with one short follow-up question to deepen exploration.\n' +
    '6. Highlight GATE-specific traps with a warning emoji when relevant.\n' +
    '7. Stay in the role of a GATE tutor throughout.\n' +
    histCtx +
    '\n\nNow answer the student\'s question below:';
}

// ── Main TutorEngine ────────────────────────────────────────────
export const TutorEngine = {
  conversationHistory: [],

  knowledgeBase: [
    {
      keywords: ['recursion', 'recursive', 'call stack'],
      level0: '**Recursion** is like standing between two mirrors — you see reflections inside reflections. A function solves a small piece of a problem and calls *itself* to solve the rest!\n\n**Golden Rule:** Every recursion MUST have a **Base Case** (the stopping condition). Without it, the function runs forever — Stack Overflow!\n\n> **Analogy:** Russian nesting dolls. Each doll contains a smaller doll until you reach the smallest one — that is the base case!',
      level2: '**GATE focuses on:**\n1. Tracing static vs local variables across recursive stack frames\n2. Converting to recurrence relations — e.g., T(n) = 2T(n/2) + O(n) for Merge Sort\n3. Tail recursion optimization (compiler converts to iterative)\n\n> ⚠️ **GATE Trap:** T(n) = T(n-1) + O(1) → O(n), but T(n) = 2T(n/2) + O(n) → O(n log n)!',
      sampleQuestion: 'Trace this C code: `int f(int n) { if (n <= 1) return 1; return n + f(n-2); }`. What does `f(5)` return?',
      hint: 'f(1)=1, f(3)=3+f(1)=4, f(5)=5+f(3)=9.'
    },
    {
      keywords: ['binary search', 'divide and conquer', 'search sorted'],
      level0: '**Binary Search** is like finding a word in a dictionary. You open to the *middle*, check if your word is before or after, then throw away the half that cannot contain it. Repeat until found!\n\nThis is O(log n) because every step *halves* the search space.',
      level2: '**GATE-specific details:**\n- Use `mid = low + (high - low) / 2` to prevent 32-bit integer overflow (GATE favorite trap!)\n- Unsuccessful search comparisons = $\\lfloor \\log_2 n \\rfloor + 1$\n- Binary Search requires the array to be sorted (the invariant must hold!)',
      sampleQuestion: 'Why does Binary Search need the array to be sorted? What invariant does sorting establish?',
      hint: 'Sorting gives us: if target < A[mid], the target CANNOT exist in A[mid...high]. Without this, we cannot safely discard half the array.'
    },
    {
      keywords: ['pipelining', 'hazards', 'structural hazard', 'data hazard', 'raw', 'waw', 'war', 'branch hazard'],
      level0: '**Pipelining** is an assembly line for the CPU! While Instruction 1 is being executed, Instruction 2 is being decoded, and Instruction 3 is being fetched — all simultaneously!\n\n> Analogy: A car wash — while Car 1 is dried, Car 2 is rinsed, Car 3 is washed.',
      level2: '**Three Hazard Types:**\n1. **Structural**: Two instructions need the same hardware simultaneously\n2. **Data (RAW/WAW/WAR)**: Instruction 2 needs a result Instruction 1 has not written yet\n   - RAW solved by operand forwarding — but NOT for LOAD (1 stall unavoidable!)\n3. **Control**: Branch — CPU does not know what to fetch next\n\n> ⚠️ **GATE Trap:** Can forwarding eliminate ALL stalls? No! LOAD-USE hazard requires 1 mandatory stall!',
      sampleQuestion: 'A 5-stage pipeline has LOAD followed by ADD using the loaded value. How many stall cycles are unavoidable even with operand forwarding?',
      hint: 'LOAD data arrives at end of MEM stage, but ADD needs it at start of EX stage. Exactly 1 stall cycle is unavoidable.'
    },
    {
      keywords: ['cpu scheduling', 'sjf', 'srtf', 'round robin', 'fcfs', 'priority scheduling', 'convoy effect'],
      level0: '**CPU Scheduling** decides which program gets the CPU when multiple programs wait.\n\n- **FCFS**: Bakery queue — first come, first served.\n- **Round Robin**: Rotating door — everyone gets a fixed time slice.\n- **SJF**: Shortest job goes first, minimizing average wait time.',
      level2: '**Key GATE facts:**\n- **SRTF** (Preemptive SJF) gives minimum average waiting time among all algorithms\n- **FCFS Convoy Effect**: A long CPU-bound process makes short I/O-bound processes wait helplessly\n- Average waiting time = $\\frac{\\sum(\\text{Completion} - \\text{Arrival} - \\text{Burst})}{n}$',
      sampleQuestion: 'P1(burst=8, arrive=0), P2(burst=4, arrive=1), P3(burst=2, arrive=2): Calculate average waiting time under non-preemptive SJF.',
      hint: 'Order: P1(0-8), P3(8-10), P2(10-14). Waiting: P1=0, P2=9, P3=6. Average = 5 ms.'
    },
    {
      keywords: ['b-tree', 'b+ tree', 'b+tree', 'indexing', 'database index'],
      level0: '**B+ Tree** is like a multi-level index in a library. The shelf signs (internal nodes) only tell you *which aisle* to go to. The actual books (data records) are neatly lined up on the **bottom shelf (leaf nodes)**, chained for easy browsing.\n\n> Why not BST? Disk access is slow! B+ Tree keeps height tiny (3-4 levels) with 100+ children per node.',
      level2: '**GATE key facts:**\n- Leaf nodes are doubly-linked for ultra-fast range queries (`WHERE age BETWEEN 20 AND 30`)\n- Internal nodes store only *keys and pointers* — never data records\n- Order-m B+ Tree: each internal node has at most m children, at least $\\lceil m/2 \\rceil$ children\n\n> ⚠️ **GATE Trap:** B-Tree stores data at ALL levels. B+ Tree stores data ONLY at leaf nodes!',
      sampleQuestion: 'In a B+ tree of order 5, what is the minimum and maximum number of keys in an internal node?',
      hint: 'Max keys in internal node = m-1 = 4. Min keys = ceil(m/2) - 1 = 2.'
    },
    {
      keywords: ['dijkstra', 'negative weight', 'shortest path', 'bellman ford', 'bellman-ford', 'floyd warshall'],
      level0: '**Dijkstra** is like water spreading from a source — it always explores the nearest unvisited point first.\n\n**Why it fails on negative weights:** Dijkstra assumes once a node is visited, its distance is *finalized forever*. Negative edges can make a longer path actually shorter!',
      level2: '**GATE Algorithm Comparison:**\n\n| Algorithm | Negative Weights | Detects Neg. Cycles | Time |\n|-----------|:-:|:-:|------|\n| Dijkstra | No | No | O((V+E) log V) |\n| Bellman-Ford | Yes | Yes | O(VE) |\n| Floyd-Warshall | Yes | Yes | O(V³) |\n\n> ⚠️ **GATE Trap:** Bellman-Ford relaxes all edges V-1 times. If relaxation still possible on V-th pass → negative cycle!',
      sampleQuestion: 'Why can Dijkstra give wrong answers with negative edge weights? Construct a 3-node counterexample.',
      hint: 'A→B (weight 2), A→C (weight 3), C→B (weight -3). Dijkstra finalizes dist[B]=2, but true shortest path A→C→B has cost 0.'
    },
    {
      keywords: ['normalization', '1nf', '2nf', '3nf', 'bcnf', 'functional dependency', 'lossless decomposition'],
      level0: '**Normalization** organizes a database to eliminate data redundancy.\n\n**4 Normal Forms:**\n- **1NF**: Atomic values, no repeating groups\n- **2NF**: No partial dependency on primary key\n- **3NF**: No transitive dependency\n- **BCNF**: For every X → Y, X must be a superkey (strictest)',
      level2: '**GATE-critical rules:**\n- **Lossless decomposition**: Required — natural join must give back original table\n- **Dependency preservation**: Preferred but sometimes sacrificed for BCNF\n- BCNF vs 3NF: BCNF is stricter; sometimes we stay at 3NF to preserve all FDs\n\n> ⚠️ **GATE Trap:** BCNF always gives lossless decomposition, but may NOT preserve all FDs!',
      sampleQuestion: 'R(A, B, C, D) with FDs: A → B, B → C, C → D. Is R in 3NF? In BCNF? What is the canonical key?',
      hint: 'Canonical key is A. R is NOT in 3NF because of transitive dependency A → B → C. B and C are non-prime attributes.'
    },
    {
      keywords: ['turing machine', 'decidability', 'halting problem', 'undecidable', 'regular language', 'context free'],
      level0: '**Turing Machine** is the theoretical model of any computer — a tape with a head that reads/writes symbols.\n\n**Halting Problem:** Can a program tell if another program will ever stop? Alan Turing proved this is **mathematically impossible** — it is undecidable!',
      level2: '**TOC Hierarchy for GATE:**\n- **Recursive (Decidable)**: TM always halts and answers yes/no\n- **Recursively Enumerable (Semi-decidable)**: TM halts on acceptance, may loop on rejection\n- **Undecidable**: No TM can solve it (Halting Problem, PCP)\n\n> ⚠️ **GATE Trap:** L is decidable if and only if both L and its complement are RE!',
      sampleQuestion: 'Is {<M> | M is a TM that accepts at least one string} decidable, semi-decidable, or undecidable? Justify.',
      hint: 'Semi-decidable (RE). We can enumerate all strings and run M on each — if M ever accepts, we say yes. But if M accepts nothing, we loop forever and cannot say no.'
    },
    {
      keywords: ['avl tree', 'avl', 'balanced bst', 'rotation', 'll rotation', 'rr rotation', 'lr rotation', 'rl rotation'],
      level0: '**AVL Tree** is a self-balancing BST. After every insert or delete, it checks if the tree became lopsided. If height difference between left and right subtrees exceeds 1, it performs a **rotation** to fix the balance!\n\n> Without balancing, BST degenerates to a linked list → O(n) search instead of O(log n).',
      level2: '**Balance Factor** = height(left) - height(right) — must be -1, 0, or 1 for every node.\n\n**4 Rotation Cases:**\n| Imbalance | Rotation |\n|-----------|----------|\n| LL (Left-Left heavy) | Single Right Rotation |\n| RR (Right-Right heavy) | Single Left Rotation |\n| LR (Left-Right heavy) | Left Rotation then Right Rotation |\n| RL (Right-Left heavy) | Right Rotation then Left Rotation |\n\n> ⚠️ **GATE Trap:** Insertion needs at most O(1) rotations. Deletion may need O(log n) rotations!',
      sampleQuestion: 'Insert keys 10, 20, 30 into an empty AVL tree. Show all rotations performed.',
      hint: 'After inserting 10, 20, 30: balance factor at 10 becomes -2 (RR imbalance). Single Left Rotation at 10. Result: 20 is root, 10 is left child, 30 is right child.'
    }
  ],

  async generateAIResponse(userQuery, studentLevel, currentTopic) {
    const apiKey = GeminiKeyManager.getKey();
    if (!apiKey) throw new Error('No API key');
    const sysPrompt = buildSystemPrompt(studentLevel, currentTopic, this.conversationHistory);
    const fullPrompt = sysPrompt + '\n\nStudent: ' + userQuery + '\n\nTutor:';
    const rawText = await callGemini(apiKey, fullPrompt, 1400);
    this.conversationHistory.push({ role: 'user', text: userQuery });
    this.conversationHistory.push({ role: 'tutor', text: rawText });
    if (this.conversationHistory.length > 20) this.conversationHistory = this.conversationHistory.slice(-16);
    return rawText.trim();
  },

  generateOfflineResponse(userQuery, studentLevel, currentTopic) {
    const q = userQuery.toLowerCase().trim();
    if (/test me|quiz me|give me a question|practice question/.test(q)) return this.generatePracticeChallenge(q, currentTopic);
    if (/hint|nudge|clue/.test(q)) return this.generateHint(q, currentTopic);
    for (const item of this.knowledgeBase) {
      if (item.keywords.some(function(k) { return q.includes(k); })) {
        const content = studentLevel <= 1 ? item.level0 : item.level2;
        return '🧑‍💻 **GATE Tutor:**\n\n' + content + '\n\n💬 *Want to test yourself? Ask: "Test me on this!"*';
      }
    }
    return '🧑‍💻 **GATE Tutor:**\n\nGreat question about **"' + userQuery + '"**!\n\nIn GATE CSE, this topic typically involves:\n1. The **formal mathematical definition** and key invariants\n2. **Best/worst/average-case complexity** analysis\n3. **Edge cases** that appear in GATE questions\n\n💡 *Enable Gemini AI (use the ⚙ icon in the tutor) for deep, personalized explanations on any GATE topic!*\n\nAsk: *"Explain this like I am a beginner"*';
  },

  async generateResponse(userQuery, studentLevel, currentTopic) {
    studentLevel = studentLevel || 0;
    currentTopic = currentTopic || '';
    const apiKey = GeminiKeyManager.getKey();
    if (apiKey && apiKey.trim().length > 8) {
      try {
        const aiReply = await this.generateAIResponse(userQuery, studentLevel, currentTopic);
        return { text: aiReply, source: 'ai', model: _geminiActiveModel };
      } catch (err) {
        console.warn('[GATE Tutor] Gemini failed, using offline KB:', err.message);
        const fallback = this.generateOfflineResponse(userQuery, studentLevel, currentTopic);
        return { text: fallback, source: 'offline', error: err.message };
      }
    }
    return { text: this.generateOfflineResponse(userQuery, studentLevel, currentTopic), source: 'offline' };
  },

  generatePracticeChallenge(query, currentTopic) {
    for (const item of this.knowledgeBase) {
      if (item.keywords.some(function(k) { return query.includes(k); })) {
        return '🏆 **Quick Concept Check:**\n\n' + item.sampleQuestion + '\n\n*Think carefully! When you have an answer, ask: "What is the hint?"*';
      }
    }
    return '🏆 **Quick Concept Check:**\n\nIn a **strict binary tree** with $N$ leaf nodes, how many internal nodes exist?\n\n> Hint: Use $N_2 = N_0 - 1$.';
  },

  generateHint(query, currentTopic) {
    for (const item of this.knowledgeBase) {
      if (item.keywords.some(function(k) { return query.includes(k); })) {
        if (item.hint) return '💡 **Hint:** ' + item.hint;
      }
    }
    return '💡 **Hint:** Break the problem into sub-cases. Consider extreme values (n=0, n=1) and trace the algorithm manually on a small 3-4 element example. Look for the invariant that must hold at every step!';
  },

  clearHistory() { this.conversationHistory = []; }
};
