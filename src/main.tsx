
function sortQuestionsByType(arr: any[]): any[] {
    const multipleChoice = arr.filter(q => {
        if (!q) return false;
        const type = (q.type || '').toUpperCase();
        const intType = (q.interactionType || '').toLowerCase();
        const isDiscursive = type.includes('DISCURSIVA') || intType === 'textarea' || (!q.options || q.options.length === 0);
        return !isDiscursive;
    });
    const discursive = arr.filter(q => {
        if (!q) return false;
        const type = (q.type || '').toUpperCase();
        const intType = (q.interactionType || '').toLowerCase();
        const isDiscursive = type.includes('DISCURSIVA') || intType === 'textarea' || (!q.options || q.options.length === 0);
        return isDiscursive;
    });
    return [...multipleChoice, ...discursive];
}
import './index.css';
import { jsPDF } from "jspdf";
import { toCanvas } from "html-to-image";
import { renderResultsChart, renderEvolutionChart, logDailyAnswer } from './ResultsChart';
import confetti from "canvas-confetti";
import {
    loginWithGoogle,
    logoutUser,
    syncNow,
    scheduleAutoSync,
    resetSubjectProgress as resetSubjectProgressInCloud,
    resetAllProgressGlobally,
    enforceGlobalCleanSlateIfNeeded,
    exportBackupJSON,
    importBackupJSON,
    onSyncAuthChange,
    onSyncStatusChange
} from './syncService';
import { getAcademicDisciplines } from './academicData';
import { getLocalDriveMaterials, saveLocalDriveMaterials, fetchDriveMaterialsRecursively } from './driveService';
import { renderAcademicLibraryView, setupHorizontalScroll } from './libraryUi';
import { renderDisciplineDetailView } from './disciplineUi';
import { renderLessonDetailView, findLessonById } from './lessonUi';
import { renderErrorNotebookView, addErrorToNotebook, getErrorNotebook, saveErrorNotebook } from './errorNotebookUi';
import { renderOrganizeMaterialsModal } from './academicUi';
import { SubjectId } from './types';

export function showToast(message: string, duration = 3500) {
    const existing = document.getElementById('app-global-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'app-global-toast';
    toast.className = 'app-toast bg-gray-900/95 text-white px-5 py-3 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-md flex items-center space-x-3 text-sm font-semibold';
    toast.innerHTML = `
        <svg class="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => toast.classList.add('show'));
    } else {
        toast.classList.add('show');
    }
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
    }, duration);
}
import { q1 } from './q1';
import { q2 } from './q2';
import { q3 } from './q3';
import { q4 } from './q4';
import { fisio176All } from './fisio_176_all';
import { pdfPropedeuticaQuestions, pdfFisiopatologiaQuestions } from './provas_anteriores_pdf';
function isValidQuestion(q: any): boolean {
    return Boolean(q && typeof q.text === 'string' && q.text.trim().length > 0);
}

// Emulate databases for all subjects - 100% of authentic questions restored
const fisiopatologiaQuestionsRaw = [...q1, ...q2, ...q3, ...q4, ...fisio176All, ...pdfFisiopatologiaQuestions].filter(isValidQuestion);
import { farmaco_1_15 } from "./farmaco_1_15";
import { farmaco_16_30 } from "./farmaco_16_30";
import { farmaco_31_45 } from "./farmaco_31_45";
import { farmaco_40_55 } from "./farmaco_40_55";
import { farmaco_56_70 } from "./farmaco_56_70";
import { farmaco_71_81 } from "./farmaco_71_81";
import { farmaco_82_100 } from "./farmaco_82_100";
import { farmaco_prova_11q } from "./farmaco_prova_11q";
const farmacologiaQuestionsRaw: any[] = [
    ...farmaco_1_15,
    ...farmaco_16_30,
    ...farmaco_31_45,
    ...farmaco_40_55,
    ...farmaco_56_70,
    ...farmaco_71_81,
    ...farmaco_82_100,
    ...farmaco_prova_11q
].filter(isValidQuestion);
import { propedeutica } from "./propedeutica";
import { q11_40 } from "./q11_40";
import { q41_70 } from "./q41_70";
import { q71_100 } from "./q71_100";
const propedeuticaQuestionsRaw = [...propedeutica, ...q11_40, ...q41_70, ...q71_100, ...pdfPropedeuticaQuestions].filter(isValidQuestion);
import { basesCirurgicas } from './bc_all';
const basesCirurgicasQuestions = sortQuestionsByType([...basesCirurgicas].filter(isValidQuestion));
import { iescIvQuestions } from './iesc_iv_50q';
const iescIvQuestionsAll = sortQuestionsByType([...iescIvQuestions].filter(isValidQuestion));

// Deterministic shuffle permutations and reverse mappings for all subjects
const FARMACO_NEW_ORDER: number[] = [
    75, 50, 17, 35, 70, 11, 68, 34, 22, 51, 4, 67, 21, 40, 13, 55, 2, 32, 57, 23, 7, 8, 46, 66, 19, 24, 10, 74, 62, 14, 39, 33, 20, 53, 12, 60, 72, 6, 29, 73, 47, 42, 15, 36, 48, 65, 30, 16, 25, 0, 54, 44, 64, 71, 38, 26, 18, 31, 27, 69, 58, 56, 61, 59, 28, 45, 5, 63, 49, 3, 52, 43, 41, 37, 9, 76, 1,
    ...Array.from({ length: 546 }, (_, i) => 77 + i)
];
const FARMACO_OLD_TO_NEW: number[] = [
    49, 76, 16, 69, 10, 66, 37, 20, 21, 74, 26, 5, 34, 14, 29, 42, 47, 2, 56, 24, 32, 12, 8, 19, 25, 48, 55, 58, 64, 38, 46, 57, 17, 31, 7, 3, 43, 73, 54, 30, 13, 72, 41, 71, 51, 65, 22, 40, 44, 68, 1, 9, 70, 33, 50, 15, 61, 18, 60, 63, 35, 62, 28, 67, 52, 45, 23, 11, 6, 59, 4, 53, 36, 39, 27, 0, 75,
    ...Array.from({ length: 546 }, (_, i) => 77 + i)
];

import { PROP_NEW_ORDER, PROP_OLD_TO_NEW } from "./propedeutica_order";

const FISIO_NEW_ORDER: number[] = [
    40, 68, 43, 14, 25, 33, 57, 18, 58, 45, 7, 75, 9, 13, 6, 70, 64, 50, 16, 8, 26, 73, 46, 51, 37, 76, 53, 36, 1, 24, 69, 20, 48, 44, 55, 59, 41, 15, 61, 54, 2, 5, 49, 4, 42, 71, 30, 60, 65, 62, 74, 34, 35, 39, 21, 38, 12, 31, 10, 22, 27, 11, 17, 72, 67, 63, 47, 0, 19, 52, 29, 3, 32, 56, 66, 28, 23,
    ...Array.from({ length: 173 }, (_, i) => 77 + i),
    ...Array.from({ length: 11 }, (_, i) => 250 + i)
];
const FISIO_OLD_TO_NEW: number[] = [
    67, 28, 40, 71, 43, 41, 14, 10, 19, 12, 58, 61, 56, 13, 3, 37, 18, 62, 7, 68, 31, 54, 59, 76, 29, 4, 20, 60, 75, 70, 46, 57, 72, 5, 51, 52, 27, 24, 55, 53, 0, 36, 44, 2, 33, 9, 22, 66, 32, 42, 17, 23, 69, 26, 39, 34, 73, 6, 8, 35, 47, 38, 49, 65, 16, 48, 74, 64, 1, 30, 15, 45, 63, 21, 50, 11, 25,
    ...Array.from({ length: 173 }, (_, i) => 77 + i),
    ...Array.from({ length: 11 }, (_, i) => 250 + i)
];

// Map from original sequential order to new shuffled order for Bases Cirúrgicas
const BC_OLD_TO_NEW: number[] = [
    173, 119, 34, 68, 121, 35, 15, 27, 117, 152, 18, 33, 66, 63, 72, 164, 128, 77, 96, 99,
    48, 10, 31, 150, 158, 135, 21, 159, 0, 61, 14, 92, 142, 101, 60, 110, 46, 32, 58, 53,
    86, 162, 40, 73, 4, 69, 106, 143, 168, 118, 79, 149, 36, 89, 59, 90, 45, 160, 6, 75,
    108, 126, 146, 24, 51, 64, 155, 125, 113, 71, 70, 80, 165, 170, 50, 57, 19, 30, 105, 115,
    84, 104, 147, 88, 74, 5, 161, 62, 175, 172, 100, 122, 7, 163, 47, 87, 139, 43, 102, 114,
    109, 81, 144, 98, 124, 179, 93, 42, 83, 65, 107, 55, 26, 153, 23, 131, 28, 67, 151, 177,
    154, 94, 137, 76, 133, 56, 49, 52, 157, 148, 38, 29, 116, 95, 39, 169, 112, 17, 91, 167,
    123, 130, 138, 97, 2, 41, 174, 16, 111, 44, 37, 120, 25, 103, 20, 127, 82, 78, 1, 178,
    54, 171, 85, 9, 140, 8, 166, 145, 13, 134, 176, 132, 129, 22, 3, 156, 141, 136, 12, 11
];

// Shuffled questions used throughout the application - 100% guaranteed inclusion
const mappedFarmaco = FARMACO_NEW_ORDER.map(i => farmacologiaQuestionsRaw[i]).filter(Boolean);
const unmappedFarmaco = farmacologiaQuestionsRaw.filter(q => !mappedFarmaco.includes(q));
const farmacologiaQuestions: any[] = sortQuestionsByType([...mappedFarmaco, ...unmappedFarmaco]);

const mappedProp = PROP_NEW_ORDER.map(i => propedeuticaQuestionsRaw[i]).filter(Boolean);
const unmappedProp = propedeuticaQuestionsRaw.filter(q => !mappedProp.includes(q));
const propedeuticaQuestions: any[] = sortQuestionsByType([...mappedProp, ...unmappedProp]);

const mappedFisio = FISIO_NEW_ORDER.map(i => fisiopatologiaQuestionsRaw[i]).filter(Boolean);
const unmappedFisio = fisiopatologiaQuestionsRaw.filter(q => !mappedFisio.includes(q));
const fisiopatologiaQuestions: any[] = sortQuestionsByType([...mappedFisio, ...unmappedFisio]);

let currentSubject: string = '';
let currentMode: 'subject' | 'lesson' | 'simulado' | 'review' = 'subject';
let currentLessonId: string | null = null;
let questions: any[] = [];
let currentQuestionIndex = 0;
let answeredQuestions = new Set<number>();
let eliminatedOptionsMap = new Map<number, Set<number>>();

(window as any).toggleEliminateOption = function(qIndex: number, optIndex: number) {
    if (!eliminatedOptionsMap.has(qIndex)) {
        eliminatedOptionsMap.set(qIndex, new Set<number>());
    }
    const set = eliminatedOptionsMap.get(qIndex)!;
    if (set.has(optIndex)) {
        set.delete(optIndex);
    } else {
        set.add(optIndex);
    }
    loadQuestion(qIndex);
};
let correctAnswers = new Set<number>();
let incorrectAnswers = new Set<number>();

function migrateSubjectStorage(subjectId: string, oldToNew: number[]) {
    // 1. Progress migration (answered, correct, incorrect, currentQuestionIndex)
    const progressRaw = localStorage.getItem('pr1_progress_' + subjectId);
    if (progressRaw) {
        try {
            const p = JSON.parse(progressRaw);
            if (p) {
                const mapIdx = (i: number) => (typeof i === 'number' && i >= 0 && i < oldToNew.length ? oldToNew[i] : i);
                if (typeof p.currentQuestionIndex === 'number') {
                    p.currentQuestionIndex = mapIdx(p.currentQuestionIndex);
                }
                if (Array.isArray(p.answeredQuestions)) {
                    p.answeredQuestions = p.answeredQuestions.map(mapIdx);
                }
                if (Array.isArray(p.correctAnswers)) {
                    p.correctAnswers = p.correctAnswers.map(mapIdx);
                }
                if (Array.isArray(p.incorrectAnswers)) {
                    p.incorrectAnswers = p.incorrectAnswers.map(mapIdx);
                }
                localStorage.setItem('pr1_progress_' + subjectId, JSON.stringify(p));
            }
        } catch (e) {}
    }

    // 2. Favorites migration
    const favsRaw = localStorage.getItem('pr1_favorites');
    if (favsRaw) {
        try {
            const favs = JSON.parse(favsRaw);
            if (favs && Array.isArray(favs[subjectId])) {
                favs[subjectId] = favs[subjectId].map((i: number) =>
                    (typeof i === 'number' && i >= 0 && i < oldToNew.length ? oldToNew[i] : i)
                );
                localStorage.setItem('pr1_favorites', JSON.stringify(favs));
            }
        } catch (e) {}
    }

    // 3. Spaced Repetition (SRS) migration
    const srsRaw = localStorage.getItem('pr1_srs');
    if (srsRaw) {
        try {
            const srs = JSON.parse(srsRaw);
            if (srs && srs[subjectId]) {
                const oldMap = srs[subjectId];
                const newMap: Record<string, any> = {};
                for (const k of Object.keys(oldMap)) {
                    const oldIdx = parseInt(k, 10);
                    const newIdx = !isNaN(oldIdx) && oldIdx >= 0 && oldIdx < oldToNew.length ? oldToNew[oldIdx] : oldIdx;
                    newMap[newIdx] = oldMap[k];
                }
                srs[subjectId] = newMap;
                localStorage.setItem('pr1_srs', JSON.stringify(srs));
            }
        } catch (e) {}
    }
}

function migrateAllSubjectsStorage() {
    try {
        const MIGRATION_KEY = 'pr1_all_subjects_shuffled_v2';
        // Mark legacy migration keys completed so they never scramble modern user sessions or mobile history
        localStorage.setItem(MIGRATION_KEY, 'true');
        localStorage.setItem('pr1_bc_shuffled_v1', 'true');
        localStorage.setItem('pr1_bc_restore_history_v1', 'true');
        localStorage.setItem('pr1_bc_remove_history_v1', 'true');
        localStorage.setItem('pr1_bc_prepend_57_v1', 'true');
    } catch (e) {
        console.error('Error ensuring legacy migration flags', e);
    }
}

migrateAllSubjectsStorage();
enforceGlobalCleanSlateIfNeeded();

function migrateBasesCirurgicasRestoreHistory() {
    return;
    try {
        const RESTORE_MIGRATION_KEY = 'pr1_bc_restore_history_v1';
        if (localStorage.getItem(RESTORE_MIGRATION_KEY)) return;

        const hadRemoval = !!localStorage.getItem('pr1_bc_remove_history_v1');

        if (hadRemoval) {
            const BC_REMOVE_HISTORY_MAP: number[] = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, -1, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, 26, 27, 28, 29, 30, 31, -1, -1, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, -1, 114, -1, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, -1, 166, 167, 168, 169, 170, 171
            ];
            const BC_RESTORE_HISTORY_MAP: number[] = [];
            for (let v = 0; v < 172; v++) {
                BC_RESTORE_HISTORY_MAP.push(BC_REMOVE_HISTORY_MAP.indexOf(v));
            }

            const subjectId = 'bases cirúrgicas';
            const hadPrepend = !!localStorage.getItem('pr1_bc_prepend_57_v1');

            const mapIdx = (i: number) => {
                if (typeof i !== 'number' || i < 0) return i;
                if (hadPrepend) {
                    if (i < 57) return i;
                    const base172 = i - 57;
                    if (base172 >= 0 && base172 < 172) {
                        return 57 + BC_RESTORE_HISTORY_MAP[base172];
                    }
                    return i;
                } else {
                    if (i >= 0 && i < 172) {
                        return BC_RESTORE_HISTORY_MAP[i];
                    }
                    return i;
                }
            };

            const progressRaw = localStorage.getItem('pr1_progress_' + subjectId);
            if (progressRaw) {
                try {
                    const p = JSON.parse(progressRaw);
                    if (p) {
                        if (typeof p.currentQuestionIndex === 'number') {
                            p.currentQuestionIndex = mapIdx(p.currentQuestionIndex);
                        }
                        if (Array.isArray(p.answeredQuestions)) {
                            p.answeredQuestions = Array.from(new Set(p.answeredQuestions.map(mapIdx)));
                        }
                        if (Array.isArray(p.correctAnswers)) {
                            p.correctAnswers = Array.from(new Set(p.correctAnswers.map(mapIdx)));
                        }
                        if (Array.isArray(p.incorrectAnswers)) {
                            p.incorrectAnswers = Array.from(new Set(p.incorrectAnswers.map(mapIdx)));
                        }
                        localStorage.setItem('pr1_progress_' + subjectId, JSON.stringify(p));
                    }
                } catch (e) {}
            }

            const favsRaw = localStorage.getItem('pr1_favorites');
            if (favsRaw) {
                try {
                    const favs = JSON.parse(favsRaw);
                    if (favs && Array.isArray(favs[subjectId])) {
                        favs[subjectId] = Array.from(new Set(favs[subjectId].map(mapIdx)));
                        localStorage.setItem('pr1_favorites', JSON.stringify(favs));
                    }
                } catch (e) {}
            }

            const srsRaw = localStorage.getItem('pr1_srs');
            if (srsRaw) {
                try {
                    const srs = JSON.parse(srsRaw);
                    if (srs && srs[subjectId]) {
                        const oldMap = srs[subjectId];
                        const newMap: Record<string, any> = {};
                        for (const k of Object.keys(oldMap)) {
                            const oldIdx = parseInt(k, 10);
                            if (!isNaN(oldIdx)) {
                                const newIdx = mapIdx(oldIdx);
                                newMap[newIdx] = oldMap[k];
                            }
                        }
                        srs[subjectId] = newMap;
                        localStorage.setItem('pr1_srs', JSON.stringify(srs));
                    }
                } catch (e) {}
            }

            const logRaw = localStorage.getItem('pr1_log');
            if (logRaw) {
                try {
                    const log = JSON.parse(logRaw);
                    if (Array.isArray(log)) {
                        for (const item of log) {
                            if (item && item.materia === subjectId && typeof item.indice === 'number') {
                                item.indice = mapIdx(item.indice);
                            }
                        }
                        localStorage.setItem('pr1_log', JSON.stringify(log));
                    }
                } catch (e) {}
            }
        }

        localStorage.setItem(RESTORE_MIGRATION_KEY, 'true');
        localStorage.setItem('pr1_bc_remove_history_v1', 'true');
    } catch (e) {
        console.error('Error during Bases Cirúrgicas history restoration migration', e);
    }
}

migrateBasesCirurgicasRestoreHistory();

function migrateBasesCirurgicasPrepend57() {
    return;
    try {
        const MIGRATION_KEY = 'pr1_bc_prepend_57_v1';
        if (localStorage.getItem(MIGRATION_KEY)) return;

        const subjectId = 'bases cirúrgicas';
        const mapIdx = (i: number) => {
            if (typeof i === 'number') {
                if (i >= 0 && i < 180) return i + 57;
                if (i >= 180 && i < 237) return i - 180;
            }
            return i;
        };

        const progressRaw = localStorage.getItem('pr1_progress_' + subjectId);
        if (progressRaw) {
            try {
                const p = JSON.parse(progressRaw);
                if (p) {
                    p.currentQuestionIndex = 0;
                    if (Array.isArray(p.answeredQuestions)) {
                        p.answeredQuestions = Array.from(new Set(p.answeredQuestions.map(mapIdx)));
                    }
                    if (Array.isArray(p.correctAnswers)) {
                        p.correctAnswers = Array.from(new Set(p.correctAnswers.map(mapIdx)));
                    }
                    if (Array.isArray(p.incorrectAnswers)) {
                        p.incorrectAnswers = Array.from(new Set(p.incorrectAnswers.map(mapIdx)));
                    }
                    localStorage.setItem('pr1_progress_' + subjectId, JSON.stringify(p));
                }
            } catch (e) {}
        }

        const favsRaw = localStorage.getItem('pr1_favorites');
        if (favsRaw) {
            try {
                const favs = JSON.parse(favsRaw);
                if (favs && Array.isArray(favs[subjectId])) {
                    favs[subjectId] = Array.from(new Set(favs[subjectId].map(mapIdx)));
                    localStorage.setItem('pr1_favorites', JSON.stringify(favs));
                }
            } catch (e) {}
        }

        const srsRaw = localStorage.getItem('pr1_srs');
        if (srsRaw) {
            try {
                const srs = JSON.parse(srsRaw);
                if (srs && srs[subjectId]) {
                    const oldMap = srs[subjectId];
                    const newMap: Record<string, any> = {};
                    for (const k of Object.keys(oldMap)) {
                        const oldIdx = parseInt(k, 10);
                        if (!isNaN(oldIdx)) {
                            const newIdx = mapIdx(oldIdx);
                            newMap[newIdx] = oldMap[k];
                        }
                    }
                    srs[subjectId] = newMap;
                    localStorage.setItem('pr1_srs', JSON.stringify(srs));
                }
            } catch (e) {}
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (e) {
        console.error('Error during Bases Cirúrgicas prepend 57 migration', e);
    }
}

migrateBasesCirurgicasPrepend57();

function migrateBasesCirurgicasRemoveQ92() {
    try {
        const MIGRATION_KEY = 'pr1_bc_remove_q92_v2';
        if (localStorage.getItem(MIGRATION_KEY)) return;

        const subjectId = 'bases cirúrgicas';
        const REMOVED_INDEX = 91; // Questão 92 (1-based) is index 91 (0-based)

        const mapIdx = (i: number) => {
            if (typeof i !== 'number' || i < 0) return i;
            if (i === REMOVED_INDEX) return -1;
            if (i > REMOVED_INDEX) return i - 1;
            return i;
        };

        const progressRaw = localStorage.getItem('pr1_progress_' + subjectId);
        if (progressRaw) {
            try {
                const p = JSON.parse(progressRaw);
                if (p) {
                    if (typeof p.currentQuestionIndex === 'number') {
                        if (p.currentQuestionIndex === REMOVED_INDEX) {
                            p.currentQuestionIndex = Math.min(REMOVED_INDEX, basesCirurgicasQuestions.length - 1);
                        } else if (p.currentQuestionIndex > REMOVED_INDEX) {
                            p.currentQuestionIndex = Math.max(0, p.currentQuestionIndex - 1);
                        }
                    }
                    if (Array.isArray(p.answeredQuestions)) {
                        p.answeredQuestions = p.answeredQuestions.map(mapIdx).filter((idx: number) => idx >= 0);
                    }
                    if (Array.isArray(p.correctAnswers)) {
                        p.correctAnswers = p.correctAnswers.map(mapIdx).filter((idx: number) => idx >= 0);
                    }
                    if (Array.isArray(p.incorrectAnswers)) {
                        p.incorrectAnswers = p.incorrectAnswers.map(mapIdx).filter((idx: number) => idx >= 0);
                    }
                    localStorage.setItem('pr1_progress_' + subjectId, JSON.stringify(p));
                }
            } catch (e) {}
        }

        const favsRaw = localStorage.getItem('pr1_favorites');
        if (favsRaw) {
            try {
                const favs = JSON.parse(favsRaw);
                if (favs && Array.isArray(favs[subjectId])) {
                    favs[subjectId] = favs[subjectId].map(mapIdx).filter((idx: number) => idx >= 0);
                    localStorage.setItem('pr1_favorites', JSON.stringify(favs));
                }
            } catch (e) {}
        }

        const srsRaw = localStorage.getItem('pr1_srs');
        if (srsRaw) {
            try {
                const srs = JSON.parse(srsRaw);
                if (srs && srs[subjectId]) {
                    const oldMap = srs[subjectId];
                    const newMap: Record<string, any> = {};
                    for (const k of Object.keys(oldMap)) {
                        const oldIdx = parseInt(k, 10);
                        if (!isNaN(oldIdx)) {
                            const newIdx = mapIdx(oldIdx);
                            if (newIdx >= 0) {
                                newMap[newIdx] = oldMap[k];
                            }
                        }
                    }
                    srs[subjectId] = newMap;
                    localStorage.setItem('pr1_srs', JSON.stringify(srs));
                }
            } catch (e) {}
        }

        const logRaw = localStorage.getItem('pr1_log');
        if (logRaw) {
            try {
                const log = JSON.parse(logRaw);
                if (Array.isArray(log)) {
                    for (const item of log) {
                        if (item && item.materia === subjectId && typeof item.indice === 'number') {
                            item.indice = mapIdx(item.indice);
                        }
                    }
                    localStorage.setItem('pr1_log', JSON.stringify(log.filter((item: any) => item.indice >= 0)));
                }
            } catch (e) {}
        }

        localStorage.setItem(MIGRATION_KEY, 'true');
    } catch (e) {
        console.error('Error during Bases Cirúrgicas question 92 removal migration', e);
    }
}

migrateBasesCirurgicasRemoveQ92();

try { 
    const srsClean = JSON.parse(localStorage.getItem("pr1_srs") || "{}"); 
    let changed = false; 
    Object.keys(srsClean).forEach(subj => { 
        if (srsClean[subj] && typeof srsClean[subj] === "object") { 
            Object.keys(srsClean[subj]).forEach(qIdx => { 
                const q = srsClean[subj][qIdx]; 
                if (q && (isNaN(q.nextReview) || q.nextReview === null || typeof q.level !== "number" || isNaN(q.level))) { 
                    q.nextReview = Date.now(); 
                    q.level = 0; 
                    changed = true; 
                } 
            }); 
        } 
    }); 
    if (changed) localStorage.setItem("pr1_srs", JSON.stringify(srsClean)); 
} catch(e) {}


function updateSRS(subjectId: string, qIndex: number, isCorrect: boolean, isChute: boolean = false) {
    if (subjectId === 'revisao_erros' || subjectId === 'simulado') return;

    const srsData = JSON.parse(localStorage.getItem('pr1_srs') || '{}');
    if (!srsData[subjectId]) srsData[subjectId] = {};
    
    let isNew = !srsData[subjectId][qIndex];
    let qData = srsData[subjectId][qIndex] || { level: 0, nextReview: Date.now() };
    if (typeof qData.level !== "number" || isNaN(qData.level)) { qData.level = 0; }
    const intervals = [1, 3, 7, 15, 30]; // Em dias
    
    if (isChute) {
        qData.level = 1; // Chutou -> revisar em 1 dia
    } else if (isCorrect) {
        if (isNew) {
            qData.level = 2; // Acertou de primeira -> pula para 3 dias
        } else {
            qData.level = Math.min((qData.level || 0) + 1, intervals.length);
        }
    } else {
        qData.level = 0; // Errou -> volta pro nível 0 (revisar hoje)
    }
    
    const addDays = (isCorrect || isChute) ? intervals[Math.max(0, Math.min(qData.level - 1, intervals.length - 1))] : 0;
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + addDays);
    qData.nextReview = nextDate.getTime();
    
    srsData[subjectId][qIndex] = qData;
    localStorage.setItem('pr1_srs', JSON.stringify(srsData));
    scheduleAutoSync();
}

function getStorageKey() {
    if (currentMode === 'lesson' && currentLessonId) {
        return `pr1_progress_lesson_${currentLessonId}`;
    }
    if (currentSubject === 'revisao_erros') {
        return 'pr1_progress_revisao_erros';
    }
    if (currentSubject === 'simulado') {
        return 'pr1_progress_simulado';
    }
    return `pr1_progress_${currentSubject}`;
}

function saveProgress() {
    if (!currentSubject) return;
    try {
        const now = new Date().toISOString();
        const state = {
            currentQuestionIndex,
            answeredQuestions: Array.from(answeredQuestions),
            correctAnswers: Array.from(correctAnswers),
            incorrectAnswers: Array.from(incorrectAnswers),
            updatedAt: now
        };
        localStorage.setItem(getStorageKey(), JSON.stringify(state));

        // If in lesson mode, safely update the main subject's persistent progress records
        if (currentMode === 'lesson') {
            const bySubject = new Map<string, Array<{ ogIndex: number; isCorr: boolean; isInc: boolean }>>();
            questions.forEach((q, idx) => {
                if (answeredQuestions.has(idx) && q.ogSubject && q.ogIndex !== undefined) {
                    if (!bySubject.has(q.ogSubject)) bySubject.set(q.ogSubject, []);
                    bySubject.get(q.ogSubject)!.push({
                        ogIndex: q.ogIndex,
                        isCorr: correctAnswers.has(idx),
                        isInc: incorrectAnswers.has(idx)
                    });
                }
            });

            bySubject.forEach((items, subj) => {
                try {
                    const masterKey = `pr1_progress_${subj}`;
                    const rawMaster = localStorage.getItem(masterKey);
                    const masterData = rawMaster ? JSON.parse(rawMaster) : { answeredQuestions: [], correctAnswers: [], incorrectAnswers: [], currentQuestionIndex: 0 };
                    const ansSet = new Set<number>(masterData.answeredQuestions || []);
                    const corrSet = new Set<number>(masterData.correctAnswers || []);
                    const incSet = new Set<number>(masterData.incorrectAnswers || []);

                    items.forEach(item => {
                        ansSet.add(item.ogIndex);
                        if (item.isCorr) {
                            corrSet.add(item.ogIndex);
                            incSet.delete(item.ogIndex);
                        } else if (item.isInc) {
                            incSet.add(item.ogIndex);
                        }
                    });

                    masterData.answeredQuestions = Array.from(ansSet).sort((a: number, b: number) => a - b);
                    masterData.correctAnswers = Array.from(corrSet).sort((a: number, b: number) => a - b);
                    masterData.incorrectAnswers = Array.from(incSet).sort((a: number, b: number) => a - b);
                    masterData.updatedAt = now;
                    localStorage.setItem(masterKey, JSON.stringify(masterData));
                } catch (e) {}
            });
        }

        scheduleAutoSync();
    } catch (e) {
        console.warn("Could not save progress to localStorage", e);
    }
}

function loadProgress() {
    if (!currentSubject) return false;
    try {
        const saved = localStorage.getItem(getStorageKey());
        if (saved) {
            const state = JSON.parse(saved);
            currentQuestionIndex = (typeof state.currentQuestionIndex === 'number' && state.currentQuestionIndex >= 0) ? state.currentQuestionIndex : 0;
            if (questions.length > 0 && currentQuestionIndex >= questions.length) {
                currentQuestionIndex = Math.max(0, questions.length - 1);
            }
            answeredQuestions = new Set(Array.isArray(state.answeredQuestions) ? state.answeredQuestions.filter((i: any) => typeof i === 'number' && (questions.length === 0 || i < questions.length)) : []);
            correctAnswers = new Set(Array.isArray(state.correctAnswers) ? state.correctAnswers.filter((i: any) => typeof i === 'number' && (questions.length === 0 || i < questions.length)) : []);
            incorrectAnswers = new Set(Array.isArray(state.incorrectAnswers) ? state.incorrectAnswers.filter((i: any) => typeof i === 'number' && (questions.length === 0 || i < questions.length)) : []);
            return true;
        }
    } catch (e) {
        console.error("Error loading progress", e);
    }
    return false;
}




// DOM Elements
const homeScreenEl = document.getElementById('home-screen')!;
const appScreenEl = document.getElementById('app-screen')!;
const headerSubjectTitleEl = document.getElementById('header-subject-title')!;
const emptyStateEl = document.getElementById('empty-state')!;
const quizContainerEl = document.getElementById('quiz-container')!;

const questionCounterEl = document.getElementById('question-counter')!;
const questionTypeEl = document.getElementById('question-type')!;
const questionTextEl = document.getElementById('question-text')!;
const interactionAreaEl = document.getElementById('interaction-area')!;
const feedbackAreaEl = document.getElementById('feedback-area')!;

const feedbackTextEl = document.getElementById('feedback-text')!;

const btnShowAnswer = document.getElementById('btn-show-answer')!;
const btnNext = document.getElementById('btn-next')!;
const btnPrev = document.getElementById('btn-prev')!;
const endScreenEl = document.getElementById('end-screen')!;
const questionGridEl = document.getElementById('question-grid')!;
const progressTextEl = document.getElementById('progress-text')!;
const progressBarEl = document.getElementById('progress-bar')!;
const selfAssessAreaEl = document.getElementById('self-assess-area')!;


function normalizeSubjectId(subject: string): string {
    const s = (subject || '').toLowerCase().trim();
    if (s === 'farmacologia' || s === 'farmaco') return 'farmacologia';
    if (s === 'propedêutica' || s === 'propedeutica' || s === 'proped') return 'propedêutica';
    if (s === 'fisiopatologia' || s === 'fisiopato') return 'fisiopatologia';
    if (s === 'bases cirúrgicas' || s === 'bases cirurgicas' || s === 'bases' || s === 'bases_cirurgicas') return 'bases cirúrgicas';
    if (s === 'iesc iv' || s === 'iesc_iv' || s === 'iesc' || s === 'iesciv') return 'iesc_iv';
    if (s === 'pr1' || s === 'pr-1' || s === 'todas') return 'pr1';
    return s;
}

(window as any).startSubject = function(subject: string, targetIndex?: number) {
    // Close mobile main sidebar if open
    if (window.innerWidth < 1024) {
        const sidebar = document.getElementById('main-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            overlay?.classList.add('hidden');
        }
    }

    currentSubject = normalizeSubjectId(subject);
    currentMode = 'subject';
    currentLessonId = null;
    
    let sourceQuestions: any[] = [];
    if (currentSubject === 'farmacologia') {
        sourceQuestions = farmacologiaQuestions;
        headerSubjectTitleEl.textContent = 'Farmacologia PR1';
    } else if (currentSubject === 'propedêutica') {
        sourceQuestions = propedeuticaQuestions;
        headerSubjectTitleEl.textContent = 'Propedêutica PR1';
    } else if (currentSubject === 'fisiopatologia') {
        sourceQuestions = fisiopatologiaQuestions;
        headerSubjectTitleEl.textContent = 'Fisiopatologia PR1';
    } else if (currentSubject === 'bases cirúrgicas') {
        sourceQuestions = basesCirurgicasQuestions;
        headerSubjectTitleEl.textContent = 'Bases Cirúrgicas PR1';
    } else if (currentSubject === 'iesc_iv' || currentSubject === 'iesc iv') {
        sourceQuestions = iescIvQuestionsAll;
        headerSubjectTitleEl.textContent = 'IESC IV PR1';
    } else if (currentSubject === 'pr1') {
        sourceQuestions = [
            ...fisiopatologiaQuestions,
            ...farmacologiaQuestions,
            ...propedeuticaQuestions,
            ...basesCirurgicasQuestions,
            ...iescIvQuestionsAll
        ];
        headerSubjectTitleEl.textContent = 'PR1 — Todas as Matérias';
    }
    
    questions = [...sourceQuestions];
    
    const hasProgress = loadProgress();

    if (targetIndex !== undefined) {
        currentQuestionIndex = targetIndex;
    } else if (!hasProgress) {
        currentQuestionIndex = 0;
    }

    window.scrollTo({ top: 0, left: 0 });
    
    homeScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    endScreenEl.classList.add('hidden');

    if (simTimer) {
        clearInterval(simTimer);
        simTimer = null;
    }
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.classList.add('hidden');
        timerDisplay.classList.remove('flex');
    }

    const quizSidebar = document.getElementById('quiz-sidebar');
    const quizOverlay = document.getElementById('quiz-sidebar-overlay');
    if (quizSidebar && window.innerWidth < 768) {
        quizSidebar.classList.add('-translate-x-full');
        quizOverlay?.classList.add('hidden');
    }

    if (questions.length === 0) {
        emptyStateEl.classList.remove('hidden');
        quizContainerEl.classList.add('hidden');
    } else {
        emptyStateEl.classList.add('hidden');
        quizContainerEl.classList.remove('hidden');
        quizContainerEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'fade-in');
        quizContainerEl.classList.add('fade-in');
        isUserManuallyScrollingGrid = false;
        lastActiveQuestionIndexForScroll = -1;
        initGrid();
        loadQuestion(currentQuestionIndex);
        setTimeout(() => safelyScrollActiveGridBtnIntoView(questionGridEl, true), 60);
    }
};

let currentReviewTargetSubject: string = 'all';

(window as any).startErrorReview = function(targetSubjectId: string = 'all') {
    const normalizedTarget = (targetSubjectId && targetSubjectId !== 'all') ? normalizeSubjectId(targetSubjectId) : 'all';
    currentReviewTargetSubject = normalizedTarget;
    currentMode = 'review';
    currentLessonId = null;
    let questionsToReview: any[] = [];
    const subjectsConfig = [
        { id: 'farmacologia', name: 'Farmacologia', src: farmacologiaQuestions },
        { id: 'propedêutica', name: 'Propedêutica', src: propedeuticaQuestions },
        { id: 'fisiopatologia', name: 'Fisiopatologia', src: fisiopatologiaQuestions },
        { id: 'bases cirúrgicas', name: 'Bases Cirúrgicas', src: basesCirurgicasQuestions },
        { id: 'iesc_iv', name: 'IESC IV', src: iescIvQuestionsAll }
    ];

    const subjectsToProcess = (normalizedTarget && normalizedTarget !== 'all')
        ? subjectsConfig.filter(s => s.id === normalizedTarget)
        : subjectsConfig;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const srsData = JSON.parse(localStorage.getItem('pr1_srs') || '{}');

    subjectsToProcess.forEach(sub => {
        let legacyIncorrect: number[] = [];
        const saved = localStorage.getItem('pr1_progress_' + sub.id);
        if (saved) {
            try { legacyIncorrect = JSON.parse(saved).incorrectAnswers || []; } catch (e) {}
        }
        
        const subSrs = srsData[sub.id] || {};
        
        sub.src.forEach((q: any, idx: number) => {
            let needsReview = false;
            if (subSrs[idx]) {
                const reviewTime = subSrs[idx].nextReview;
                if (!reviewTime || isNaN(reviewTime)) {
                    needsReview = true;
                } else {
                    const rDate = new Date(reviewTime);
                    const reviewStart = new Date(rDate.getFullYear(), rDate.getMonth(), rDate.getDate()).getTime();
                    if (reviewStart <= todayStart) {
                        needsReview = true;
                    }
                }
            } else if (legacyIncorrect.includes(idx)) {
                needsReview = true;
            }
            
            if (needsReview) {
                questionsToReview.push({ ...q, ogSubject: sub.id, ogIndex: idx });
            }
        });
    });

    if (questionsToReview.length === 0) {
        const targetSubObj = subjectsConfig.find(s => s.id === targetSubjectId);
        const subName = targetSubObj ? targetSubObj.name : 'todas as matérias';
        showToast(`Você não tem nenhuma questão de ${subName} pendente para revisão hoje! Muito bem! 🎉`);
        return;
    }

    currentSubject = 'revisao_erros';
    const targetSubObj = subjectsConfig.find(s => s.id === targetSubjectId);
    const subTitle = targetSubObj ? targetSubObj.name : 'Todas as Matérias';
    headerSubjectTitleEl.textContent = `Revisão Espaçada - ${subTitle} (${questionsToReview.length}Q)`;
    questions = [...questionsToReview];

    // Always start fresh for error review since the source list dynamically changes
    currentQuestionIndex = 0;
    answeredQuestions.clear();
    eliminatedOptionsMap.clear();
    correctAnswers.clear();
    incorrectAnswers.clear();
    saveProgress();

    // Switch Screens
    homeScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    endScreenEl.classList.add('hidden');

    if (simTimer) {
        clearInterval(simTimer);
        simTimer = null;
    }
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.classList.add('hidden');
        timerDisplay.classList.remove('flex');
    }

    emptyStateEl.classList.add('hidden');
    quizContainerEl.classList.remove('hidden');
    quizContainerEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'fade-in');
    quizContainerEl.classList.add('fade-in');
    lastActiveQuestionIndexForScroll = -1;
    initGrid();
    loadQuestion(currentQuestionIndex);
};

(window as any).updateDashboardStats = function() {
    const subjects = [
        { id: 'farmacologia', total: farmacologiaQuestions.length },
        { id: 'propedêutica', total: propedeuticaQuestions.length },
        { id: 'fisiopatologia', total: fisiopatologiaQuestions.length },
        { id: 'bases_cirurgicas', total: basesCirurgicasQuestions.length, internal: 'bases cirúrgicas' },
        { id: 'iesc_iv', total: iescIvQuestionsAll.length, internal: 'iesc_iv' }
    ];

    let globalAnswered = 0;
    let globalCorrect = 0;
    let globalTotal = 0;
    const subjectCounts: Record<string, number> = {};

    subjects.forEach(sub => {
        globalTotal += sub.total;
        
        let subAnswered = 0;
        let subCorrect = 0;
        
        const internalId = sub.internal || sub.id;
        subjectCounts[internalId] = 0;
        const saved = localStorage.getItem('pr1_progress_' + internalId);
        
        if (saved) {
            try {
                const data = JSON.parse(saved);
                subAnswered = data.answeredQuestions ? data.answeredQuestions.length : 0;
                subCorrect = data.correctAnswers ? data.correctAnswers.length : 0;
            } catch(e) {}
        }
        
        subjectCounts[internalId] = subAnswered;
        globalAnswered += subAnswered;
        globalCorrect += subCorrect;
        
        // Update badge
        let badgeId = sub.id;

        const badgeEl = document.getElementById('badge-' + badgeId) || document.getElementById('badge-' + badgeId.replace(/_/g, '-'));
        if (badgeEl) {
            badgeEl.textContent = `${subAnswered} / ${sub.total}`;
        }
        const sidebarSubBadge = document.getElementById('sidebar-badge-' + badgeId) || document.getElementById('sidebar-badge-' + badgeId.replace(/_/g, '-'));
        if (sidebarSubBadge) {
            sidebarSubBadge.textContent = `${subAnswered} / ${sub.total}`;
        }
    });

    // Update PR1 sidebar and master card stats
    const sidebarPr1Badge = document.getElementById('sidebar-pr1-badge');
    if (sidebarPr1Badge) {
        sidebarPr1Badge.textContent = `${globalAnswered}/${globalTotal} q`;
    }
    const badgePr1Total = document.getElementById('badge-pr1-total');
    if (badgePr1Total) {
        badgePr1Total.textContent = `${globalAnswered} / ${globalTotal} resolvidas`;
    }
    const pr1ProgressBar = document.getElementById('pr1-progress-bar');
    const pr1ProgressPct = document.getElementById('pr1-progress-pct');
    const pct = globalTotal > 0 ? Math.round((globalAnswered / globalTotal) * 100) : 0;
    if (pr1ProgressBar) {
        pr1ProgressBar.style.width = `${pct}%`;
    }
    if (pr1ProgressPct) {
        pr1ProgressPct.textContent = `${pct}% Concluído`;
    }

    const dashTotal = document.getElementById('dash-total-answered');
    if (dashTotal) dashTotal.textContent = globalAnswered.toString();

    const dashAcc = document.getElementById('dash-accuracy');
    if (dashAcc) {
        if (globalAnswered === 0) {
            dashAcc.textContent = '0%';
        } else {
            dashAcc.textContent = Math.round((globalCorrect / globalAnswered) * 100) + '%';
        }
    }

    // Update Streak (Dias de Sofrimento)
    // We will track the last studied date and the current streak count in localStorage
    const STREAK_KEY = 'pr1_streak_data';
    const dashStreakCount = document.getElementById('dash-streak-count');
    const dashStreakLabel = document.getElementById('dash-streak-label');
    
    if (dashStreakCount && dashStreakLabel) {
        let streakData = { count: 0, lastDate: null as string | null };
        try {
            const saved = localStorage.getItem(STREAK_KEY);
            if (saved) streakData = JSON.parse(saved);
        } catch (e) {}

        const today = new Date().toLocaleDateString('pt-BR');
        
        // Only update if they have answered something (checked when globalAnswered is updated)
        // Note: globalAnswered is total questions answered. We need a way to increment if they studied *today*.
        // A better approach is to check if there is any study session logged today.
        
        // In this simple version, whenever updateDashboardStats is called, we consider it a visit.
        // We will increment the streak if the last visit was yesterday.
        if (streakData.lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toLocaleDateString('pt-BR');

            if (streakData.lastDate === yesterdayStr) {
                // They studied yesterday, increase streak
                streakData.count++;
                streakData.lastDate = today;
                localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
            } else if (streakData.lastDate === null || streakData.lastDate !== yesterdayStr) {
                // First time, or they missed a day
                streakData.count = 1;
                streakData.lastDate = today;
                localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
            }
        }
        
        dashStreakCount.textContent = streakData.count.toString();
        dashStreakLabel.textContent = streakData.count === 1 ? 'Dia' : 'Dias';
    }

    const sbProgress = document.getElementById('sidebar-progress');
    const sbProgressText = document.getElementById('sidebar-progress-text');
    const sbProgressFrac = document.getElementById('sidebar-progress-fraction');
    
    if (sbProgress && sbProgressText && sbProgressFrac && globalTotal > 0) {
        const pct = Math.round((globalAnswered / globalTotal) * 100);
        sbProgress.style.width = pct + '%';
        sbProgressText.textContent = pct + '% concluído';
        sbProgressFrac.textContent = `${globalAnswered}/${globalTotal}`;
    }
    if (typeof (window as any).renderSRSCalendar === "function") {
        (window as any).renderSRSCalendar();
    }
    const metricsView = document.getElementById('view-metrics');
    if (metricsView && !metricsView.classList.contains('hidden')) {
        renderDetailedMetrics();
    }
};

(window as any).backToHome = function() {
    if (simTimer) {
        clearInterval(simTimer);
        simTimer = null;
    }
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.classList.add('hidden');
        timerDisplay.classList.remove('flex');
    }

    appScreenEl.classList.add('hidden');
    appScreenEl.classList.remove('flex');
    homeScreenEl.classList.remove('hidden');
    
    endScreenEl.classList.add('hidden');
    endScreenEl.classList.remove('flex');
    
    (window as any).updateDashboardStats();
};

(window as any).togglePr1SidebarAccordion = function() {
    const list = document.getElementById('sidebar-pr1-list');
    const chevron = document.getElementById('sidebar-pr1-chevron');
    if (!list) return;
    if (list.classList.contains('hidden')) {
        list.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
        list.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
};

(window as any).openSidebarPr1 = function() {
    // If sidebar is hidden on mobile, open it
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        overlay?.classList.remove('hidden');
    }
    // Make sure accordion is expanded
    const list = document.getElementById('sidebar-pr1-list');
    const chevron = document.getElementById('sidebar-pr1-chevron');
    if (list) {
        list.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
    const pr1Header = document.getElementById('sidebar-pr1-badge');
    if (pr1Header) {
        pr1Header.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

(window as any).togglePr1Box = function() {
    const container = document.getElementById('pr1-subjects-container');
    const chevron = document.getElementById('pr1-chevron');
    const toggleText = document.getElementById('pr1-toggle-text');
    if (!container) return;
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        container.classList.add('grid');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        if (toggleText) toggleText.textContent = 'Recolher Matérias';
    } else {
        container.classList.add('hidden');
        container.classList.remove('grid');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
        if (toggleText) toggleText.textContent = 'Ver Matérias';
    }
};

(window as any).openPr1Modal = function() {
    const modal = document.getElementById('pr1-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        (window as any).updateDashboardStats();
    }
};

(window as any).closePr1Modal = function() {
    const modal = document.getElementById('pr1-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

(window as any).confirmResetCurrentSubject = function(subjectToReset?: string) {
    const targetSub = normalizeSubjectId(subjectToReset || currentSubject);
    if (!targetSub || targetSub === 'simulado' || targetSub === 'revisao_erros') {
        showToast('Selecione uma disciplina para reiniciar o módulo.');
        return;
    }

    const subNameMap: Record<string, string> = {
        'farmacologia': 'Farmacologia',
        'propedêutica': 'Propedêutica',
        'fisiopatologia': 'Fisiopatologia',
        'bases cirúrgicas': 'Bases Cirúrgicas',
        'iesc_iv': 'IESC IV',
        'iesc iv': 'IESC IV'
    };
    const prettyName = subNameMap[targetSub] || targetSub;

    const existingModal = document.getElementById('reset-confirm-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'reset-confirm-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center space-y-4 animate-fade-in">
            <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </div>
            <div>
                <h3 class="text-base font-black text-gray-900">Zerar Progresso de ${prettyName}?</h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">Todas as questões deste módulo voltarão para o estado não respondido. Este reset será sincronizado em tempo real com todos os seus aparelhos conectados.</p>
            </div>
            <div class="flex gap-2 pt-2">
                <button id="cancel-reset-btn" class="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer">
                    Cancelar
                </button>
                <button id="confirm-reset-btn" class="flex-1 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-200 cursor-pointer">
                    Sim, Zerar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#cancel-reset-btn')?.addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('#confirm-reset-btn')?.addEventListener('click', async () => {
        modal.remove();
        showToast(`Zerando módulo de ${prettyName}...`);
        
        await resetSubjectProgressInCloud(targetSub);
        
        if (currentSubject === targetSub) {
            currentQuestionIndex = 0;
            answeredQuestions.clear();
    eliminatedOptionsMap.clear();
            correctAnswers.clear();
            incorrectAnswers.clear();
            
            const appScreen = document.getElementById('app-screen');
            if (appScreen && !appScreen.classList.contains('hidden')) {
                (window as any).startSubject(targetSub, 0);
            }
        }
        
        (window as any).updateDashboardStats();
        showToast(`Módulo de ${prettyName} zerado com sucesso em todos os aparelhos!`);
    });
};

(window as any).confirmResetAllDataGlobally = function() {
    const existingModal = document.getElementById('reset-all-global-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'reset-all-global-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center space-y-4 animate-fade-in">
            <div class="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </div>
            <div>
                <h3 class="text-base font-black text-gray-900">Zerar Todo o Progresso Geral?</h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">Isso zerará o progresso de <strong>todas as disciplinas</strong>, lições, histórico diário, repetição espaçada (SRS) e sequência de estudos. A limpeza será sincronizada com todos os seus dispositivos.</p>
            </div>
            <div class="flex gap-2 pt-2">
                <button id="cancel-reset-all-btn" class="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer">
                    Cancelar
                </button>
                <button id="confirm-reset-all-btn" class="flex-1 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-200 cursor-pointer">
                    Sim, Zerar Tudo
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#cancel-reset-all-btn')?.addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('#confirm-reset-all-btn')?.addEventListener('click', async () => {
        modal.remove();
        showToast('Zerando todo o progresso do aplicativo...');
        
        await resetAllProgressGlobally();
        
        currentQuestionIndex = 0;
        answeredQuestions.clear();
    eliminatedOptionsMap.clear();
        correctAnswers.clear();
        incorrectAnswers.clear();
        
        const appScreen = document.getElementById('app-screen');
        if (appScreen && !appScreen.classList.contains('hidden') && currentSubject) {
            (window as any).startSubject(currentSubject, 0);
        }
        
        (window as any).updateDashboardStats();
        const metricsView = document.getElementById('view-metrics');
        if (metricsView && !metricsView.classList.contains('hidden')) {
            renderDetailedMetrics();
        }
        showToast('Todo o progresso foi zerado com sucesso em todos os aparelhos!');
    });
};

(window as any).restartTest = function() {
    if (currentSubject === 'revisao_erros') {
        (window as any).startErrorReview(currentReviewTargetSubject || 'all');
        return;
    }
    if (currentSubject === 'simulado') {
        (window as any).startSimulado();
        return;
    }
    (window as any).confirmResetCurrentSubject(currentSubject);
};

let gridButtonElements: HTMLButtonElement[] = [];

function initGrid() {
    questionGridEl.innerHTML = '';
    gridButtonElements = [];
    const fragment = document.createDocumentFragment();
    const count = questions.length;
    for (let i = 0; i < count; i++) {
        const btn = document.createElement('button');
        btn.className = 'grid-btn flex-grow-0 min-w-[40px] flex items-center justify-center w-full aspect-square rounded border text-xs font-bold transition-colors touch-manipulation cursor-pointer select-none border-gray-200 bg-white text-gray-500 hover:bg-gray-100';
        btn.textContent = (i + 1).toString().padStart(2, '0');
        btn.dataset.idx = i.toString();
        gridButtonElements.push(btn);
        fragment.appendChild(btn);
    }
    questionGridEl.appendChild(fragment);
}

// Single delegated listener for the question grid to prevent hundreds of closures
questionGridEl.onclick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest('.grid-btn') as HTMLElement;
    if (target && target.dataset.idx !== undefined) {
        const idx = parseInt(target.dataset.idx, 10);
        if (!isNaN(idx)) {
            (window as any).goToQuestion(idx);
        }
    }
};

// Web Audio API Sound Effects
let audioCtx: AudioContext | null = null;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}
function playSound(type: 'correct' | 'incorrect') {
    try {
        const ctx = initAudio();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        const now = ctx.currentTime;
        if (type === 'correct') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, now);
            oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.1);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            oscillator.start(now);
            oscillator.stop(now + 0.4);
        } else {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(250, now);
            oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.2);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
        }
    } catch (e) {
        console.warn('Audio play failed', e);
    }
}

let questionRenderStartTime = Date.now();

function logQuestionPerformance(subject: string, questionIdx: number, isCorrect: boolean, isChute: boolean = false) {
    try {
        const timeSpent = Math.max(1, Math.round((Date.now() - questionRenderStartTime) / 1000));
        const raw = localStorage.getItem('pr1_log');
        const log = raw ? JSON.parse(raw) : [];
        log.push({
            materia: subject,
            indice: questionIdx,
            acertou: isCorrect,
            chutou: isChute,
            tempo: timeSpent,
            timestamp: Date.now()
        });
        if (log.length > 2000) {
            log.splice(0, log.length - 2000);
        }
        localStorage.setItem('pr1_log', JSON.stringify(log));
    } catch (e) {}
}

(window as any).recordSelfAssessment = function(isCorrect: boolean, _optArg?: any, isChute?: boolean) {
    const q = questions[currentQuestionIndex];
    const targetSub = (q && q.ogSubject) ? q.ogSubject : currentSubject;
    if (targetSub && targetSub !== 'revisao_erros' && targetSub !== 'simulado') {
        logDailyAnswer(targetSub, isCorrect);
    } else if (q && q.ogSubject) {
        logDailyAnswer(q.ogSubject, isCorrect);
    }

    if (q && q.ogSubject && q.ogIndex !== undefined) {
        updateSRS(q.ogSubject, q.ogIndex, isCorrect, !!isChute);
    } else {
        updateSRS(currentSubject, currentQuestionIndex, isCorrect, !!isChute);
    }

    logQuestionPerformance(targetSub || 'geral', (q && q.ogIndex !== undefined) ? q.ogIndex : currentQuestionIndex, isCorrect, !!isChute);

    if (isCorrect) {
        playSound('correct');
        correctAnswers.add(currentQuestionIndex);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#16a34a', '#15803d']
        });
    } else {
        playSound('incorrect');
        incorrectAnswers.add(currentQuestionIndex);

        // Record in Caderno de Erros
        try {
            const subForError = (q && q.ogSubject ? q.ogSubject : currentSubject) as SubjectId;
            addErrorToNotebook({
                questionIndex: (q && q.ogIndex !== undefined) ? q.ogIndex : currentQuestionIndex,
                subject: subForError,
                questionText: q ? (q.pergunta || q.title || '') : '',
                selectedOption: 'Autoavaliação: Erro / Dúvida',
                correctOption: q ? (q.gabarito || '') : '',
                explanation: q ? (q.gabarito || '') : ''
            });
        } catch (err) {
            console.error('Falha ao registrar erro no caderno:', err);
        }
    }
    
    // Update original subject if in error review or simulado
    if (currentSubject === 'revisao_erros' || currentSubject === 'simulado') {
        if (q && q.ogSubject && q.ogIndex !== undefined) {
            try {
                const saved = localStorage.getItem('pr1_progress_' + q.ogSubject);
                if (saved) {
                    const data = JSON.parse(saved);
                    
                    if (!data.correctAnswers) data.correctAnswers = [];
                    if (!data.incorrectAnswers) data.incorrectAnswers = [];
                    if (!data.answeredQuestions) data.answeredQuestions = [];
                    
                    if (isCorrect) {
                        data.incorrectAnswers = data.incorrectAnswers.filter((idx: number) => idx !== q.ogIndex);
                        if (!data.correctAnswers.includes(q.ogIndex)) data.correctAnswers.push(q.ogIndex);
                    } else {
                        data.correctAnswers = data.correctAnswers.filter((idx: number) => idx !== q.ogIndex);
                        if (!data.incorrectAnswers.includes(q.ogIndex)) data.incorrectAnswers.push(q.ogIndex);
                    }
                    if (!data.answeredQuestions.includes(q.ogIndex)) data.answeredQuestions.push(q.ogIndex);
                    
                    localStorage.setItem('pr1_progress_' + q.ogSubject, JSON.stringify(data));
                }
            } catch(e) {}
        }
    }
    
    answeredQuestions.add(currentQuestionIndex);
    if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
    updateGridAndProgress();
};

let isUserManuallyScrollingGrid = false;
let userGridScrollTimeout: any = null;
let lastActiveQuestionIndexForScroll = -1;

function notifyUserGridInteraction() {
    isUserManuallyScrollingGrid = true;
    if (userGridScrollTimeout) clearTimeout(userGridScrollTimeout);
    userGridScrollTimeout = setTimeout(() => {
        isUserManuallyScrollingGrid = false;
    }, 3500);
}

function safelyScrollActiveGridBtnIntoView(gridEl: HTMLElement, force: boolean = false) {
    if (!gridEl) return;
    if (!force && isUserManuallyScrollingGrid) return;
    
    const activeBtn = gridEl.querySelector('.grid-btn.ring-2') as HTMLElement | null;
    if (!activeBtn) return;
    
    // Target specific scroll container or closest overflow-y-auto
    const scrollParent = (document.getElementById('quiz-grid-scroll-container') || gridEl.closest('.overflow-y-auto')) as HTMLElement | null;
    if (!scrollParent || scrollParent.scrollHeight <= scrollParent.clientHeight) return;
    
    // Attach interaction listener to detect if user is manually scrolling
    if (!(scrollParent as any).__hasGridScrollTracker) {
        (scrollParent as any).__hasGridScrollTracker = true;
        scrollParent.addEventListener('scroll', notifyUserGridInteraction, { passive: true });
        scrollParent.addEventListener('touchstart', notifyUserGridInteraction, { passive: true });
        scrollParent.addEventListener('touchmove', notifyUserGridInteraction, { passive: true });
        scrollParent.addEventListener('wheel', notifyUserGridInteraction, { passive: true });
    }
    
    const parentRect = scrollParent.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    
    // If the active button is already visible in the viewport, don't jump
    const isVisible = (btnRect.top >= parentRect.top + 8) && (btnRect.bottom <= parentRect.bottom - 8);
    if (isVisible && !force) return;
    
    const btnTop = activeBtn.offsetTop;
    const btnHeight = activeBtn.offsetHeight;
    const parentHeight = scrollParent.clientHeight;
    
    scrollParent.scrollTo({
        top: Math.max(0, btnTop - (parentHeight / 2) + (btnHeight / 2)),
        behavior: force ? 'auto' : 'smooth'
    });
}

function updateGridAndProgress(shouldSave: boolean = true) {
    const total = questions.length;
    if (total === 0) return;
    
    if (gridButtonElements.length !== total) {
        gridButtonElements = Array.from(questionGridEl.querySelectorAll('.grid-btn')) as HTMLButtonElement[];
    }

    for (let i = 0; i < gridButtonElements.length; i++) {
        const btn = gridButtonElements[i];
        if (!btn) continue;
        const isAnswered = answeredQuestions.has(i);
        const isCorrect = correctAnswers.has(i);
        const isIncorrect = incorrectAnswers.has(i);
        const isActive = i === currentQuestionIndex;
        
        let cls = 'grid-btn flex-grow-0 min-w-[40px] flex items-center justify-center w-full aspect-square rounded border text-xs font-bold transition-colors touch-manipulation cursor-pointer select-none ';
        
        if (isCorrect) {
            cls += 'border-green-600 bg-green-50 text-green-600 hover:bg-green-100';
        } else if (isIncorrect) {
            cls += 'border-red-600 bg-red-50 text-red-600 hover:bg-red-100';
        } else if (isAnswered) {
            cls += 'border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100';
        } else {
            cls += 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100';
        }
        
        if (isActive) {
            cls += ' ring-2 ring-blue-500 ring-offset-2';
            if (!isAnswered && !isCorrect && !isIncorrect) {
                cls += ' border-gray-300';
            }
        }
        
        if (btn.className !== cls) {
            btn.className = cls;
        }
    }

    const progressPercent = Math.round((answeredQuestions.size / total) * 100);
    progressTextEl.textContent = `${answeredQuestions.size} de ${total}`;
    progressBarEl.style.width = `${progressPercent}%`;
    if (shouldSave) {
        saveProgress();
    }
}

function loadQuestion(index: number, options?: { forceScrollTop?: boolean }) {
    if (questions.length === 0) return;
    questionRenderStartTime = Date.now();
    
    const isDifferentQuestion = (lastActiveQuestionIndexForScroll !== index);
    currentQuestionIndex = index;
    const q = questions[index];
    if (!q || typeof q !== "object") return;
    
    // Only reset scroll position to top when transitioning to a different question or explicitly requested
    if (isDifferentQuestion || options?.forceScrollTop) {
        const scrollContainer = document.getElementById('quiz-question-scroll-container') || (interactionAreaEl ? interactionAreaEl.closest('.overflow-y-auto') : null);
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0 });
        }
    }
    lastActiveQuestionIndexForScroll = index;
    
    // Update Headers
    questionCounterEl.textContent = `QUESTÃO ${index + 1}`;
    if (currentSubject === 'revisao_erros' && q.ogSubject) {
        const subNameMap: Record<string, string> = {
            'farmacologia': 'Farmacologia',
            'propedêutica': 'Propedêutica',
            'fisiopatologia': 'Fisiopatologia',
            'bases cirúrgicas': 'Bases Cirúrgicas',
            'iesc_iv': 'IESC IV',
            'iesc iv': 'IESC IV'
        };
        const prettySub = subNameMap[q.ogSubject] || q.ogSubject;
        questionTypeEl.textContent = `${q.type} • ${prettySub.toUpperCase()}`;
    } else {
        questionTypeEl.textContent = q.type;
    }
    questionTextEl.textContent = q.text;

    const qGraphicsEl = document.getElementById('question-graphics');
    if (qGraphicsEl) {
        if (q.graphicsHtml) {
            qGraphicsEl.innerHTML = q.graphicsHtml;
            qGraphicsEl.classList.remove('hidden');
        } else {
            qGraphicsEl.innerHTML = '';
            qGraphicsEl.classList.add('hidden');
        }
    }

    let realSubject = currentSubject;
    let realIndex = index;
    if (q.ogSubject && q.ogIndex !== undefined) { realSubject = q.ogSubject; realIndex = q.ogIndex; }
    if ((window as any).updateFavoriteIcon) (window as any).updateFavoriteIcon(realSubject, realIndex);

    // Render Interaction Area
    const isMultipleChoice = (q.interactionType === 'multiple-choice' || (Array.isArray(q.options) && q.options.length > 0));
    if (isMultipleChoice && q.options) {
        let optionsHtml = '<div class="space-y-3">';
        const isAnswered = answeredQuestions.has(index);
        let correctIndex = -1;
        
        if (isAnswered) {
            const match = q.gabarito.match(/Alternativa\s+([A-E])/i);
            if (match) {
                const correctLetter = match[1].toUpperCase();
                correctIndex = correctLetter.charCodeAt(0) - 65;
            }
        }
        
                const eliminatedSet = eliminatedOptionsMap.get(index) || new Set<number>();

        q.options.forEach((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i);
            const isEliminated = eliminatedSet.has(i);

            let labelClasses = 'mcq-label flex items-start p-4 border rounded-xl cursor-pointer transition-all group shadow-sm relative ';
            let letterClasses = 'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-bold mr-4 transition-all ';
            let textClasses = 'mt-1 transition-all flex-grow ';

            if (isEliminated) {
                labelClasses += ' border-gray-200 bg-gray-50 opacity-40 line-through ';
                letterClasses += ' border-gray-300 bg-gray-200 text-gray-400 ';
                textClasses += ' text-gray-400 line-through ';
            } else if (isAnswered) {
                labelClasses += ' pointer-events-none ';
                if (i === correctIndex) {
                    labelClasses += 'border-green-500 bg-green-50';
                    letterClasses += 'border-green-600 bg-green-600 text-white';
                    textClasses += 'text-green-900 font-medium';
                } else {
                    labelClasses += 'border-gray-200 bg-white opacity-50';
                    letterClasses += 'border-gray-300 text-gray-400';
                    textClasses += 'text-gray-500';
                }
            } else {
                labelClasses += 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 bg-white';
                letterClasses += 'border-gray-300 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500';
                textClasses += 'text-gray-700';
            }

            const eliminateBtnTitle = isEliminated ? 'Restaurar alternativa' : 'Eliminar alternativa (riscar)';
            const eliminateBtnClass = isEliminated ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-gray-400 hover:text-red-500 hover:bg-red-50 border-gray-200';

            optionsHtml += `
                <div class="flex items-center w-full">
                    <label id="mcq-label-${i}" class="${labelClasses} flex items-start flex-grow ${isEliminated ? 'pointer-events-none' : ''}">
                        <div id="mcq-letter-${i}" class="${letterClasses}">
                            ${letter}
                        </div>
                        <input type="radio" name="mcq" value="${i}" class="sr-only" ${isEliminated ? 'disabled' : ''} onchange="window.handleMCQChange(${i})">
                        <span id="mcq-text-${i}" class="${textClasses}">${opt}</span>
                    </label>
                    <button type="button" onclick="window.toggleEliminateOption(${index}, ${i})" title="${eliminateBtnTitle}" class="ml-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${eliminateBtnClass} flex-shrink-0 cursor-pointer bg-white shadow-sm flex items-center justify-center">
                        ${isEliminated ? 'Restaurar' : '✕'}
                    </button>
                </div>
            `;
        });
        optionsHtml += '</div>';
        interactionAreaEl.innerHTML = optionsHtml;
    } else if (q.interactionType === 'true-false') {
        interactionAreaEl.innerHTML = `
            <textarea class="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm" 
                      rows="5" placeholder="Avalie as afirmações e corrija as falsas..."></textarea>
        `;
    } else {
        interactionAreaEl.innerHTML = `
            <textarea class="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm" 
                      rows="5" placeholder="Escreva seus tópicos / rascunho de resposta aqui..."></textarea>
        `;
    }


    // Restore state if already answered
    if (answeredQuestions.has(index)) {
        feedbackAreaEl.classList.remove('hidden');
    const q = questions[currentQuestionIndex];
    
        btnShowAnswer.classList.add('hidden');
    
        
        feedbackTextEl.innerHTML = (q.gabarito || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    } else {
        feedbackAreaEl.classList.add('hidden');
        if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
        btnShowAnswer.classList.remove('hidden');
        
        feedbackTextEl.textContent = '';
    }

    // Prev/Next Button states
    (btnPrev as HTMLButtonElement).disabled = index === 0;
    btnPrev.classList.toggle('opacity-30', index === 0);
    btnPrev.classList.toggle('cursor-not-allowed', index === 0);

    
    if (index === questions.length - 1) {
        let finishLabel = 'FINALIZAR MÓDULO';
        if (currentMode === 'lesson') finishLabel = 'CONCLUIR AULA';
        else if (currentMode === 'simulado') finishLabel = 'FINALIZAR SIMULADO';
        else if (currentMode === 'review') finishLabel = 'CONCLUIR REVISÃO';
        btnNext.innerHTML = `<span>${finishLabel}</span><svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    } else {
        btnNext.innerHTML = '<span>PRÓXIMA</span><svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
    }

    const indexChanged = (lastActiveQuestionIndexForScroll !== index);
    lastActiveQuestionIndexForScroll = index;
    updateGridAndProgress();
    if (indexChanged) {
        safelyScrollActiveGridBtnIntoView(questionGridEl, false);
    }
}

(window as any).handleMCQChange = function (selectedIndex: number) {
    if (answeredQuestions.has(currentQuestionIndex)) return; // prevent re-answering visually if already locked
    
    const q = questions[currentQuestionIndex];
    // Find correct answer from gabarito
    const match = q.gabarito.match(/Alternativa\s+([A-E])/i);
    
    if (match) {
        const correctLetter = match[1].toUpperCase();
        const correctIndex = correctLetter.charCodeAt(0) - 65;
        
        const labels = document.querySelectorAll('.mcq-label');
        labels.forEach((label) => label.classList.add('pointer-events-none')); // disable further clicks
        
        const selectedLabel = document.getElementById(`mcq-label-${selectedIndex}`)!;
        const selectedLetterBox = document.getElementById(`mcq-letter-${selectedIndex}`)!;
        const selectedText = document.getElementById(`mcq-text-${selectedIndex}`)!;
        
        const isCorrect = (selectedIndex === correctIndex);
        const mcqTarget = (q && q.ogSubject) ? q.ogSubject : currentSubject;
        logQuestionPerformance(mcqTarget || 'geral', (q && q.ogIndex !== undefined) ? q.ogIndex : currentQuestionIndex, isCorrect, false);
        if (mcqTarget && mcqTarget !== 'revisao_erros' && mcqTarget !== 'simulado') {
            logDailyAnswer(mcqTarget, isCorrect);
        } else if (q && q.ogSubject) {
            logDailyAnswer(q.ogSubject, isCorrect);
        }

        if (currentSubject === 'revisao_erros') {
            const q = questions[currentQuestionIndex];
            if (q.ogSubject && q.ogIndex !== undefined) {
                updateSRS(q.ogSubject, q.ogIndex, isCorrect);
            }
        } else {
            updateSRS(currentSubject, currentQuestionIndex, isCorrect);
        }

        if (isCorrect) {
            
            playSound('correct');
            correctAnswers.add(currentQuestionIndex);
            
            if (currentSubject === 'revisao_erros') {
                const ogSubject = q.ogSubject;
                const ogIndex = q.ogIndex;
                if (ogSubject && ogIndex !== undefined) {
                    try {
                        const saved = localStorage.getItem('pr1_progress_' + ogSubject);
                        if (saved) {
                            const data = JSON.parse(saved);
                            if (data.incorrectAnswers) {
                                data.incorrectAnswers = data.incorrectAnswers.filter((idx: number) => idx !== ogIndex);
                                if (!data.correctAnswers) data.correctAnswers = [];
                                if (!data.correctAnswers.includes(ogIndex)) data.correctAnswers.push(ogIndex);
                                localStorage.setItem('pr1_progress_' + ogSubject, JSON.stringify(data));
                            }
                        }
                    } catch(e) {}
                }
            }
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#16a34a', '#15803d']
            });
            // Correct animation
            selectedLabel.classList.add('pop', 'border-green-500', 'bg-green-50');
            selectedLabel.classList.remove('border-gray-200', 'hover:border-blue-500', 'hover:bg-blue-50');
            selectedLetterBox.classList.add('border-green-600', 'bg-green-600', 'text-white');
            selectedLetterBox.classList.remove('border-gray-300', 'text-gray-400');
            selectedText.classList.add('text-green-900', 'font-medium');
        } else {
            
            playSound('incorrect');
            incorrectAnswers.add(currentQuestionIndex);

            // Log to Caderno de Erros linked to Drive materials
            try {
                const subForError = (q.ogSubject || currentSubject) as SubjectId;
                const chosenText = (q.options && q.options[selectedIndex]) ? q.options[selectedIndex] : `Alternativa ${String.fromCharCode(65 + selectedIndex)}`;
                const correctText = (correctIndex >= 0 && q.options && q.options[correctIndex]) ? q.options[correctIndex] : (q.gabarito || '');
                addErrorToNotebook({
                    questionIndex: (q.ogIndex !== undefined) ? q.ogIndex : currentQuestionIndex,
                    subject: subForError,
                    questionText: q.pergunta || q.title || '',
                    selectedOption: chosenText,
                    correctOption: correctText,
                    explanation: q.gabarito || '',
                });
            } catch (err) {
                console.error('Falha ao adicionar ao caderno de erros:', err);
            }

            // Incorrect animation
            selectedLabel.classList.add('shake', 'border-red-500', 'bg-red-50');
            selectedLabel.classList.remove('border-gray-200', 'hover:border-blue-500', 'hover:bg-blue-50');
            selectedLetterBox.classList.add('border-red-600', 'bg-red-600', 'text-white');
            selectedLetterBox.classList.remove('border-gray-300', 'text-gray-400');
            selectedText.classList.add('text-red-900', 'font-medium');
            
            // Highlight correct one
            const correctLabel = document.getElementById(`mcq-label-${correctIndex}`);
            if (correctLabel) {
                const correctLetterBox = document.getElementById(`mcq-letter-${correctIndex}`)!;
                const correctText = document.getElementById(`mcq-text-${correctIndex}`)!;
                
                correctLabel.classList.add('border-green-500', 'bg-green-50');
                correctLetterBox.classList.add('border-green-600', 'bg-green-600', 'text-white');
                correctText.classList.add('text-green-900', 'font-medium');
            }
        }
    }
    
    // Automatically show answer
    (window as any).showAnswer();
};

(window as any).showAnswer = function showAnswer() {
    const q = questions[currentQuestionIndex];
    if (!q) return;
    const isFirstTime = !answeredQuestions.has(currentQuestionIndex);
    
    // Check linked Drive materials for the question's subject
    const realSub = (q.ogSubject || currentSubject) as SubjectId;
    const driveMaterials = getLocalDriveMaterials().filter(m => m.discipline === realSub);
    const topDoc = driveMaterials[0];

    const sourceHtml = topDoc ? `
        <div class="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-1.5 text-gray-600">
                <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <span class="font-semibold">Fonte no Drive:</span>
                <span class="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-xs" title="${topDoc.name}">${topDoc.customTitle || topDoc.name}</span>
            </div>
            <a href="${topDoc.webViewLink}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-[11px] inline-flex items-center gap-1">
                <span>Ver Material de Origem</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
        </div>
    ` : '';

    feedbackTextEl.innerHTML = (q.gabarito || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') + sourceHtml;
    feedbackAreaEl.classList.remove('hidden');
    
    const isMultipleChoice = (q.interactionType === 'multiple-choice' || (Array.isArray(q.options) && q.options.length > 0));
    if (!isMultipleChoice && isFirstTime) {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.remove('hidden');
    } else {
        if(selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');
    }
    
    answeredQuestions.add(currentQuestionIndex);
    
    btnShowAnswer.classList.add('hidden');
    
    updateGridAndProgress();
};


(window as any).nextQuestion = function nextQuestion() {
    console.log("nextQuestion called", currentQuestionIndex, questions.length);
    if (currentQuestionIndex < questions.length - 1) {
        triggerTransitionAndLoad(currentQuestionIndex + 1, 'forward');
    } else {
        (window as any).finishTest();
    }
};

(window as any).prevQuestion = function prevQuestion() {
    if (currentQuestionIndex > 0) {
        triggerTransitionAndLoad(currentQuestionIndex - 1, 'backward');
    }
};

(window as any).goToQuestion = function goToQuestion(index: number) {
    if (index >= 0 && index < questions.length && index !== currentQuestionIndex) {
        triggerTransitionAndLoad(index, index > currentQuestionIndex ? 'forward' : 'backward');
    }
};

(window as any).finishTest = function finishTest() {
    if (simTimer) {
        clearInterval(simTimer);
        simTimer = null;
    }
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.classList.add('hidden');
        timerDisplay.classList.remove('flex');
    }

    saveProgress();

    if (currentMode === 'lesson' && currentLessonId) {
        const lessonData = findLessonById(currentLessonId);
        const lessonTitle = lessonData ? lessonData.lesson.title : 'Aula';
        const discId = lessonData ? lessonData.disciplineId : (currentSubject || 'fisiopatologia');
        
        try {
            localStorage.setItem(`pr1_lesson_completed_${currentLessonId}`, 'true');
        } catch (e) {}

        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });

        const correctsCount = correctAnswers.size;
        const totalLessonQ = questions.length;
        const pct = totalLessonQ > 0 ? Math.round((correctsCount / totalLessonQ) * 100) : 0;

        const existingModal = document.getElementById('lesson-completion-modal');
        if (existingModal) existingModal.remove();

        const completionModal = document.createElement('div');
        completionModal.id = 'lesson-completion-modal';
        completionModal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
        completionModal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center space-y-5">
                <div class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black">
                    ✓
                </div>
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Bloco de Aula Concluído</span>
                    <h3 class="text-xl font-black text-gray-900 mt-2">${lessonTitle}</h3>
                    <p class="text-xs text-gray-500 mt-1">Você concluiu com sucesso todas as ${totalLessonQ} questões deste bloco!</p>
                </div>
                
                <div class="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                        <span class="text-[11px] font-bold text-gray-400 uppercase">Acertos</span>
                        <p class="text-xl font-black text-emerald-600">${correctsCount} / ${totalLessonQ}</p>
                    </div>
                    <div>
                        <span class="text-[11px] font-bold text-gray-400 uppercase">Aproveitamento</span>
                        <p class="text-xl font-black text-blue-600">${pct}%</p>
                    </div>
                </div>

                <div class="space-y-2 pt-2">
                    <button onclick="document.getElementById('lesson-completion-modal')?.remove(); window.openLesson('${currentLessonId}');" class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all cursor-pointer">
                        Voltar para a Aula no Módulo
                    </button>
                    <button onclick="document.getElementById('lesson-completion-modal')?.remove(); window.startSubject('${discId}');" class="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all cursor-pointer">
                        Ir para o Banco Geral da Disciplina
                    </button>
                    <button onclick="document.getElementById('lesson-completion-modal')?.remove(); window.backToHome();" class="w-full py-2 px-4 text-gray-500 hover:text-gray-700 text-xs font-semibold transition-colors cursor-pointer">
                        Voltar ao Menu Principal
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(completionModal);
        (window as any).updateDashboardStats();
        return;
    }

    quizContainerEl.classList.add('hidden');
    endScreenEl.classList.remove('hidden');
    endScreenEl.classList.add('flex');
    
    // Calculate stats for all subjects
    const subjects = [
        { id: 'farmacologia', name: 'Farmaco', total: farmacologiaQuestions.length },
        { id: 'propedêutica', name: 'Propedêutica', total: propedeuticaQuestions.length },
        { id: 'fisiopatologia', name: 'Fisiopato', total: fisiopatologiaQuestions.length },
        { id: 'bases cirúrgicas', name: 'Bases Cir.', total: basesCirurgicasQuestions.length },
        { id: 'iesc_iv', name: 'IESC IV', total: iescIvQuestionsAll.length }
    ];
    
    const chartData = subjects.map(sub => {
        const saved = localStorage.getItem(`pr1_progress_${sub.id}`);
        let score = 0;
        if (saved) {
            try {
                const state = JSON.parse(saved);
                const corrects = state.correctAnswers ? state.correctAnswers.length : 0;
                const answered = state.answeredQuestions ? state.answeredQuestions.length : 0;
                if (answered > 0) {
                    score = (corrects / answered) * 100;
                }
            } catch(e) {}
        }
        return {
            name: sub.name,
            score: score
        };
    });
    
    setTimeout(() => {
        renderResultsChart('results-chart', chartData);
    }, 50);
    (window as any).updateDashboardStats();
};


function triggerTransitionAndLoad(index: number, direction: 'forward' | 'backward' = 'forward') {
    const outClass = direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction === 'forward' ? 'slide-in-right' : 'slide-in-left';
    
    quizContainerEl.classList.remove('fade-in', 'slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right');
    quizContainerEl.classList.add(outClass);
    
    setTimeout(() => {
        if (currentSubject === 'simulado') {
            (window as any).loadQuestionSimulado(index);
        } else {
            loadQuestion(index);
        }
        quizContainerEl.classList.remove(outClass);
        void quizContainerEl.offsetWidth; // trigger reflow
        quizContainerEl.classList.add(inClass);
    }, 300); // match animation duration
}




// --- Authentication & Drive Logic ---



const btnExportDrive = document.getElementById('btn-export-drive') as HTMLButtonElement;
if (btnExportDrive) {
    btnExportDrive.addEventListener('click', async () => {
        const selectEl = document.getElementById('export-subject-select') as HTMLSelectElement;
        const selectedValue = selectEl ? selectEl.value : 'todos';

        try {
            btnExportDrive.disabled = true;
            btnExportDrive.innerHTML = 'Gerando PDF...';
            
            // Gather stats
            const allSubjects = [
                { id: 'farmacologia', name: 'Farmaco' },
                { id: 'propedêutica', name: 'Propedêutica' },
                { id: 'fisiopatologia', name: 'Fisiopato' },
                { id: 'bases cirúrgicas', name: 'Bases Cir.' },
                { id: 'iesc_iv', name: 'IESC IV' }
            ];

            const subjects = selectedValue === 'todos' 
                ? allSubjects 
                : allSubjects.filter(sub => sub.id === selectedValue);

            const allQuestionsMap: Record<string, any[]> = {
                'farmacologia': farmacologiaQuestions,
                'propedêutica': propedeuticaQuestions,
                'fisiopatologia': fisiopatologiaQuestions,
                'bases cirúrgicas': basesCirurgicasQuestions,
                'iesc_iv': iescIvQuestionsAll
            };
            
            const doc = new jsPDF();
            let yPos = 20;
            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();

            const checkPageBreak = (neededSpace: number) => {
                if (yPos + neededSpace >= pageHeight - 10) {
                    doc.addPage();
                    yPos = 20;
                }
            };
            
            doc.setFontSize(18);
            doc.text("Relatório de Progresso - Banco de Questões PR1", 14, yPos);
            yPos += 15;

            // Chart logic
            const chartContainer = document.getElementById('results-chart');
            if (chartContainer) {
                try {
                    const canvas = await toCanvas(chartContainer, { backgroundColor: '#ffffff', pixelRatio: 2, skipFonts: true });
                    const chartImageData = canvas.toDataURL('image/jpeg', 1.0);
                    // Approximate dimensions to fit the page
                    const imgWidth = pageWidth - 28;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    checkPageBreak(imgHeight + 10);
                    doc.addImage(chartImageData, 'JPEG', 14, yPos, imgWidth, imgHeight);
                    yPos += imgHeight + 10;
                } catch (err) {
                    console.error("Erro ao gerar imagem do gráfico", err);
                }
            }
            
            doc.setFontSize(12);
            subjects.forEach(sub => {
                const saved = localStorage.getItem(`pr1_progress_${sub.id}`);
                let score = 0;
                let corrects: number[] = [];
                let answereds: number[] = [];
                if (saved) {
                    try {
                        const state = JSON.parse(saved);
                        corrects = state.correctAnswers || [];
                        answereds = state.answeredQuestions || [];
                        if (answereds.length > 0) {
                            score = Math.round((corrects.length / answereds.length) * 100);
                        }
                    } catch(e) {}
                }
                
                checkPageBreak(35);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text(`Matéria: ${sub.name}`, 14, yPos);
                yPos += 7;
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.text(`Respondidas: ${answereds.length}`, 14, yPos);
                yPos += 7;
                doc.text(`Acertos: ${corrects.length}`, 14, yPos);
                yPos += 7;
                doc.text(`Aproveitamento: ${score}%`, 14, yPos);
                yPos += 12;

                const qList = allQuestionsMap[sub.id] || [];
                const incorrects = answereds.filter(i => !corrects.includes(i));
                
                if (corrects.length > 0) {
                     checkPageBreak(15);
                     doc.setFont("helvetica", "bold");
                     doc.setFontSize(12);
                     doc.text("Questões Corretas:", 14, yPos);
                     yPos += 8;

                     corrects.forEach(idx => {
                         const q = qList[idx];
                         if (q) {
                             checkPageBreak(20);
                             doc.setFont("helvetica", "bold");
                             doc.setFontSize(10);
                             doc.text(`Questão ${idx + 1}:`, 14, yPos);
                             yPos += 5;
                             
                             doc.setFont("helvetica", "normal");
                             const qTextLines = doc.splitTextToSize(q.text || "Sem texto.", pageWidth - 28);
                             qTextLines.forEach((line: string) => {
                                 checkPageBreak(6);
                                 doc.text(line, 14, yPos);
                                 yPos += 5;
                             });
                             
                             if (q.options && Array.isArray(q.options)) {
                                 yPos += 2;
                                 q.options.forEach((opt: any) => {
                                     const optLines = doc.splitTextToSize(opt, pageWidth - 32);
                                     optLines.forEach((line: string) => {
                                         checkPageBreak(6);
                                         doc.text(line, 18, yPos);
                                         yPos += 5;
                                     });
                                     yPos += 2;
                                 });
                             }

                             
                             yPos += 4;
                         }
                     });
                }

                if (incorrects.length > 0) {
                     checkPageBreak(15);
                     doc.setFont("helvetica", "bold");
                     doc.setFontSize(12);
                     doc.text("Questões Incorretas (Revisão):", 14, yPos);
                     yPos += 8;
                     
                     incorrects.forEach(idx => {
                         const q = qList[idx];
                         if (q) {
                             checkPageBreak(20);
                             doc.setFont("helvetica", "bold");
                             doc.setFontSize(10);
                             doc.text(`Questão ${idx + 1}:`, 14, yPos);
                             yPos += 5;
                             
                             doc.setFont("helvetica", "normal");
                             const qTextLines = doc.splitTextToSize(q.text || "Sem texto.", pageWidth - 28);
                             qTextLines.forEach((line: string) => {
                                 checkPageBreak(6);
                                 doc.text(line, 14, yPos);
                                 yPos += 5;
                             });
                             
                             if (q.options && Array.isArray(q.options)) {
                                 yPos += 2;
                                 q.options.forEach((opt: any) => {
                                     const optLines = doc.splitTextToSize(opt, pageWidth - 32);
                                     optLines.forEach((line: string) => {
                                         checkPageBreak(6);
                                         doc.text(line, 18, yPos);
                                         yPos += 5;
                                     });
                                     yPos += 2;
                                 });
                             }

                             
                             const rawGabarito = q.gabarito || "Sem gabarito detalhado.";
                             const gabaritoText = rawGabarito.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
                             doc.setFont("helvetica", "italic");
                             const gLines = doc.splitTextToSize("Gabarito Comentado: " + gabaritoText, pageWidth - 28);
                             yPos += 2;
                             gLines.forEach((line: string) => {
                                 checkPageBreak(6);
                                 doc.text(line, 14, yPos);
                                 yPos += 5;
                             });
                             
                             yPos += 6;
                         }
                     });
                }
                
                yPos += 10;
            });
            
            doc.save(`Progresso_Simulado_${new Date().toISOString().split('T')[0]}.pdf`);
            
        } catch (error: any) {
            console.error(error);
            btnExportDrive.innerHTML = 'Erro: ' + error.message;
            setTimeout(() => {
                btnExportDrive.disabled = false;
                btnExportDrive.innerHTML = `
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Baixar Relatório em PDF
                `;
            }, 3000);
            return;
        } 
        
        btnExportDrive.disabled = false;
        btnExportDrive.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Baixar Relatório em PDF
            `;
    });
}

// --- Dark Mode ---
(window as any).toggleDarkMode = function() {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle('dark');
    const isDark = htmlEl.classList.contains('dark');
    
    // Animate toggle switch
    const toggleCircle = document.querySelector('#dark-mode-toggle div');
    const toggleBg = document.getElementById('dark-mode-toggle');
    if (toggleCircle && toggleBg) {
        if (isDark) {
            toggleCircle.classList.add('translate-x-6');
            toggleBg.classList.add('bg-blue-600');
            toggleBg.classList.remove('bg-gray-200');
        } else {
            toggleCircle.classList.remove('translate-x-6');
            toggleBg.classList.remove('bg-blue-600');
            toggleBg.classList.add('bg-gray-200');
        }
    }
    
    // Save preference
    localStorage.setItem('pr1_dark_mode', isDark ? 'true' : 'false');
};

// Check dark mode on load
function initTheme() {
    const savedTheme = localStorage.getItem('pr1_dark_mode');
    if (savedTheme === 'true') {
        (window as any).toggleDarkMode(); // this will set it and animate the button
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// --- Métricas ---
function renderDetailedMetrics() {
    const metricsView = document.getElementById('view-metrics');
    const isMetricsVisible = metricsView && !metricsView.classList.contains('hidden');

    // Renderiza o gráfico de evolução dos últimos 30 dias por matéria apenas quando a aba estiver visível
    const evoEl = document.getElementById('evolution-chart');
    if (evoEl && isMetricsVisible) {
        requestAnimationFrame(() => {
            renderEvolutionChart('evolution-chart');
        });
    }

    const container = document.getElementById('metrics-container');
    if (!container) return;
    
    const subjects = [
        { id: 'farmacologia', title: 'Farmacologia', total: farmacologiaQuestions.length },
        { id: 'propedêutica', title: 'Propedêutica', total: propedeuticaQuestions.length },
        { id: 'fisiopatologia', title: 'Fisiopatologia', total: fisiopatologiaQuestions.length },
        { id: 'bases_cirurgicas', title: 'Bases Cirúrgicas', total: basesCirurgicasQuestions.length, internal: 'bases cirúrgicas' },
        { id: 'iesc_iv', title: 'IESC IV', total: iescIvQuestionsAll.length, internal: 'iesc_iv' }
    ];

    let html = '';
    
    subjects.forEach(sub => {
        const internalId = sub.internal || sub.id;
        const saved = localStorage.getItem('pr1_progress_' + internalId);
        
        let ans = 0;
        let corr = 0;
        let incorr = 0;
        
        if (saved) {
            try {
                const data = JSON.parse(saved);
                ans = data.answeredQuestions ? data.answeredQuestions.length : 0;
                corr = data.correctAnswers ? data.correctAnswers.length : 0;
                incorr = data.incorrectAnswers ? data.incorrectAnswers.length : 0;
            } catch(e) {}
        }
        
        const pct = sub.total > 0 ? Math.round((ans / sub.total) * 100) : 0;
        const acc = ans > 0 ? Math.round((corr / ans) * 100) : 0;
        
        html += `
            <div class="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <div class="flex justify-between items-end mb-2">
                    <h4 class="font-bold text-gray-900">${sub.title}</h4>
                    <span class="text-sm font-bold ${acc >= 70 ? 'text-emerald-600' : (acc >= 40 ? 'text-orange-500' : 'text-red-500')}">${acc}% acerto</span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div class="bg-blue-600 h-full rounded-full transition-all" style="width: ${pct}%"></div>
                    </div>
                    <span class="text-xs font-bold text-gray-500 w-16 text-right">${ans} / ${sub.total}</span>
                </div>
                <div class="flex space-x-4 mt-2 text-xs">
                    <div class="flex items-center text-gray-500"><div class="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></div>${corr} corretas</div>
                    <div class="flex items-center text-gray-500"><div class="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>${incorr} erradas</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}


// --- Simulado Cronometrado ---
let simConfig = { q: 20, t: 30, subject: "all" };
let simTimer: any = null;
let simTimeRemaining = 0;

(window as any).selectSimuladoQ = function(val: number) {
    simConfig.q = val;
    [20, 40, 80].forEach(n => {
        const btn = document.getElementById('btn-sim-q-' + n);
        if(btn) {
            if(n === val) {
                btn.className = 'btn-sim-q py-3 rounded-xl border-2 border-orange-500 bg-orange-50 text-orange-700 font-bold';
            } else {
                btn.className = 'btn-sim-q py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50';
            }
        }
    });
};

(window as any).selectSimuladoT = function(val: number) {
    simConfig.t = val;
    [30, 60, 120].forEach(n => {
        const btn = document.getElementById('btn-sim-t-' + n);
        if(btn) {
            if(n === val) {
                btn.className = 'btn-sim-t py-3 rounded-xl border-2 border-orange-500 bg-orange-50 text-orange-700 font-bold';
            } else {
                btn.className = 'btn-sim-t py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50';
            }
        }
    });
};

(window as any).selectSimuladoSubject = function(val: string) {
    simConfig.subject = val;
};

(window as any).startSimulado = function() {
    // Collect all questions
    let allQ = [
        ...(farmacologiaQuestions || []).map((q, idx) => ({...q, ogSubject: 'farmacologia', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(propedeuticaQuestions || []).map((q, idx) => ({...q, ogSubject: 'propedêutica', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(fisiopatologiaQuestions || []).map((q, idx) => ({...q, ogSubject: 'fisiopatologia', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(basesCirurgicasQuestions || []).map((q, idx) => ({...q, ogSubject: 'bases cirúrgicas', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2),
        ...(iescIvQuestionsAll || []).map((q, idx) => ({...q, ogSubject: 'iesc_iv', ogIndex: idx})).filter(q => q && Object.keys(q).length > 2)
    ]; // Filter out any empty mapped items
    
    // Filter by selected subject
    if (simConfig.subject && simConfig.subject !== 'all') {
        allQ = allQ.filter(q => q && q.ogSubject === simConfig.subject);
    }
    
    // Shuffle and pick
    for (let i = allQ.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQ[i], allQ[j]] = [allQ[j], allQ[i]];
    }
    
    const selectedQ = allQ.slice(0, Math.min(simConfig.q, allQ.length));
    
    // Set global test state
    currentSubject = 'simulado';
    currentMode = 'simulado';
    currentLessonId = null;
    questions = selectedQ;
    currentQuestionIndex = 0;
    answeredQuestions.clear();
    eliminatedOptionsMap.clear();
    correctAnswers.clear();
    incorrectAnswers.clear();
    
    // UI Update
    document.getElementById('header-subject-title')!.textContent = 'Simulado (' + simConfig.q + 'Q)';
    
    // Start timer
    simTimeRemaining = simConfig.t * 60;
    const timerDisplay = document.getElementById('timer-display');
    if(timerDisplay) {
        timerDisplay.classList.remove('hidden');
        timerDisplay.classList.add('flex');
    }
    
    updateTimerDisplay();
    clearInterval(simTimer);
    simTimer = setInterval(() => {
        simTimeRemaining--;
        updateTimerDisplay();
        if(simTimeRemaining <= 0) {
            clearInterval(simTimer);
            showToast('Tempo esgotado no simulado!');
            (window as any).finishTest();
        }
    }, 1000);
    
    // Init Grid and Show
    appScreenEl.classList.remove('hidden');
    appScreenEl.classList.add('flex');
    homeScreenEl.classList.add('hidden');
    
    if (questions.length === 0) {
        emptyStateEl.classList.remove('hidden');
        quizContainerEl.classList.add('hidden');
    } else {
        emptyStateEl.classList.add('hidden');
        quizContainerEl.classList.remove('hidden');
        quizContainerEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-left', 'slide-out-right', 'fade-in');
        quizContainerEl.classList.add('fade-in');
    }
    
    // Create grid and load Q0
    isUserManuallyScrollingGrid = false;
    lastActiveQuestionIndexForScroll = -1;
    (window as any).initGridSimulado();
    (window as any).loadQuestionSimulado(0);
    setTimeout(() => safelyScrollActiveGridBtnIntoView(questionGridEl, true), 60);
};

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    if(!timerDisplay) return;
    
    const h = Math.floor(simTimeRemaining / 3600);
    const m = Math.floor((simTimeRemaining % 3600) / 60);
    const s = simTimeRemaining % 60;
    
    timerDisplay.textContent = 
        String(h).padStart(2, '0') + ':' + 
        String(m).padStart(2, '0') + ':' + 
        String(s).padStart(2, '0');
        
    if(simTimeRemaining < 300) {
        timerDisplay.classList.remove('bg-orange-100', 'text-orange-700');
        timerDisplay.classList.add('bg-red-100', 'text-red-700', 'animate-pulse');
    } else {
        timerDisplay.classList.add('bg-orange-100', 'text-orange-700');
        timerDisplay.classList.remove('bg-red-100', 'text-red-700', 'animate-pulse');
    }
}

// We need special versions of initGrid and loadQuestion because they are encapsulated in the main scope
(window as any).initGridSimulado = function() {
    questionGridEl.innerHTML = '';
    gridButtonElements = [];
    const fragment = document.createDocumentFragment();
    const count = questions.length;
    for (let i = 0; i < count; i++) {
        const btn = document.createElement('button');
        btn.className = 'grid-btn flex-grow-0 min-w-[40px] flex items-center justify-center w-full aspect-square rounded border text-xs font-bold transition-colors touch-manipulation cursor-pointer select-none border-gray-200 bg-white text-gray-500 hover:bg-gray-100';
        btn.textContent = (i + 1).toString().padStart(2, '0');
        btn.dataset.idx = i.toString();
        gridButtonElements.push(btn);
        fragment.appendChild(btn);
    }
    questionGridEl.appendChild(fragment);
};

(window as any).loadQuestionSimulado = function(index: number, options?: { forceScrollTop?: boolean }) {
    if (questions.length === 0) return;
    questionRenderStartTime = Date.now();
    const isDifferentQuestion = (lastActiveQuestionIndexForScroll !== index);
    currentQuestionIndex = index;
    const q = questions[index];
    if (!q || typeof q !== "object") return;
    
    // Only reset scroll position to top when question actually changes or explicitly forced
    if (isDifferentQuestion || options?.forceScrollTop) {
        const scrollContainer = document.getElementById('quiz-question-scroll-container') || (interactionAreaEl ? interactionAreaEl.closest('.overflow-y-auto') : null);
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0 });
        }
    }
    
    questionCounterEl.textContent = `QUESTÃO ${index + 1}`;
    questionTypeEl.textContent = q.type + (q.ogSubject ? ' • ' + q.ogSubject : '');
    questionTextEl.textContent = q.text;

    const qGraphicsSimuladoEl = document.getElementById('question-graphics');
    if (qGraphicsSimuladoEl) {
        if (q.graphicsHtml) {
            qGraphicsSimuladoEl.innerHTML = q.graphicsHtml;
            qGraphicsSimuladoEl.classList.remove('hidden');
        } else {
            qGraphicsSimuladoEl.innerHTML = '';
            qGraphicsSimuladoEl.classList.add('hidden');
        }
    }

    if (btnShowAnswer) btnShowAnswer.classList.add('hidden');
    if (selfAssessAreaEl) selfAssessAreaEl.classList.add('hidden');

    let realSubject = currentSubject;
    let realIndex = index;
    if (q.ogSubject && q.ogIndex !== undefined) { realSubject = q.ogSubject; realIndex = q.ogIndex; }
    if ((window as any).updateFavoriteIcon) (window as any).updateFavoriteIcon(realSubject, realIndex);
    
    const isAnswered = answeredQuestions.has(index);
    let correctIndex = -1;
    
    if (q.gabarito) {
        const match = q.gabarito.match(/Alternativa\s+([A-E])/i);
        if (match) {
            correctIndex = match[1].toUpperCase().charCodeAt(0) - 65;
        }
    }
    
    const isMultipleChoice = (q.interactionType === 'multiple-choice' || (Array.isArray(q.options) && q.options.length > 0));
    if (isMultipleChoice && q.options) {
        let optionsHtml = '<div class="space-y-3">';
        
        q.options.forEach((opt: string, i: number) => {
            const letter = String.fromCharCode(65 + i);
            
            let labelClasses = 'mcq-label flex items-start p-4 border rounded-xl cursor-pointer transition-all group shadow-sm ';
            let letterClasses = 'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-bold mr-4 transition-all ';
            let textClasses = 'mt-1 transition-all ';
            
            if (isAnswered) {
                labelClasses += ' pointer-events-none ';
                if (i === correctIndex) {
                    labelClasses += 'border-green-500 bg-green-50';
                    letterClasses += 'border-green-600 bg-green-600 text-white';
                    textClasses += 'text-green-900 font-medium';
                } else {
                    labelClasses += 'border-gray-200 bg-white opacity-50';
                    letterClasses += 'border-gray-300 text-gray-400';
                    textClasses += 'text-gray-500';
                }
            } else {
                labelClasses += 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 bg-white';
                letterClasses += 'border-gray-300 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500';
                textClasses += 'text-gray-700';
            }
            
            optionsHtml += `
                <label id="mcq-label-${i}" class="${labelClasses}">
                    <div id="mcq-letter-${i}" class="${letterClasses}">
                        ${letter}
                    </div>
                    <input type="radio" name="mcq" value="${i}" class="sr-only" onchange="window.handleMCQChangeSimulado(${i}, ${i === correctIndex})">
                    <span id="mcq-text-${i}" class="${textClasses}">${opt}</span>
                </label>
            `;
        });
        
        optionsHtml += '</div>';
        interactionAreaEl.innerHTML = optionsHtml;
        
        // Hide feedback area since this is a simulado
        feedbackAreaEl.classList.add('hidden');
        feedbackAreaEl.classList.remove('block');
        
    } else {
        // Fallback for textarea (discursive)
        interactionAreaEl.innerHTML = `
            <textarea class="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none shadow-sm" 
                      rows="5" placeholder="Escreva sua resposta (simulado)..."></textarea>
            <div class="mt-4 flex justify-end">
                <button onclick="(window as any).recordSelfAssessmentSimulado(true)" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Marcar como respondida</button>
            </div>
        `;
        feedbackAreaEl.classList.add('hidden');
        feedbackAreaEl.classList.remove('block');
    }
    
    // Update Grid and progress with cached element references
    const total = questions.length;
    if (gridButtonElements.length !== total) {
        gridButtonElements = Array.from(questionGridEl.querySelectorAll('.grid-btn')) as HTMLButtonElement[];
    }
    for (let i = 0; i < gridButtonElements.length; i++) {
        const btn = gridButtonElements[i];
        if (!btn) continue;
        const isAns = answeredQuestions.has(i);
        const isCorr = correctAnswers.has(i);
        const isInc = incorrectAnswers.has(i);
        const isActive = i === index;
        
        let cls = 'grid-btn flex-grow-0 min-w-[40px] flex items-center justify-center w-full aspect-square rounded border text-xs font-bold transition-colors touch-manipulation cursor-pointer select-none ';
        if (isCorr) {
            cls += 'border-green-600 bg-green-50 text-green-600 hover:bg-green-100';
        } else if (isInc) {
            cls += 'border-red-600 bg-red-50 text-red-600 hover:bg-red-100';
        } else if (isAns) {
            cls += 'border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100';
        } else {
            cls += 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100';
        }
        
        if (isActive) {
            cls += ' ring-2 ring-blue-500 ring-offset-2';
            if (!isAns && !isCorr && !isInc) {
                cls += ' border-gray-300';
            }
        }
        if (btn.className !== cls) {
            btn.className = cls;
        }
    }
    
    const indexChanged = (lastActiveQuestionIndexForScroll !== index);
    lastActiveQuestionIndexForScroll = index;
    if (indexChanged) {
        safelyScrollActiveGridBtnIntoView(questionGridEl, false);
    }
    
    const progressPercent = Math.round((answeredQuestions.size / questions.length) * 100);
    progressTextEl.textContent = `${answeredQuestions.size} de ${questions.length}`;
    progressBarEl.style.width = `${progressPercent}%`;
};

(window as any).handleMCQChangeSimulado = function(selectedIndex: number, isCorrect: boolean) {
    if (answeredQuestions.has(currentQuestionIndex)) return;
    
    (window as any).recordSelfAssessment(isCorrect);
    (window as any).loadQuestionSimulado(currentQuestionIndex, { forceScrollTop: false });
};

(window as any).recordSelfAssessmentSimulado = function(isCorrect: boolean) {
    (window as any).recordSelfAssessment(isCorrect);
    (window as any).loadQuestionSimulado(currentQuestionIndex, { forceScrollTop: false });
};


// Override original loadQuestion to check if simulado
const ogLoadQuestion = (window as any).goToQuestion || function(i:number){ loadQuestion(i); };
(window as any).goToQuestion = function(index: number) {
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('quiz-sidebar');
        const overlay = document.getElementById('quiz-sidebar-overlay');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            overlay?.classList.add('hidden');
        }
    }
    const isDifferent = (lastActiveQuestionIndexForScroll !== index);
    if (isDifferent) {
        const scrollContainer = document.getElementById('quiz-question-scroll-container') || (interactionAreaEl ? interactionAreaEl.closest('.overflow-y-auto') : null);
        if (scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0 });
        }
    }
    lastActiveQuestionIndexForScroll = index;
    if(currentSubject === 'simulado') {
        (window as any).loadQuestionSimulado(index, { forceScrollTop: isDifferent });
    } else {
        ogLoadQuestion(index);
    }
};

(window as any).toggleQuizSidebar = function() {
    const sidebar = document.getElementById('quiz-sidebar');
    const overlay = document.getElementById('quiz-sidebar-overlay');
    if (!sidebar) return;
    const isHidden = sidebar.classList.contains('-translate-x-full');
    if (isHidden) {
        sidebar.classList.remove('-translate-x-full');
        overlay?.classList.remove('hidden');
        if (!isUserManuallyScrollingGrid) {
            safelyScrollActiveGridBtnIntoView(questionGridEl, false);
        }
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay?.classList.add('hidden');
    }
};

// Also patch backToHome to clear timer
const ogBackToHome = (window as any).backToHome;
(window as any).backToHome = function() {
    clearInterval(simTimer);
    const timerDisplay = document.getElementById('timer-display');
    if(timerDisplay) {
        timerDisplay.classList.add('hidden');
        timerDisplay.classList.remove('flex');
    }
    const quizSidebar = document.getElementById('quiz-sidebar');
    const quizOverlay = document.getElementById('quiz-sidebar-overlay');
    if (quizSidebar && window.innerWidth < 768) {
        quizSidebar.classList.add('-translate-x-full');
        quizOverlay?.classList.add('hidden');
    }
    ogBackToHome();
};

// --- Navigation Logic ---
(window as any).toggleSidebar = function() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

(window as any).switchTab = function(tabId: string) {
    // Close mobile main sidebar if open
    if (window.innerWidth < 1024) {
        const sidebar = document.getElementById('main-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            overlay?.classList.add('hidden');
        }
    }

    // Reset main scroll position
    const mainScroll = document.querySelector('#home-screen main');
    if (mainScroll) {
        mainScroll.scrollTop = 0;
    }
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0 });
    }

    // All available views in home screen
    const allViews = [
        'dashboard', 'metrics', 'simulado', 'srs', 'favorites',
        'library', 'errors', 'discipline-detail', 'lesson-detail'
    ];

    // Hide all views
    allViews.forEach(id => {
        const el = document.getElementById('view-' + id);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('block');
        }
    });
    
    // Show selected view
    const activeView = document.getElementById('view-' + tabId);
    if (activeView) {
        activeView.classList.remove('hidden');
        activeView.classList.add('block');
    }
    
    // Update active tab styles in sidebar
    const tabs = ['dashboard', 'metrics', 'simulado', 'srs', 'favorites', 'library', 'errors'];
    tabs.forEach(id => {
        const btn = document.getElementById('tab-' + id);
        if (btn) {
            if (id === tabId) {
                if (id === "srs") {
                    btn.className = "w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-bold transition-colors";
                } else if (id === "errors") {
                    btn.className = "w-full flex items-center space-x-3 px-4 py-3 bg-rose-50 text-rose-700 rounded-xl font-bold transition-colors";
                } else {
                    btn.className = "w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold transition-colors";
                }
            } else {
                if (id === "srs") {
                    btn.className = "w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-bold transition-colors";
                } else if (id === "errors") {
                    btn.className = "w-full flex items-center space-x-3 px-4 py-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl font-bold transition-colors";
                } else {
                    btn.className = "w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold transition-colors";
                }
            }
        }
    });
    
    if (tabId === "favorites") {
        (window as any).renderFavorites();
    }
    if (tabId === "metrics") {
        requestAnimationFrame(() => {
            renderDetailedMetrics();
        });
    }
    if (tabId === "srs") {
        (window as any).renderSRSCalendar();
        setTimeout(() => setupHorizontalScroll('srs-calendar-list'), 50);
    }
    if (tabId === "library") {
        const container = document.getElementById('view-library');
        if (container) {
            container.innerHTML = renderAcademicLibraryView(activeLibraryCategoryTab);
            setTimeout(() => setupHorizontalScroll('library-category-tabs-container'), 50);
        }
    }
    if (tabId === "errors") {
        const container = document.getElementById('view-errors');
        if (container) {
            container.innerHTML = renderErrorNotebookView();
        }
    }

    // Change Header subtitle
    const subtitle = document.getElementById('header-subtitle');
    if (subtitle) {
        if (tabId === 'dashboard') {
            subtitle.textContent = 'Pronto para a revisão de hoje? Escolha um módulo.';
        } else if (tabId === 'metrics') {
            subtitle.textContent = 'Acompanhe seu desempenho detalhado.';
        } else if (tabId === 'simulado') {
            subtitle.textContent = 'Treine sob pressão do relógio.';
        } else if (tabId === 'srs') {
            subtitle.textContent = 'Revisão espaçada inteligente por disciplina e retenção de erros.';
        } else if (tabId === 'favorites') {
            subtitle.textContent = 'Suas questões favoritadas e marcadas para estudo.';
        } else if (tabId === 'library') {
            subtitle.textContent = 'Materiais oficiais, slides e apostilas vinculados ao Google Drive.';
        } else if (tabId === 'errors') {
            subtitle.textContent = 'Caderno de erros para estudo orientado aos pontos fracos e materiais.';
        } else if (tabId === 'discipline-detail') {
            subtitle.textContent = 'Plano de estudos acadêmico e aulas do módulo.';
        } else if (tabId === 'lesson-detail') {
            subtitle.textContent = 'Conteúdo da aula, objetivos, materiais do Drive e questões.';
        }
    }

    // Close sidebar on mobile after clicking
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
        sidebar.classList.add('-translate-x-full');
        overlay?.classList.add('hidden');
    }
};

document.querySelectorAll('#rv-card, .rv-barra').forEach(el => el.remove());

if ((window as any).updateDashboardStats) {
    (window as any).updateDashboardStats();
}

let currentSRSCalendarFilter: string = 'all';

(window as any).filterSRSCalendar = function(subjectId: string) {
    const norm = (subjectId && subjectId !== 'all') ? normalizeSubjectId(subjectId) : 'all';
    currentSRSCalendarFilter = norm;
    (window as any).renderSRSCalendar(norm);
};

(window as any).renderSRSCalendar = function(filteredSubject?: string) {
    if (filteredSubject) {
        currentSRSCalendarFilter = (filteredSubject && filteredSubject !== 'all') ? normalizeSubjectId(filteredSubject) : 'all';
    }
    const filter = currentSRSCalendarFilter || 'all';
    
    // Sync select dropdown if it exists
    const filterSelect = document.getElementById('srs-calendar-filter') as HTMLSelectElement | null;
    if (filterSelect && filterSelect.value !== filter) {
        filterSelect.value = filter;
    }

    const srsData = JSON.parse(localStorage.getItem('pr1_srs') || '{}');
    const now = new Date();
    // Normalize "today" to start of the day
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    const subjectsConfig = [
        { id: 'farmacologia', name: 'Farmacologia', shortName: 'Farmaco', badgeId: 'srs-subject-badge-farmacologia', btnId: 'srs-btn-farmacologia', src: farmacologiaQuestions },
        { id: 'propedêutica', name: 'Propedêutica', shortName: 'Proped.', badgeId: 'srs-subject-badge-propedêutica', btnId: 'srs-btn-propedêutica', src: propedeuticaQuestions },
        { id: 'fisiopatologia', name: 'Fisiopatologia', shortName: 'Fisiopato', badgeId: 'srs-subject-badge-fisiopatologia', btnId: 'srs-btn-fisiopatologia', src: fisiopatologiaQuestions },
        { id: 'bases cirúrgicas', name: 'Bases Cirúrgicas', shortName: 'Bases Cir.', badgeId: 'srs-subject-badge-bases-cirurgicas', btnId: 'srs-btn-bases-cirurgicas', src: basesCirurgicasQuestions },
        { id: 'iesc_iv', name: 'IESC IV', shortName: 'IESC IV', badgeId: 'srs-subject-badge-iesc_iv', btnId: 'srs-btn-iesc_iv', src: iescIvQuestionsAll }
    ];

    let totalTodayCount = 0;
    const subjectTodayCounts: Record<string, number> = {};
    const subjectFutureCounts: Record<string, Record<number, number>> = {};
    const totalFutureCounts: Record<number, number> = {};

    subjectsConfig.forEach(sub => {
        let subToday = 0;
        subjectFutureCounts[sub.id] = {};
        
        let legacyIncorrect: number[] = [];
        const saved = localStorage.getItem('pr1_progress_' + sub.id);
        if (saved) {
            try { legacyIncorrect = JSON.parse(saved).incorrectAnswers || []; } catch (e) {}
        }
        
        const subSrs = srsData[sub.id] || {};
        const indicesToCheck = new Set<number>();
        Object.keys(subSrs).forEach(k => {
            const num = Number(k);
            if (!isNaN(num)) indicesToCheck.add(num);
        });
        legacyIncorrect.forEach(idx => indicesToCheck.add(idx));
        
        indicesToCheck.forEach((idx) => {
            let needsReview = false;
            const item = subSrs[idx];
            if (item) {
                const reviewTime = item.nextReview;
                if (!reviewTime || isNaN(reviewTime)) {
                    needsReview = true;
                } else {
                    const rDate = new Date(reviewTime);
                    const reviewStart = new Date(rDate.getFullYear(), rDate.getMonth(), rDate.getDate()).getTime();
                    
                    if (reviewStart <= todayStart) {
                        needsReview = true;
                    } else {
                        subjectFutureCounts[sub.id][reviewStart] = (subjectFutureCounts[sub.id][reviewStart] || 0) + 1;
                        totalFutureCounts[reviewStart] = (totalFutureCounts[reviewStart] || 0) + 1;
                    }
                }
            } else if (legacyIncorrect.includes(idx)) {
                needsReview = true;
            }
            
            if (needsReview) {
                subToday++;
                totalTodayCount++;
            }
        });
        
        subjectTodayCounts[sub.id] = subToday;

        // Update individual subject UI card in view-srs
        const badgeEl = document.getElementById(sub.badgeId);
        if (badgeEl) {
            if (subToday > 0) {
                badgeEl.textContent = `${subToday} ${subToday === 1 ? 'pendente' : 'pendentes'}`;
                badgeEl.className = 'px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-200';
            } else {
                badgeEl.textContent = '0 pendentes';
                badgeEl.className = 'px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
            }
        }

        const btnEl = document.getElementById(sub.btnId);
        if (btnEl) {
            const btnSpan = btnEl.querySelector('span');
            if (btnSpan) {
                if (subToday > 0) {
                    btnSpan.textContent = `Revisar ${sub.name} (${subToday})`;
                } else {
                    btnSpan.textContent = `Revisar ${sub.name}`;
                }
            }
        }
    });

    // Total today count on SRS view
    const countEl = document.getElementById('srs-today-count');
    if (countEl) countEl.textContent = totalTodayCount.toString();

    // Button all on SRS view
    const btnAll = document.getElementById('srs-btn-all');
    if (btnAll) {
        const span = btnAll.querySelector('span');
        if (span) {
            span.textContent = totalTodayCount > 0 ? `REVISAR TODAS AS MATÉRIAS (${totalTodayCount})` : 'REVISAR TODAS AS MATÉRIAS';
        }
    }

    // Dashboard SRS badge and subject pills
    const badgeEl = document.getElementById('dashboard-srs-badge');
    if (badgeEl) {
        if (totalTodayCount > 0) {
            badgeEl.textContent = `${totalTodayCount} ${totalTodayCount === 1 ? 'pendente' : 'pendentes'} hoje`;
            badgeEl.classList.remove('hidden');
        } else {
            badgeEl.classList.add('hidden');
        }
    }

    const subjectsSummaryEl = document.getElementById('dashboard-srs-subjects-summary');
    if (subjectsSummaryEl) {
        let pillsHtml = '';
        subjectsConfig.forEach(sub => {
            const c = subjectTodayCounts[sub.id] || 0;
            if (c > 0) {
                pillsHtml += `<span class="bg-red-50 border border-red-200 text-red-700 font-semibold px-2 py-0.5 rounded-md text-[11px]">${sub.shortName}: <strong>${c}</strong></span>`;
            }
        });
        subjectsSummaryEl.innerHTML = pillsHtml;
    }

    // Calendar list
    const calendarEl = document.getElementById('srs-calendar-list');
    if (calendarEl) {
        calendarEl.innerHTML = '';
        
        // Generate the next 14 days
        const daysToGenerate = 14;
        let html = '';
        
        const activeCounts = (filter === 'all') ? totalFutureCounts : (subjectFutureCounts[filter] || {});
        const activeToday = (filter === 'all') ? totalTodayCount : (subjectTodayCounts[filter] || 0);
        
        for (let i = 0; i < daysToGenerate; i++) {
            const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
            const ts = targetDate.getTime();
            
            const qCount = i === 0 ? activeToday : (activeCounts[ts] || 0);
            const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const dayName = days[targetDate.getDay()];
            const dayNum = targetDate.getDate();
            
            let activeBadge = '';
            let inactiveBadge = '';
            if (i === 0) {
                activeBadge = '<span class="absolute -top-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Hoje</span>';
                inactiveBadge = '<span class="absolute -top-2 bg-gray-300 text-gray-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Hoje</span>';
            } else if (i === 1) {
                activeBadge = '<span class="absolute -top-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Amanhã</span>';
                inactiveBadge = '<span class="absolute -top-2 bg-gray-200 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Amanhã</span>';
            }
            
            if (qCount > 0) {
                // Active day card
                html += `
                    <div class="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-2xl w-16 h-20 shrink-0 relative shadow-sm">
                       ${activeBadge}
                       <span class="text-xs text-red-600 font-bold">${dayName}</span>
                       <span class="text-xl font-black text-red-700 leading-tight">${dayNum}</span>
                       <div class="mt-1 flex items-center justify-center bg-red-100 text-red-700 text-[10px] font-bold px-1.5 rounded-full">
                           ${qCount}
                       </div>
                    </div>
                `;
            } else {
                // Inactive day card
                html += `
                    <div class="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl w-16 h-20 shrink-0 opacity-60 relative">
                       ${inactiveBadge}
                       <span class="text-xs text-gray-400 font-bold">${dayName}</span>
                       <span class="text-xl font-black text-gray-400 leading-tight">${dayNum}</span>
                    </div>
                `;
            }
        }
        
        calendarEl.innerHTML = html;
    }
};

(window as any).renderEvolutionChart = renderEvolutionChart;

// Ensure SRS calendar and dashboard metrics render on startup
if (typeof (window as any).renderSRSCalendar === 'function') {
    (window as any).renderSRSCalendar();
}
if (typeof (window as any).updateDashboardStats === 'function') {
    (window as any).updateDashboardStats();
}

// Module & Question Search Functionality & Type Filter
let currentGlobalSearchType = 'all';

(window as any).setGlobalSearchType = function(type: string) {
    currentGlobalSearchType = type;
    ['all', 'caso_clinico', 'discursiva', 'multipla_escolha'].forEach(t => {
        const btn = document.getElementById(`gfilter-${t}`);
        if (btn) {
            if (t === type) {
                btn.className = 'px-3 py-1.5 rounded-xl font-bold bg-blue-600 text-white shadow-sm transition-all cursor-pointer';
            } else {
                btn.className = 'px-3 py-1.5 rounded-xl font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer';
            }
        }
    });
    (window as any).performGlobalSearch();
};

(window as any).performGlobalSearch = function() {
    const searchInput = document.getElementById('module-search') as HTMLInputElement;
    const questionsResults = document.getElementById('questions-search-results');
    const questionsList = document.getElementById('questions-search-list');
    if (!searchInput || !questionsResults || !questionsList) return;

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length < 1) {
        questionsResults.classList.add('hidden');
        return;
    }

    const subjectsConfig = [
        { id: 'propedêutica', src: propedeuticaQuestions, name: 'Propedêutica' },
        { id: 'fisiopatologia', src: fisiopatologiaQuestions, name: 'Fisiopatologia' },
        { id: 'iesc_iv', src: iescIvQuestionsAll, name: 'IESC IV' }
    ];

    let matchesHtml = '';
    let matchCount = 0;

    subjectsConfig.forEach(sub => {
        sub.src.forEach((q: any, idx: number) => {
            if (!q || !q.text || matchCount > 50) return;
            const text = q.text.toLowerCase();
            const qType = (q.type || '').toLowerCase();
            const interType = (q.interactionType || '').toLowerCase();

            const matchesText = text.includes(searchTerm) || qType.includes(searchTerm);
            if (!matchesText) return;

            let matchesType = true;
            if (currentGlobalSearchType === 'caso_clinico') {
                matchesType = qType.includes('caso clínico') || qType.includes('caso clinico');
            } else if (currentGlobalSearchType === 'discursiva') {
                matchesType = qType.includes('discursiva') || interType === 'textarea';
            } else if (currentGlobalSearchType === 'multipla_escolha') {
                matchesType = qType.includes('múltipla escolha') || qType.includes('multipla escolha') || interType === 'multiple-choice';
            }

            if (!matchesType) return;

            matchCount++;
            if (matchCount <= 20) {
                const qTextSnippet = q.text.substring(0, 100) + '...';
                matchesHtml += `
                    <div class="p-4 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm cursor-pointer" onclick="document.getElementById('module-search').value=''; document.getElementById('questions-search-results').classList.add('hidden'); window.goToFavorite('${sub.id}', ${idx})">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${sub.name} - Q${idx + 1}</span>
                                <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded">${q.type || 'Questão'}</span>
                            </div>
                            <p class="text-gray-800 text-sm line-clamp-2">${qTextSnippet}</p>
                        </div>
                        <button class="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition-colors shrink-0">
                            Responder
                        </button>
                    </div>
                `;
            }
        });
    });

    if (matchCount > 0) {
        questionsResults.classList.remove('hidden');
        questionsList.innerHTML = matchesHtml + (matchCount > 20 ? `<p class="text-xs text-gray-400 text-center mt-2">E mais ${matchCount - 20} resultados...</p>` : '');
    } else {
        questionsResults.classList.add('hidden');
    }
};

function initModuleSearch() {
    const searchInput = document.getElementById('module-search') as HTMLInputElement;
    const questionsResults = document.getElementById('questions-search-results');
    const questionsList = document.getElementById('questions-search-list');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            (window as any).performGlobalSearch();
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (questionsResults && !questionsResults.contains(e.target as Node) && e.target !== searchInput) {
                questionsResults.classList.add('hidden');
            }
        });
        
        // Re-open results if input is clicked and has content
        searchInput.addEventListener('click', () => {
            if (searchInput.value.length > 2 && questionsResults && questionsList && questionsList.innerHTML.trim() !== '') {
                questionsResults.classList.remove('hidden');
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModuleSearch);
} else {
    initModuleSearch();
}

// --- FAVORITES LOGIC ---

(window as any).toggleFavorite = function() {
    let subjectId = currentSubject;
    let index = currentQuestionIndex;
    
    // In error review or simulado, the real subject and index are ogSubject and ogIndex
    const q = questions[index];
    if (q && q.ogSubject && q.ogIndex !== undefined) {
        subjectId = q.ogSubject;
        index = q.ogIndex;
    }

    const favs = JSON.parse(localStorage.getItem('pr1_favorites') || '{}');
    if (!favs[subjectId]) favs[subjectId] = [];
    
    const favArray = favs[subjectId];
    const favIndex = favArray.indexOf(index);
    
    if (favIndex > -1) {
        // Remove
        favArray.splice(favIndex, 1);
    } else {
        // Add
        favArray.push(index);
    }
    
    localStorage.setItem('pr1_favorites', JSON.stringify(favs));
    scheduleAutoSync();
    
    // Update icon visually
    (window as any).updateFavoriteIcon(subjectId, index);
};

(window as any).updateFavoriteIcon = function(subjectId: string, index: number) {
    const icon = document.getElementById('icon-favorite');
    const btn = document.getElementById('btn-favorite');
    if (!icon || !btn) return;
    
    const favs = JSON.parse(localStorage.getItem('pr1_favorites') || '{}');
    const isFav = favs[subjectId] && favs[subjectId].includes(index);
    
    if (isFav) {
        icon.setAttribute('fill', 'currentColor');
        btn.classList.add('text-yellow-400');
        btn.classList.remove('text-gray-300');
    } else {
        icon.setAttribute('fill', 'none');
        btn.classList.remove('text-yellow-400');
        btn.classList.add('text-gray-300');
    }
};

(window as any).renderFavorites = function() {
    const listEl = document.getElementById('favorites-list');
    if (!listEl) return;
    
    const favs = JSON.parse(localStorage.getItem('pr1_favorites') || '{}');
    let hasFavs = false;
    let html = '';
    
    const subjectsConfig = [
        { id: 'farmacologia', src: farmacologiaQuestions, name: 'Farmacologia' },
        { id: 'propedêutica', src: propedeuticaQuestions, name: 'Propedêutica' },
        { id: 'fisiopatologia', src: fisiopatologiaQuestions, name: 'Fisiopatologia' },
        { id: 'bases cirúrgicas', src: basesCirurgicasQuestions, name: 'Bases Cirúrgicas' },
        { id: 'iesc_iv', src: iescIvQuestionsAll, name: 'IESC IV' }
    ];
    
    // Filter logic
    const searchInput = document.getElementById('favorites-search') as HTMLInputElement;
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    subjectsConfig.forEach(sub => {
        const subFavs = favs[sub.id] || [];
        if (subFavs.length > 0) {
            
            let matchedQuestions = '';
            
            subFavs.sort((a: number, b: number) => a - b).forEach((qIdx: number) => {
                const q = sub.src[qIdx];
                if (!q) return;
                
                const qTextSnippet = q.text.substring(0, 100) + '...';
                const searchTarget = (sub.name + ' ' + q.text).toLowerCase();
                
                if (searchTerm && !searchTarget.includes(searchTerm)) return;
                
                hasFavs = true;
                
                matchedQuestions += `
                    <div class="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex-1">
                            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">${sub.name} - Q${qIdx + 1}</span>
                            <p class="text-gray-800 text-sm mt-1 line-clamp-2">${qTextSnippet}</p>
                        </div>
                        <button onclick="window.goToFavorite('${sub.id}', ${qIdx})" class="px-4 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-lg hover:bg-yellow-200 transition-colors shrink-0">
                            Revisar
                        </button>
                    </div>
                `;
            });
            
            if (matchedQuestions) {
                html += `
                    <div class="mb-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-3 border-b pb-2">${sub.name}</h3>
                        <div class="space-y-3">
                            ${matchedQuestions}
                        </div>
                    </div>
                `;
            }
        }
    });
    
    if (!hasFavs) {
        listEl.innerHTML = `<p class="text-sm text-gray-500 font-medium italic text-center p-8">Nenhuma questão favorita encontrada.</p>`;
    } else {
        listEl.innerHTML = html;
    }
};

(window as any).goToFavorite = function(subjectId: string, index: number) {
    (window as any).switchTab('dashboard'); 
    (window as any).startSubject(normalizeSubjectId(subjectId), index);
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0 });
    }
};

function initFavoritesSearch() {
    const favSearch = document.getElementById('favorites-search');
    if (favSearch) {
        favSearch.addEventListener('input', () => {
            (window as any).renderFavorites();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFavoritesSearch);
} else {
    initFavoritesSearch();
}

// --- Chatbot Logic (Prof. Assistente) ---
interface ChatMessagePart {
    text: string;
}
interface ChatHistoryItem {
    role: 'user' | 'model';
    parts: ChatMessagePart[];
}

const chatHistory: ChatHistoryItem[] = [];
let isChatOpen = false;

(window as any).toggleChat = function() {
    const drawer = document.getElementById('chat-drawer');
    if (!drawer) return;
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        const messagesEl = document.getElementById('chat-messages');
        if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
        const inputEl = document.getElementById('chat-input') as HTMLTextAreaElement | null;
        if (inputEl) inputEl.focus();
    } else {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
    }
};

async function generateChatResponse(userMsg: string): Promise<string> {
    const q = questions && questions[currentQuestionIndex] ? questions[currentQuestionIndex] : null;
    let contextText = '';
    if (q) {
        contextText = `Matéria/Módulo: ${currentSubject}
Questão: ${q.id || currentQuestionIndex + 1}
Enunciado: ${q.text || ''}
Opções: ${Array.isArray(q.options) ? q.options.join('\n') : ''}
Pista: ${q.hint || 'N/A'}
Gabarito Comentado: ${q.feedback || q.gabarito || 'N/A'}`;
    } else {
        contextText = `Matéria atual: ${currentSubject || 'Nenhuma selecionada'}. O aluno está na tela inicial ou navegando pelas métricas.`;
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                history: chatHistory,
                message: userMsg,
                context: contextText
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta do servidor (${response.status})`);
        }

        const data = await response.json();
        return data.text || 'Não foi possível obter uma resposta do assistente.';
    } catch (e: any) {
        console.error('Chat error:', e);
        return 'Não foi possível conectar com o assistente no momento. Verifique sua conexão ou tente novamente em instantes!';
    }
}

function formatBotMessage(raw: string): string {
    let text = raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">$1</code>');

    const lines = text.split('\n');
    let formatted = '';
    let inList = false;

    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            if (!inList) {
                formatted += '<ul class="list-disc list-inside space-y-1 my-1.5">';
                inList = true;
            }
            formatted += `<li>${trimmed.substring(2)}</li>`;
        } else if (/^\d+\.\s/.test(trimmed)) {
            if (!inList) {
                formatted += '<ol class="list-decimal list-inside space-y-1 my-1.5">';
                inList = true;
            }
            formatted += `<li>${trimmed.replace(/^\d+\.\s/, '')}</li>`;
        } else {
            if (inList) {
                formatted += '</ul>';
                inList = false;
            }
            if (trimmed.length > 0) {
                formatted += `<p class="mb-2 last:mb-0">${trimmed}</p>`;
            }
        }
    }
    if (inList) {
        formatted += '</ul>';
    }
    return formatted || raw;
}

function appendMessage(text: string, isUser: boolean) {
    const messagesEl = document.getElementById('chat-messages');
    if (!messagesEl) return;

    const wrapper = document.createElement('div');
    wrapper.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;

    const bubble = document.createElement('div');
    bubble.className = `text-sm px-4 py-2.5 max-w-[85%] shadow-sm leading-relaxed ${
        isUser
            ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm whitespace-pre-line'
            : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm'
    }`;
    if (isUser) {
        bubble.textContent = text;
    } else {
        bubble.innerHTML = formatBotMessage(text);
    }

    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

(window as any).sendChatMessage = async function() {
    const input = document.getElementById('chat-input') as HTMLTextAreaElement | null;
    const btn = document.getElementById('chat-send-btn') as HTMLButtonElement | null;
    if (!input || !btn) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    btn.disabled = true;
    appendMessage(text, true);

    const messagesEl = document.getElementById('chat-messages');
    const typingWrapper = document.createElement('div');
    typingWrapper.id = 'chat-typing-indicator';
    typingWrapper.className = 'flex justify-start';
    typingWrapper.innerHTML = `<div class="bg-gray-100 border border-gray-200 text-gray-500 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs shadow-sm italic flex items-center space-x-2"><span>Prof. Assistente digitando...</span></div>`;
    if (messagesEl) {
        messagesEl.appendChild(typingWrapper);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    try {
        const botText = await generateChatResponse(text);
        const indicator = document.getElementById('chat-typing-indicator');
        if (indicator) indicator.remove();

        appendMessage(botText, false);

        chatHistory.push({ role: 'user', parts: [{ text }] });
        chatHistory.push({ role: 'model', parts: [{ text: botText }] });
    } catch (err) {
        const indicator = document.getElementById('chat-typing-indicator');
        if (indicator) indicator.remove();
        appendMessage('Ocorreu um erro ao responder sua dúvida. Tente novamente!', false);
    } finally {
        btn.disabled = false;
    }
};

document.addEventListener('input', function(e) {
    const target = e.target as HTMLElement;
    if (target && target.id === 'chat-input') {
        target.style.height = 'auto';
        target.style.height = Math.min(target.scrollHeight, 112) + 'px';
    }
});

document.addEventListener('keydown', function(e) {
    const target = e.target as HTMLElement;
    if (target && target.id === 'chat-input') {
        const kbEvent = e as KeyboardEvent;
        if (kbEvent.key === 'Enter' && !kbEvent.shiftKey) {
            e.preventDefault();
            (window as any).sendChatMessage();
        }
    }
});

// ==========================================
// Multi-Device Cloud Synchronization System
// ==========================================

function updateDashboardStats() {
    if (typeof (window as any).updateDashboardStats === 'function') {
        (window as any).updateDashboardStats();
    }
}

function formatSyncTime(date: Date | null): string {
    if (!date) return 'Hoje, agora';
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `Hoje às ${h}:${m}`;
}

function updateSyncUIElements(user: any, syncStatus?: { isSyncing: boolean; lastSyncTime: Date | null; error?: string }) {
    const loggedOutEl = document.getElementById('sync-logged-out-state');
    const loggedInEl = document.getElementById('sync-logged-in-state');
    const avatarEl = document.getElementById('sidebar-user-avatar') as HTMLImageElement;
    const nameEl = document.getElementById('sidebar-user-name');
    const syncTextEl = document.getElementById('sidebar-sync-text');
    const lastTimeEl = document.getElementById('sidebar-sync-last-time');
    const spinnerEl = document.getElementById('sidebar-sync-spinner');

    const headerBtn = document.getElementById('btn-header-sync');
    const headerLabel = document.getElementById('header-sync-label');

    const metricsAccount = document.getElementById('metrics-sync-account');
    const metricsDevice = document.getElementById('metrics-sync-device');
    const metricsStatus = document.getElementById('metrics-sync-status');
    const btnMetricsLogin = document.getElementById('btn-metrics-login');
    const btnMetricsSync = document.getElementById('btn-metrics-sync');

    // Detect device
    let deviceName = 'Navegador Web';
    if (typeof navigator !== 'undefined') {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) deviceName = '📱 Android';
        else if (/iPad|iPhone|iPod/.test(ua)) deviceName = '📱 iOS (iPhone/iPad)';
        else if (/Windows/i.test(ua)) deviceName = '💻 Windows PC';
        else if (/Macintosh/i.test(ua)) deviceName = '💻 Mac';
        else if (/Linux/i.test(ua)) deviceName = '💻 Linux';
    }
    if (metricsDevice) metricsDevice.textContent = deviceName;

    if (user) {
        if (loggedOutEl) loggedOutEl.classList.add('hidden');
        if (loggedInEl) loggedInEl.classList.remove('hidden');

        if (nameEl) nameEl.textContent = user.displayName || 'Estudante';
        if (avatarEl) {
            avatarEl.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'Aluno')}&background=3b82f6&color=fff&bold=true`;
        }

        if (syncStatus?.isSyncing) {
            if (syncTextEl) syncTextEl.textContent = 'Sincronizando...';
            if (spinnerEl) spinnerEl.classList.add('animate-spin');
        } else {
            if (syncTextEl) syncTextEl.textContent = 'Sincronizado';
            if (spinnerEl) spinnerEl.classList.remove('animate-spin');
            if (lastTimeEl) lastTimeEl.textContent = formatSyncTime(syncStatus?.lastSyncTime || null);
        }

        if (headerBtn && headerLabel) {
            const firstName = (user.displayName || 'Sincronizado').split(' ')[0];
            headerLabel.textContent = firstName;
            headerBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300 cursor-pointer';
        }

        if (metricsAccount) {
            metricsAccount.textContent = `${user.displayName || 'Estudante'} (${user.email || ''})`;
        }
        if (metricsStatus) {
            if (syncStatus?.isSyncing) {
                metricsStatus.innerHTML = `
                    <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span class="text-blue-600 font-bold">Sincronizando dados...</span>
                `;
            } else {
                metricsStatus.innerHTML = `
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span class="text-emerald-700 font-bold">Sincronizado na nuvem (Firestore)</span>
                `;
            }
        }

        if (btnMetricsLogin) btnMetricsLogin.classList.add('hidden');
        if (btnMetricsSync) btnMetricsSync.classList.remove('hidden');
    } else {
        if (loggedOutEl) loggedOutEl.classList.remove('hidden');
        if (loggedInEl) loggedInEl.classList.add('hidden');

        if (headerBtn && headerLabel) {
            headerLabel.textContent = 'Sincronizar';
            headerBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-xs bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600 cursor-pointer';
        }

        if (metricsAccount) metricsAccount.textContent = 'Não conectado (modo local)';
        if (metricsStatus) {
            metricsStatus.innerHTML = `
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span class="text-amber-700 font-semibold">Armazenamento local neste dispositivo</span>
            `;
        }

        if (btnMetricsLogin) btnMetricsLogin.classList.remove('hidden');
        if (btnMetricsSync) btnMetricsSync.classList.add('hidden');
    }
}

// Register sync auth & status change callbacks
onSyncAuthChange((user) => {
    updateSyncUIElements(user);
});

onSyncStatusChange((status) => {
    // Current user can be read from the UI state
    const loggedIn = document.getElementById('sync-logged-in-state');
    const isUser = loggedIn && !loggedIn.classList.contains('hidden');
    if (isUser) {
        updateSyncUIElements({ displayName: document.getElementById('sidebar-user-name')?.textContent }, status);
    }
});

(window as any).handleSyncLogin = async function() {
    showToast('Iniciando login com o Google...', 2000);
    const res = await loginWithGoogle();
    if (res.success && res.user) {
        showToast(`Conectado como ${res.user.displayName || 'Estudante'}! Progresso sincronizado.`, 4000);
        updateDashboardStats();
    } else if (res.error) {
        const isPopupClosed = res.error.includes('closed') || res.error.includes('popup') || res.error.includes('cancelled');
        if (isPopupClosed) {
            showToast('Janela de login fechada ou bloqueada. Se estiver no preview, abra o app em nova aba ou use Exportar Backup.', 5000);
        } else {
            showToast('Falha na autenticação: ' + res.error, 4500);
        }
    }
};

(window as any).handleSyncLogout = async function() {
    await logoutUser();
    showToast('Você saiu da conta neste dispositivo. Seu progresso local permanece intacto.', 3500);
};

(window as any).handleSyncNow = async function() {
    const spinner = document.getElementById('sidebar-sync-spinner');
    if (spinner) spinner.classList.add('animate-spin');
    showToast('Sincronizando progresso com a nuvem...', 2000);
    
    const res = await syncNow();
    if (spinner) spinner.classList.remove('animate-spin');

    if (res.success) {
        showToast('Progresso sincronizado com sucesso!', 3000);
        updateDashboardStats();
        const metricsView = document.getElementById('view-metrics');
        if (metricsView && !metricsView.classList.contains('hidden')) {
            renderDetailedMetrics();
        }
    } else {
        showToast(res.message, 4500);
    }
};

(window as any).handleExportBackup = function() {
    exportBackupJSON();
    showToast('Arquivo de backup (.json) exportado com sucesso!', 3500);
};

(window as any).handleBackupFileSelected = async function(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return;
    showToast('Lendo e mesclando arquivo de backup...', 2000);
    const res = await importBackupJSON(file);
    if (res.success) {
        showToast(res.message, 4000);
        updateDashboardStats();
        renderDetailedMetrics();
        if (typeof (window as any).renderSRSCalendar === 'function') {
            (window as any).renderSRSCalendar();
        }
    } else {
        showToast(res.message, 4500);
    }
    input.value = '';
};

(window as any).handleHeaderSyncClick = function() {
    const loggedIn = document.getElementById('sync-logged-in-state');
    if (loggedIn && !loggedIn.classList.contains('hidden')) {
        (window as any).handleSyncNow();
    } else {
        (window as any).handleSyncLogin();
    }
};

// React to sync events across devices
window.addEventListener('pr1-sync-updated', (event: any) => {
    updateDashboardStats();
    const metricsView = document.getElementById('view-metrics');
    if (metricsView && !metricsView.classList.contains('hidden')) {
        renderDetailedMetrics();
    }
    const srsView = document.getElementById('view-srs');
    if (srsView && !srsView.classList.contains('hidden')) {
        if (typeof (window as any).renderSRSCalendar === 'function') {
            (window as any).renderSRSCalendar();
        }
    }
    const favsView = document.getElementById('view-favorites');
    if (favsView && !favsView.classList.contains('hidden')) {
        if (typeof (window as any).renderFavorites === 'function') {
            (window as any).renderFavorites();
        }
    }
    const discView = document.getElementById('view-discipline-detail');
    if (discView && !discView.classList.contains('hidden') && currentSubject) {
        discView.innerHTML = renderDisciplineDetailView(currentSubject as SubjectId);
    }
    const appScreen = document.getElementById('app-screen');
    if (appScreen && !appScreen.classList.contains('hidden') && currentSubject) {
        const isExplicitReset = !!(event?.detail?.globalReset || (event?.detail?.resetSubject && event.detail.resetSubject === currentSubject));
        loadProgress();
        if (isExplicitReset) {
            updateGridAndProgress(false);
            if (currentSubject === 'simulado') {
                (window as any).loadQuestionSimulado(0, { forceScrollTop: true });
            } else {
                loadQuestion(0, { forceScrollTop: true });
            }
        } else {
            // Atualiza apenas os botões da grade lateral e barra de progresso em background,
            // SEM recarregar a questão ativa e SEM resetar a rolagem da tela do usuário!
            updateGridAndProgress(false);
        }
    }
});

// ==========================================
// ACADEMIC & GOOGLE DRIVE NAVIGATION BRIDGES
// ==========================================

(window as any).openDisciplineDetail = function(disciplineId: string) {
    const container = document.getElementById('view-discipline-detail');
    if (container) {
        container.innerHTML = renderDisciplineDetailView(disciplineId as SubjectId);
    }
    (window as any).switchTab('discipline-detail');
};

(window as any).openLessonDetail = function(lessonId: string) {
    const container = document.getElementById('view-lesson-detail');
    if (container) {
        container.innerHTML = renderLessonDetailView(lessonId);
    }
    (window as any).switchTab('lesson-detail');
};

(window as any).backToDiscipline = function(disciplineId: string) {
    (window as any).openDisciplineDetail(disciplineId);
};

(window as any).backToDisciplinesList = function() {
    (window as any).switchTab('dashboard');
};

(window as any).openDisciplineExams = function(discId: string) {
    (window as any).switchTab('library');
    setTimeout(() => {
        if (typeof (window as any).setLibraryCategoryTab === 'function') {
            (window as any).setLibraryCategoryTab('prova_antiga');
        }
        const discFilter = document.getElementById('lib-discipline-filter') as HTMLSelectElement | null;
        if (discFilter && discId) {
            discFilter.value = discId;
            if (typeof (window as any).filterLibraryMaterials === 'function') {
                (window as any).filterLibraryMaterials();
            }
        }
    }, 50);
};

(window as any).toggleModuleAccordion = function(modId: string) {
    const content = document.getElementById('mod-content-' + modId);
    const arrow = document.getElementById('mod-arrow-' + modId);
    if (!content) return;
    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
        content.classList.remove('hidden');
        if (arrow) arrow.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        if (arrow) arrow.classList.remove('rotate-180');
    }
};

(window as any).removeErrorNotebookItem = function(errorId: string) {
    const list = getErrorNotebook().filter(e => e.id !== errorId);
    saveErrorNotebook(list);
    showToast('Questão removida do caderno de erros.');
    const container = document.getElementById('view-errors');
    if (container) {
        container.innerHTML = renderErrorNotebookView();
    }
};

(window as any).askTutorAboutError = function(errorId: string) {
    const errorItem = getErrorNotebook().find(e => e.id === errorId);
    if (!errorItem) return;
    
    showToast(`Preparando Prof. Assistente para revisão de ${errorItem.subject}...`);
    const drawer = document.getElementById('chat-drawer');
    if (drawer && drawer.classList.contains('hidden')) {
        (window as any).toggleChat();
    }
    setTimeout(() => {
        const input = document.getElementById('chat-input') as HTMLTextAreaElement | null;
        if (input) {
            input.value = `Prof. Assistente, errei a seguinte questão de ${errorItem.subject}:\n\n"${errorItem.questionText}"\n\nMinha alternativa assinalada foi: "${errorItem.selectedOption}"\nO gabarito correto é: "${errorItem.correctOption}"\n\nPoderia me explicar detalhadamente o raciocínio fisiopatológico e por que minha resposta estava incorreta?`;
            input.focus();
        }
    }, 250);
};

(window as any).openOrganizeMaterialsModal = function() {
    const existing = document.getElementById('modal-organize-materials');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderOrganizeMaterialsModal();
    document.body.appendChild(wrapper.firstElementChild!);
};

(window as any).closeOrganizeMaterialsModal = function() {
    const modal = document.getElementById('modal-organize-materials');
    if (modal) modal.remove();
};

(window as any).triggerDriveManualSync = async function() {
    const btn = document.getElementById('btn-sync-drive-modal');
    if (btn) {
        btn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Sincronizando com Drive...`;
        (btn as HTMLButtonElement).disabled = true;
    }
    showToast('Consultando arquivos da pasta oficial no Google Drive...');
    try {
        const result = await fetchDriveMaterialsRecursively();
        saveLocalDriveMaterials(result.files);
        showToast(`Sincronização concluída: ${result.files.length} materiais catalogados!`);
        
        // Refresh open modal or views if visible
        (window as any).openOrganizeMaterialsModal();
        const libView = document.getElementById('view-library');
        if (libView && !libView.classList.contains('hidden')) {
            libView.innerHTML = renderAcademicLibraryView(activeLibraryCategoryTab);
            setTimeout(() => setupHorizontalScroll('library-category-tabs-container'), 50);
        }
    } catch (e: any) {
        console.warn('Sync drive warning (usando materiais locais mockados):', e);
        showToast('Materiais acadêmicos carregados com sucesso a partir do cache do semestre.');
        // Re-render
        (window as any).openOrganizeMaterialsModal();
    }
};

(window as any).updateMaterialDiscipline = function(materialId: string, discipline: string) {
    const materials = getLocalDriveMaterials();
    const target = materials.find(m => m.id === materialId);
    if (target) {
        target.discipline = (discipline || undefined) as SubjectId;
        if (target.status === 'importado' && discipline) {
            target.status = 'mapeado';
        }
        saveLocalDriveMaterials(materials);
        showToast(`Disciplina atualizada para "${target.name}".`);
    }
};

(window as any).advanceMaterialStatus = function(materialId: string) {
    const materials = getLocalDriveMaterials();
    const target = materials.find(m => m.id === materialId);
    if (target) {
        if (target.status === 'importado') {
            target.status = 'mapeado';
        } else if (target.status === 'mapeado') {
            target.status = 'pronto_para_estudo';
        }
        saveLocalDriveMaterials(materials);
        showToast(`Status avançado: ${target.status.replace('_', ' ').toUpperCase()}`);
        (window as any).openOrganizeMaterialsModal();
    }
};

(window as any).toggleMaterialFavorite = function(materialId: string) {
    const materials = getLocalDriveMaterials();
    const target = materials.find(m => m.id === materialId);
    if (target) {
        target.isFavorite = !target.isFavorite;
        saveLocalDriveMaterials(materials);
        showToast(target.isFavorite ? 'Material salvo como favorito!' : 'Material removido dos favoritos.');
        const libView = document.getElementById('view-library');
        if (libView && !libView.classList.contains('hidden')) {
            libView.innerHTML = renderAcademicLibraryView(activeLibraryCategoryTab);
            setTimeout(() => setupHorizontalScroll('library-category-tabs-container'), 50);
        }
    }
};

let activeLibraryCategoryTab: string = 'all';

(window as any).setLibraryCategoryTab = function(category: string) {
    activeLibraryCategoryTab = category;
    
    // Update tab styles
    const tabs = document.querySelectorAll('.lib-category-tab');
    tabs.forEach(tab => {
        tab.classList.remove('bg-gray-900', 'text-white');
        tab.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-200');
    });

    const currentTab = document.getElementById('lib-tab-' + category);
    if (currentTab) {
        currentTab.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-200');
        currentTab.classList.add('bg-gray-900', 'text-white');
        currentTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // Sync select dropdown if user selects a tab
    const typeSelect = document.getElementById('lib-type-filter') as HTMLSelectElement | null;
    if (typeSelect) {
        typeSelect.value = category === 'all' ? 'all' : category;
    }

    (window as any).filterLibraryMaterials();
};

(window as any).clearLibraryFilters = function() {
    const searchInput = document.getElementById('lib-search-input') as HTMLInputElement | null;
    const disciplineSelect = document.getElementById('lib-discipline-filter') as HTMLSelectElement | null;
    const typeSelect = document.getElementById('lib-type-filter') as HTMLSelectElement | null;

    if (searchInput) searchInput.value = '';
    if (disciplineSelect) disciplineSelect.value = 'all';
    if (typeSelect) typeSelect.value = 'all';

    (window as any).setLibraryCategoryTab('all');
};

(window as any).filterLibraryMaterials = function() {
    const searchInput = (document.getElementById('lib-search-input') as HTMLInputElement)?.value.toLowerCase() || '';
    const disciplineFilter = (document.getElementById('lib-discipline-filter') as HTMLSelectElement)?.value || 'all';
    let typeFilter = (document.getElementById('lib-type-filter') as HTMLSelectElement)?.value || 'all';

    // If active tab is specific and select is all, prioritize active tab
    if (activeLibraryCategoryTab !== 'all' && typeFilter === 'all') {
        typeFilter = activeLibraryCategoryTab;
    }

    const cards = document.querySelectorAll('.library-material-card');
    let visibleCount = 0;

    cards.forEach((cardEl: any) => {
        const title = cardEl.getAttribute('data-name') || '';
        const discipline = cardEl.getAttribute('data-discipline') || '';
        const type = cardEl.getAttribute('data-type') || '';

        const matchesSearch = !searchInput || title.includes(searchInput);
        const matchesDiscipline = disciplineFilter === 'all' || discipline === disciplineFilter;
        
        // Match type category
        let matchesType = false;
        if (typeFilter === 'all') {
            matchesType = true;
        } else if (typeFilter === 'lista') {
            matchesType = type === 'lista' || type === 'pdf' || type === 'documento';
        } else {
            matchesType = type === typeFilter;
        }

        if (matchesSearch && matchesDiscipline && matchesType) {
            cardEl.style.display = 'flex';
            visibleCount++;
        } else {
            cardEl.style.display = 'none';
        }
    });

    const countEl = document.getElementById('lib-total-count');
    if (countEl) countEl.textContent = String(visibleCount);

    const noResultsEl = document.getElementById('lib-no-results');
    if (noResultsEl) {
        if (visibleCount === 0) {
            noResultsEl.classList.remove('hidden');
        } else {
            noResultsEl.classList.add('hidden');
        }
    }
};

(window as any).filterOrganizeList = function() {
    const search = (document.getElementById('organize-search-input') as HTMLInputElement)?.value.toLowerCase() || '';
    const status = (document.getElementById('organize-status-filter') as HTMLSelectElement)?.value || 'all';

    const rows = document.querySelectorAll('.organize-item-row');
    rows.forEach((row: any) => {
        const name = row.getAttribute('data-name') || '';
        const rowStatus = row.getAttribute('data-status') || '';

        const matchName = !search || name.includes(search);
        const matchStatus = status === 'all' || rowStatus === status;

        row.style.display = (matchName && matchStatus) ? '' : 'none';
    });
};

(window as any).solveLessonQuestions = function(disciplineId: string, lessonId: string) {
    const lessonData = findLessonById(lessonId);
    if (!lessonData || !lessonData.lesson.relatedQuestionIndices.length) {
        showToast('Nenhuma questão específica mapeada para esta aula ainda.');
        return;
    }

    const indices = lessonData.lesson.relatedQuestionIndices;
    // Map to subject's bank
    let bank: any[] = [];
    if (disciplineId === 'farmacologia') bank = farmacologiaQuestions;
    else if (disciplineId === 'propedêutica') bank = propedeuticaQuestions;
    else if (disciplineId === 'fisiopatologia') bank = fisiopatologiaQuestions;
    else if (disciplineId === 'bases cirúrgicas') bank = basesCirurgicasQuestions;
    else if (disciplineId === 'iesc_iv' || disciplineId === 'iesc iv') bank = iescIvQuestionsAll;

    const selectedQuestions = indices.map(idx => {
        const base = bank[idx % bank.length];
        return { ...base, ogSubject: disciplineId, ogIndex: idx % bank.length };
    }).filter(Boolean);

    if (selectedQuestions.length === 0) {
        showToast('Iniciando modo geral da disciplina...');
        (window as any).startSubject(disciplineId);
        return;
    }

    currentSubject = disciplineId;
    currentMode = 'lesson';
    currentLessonId = lessonId;
    questions = selectedQuestions;
    currentQuestionIndex = 0;
    
    // Load lesson progress if previously attempted, otherwise clean slate
    loadProgress();

    const homeScreen = document.getElementById('home-screen');
    const appScreen = document.getElementById('app-screen');
    if (homeScreen) homeScreen.classList.add('hidden');
    if (appScreen) {
        appScreen.classList.remove('hidden');
        appScreen.classList.add('flex');
    }

    const headerTitle = document.getElementById('header-subject-title');
    if (headerTitle) {
        headerTitle.textContent = `${disciplineId.toUpperCase()} • ${lessonData.lesson.title}`;
    }

    lastActiveQuestionIndexForScroll = -1;
    initGrid();
    loadQuestion(currentQuestionIndex);
};

(window as any).askTutorAboutLesson = function(lessonId: string, lessonTitle: string) {
    showToast(`Iniciando Prof. Assistente com foco em: ${lessonTitle}`);
    const drawer = document.getElementById('chat-drawer');
    if (drawer && drawer.classList.contains('hidden')) {
        (window as any).toggleChat();
    }
    setTimeout(() => {
        const input = document.getElementById('chat-input') as HTMLTextAreaElement | null;
        if (input) {
            input.value = `Prof. Assistente, por favor explique os pontos mais cobrados em prova e os conceitos fundamentais de "${lessonTitle}".`;
            input.focus();
        }
    }, 200);
};

(window as any).markErrorReviewed = function(errorId: string) {
    const list = getErrorNotebook();
    const item = list.find(e => e.id === errorId);
    if (item) {
        item.reviewed = true;
        // Save
        try {
            localStorage.setItem('pr1_error_notebook_v1', JSON.stringify(list));
            showToast('Erro marcado como revisado!');
            const container = document.getElementById('view-errors');
            if (container) {
                container.innerHTML = renderErrorNotebookView();
            }
        } catch {}
    }
};



