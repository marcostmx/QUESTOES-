#!/bin/bash
sed -i '35i \
try { \
    const srsClean = JSON.parse(localStorage.getItem("pr1_srs") || "{}"); \
    let changed = false; \
    Object.keys(srsClean).forEach(subj => { \
        if (typeof srsClean[subj] === "object") { \
            Object.keys(srsClean[subj]).forEach(qIdx => { \
                const q = srsClean[subj][qIdx]; \
                if (q && (isNaN(q.nextReview) || q.nextReview === null || typeof q.level !== "number" || isNaN(q.level))) { \
                    q.nextReview = Date.now(); \
                    q.level = 0; \
                    changed = true; \
                } \
            }); \
        } \
    }); \
    if (changed) localStorage.setItem("pr1_srs", JSON.stringify(srsClean)); \
} catch(e) {}\
' src/main.tsx
