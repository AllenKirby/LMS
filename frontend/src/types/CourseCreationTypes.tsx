export interface ChoicesState {
    choiceID: string;
    choice: string;
}

export interface FileUploadState {
    type: "uploadedFile"; 
    fileID: string; 
    fileName: string; 
    file: File | null;
}

export interface LessonState {
    type: "separator"; 
    lessonID: string; 
    title: string; 
    content: string;
}

export interface QuestionnaireState {
    type: "questionnaire"; 
    questionnaireID: string; 
    question: string; 
    choiceType: 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | ''; 
    choices: ChoicesState[];  
    questionPoint: number
}
  
export type ModuleContent = 
| { type: "separator"; lessonID: string; title: string; content: string; }
| { type: "uploadedFile"; fileID: string; fileName: string; file: File | null; }
| { type: "questionnaire"; questionnaireID: string; question: string; choiceType: 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | ''; choices: ChoicesState[]; questionPoint: number };

export interface ModuleState {
    menuID: number;
    id: number;
    moduleID: string;
    title: string;
    content: ModuleContent[];
    submitted?: true | false;
    position?: number;
    section?: number;
    key_answers?: {[key: string]:string | string[]}[]
    submitted_answers?: {[key: string]:string}
}

interface ModulePreview {
    id: number;
    position: number;
    section: number;
    title: string;
}

export interface CourseContentState {
    id: number;
    title: string;
    position: number;
    modules: ModulePreview[];
    course: number;
}

export interface MenuDataState {
    id: number;
    title: string;
    position: number;
    modules: string[];
    course: number;
}

export interface Trainees {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    sex: string;
    department: string;
    birth_date: string;
    contact: string;
    address: string;
}

export interface CourseData {
    id?: number;
    cover_image_upload: File | null;
    cover_image_url?: string;
    course_title: string;
    course_description: string;
    department: "IT" | "EOD" | "AFD" | "RIM" | "EMU" | "";
    visibility: "public" | "private" | "";
    participants: string[];
    participants_display?: {id: number; first_name: string; last_name: string; email: string;}[]
    created_at?: string;
    submitted: true | false;
}

export interface TrainingDataState {
    id?: number;
    training_setup: string;
    training_title: string;
    start_date: string;
    end_date: string;
    //resource_speakers: {host_name: string}[];
    training_provider: string;
    venue: string;
    participants?: (string | number)[];
    document_url?: string[]
    participants_display?: {id: number; first_name: string; last_name: string; email: string; status: string; department?: "IT" | "EOD" | "AFD" | "RIM" | "EMU" | "";}[]
}

export interface ExternalParticipantState {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    department?: "IT" | "EOD" | "AFD" | "RIM" | "EMU" | "";
    status: string;
} 

export interface CoursesState {
    id: number;
    course_title: string;
    course_description: string;
    department: string;
    visibility: string;
    cover_image_url: string;
    created_at: string;
    course_status: string;
    participants_display: {id: number; first_name: string; last_name: string; email: string;}[];
    cover_image_upload?: File;
    participants?: (string | number)[];
    submitted?: true | false
}