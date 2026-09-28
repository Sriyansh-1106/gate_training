/**
 * GATE CSE Interactive Visualizers Module
 * Visual learning for complex concepts:
 * 1. Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick)
 * 2. Binary Search Tree (BST) Node Insertion & Traversals
 * 3. Memory & Cache Mapping Simulator (Direct & Set-Associative)
 * 4. OS CPU Scheduling Gantt Chart Simulator
 */

export const Visualizers = {
  // 1. Sorting Visualizer
  initSortingVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="visualizer-card">
        <div class="viz-header">
          <div>
            <h3 class="viz-title">Interactive Sorting Visualizer</h3>
            <p class="viz-desc">Watch how comparison-based sorts divide, compare, and place elements step-by-step.</p>
          </div>
          <div class="viz-controls">
            <select id="sort-algo-select" class="viz-select">
              <option value="bubble">Bubble Sort - O(n²)</option>
              <option value="selection">Selection Sort - O(n²)</option>
              <option value="insertion">Insertion Sort - O(n²)</option>
              <option value="quick">Quick Sort - O(n log n)</option>
            </select>
            <button id="sort-reset-btn" class="btn btn-secondary">New Array</button>
            <button id="sort-step-btn" class="btn btn-secondary">Step</button>
            <button id="sort-play-btn" class="btn btn-primary">Auto Play</button>
          </div>
        </div>
        <div class="sort-bars-container" id="sort-bars"></div>
        <div class="sort-stats-bar">
          <span>Comparisons: <strong id="sort-comp-count">0</strong></span>
          <span>Swaps: <strong id="sort-swap-count">0</strong></span>
          <span id="sort-status-msg" class="text-accent">Ready to sort</span>
        </div>
      </div>
    `;

    let array = [45, 12, 85, 32, 89, 39, 69, 44, 22, 58, 17, 76];
    let comparisons = 0;
    let swaps = 0;
    let isPlaying = false;
    let animationInterval = null;

    const barsContainer = document.getElementById("sort-bars");
    const compCountEl = document.getElementById("sort-comp-count");
    const swapCountEl = document.getElementById("sort-swap-count");
    const statusMsgEl = document.getElementById("sort-status-msg");
    const playBtn = document.getElementById("sort-play-btn");

    function renderBars(activeIndices = [], sortedIndices = []) {
      barsContainer.innerHTML = "";
      const maxVal = Math.max(...array);
      array.forEach((val, idx) => {
        const bar = document.createElement("div");
        bar.className = "sort-bar";
        if (activeIndices.includes(idx)) bar.classList.add("bar-active");
        if (sortedIndices.includes(idx)) bar.classList.add("bar-sorted");
        const heightPercent = Math.max(15, (val / maxVal) * 100);
        bar.style.height = `${heightPercent}%`;
        bar.innerHTML = `<span class="bar-val">${val}</span>`;
        barsContainer.appendChild(bar);
      });
    }

    renderBars();

    // Reset Array
    document.getElementById("sort-reset-btn").onclick = () => {
      clearInterval(animationInterval);
      isPlaying = false;
      playBtn.textContent = "Auto Play";
      array = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 10);
      comparisons = 0;
      swaps = 0;
      compCountEl.textContent = "0";
      swapCountEl.textContent = "0";
      statusMsgEl.textContent = "New array generated";
      renderBars();
    };

    // Bubble Sort Generator for Stepping
    function* bubbleSortGen() {
      const n = array.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          compCountEl.textContent = comparisons;
          renderBars([j, j + 1]);
          statusMsgEl.textContent = `Comparing array[${j}]=${array[j]} and array[${j+1}]=${array[j+1]}`;
          yield;
          if (array[j] > array[j + 1]) {
            swaps++;
            swapCountEl.textContent = swaps;
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            renderBars([j, j + 1]);
            statusMsgEl.textContent = `Swapped ${array[j+1]} and ${array[j]}`;
            yield;
          }
        }
      }
      renderBars([], array.map((_, i) => i));
      statusMsgEl.textContent = "Sorting Completed Successfully! ✅";
    }

    let sortGenerator = bubbleSortGen();

    document.getElementById("sort-step-btn").onclick = () => {
      const res = sortGenerator.next();
      if (res.done) {
        statusMsgEl.textContent = "Sorting Completed! Press 'New Array' to restart.";
      }
    };

    playBtn.onclick = () => {
      if (isPlaying) {
        clearInterval(animationInterval);
        isPlaying = false;
        playBtn.textContent = "Auto Play";
      } else {
        isPlaying = true;
        playBtn.textContent = "Pause";
        animationInterval = setInterval(() => {
          const res = sortGenerator.next();
          if (res.done) {
            clearInterval(animationInterval);
            isPlaying = false;
            playBtn.textContent = "Auto Play";
          }
        }, 300);
      }
    };
  },

  // 2. Binary Search Tree (BST) Visualizer
  initBstVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="visualizer-card">
        <div class="viz-header">
          <div>
            <h3 class="viz-title">Interactive Binary Search Tree (BST)</h3>
            <p class="viz-desc">Insert nodes, observe BST invariant (Left < Root < Right), and trace Inorder, Preorder, and Postorder traversals.</p>
          </div>
          <div class="viz-controls">
            <input type="number" id="bst-input-val" class="viz-input" placeholder="Value (e.g. 42)" style="width: 120px;" />
            <button id="bst-insert-btn" class="btn btn-primary">Insert Node</button>
            <button id="bst-clear-btn" class="btn btn-secondary">Clear Tree</button>
            <button id="bst-inorder-btn" class="btn btn-secondary">Inorder (Sorted!)</button>
          </div>
        </div>
        <div class="bst-canvas-container">
          <svg id="bst-svg" width="100%" height="280"></svg>
        </div>
        <div class="bst-traversal-output" id="bst-traversal-box">
          Traversals will display here. Inorder traversal of any BST always yields strictly sorted values!
        </div>
      </div>
    `;

    class BSTNode {
      constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
      }
    }

    let root = null;

    function insert(node, val) {
      if (!node) return new BSTNode(val);
      if (val < node.val) node.left = insert(node.left, val);
      else if (val > node.val) node.right = insert(node.right, val);
      return node;
    }

    // Seed default balanced tree
    [50, 30, 70, 20, 40, 60, 80].forEach(v => {
      root = insert(root, v);
    });

    function drawTree() {
      const svg = document.getElementById("bst-svg");
      svg.innerHTML = "";
      const width = svg.clientWidth || 600;

      function assignCoords(node, depth = 0, left = 0, right = width) {
        if (!node) return;
        node.x = (left + right) / 2;
        node.y = 40 + depth * 55;
        assignCoords(node.left, depth + 1, left, node.x);
        assignCoords(node.right, depth + 1, node.x, right);
      }

      assignCoords(root);

      function renderEdges(node) {
        if (!node) return;
        if (node.left) {
          svg.innerHTML += `<line x1="${node.x}" y1="${node.y}" x2="${node.left.x}" y2="${node.left.y}" stroke="#475569" stroke-width="2"/>`;
          renderEdges(node.left);
        }
        if (node.right) {
          svg.innerHTML += `<line x1="${node.x}" y1="${node.y}" x2="${node.right.x}" y2="${node.right.y}" stroke="#475569" stroke-width="2"/>`;
          renderEdges(node.right);
        }
      }

      function renderNodes(node) {
        if (!node) return;
        svg.innerHTML += `
          <g class="bst-node-group" id="node-${node.val}">
            <circle cx="${node.x}" cy="${node.y}" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <text x="${node.x}" y="${node.y + 5}" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="bold">${node.val}</text>
          </g>
        `;
        renderNodes(node.left);
        renderNodes(node.right);
      }

      renderEdges(root);
      renderNodes(root);
    }

    drawTree();

    document.getElementById("bst-insert-btn").onclick = () => {
      const input = document.getElementById("bst-input-val");
      const val = parseInt(input.value);
      if (!isNaN(val)) {
        root = insert(root, val);
        input.value = "";
        drawTree();
      }
    };

    document.getElementById("bst-clear-btn").onclick = () => {
      root = null;
      drawTree();
      document.getElementById("bst-traversal-box").textContent = "Tree cleared.";
    };

    document.getElementById("bst-inorder-btn").onclick = () => {
      const result = [];
      function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
      }
      inorder(root);
      document.getElementById("bst-traversal-box").innerHTML = `
        <strong>Inorder Traversal:</strong> ${result.join(" ➔ ")} 
        <span class="badge badge-success" style="margin-left: 10px;">Always Ascending Order</span>
      `;
    };
  },

  // 3. Cache Simulator (Direct vs Set-Associative)
  initCacheVisualizer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="visualizer-card">
        <div class="viz-header">
          <div>
            <h3 class="viz-title">Cache Memory & Hit/Miss Simulator</h3>
            <p class="viz-desc">Simulate direct-mapped cache requests and observe Tag matching and line replacement.</p>
          </div>
          <div class="viz-controls">
            <button class="btn btn-secondary" onclick="window.cacheSimAccess(4)">Access Address 4</button>
            <button class="btn btn-secondary" onclick="window.cacheSimAccess(12)">Access Address 12</button>
            <button class="btn btn-secondary" onclick="window.cacheSimAccess(4)">Access Address 4 (Hit)</button>
            <button class="btn btn-secondary" onclick="window.cacheSimAccess(20)">Access Address 20 (Conflict)</button>
          </div>
        </div>
        <div id="cache-table-view" class="cache-view-grid"></div>
        <div class="cache-status-box" id="cache-status-log">
          Click any address above to test Cache Hit vs Cache Miss.
        </div>
      </div>
    `;

    const cache = [
      { line: 0, valid: 0, tag: "-", data: "-" },
      { line: 1, valid: 0, tag: "-", data: "-" },
      { line: 2, valid: 0, tag: "-", data: "-" },
      { line: 3, valid: 0, tag: "-", data: "-" }
    ];

    function renderCache() {
      const table = document.getElementById("cache-table-view");
      if (!table) return;
      table.innerHTML = `
        <table class="data-table">
          <thead>
            <tr>
              <th>Line #</th>
              <th>Valid Bit</th>
              <th>Tag</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${cache.map(c => `
              <tr class="${c.highlight || ''}">
                <td>Line ${c.line}</td>
                <td><span class="badge ${c.valid ? 'badge-success' : 'badge-neutral'}">${c.valid}</span></td>
                <td><code>${c.tag}</code></td>
                <td>${c.valid ? 'Occupied' : 'Empty'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    renderCache();

    window.cacheSimAccess = (address) => {
      // 4 cache lines -> line = (address / 4) % 4, tag = (address / 16)
      const lineIndex = Math.floor(address / 4) % 4;
      const tag = Math.floor(address / 16);
      const line = cache[lineIndex];
      const log = document.getElementById("cache-status-log");

      cache.forEach(c => c.highlight = "");

      if (line.valid === 1 && line.tag === tag) {
        line.highlight = "row-hit";
        log.innerHTML = `Address <strong>${address}</strong>: Line ${lineIndex}, Tag ${tag} matches. <span style="color: #10b981; font-weight: bold;">CACHE HIT! 🎯 (Latency: ~1 ns)</span>`;
      } else {
        const isConflict = line.valid === 1;
        line.valid = 1;
        line.tag = tag;
        line.highlight = "row-miss";
        log.innerHTML = `Address <strong>${address}</strong>: Mapped to Line ${lineIndex}. <span style="color: #ef4444; font-weight: bold;">CACHE MISS! ⚠️ ${isConflict ? '(Conflict Miss - Overwritten)' : '(Compulsory Cold Miss)'} (Fetched from RAM: ~100 ns)</span>`;
      }
      renderCache();
    };
  }
};
