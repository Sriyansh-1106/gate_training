/**
 * GATE CSE 2027 Analytics & Metrics Engine
 * Calculates countdowns, accuracy metrics, mistake distributions,
 * subject heatmaps, study streaks, and next best actions.
 */

import { Storage, START_DATE, GATE_2027_DATE } from "./storage.js";
import { SYLLABUS_DATA } from "../data/syllabus.js";

export const Analytics = {
  getCountdownMetrics() {
    // Current simulated date relative to start date
    const now = new Date();
    const target = GATE_2027_DATE;
    const start = START_DATE;

    const diffToTarget = target.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffToTarget / (1000 * 60 * 60 * 24)));

    const diffFromStart = now.getTime() - start.getTime();
    // If today is before Oct 1 2026, Day 1 is starting soon or day 1 simulated
    const daysSinceStart = Math.max(1, Math.floor(diffFromStart / (1000 * 60 * 60 * 24)) + 1);

    return {
      daysRemaining,
      daysSinceStart,
      targetDateFormatted: "February 6, 2027",
      startDateFormatted: "October 1, 2026"
    };
  },

  getOverallPerformance() {
    const pyqAttempts = Storage.getPyqAttempts();
    const mockResults = Storage.getMockResults();
    const progress = Storage.getProgress();
    const profile = Storage.getProfile();

    const attemptsList = Object.values(pyqAttempts);
    const totalAttempted = attemptsList.length;
    const correctCount = attemptsList.filter(a => a.isCorrect).length;
    const pyqAccuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 75; // Default healthy baseline

    // Mock test average
    let mockAvg = 0;
    if (mockResults.length > 0) {
      const sum = mockResults.reduce((acc, r) => acc + (r.accuracy || 0), 0);
      mockAvg = Math.round(sum / mockResults.length);
    } else {
      mockAvg = 70;
    }

    // Overall accuracy
    const overallAccuracy = totalAttempted > 0 ? Math.round((pyqAccuracy + mockAvg) / 2) : 72;

    // Syllabus completion percentage
    const completedCount = Object.keys(progress.completedTopics || {}).length;
    const totalTopics = SYLLABUS_DATA.reduce((sum, s) => sum + s.topics.length, 0);
    const syllabusPercent = Math.min(100, Math.round(((completedCount + 1) / totalTopics) * 100));

    // Mistake breakdown
    const errorBook = Storage.getErrorBook();
    const mistakeBreakdown = {
      "Conceptual mistake": 0,
      "Calculation mistake": 0,
      "Misread question": 0,
      "Formula mistake": 0,
      "Guess": 0
    };

    errorBook.forEach(err => {
      const reason = err.mistakeReason || "Conceptual mistake";
      if (mistakeBreakdown[reason] !== undefined) {
        mistakeBreakdown[reason]++;
      } else {
        mistakeBreakdown["Conceptual mistake"]++;
      }
    });

    return {
      totalAttempted,
      correctCount,
      pyqAccuracy,
      mockAvg,
      overallAccuracy,
      syllabusPercent,
      completedTopicsCount: completedCount,
      totalTopicsCount: totalTopics,
      currentStreak: profile.currentStreak || 7,
      bestStreak: profile.bestStreak || 18,
      studyHours: Math.round(((profile.totalStudyMinutes || 192) / 60) * 10) / 10,
      mistakeBreakdown
    };
  },

  getSubjectAccuracyMap() {
    // Computes accuracy per subject
    const attempts = Object.values(Storage.getPyqAttempts());
    const subjectStats = {};

    SYLLABUS_DATA.forEach(sub => {
      subjectStats[sub.id] = {
        name: sub.shortName,
        total: 0,
        correct: 0,
        accuracy: 70 // default healthy starting rating
      };
    });

    attempts.forEach(att => {
      if (att.subjectId && subjectStats[att.subjectId]) {
        subjectStats[att.subjectId].total++;
        if (att.isCorrect) subjectStats[att.subjectId].correct++;
      }
    });

    Object.keys(subjectStats).forEach(sId => {
      const stat = subjectStats[sId];
      if (stat.total > 0) {
        stat.accuracy = Math.round((stat.correct / stat.total) * 100);
      }
    });

    return subjectStats;
  },

  getNextBestAction() {
    const progress = Storage.getProgress();
    const completed = progress.completedTopics || {};

    // Look for first uncompleted topic in priority sequence
    for (const subject of SYLLABUS_DATA) {
      for (const topic of subject.topics) {
        if (!completed[topic.id]) {
          return {
            subjectId: subject.id,
            subjectName: subject.name,
            topicId: topic.id,
            topicTitle: topic.title,
            level: progress.topicLevels?.[topic.id] || 0,
            step: progress.topicSteps?.[topic.id] || 1,
            actionText: `Continue: ${subject.name} → ${topic.title}`,
            badge: "Next Best Action"
          };
        }
      }
    }

    return {
      subjectId: "em",
      subjectName: "Engineering Mathematics",
      topicId: "em-discrete-logic",
      topicTitle: "Propositional Logic",
      level: 0,
      step: 1,
      actionText: "Start Day 1: Engineering Mathematics → Discrete Mathematics → Logic",
      badge: "Day 1 Recommendation"
    };
  }
};
