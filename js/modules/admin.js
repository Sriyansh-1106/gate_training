/**
 * GATE CSE 2027 Admin / Content Studio Module
 * Allows instructors and students to add, update, and manage
 * PYQs, custom lessons, practice questions, and formulas with live KaTeX preview.
 */

import { Storage } from "./storage.js";
import { PYQ_DATABASE } from "../data/pyqs.js";
import { FORMULA_DATABASE } from "../data/formulas.js";
import { SYLLABUS_DATA } from "../data/syllabus.js";

export const AdminStudio = {
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="admin-studio-card">
        <div class="admin-header">
          <div>
            <h2>Admin & Content Management Studio</h2>
            <p class="text-secondary">Add new GATE PYQs, practice items, formulas, and export/import curriculum data without code modifications.</p>
          </div>
          <div class="admin-quick-actions">
            <button id="admin-export-btn" class="btn btn-secondary">💾 Export Backup (JSON)</button>
            <label class="btn btn-secondary file-upload-btn">
              📥 Import Backup (JSON)
              <input type="file" id="admin-import-file" style="display: none;" accept=".json" />
            </label>
          </div>
        </div>

        <div class="admin-tabs">
          <button class="admin-tab active" data-target="admin-add-pyq">Add Authentic GATE PYQ</button>
          <button class="admin-tab" data-target="admin-add-formula">Add Formula / Theorem</button>
          <button class="admin-tab" data-target="admin-manage-data">Database Overview</button>
        </div>

        <!-- Tab 1: Add PYQ -->
        <div class="admin-panel active" id="admin-add-pyq">
          <form id="add-pyq-form" class="admin-form">
            <div class="form-row">
              <div class="form-group">
                <label>Subject</label>
                <select id="pyq-subject-select" class="form-control" required>
                  ${SYLLABUS_DATA.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Exam / Year</label>
                <input type="text" id="pyq-exam-name" class="form-control" placeholder="e.g. GATE CSE 2025" required />
              </div>
              <div class="form-group">
                <label>Question Type</label>
                <select id="pyq-type-select" class="form-control">
                  <option value="MCQ">MCQ (Single Choice)</option>
                  <option value="MSQ">MSQ (Multiple Select)</option>
                  <option value="NAT">NAT (Numerical Answer)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Marks</label>
                <input type="number" id="pyq-marks" class="form-control" value="2" min="1" max="2" />
              </div>
            </div>

            <div class="form-group">
              <label>Question Statement (Supports Markdown & KaTeX formulas like $O(n \\log n)$)</label>
              <textarea id="pyq-question-text" rows="4" class="form-control" placeholder="Enter question description..." required></textarea>
            </div>

            <div class="form-row" id="pyq-options-row">
              <div class="form-group">
                <label>Option A</label>
                <input type="text" id="pyq-opt-a" class="form-control" placeholder="Option A text" />
              </div>
              <div class="form-group">
                <label>Option B</label>
                <input type="text" id="pyq-opt-b" class="form-control" placeholder="Option B text" />
              </div>
              <div class="form-group">
                <label>Option C</label>
                <input type="text" id="pyq-opt-c" class="form-control" placeholder="Option C text" />
              </div>
              <div class="form-group">
                <label>Option D</label>
                <input type="text" id="pyq-opt-d" class="form-control" placeholder="Option D text" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Official Correct Answer</label>
                <input type="text" id="pyq-correct-ans" class="form-control" placeholder="e.g. 0 for A, or 42 for NAT" required />
              </div>
              <div class="form-group">
                <label>Difficulty</label>
                <select id="pyq-diff-select" class="form-control">
                  <option value="Easy">Easy (Level 1)</option>
                  <option value="Medium">Medium (Level 2)</option>
                  <option value="Hard">Hard (Level 3)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Detailed Step-by-Step Explanation & Common Trap</label>
              <textarea id="pyq-explanation-text" rows="3" class="form-control" placeholder="Explain the official solution and common traps to avoid..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Publish Question to Database</button>
          </form>
        </div>

        <!-- Tab 2: Add Formula -->
        <div class="admin-panel hidden" id="admin-add-formula">
          <form id="add-formula-form" class="admin-form">
            <div class="form-row">
              <div class="form-group">
                <label>Subject</label>
                <select id="formula-subject-select" class="form-control">
                  ${SYLLABUS_DATA.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Formula Title</label>
                <input type="text" id="formula-title" class="form-control" placeholder="e.g. Master Theorem Case 2" required />
              </div>
            </div>
            <div class="form-group">
              <label>KaTeX Mathematical Formula</label>
              <input type="text" id="formula-math" class="form-control" placeholder="e.g. T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)" required />
            </div>
            <div class="form-group">
              <label>When to use & Common Trap</label>
              <textarea id="formula-desc" rows="2" class="form-control" placeholder="Describe application conditions and traps..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save Formula</button>
          </form>
        </div>

        <!-- Tab 3: Database Overview -->
        <div class="admin-panel hidden" id="admin-manage-data">
          <div class="db-summary-grid">
            <div class="db-stat-box">
              <h3>${PYQ_DATABASE.length}</h3>
              <p>Active GATE PYQs</p>
            </div>
            <div class="db-stat-box">
              <h3>${FORMULA_DATABASE.length}</h3>
              <p>Formulas & Theorems</p>
            </div>
            <div class="db-stat-box">
              <h3>${SYLLABUS_DATA.length}</h3>
              <p>Subjects Configured</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Tab switching
    document.querySelectorAll(".admin-tab").forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".admin-panel").forEach(p => p.classList.add("hidden"));
        tab.classList.add("active");
        const targetId = tab.getAttribute("data-target");
        document.getElementById(targetId)?.classList.remove("hidden");
      };
    });

    // Handle Add PYQ
    const pyqForm = document.getElementById("add-pyq-form");
    if (pyqForm) {
      pyqForm.onsubmit = (e) => {
        e.preventDefault();
        const subjectId = document.getElementById("pyq-subject-select").value;
        const examName = document.getElementById("pyq-exam-name").value;
        const type = document.getElementById("pyq-type-select").value;
        const marks = parseInt(document.getElementById("pyq-marks").value) || 2;
        const questionText = document.getElementById("pyq-question-text").value;
        const optA = document.getElementById("pyq-opt-a").value;
        const optB = document.getElementById("pyq-opt-b").value;
        const optC = document.getElementById("pyq-opt-c").value;
        const optD = document.getElementById("pyq-opt-d").value;
        const rawAns = document.getElementById("pyq-correct-ans").value;
        const diff = document.getElementById("pyq-diff-select").value;
        const exp = document.getElementById("pyq-explanation-text").value;

        const newQ = {
          id: "custom-pyq-" + Date.now(),
          isAuthenticPYQ: true,
          exam: examName,
          subjectId,
          type,
          marks,
          negativeMarks: type === "MCQ" ? (marks === 1 ? 0.33 : 0.66) : 0,
          difficulty: diff,
          question: questionText,
          options: type !== "NAT" ? [optA, optB, optC, optD] : [],
          correctAnswer: type === "NAT" ? parseFloat(rawAns) : parseInt(rawAns),
          explanation: {
            stepByStep: exp,
            whyCorrect: "Based on official standard definition.",
            conceptTested: "Custom Added Topic"
          }
        };

        PYQ_DATABASE.unshift(newQ);
        alert("✅ Success! Question added to active question bank.");
        pyqForm.reset();
      };
    }

    // Handle Export
    document.getElementById("admin-export-btn").onclick = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(Storage.exportDatabaseJSON());
      const dlAnchor = document.createElement("a");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `gate_cse_2027_backup_${new Date().toISOString().split("T")[0]}.json`);
      dlAnchor.click();
    };

    // Handle Import
    const importInput = document.getElementById("admin-import-file");
    if (importInput) {
      importInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const success = Storage.importDatabaseJSON(event.target.result);
            if (success) {
              alert("✅ Curriculum data and progress restored successfully!");
              window.location.reload();
            } else {
              alert("❌ Failed to parse backup file.");
            }
          };
          reader.readAsText(file);
        }
      };
    }
  }
};
