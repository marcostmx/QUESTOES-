export type SubjectId = 'fisiopatologia' | 'farmacologia' | 'propedêutica' | 'bases cirúrgicas' | 'gis2' | 'iesc_iv' | 'iesc iv';

export type MaterialType = 
  | 'slide' 
  | 'apostila' 
  | 'pdf' 
  | 'resumo' 
  | 'prova_antiga' 
  | 'gabarito' 
  | 'lista' 
  | 'imagem' 
  | 'documento'
  | 'outro';

export type MaterialPriority = 'conteúdo-base' | 'complementar' | 'prova antiga' | 'gabarito' | 'resumo' | 'questão';

export type MaterialStatus = 'importado' | 'mapeado' | 'pronto_para_estudo';

export interface DriveFileItem {
  id: string;
  driveId?: string;
  name: string;
  mimeType: string;
  size?: string | number;
  webViewLink: string;
  iconLink?: string;
  thumbnailLink?: string;
  modifiedTime: string;
  parents?: string[];
  path?: string; // Caminho da pasta no Drive
  discipline?: SubjectId | '';
  module?: string;
  lesson?: string;
  materialType?: MaterialType;
  priority?: MaterialPriority;
  professor?: string;
  assessmentRelation?: string;
  status: MaterialStatus;
  isDuplicate?: boolean;
  duplicateOf?: string;
  customTitle?: string;
  readStatus?: boolean;
  isFavorite?: boolean;
  notes?: string;
}

export interface LearningObjective {
  id: string;
  description: string;
  relatedQuestionsCount: number;
}

export interface AcademicLesson {
  id: string;
  disciplineId: SubjectId;
  moduleId: string;
  title: string;
  objectives: string[];
  materials: string[]; // DriveFileItem IDs
  keyConcepts: string[];
  highYieldExamPoints: {
    point: string;
    sourceExams: string[];
  }[];
  summaryMarkdown?: string;
  relatedQuestionIndices: number[]; // indices in subject questions
  completed?: boolean;
}

export interface AcademicModule {
  id: string;
  disciplineId: SubjectId;
  title: string;
  description?: string;
  lessons: AcademicLesson[];
}

export interface AcademicDiscipline {
  id: SubjectId;
  name: string;
  shortName: string;
  color: string;
  iconSvg: string;
  description: string;
  modules: AcademicModule[];
}

export interface AcademicExam {
  id: string;
  disciplineId: SubjectId;
  title: string;
  period?: string; // ex: 2024.1, 2023.2
  originalDriveFileId?: string;
  gabaritoDriveFileId?: string;
  topicsCovered: string[];
  perceivedDifficulty: 'Fácil' | 'Média' | 'Difícil';
  questionIndices: number[];
}

export interface ErrorLogItem {
  id: string;
  disciplineId?: SubjectId;
  subject?: SubjectId;
  moduleId?: string;
  lessonId?: string;
  topic?: string;
  learningObjective?: string;
  cause?: 'não sabia' | 'confundiu conceitos' | 'interpretação' | 'chute' | 'desatenção';
  questionIndex: number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  explanation?: string;
  sourceMaterialId?: string;
  originMaterial?: string;
  timestamp?: string;
  createdAt?: string;
  reviewed?: boolean;
  userNotes?: string;
}

export interface DriveSyncReport {
  lastSyncTime: string;
  totalFiles: number;
  filesByDiscipline: Record<string, number>;
  unclassifiedCount: number;
  duplicatesCount: number;
  examsCount: number;
  answerKeysCount: number;
  recentFiles: { id: string; name: string; modifiedTime: string }[];
}
