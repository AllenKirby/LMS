export interface ChoicesState {
    choiceID: string;
    choice: string;
}

export interface FileUploadState {
    type: "uploadedFile" | "document"; 
    fileID: string; 
    fileName: string; 
    file: File | null;
}

export interface DocumentState {
    type: "document"; 
    values: {
        document_name: string; 
        document_url: string;
        document_id: number;
    };
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
| { type: "uploadedFile" | "document"; fileID: string; fileName: string; file: File | null; }
| { type: "questionnaire"; questionnaireID: string; question: string; choiceType: 'Multiple Choice' | 'Text Answer' | 'Check Box' | 'True or False' | ''; choices: ChoicesState[]; questionPoint: number };

export interface ModuleState {
    menuID: number;
    id: number;
    moduleID: string;
    title: string;
    content: ModuleContent[];
    submitted?: true | false;
    required: boolean;
    position?: number;
    section?: number;
    participant_module_progress?: 'in progress' | 'completed' | ''
    key_answers?: {[key: string]:string | string[]}[]
    submitted_answers?: {[key: string]:string}
}

export interface ModulePreview {
    id: number;
    position: number;
    section: number;
    title: string;
    required: boolean;
    module_progress?: string;
}

export interface MenuDataState {
    id: number;
    title: string;
    position: number;
    modules: ModulePreview[];
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
    document_url?: {document_id: number ,doc_url: string, doc_name: string}[]
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

export type CourseActionType = '' | 'create' | 'update';

export interface IDsState {
    moduleID: string | number | null;
    menuID: number | null;
}

export interface SurveyAnswers {
    survey: {
        "1.1": number;
        "1.2": number;
        "1.3": number;
        "1.4": number;
        "1.5": number;
        "1.6": number;
        "1.7": number;
        "1.8": number;
        "1.9": number;
        "2.A.1": number;
        "2.A.2": number;
        "2.A.3": number;
        "2.A.4": number;
        "2.B.1": number;
        "2.B.2": number;
        "2.B.3": number;
        "2.B.4": number;
        "2.B.5": number;
        "2.B.6": number;
        "2.B.7": number;
        "2.B.8": number;
        "2.B.9": number;
        "2.B.10": number;
        "2.C.1": number;
        "2.C.2": number;
        "2.C.3": number;
        "2.C.4": number;
        "2.C.5": number;
        "2.C.6": number;
        "2.C.7": number;
        "2.D.1": number;
        "2.D.2": number;
        "3.1": number;
        "3.2": number;
        "3.3": number;
        "3.4": number;
        "3.5": number;
        "3.6": number;
        "3.7": number;
        "3.8": number;
        "3.9": number;
        "3.10": number;
        "4.1": number;
        "4.2": number;
        "4.3": number;
        "4.4": number;
        "4.5": number;
        "4.6": number;
        "5.1": number;
        "5.2": number;
        "5.3": number;
        "5.4": number;
        "5.5": number;
        "5.6": number;
    }
  }