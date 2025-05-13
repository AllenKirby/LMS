import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ModuleState, ModuleContent } from '../types/CourseCreationTypes'

const initialState: ModuleState[] = [];

const ModuleDataRedux = createSlice({
  name: "moduleData",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<ModuleState[]>) => {
      return action.payload; 
    },
    setModule: (state, action: PayloadAction<ModuleState>) => {
      state.push(action.payload); 
    },
    setContent: (state, action: PayloadAction<{ moduleID: string; newContent: ModuleContent }>) => {
        const { moduleID, newContent } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if (module) {
          module.content.push(newContent);
        }
    },
    setModuleTitle: (state, action: PayloadAction<{ moduleID: string; title: string }>) => {
        const { moduleID, title } = action.payload;
        console.log(moduleID, title)
        const module = state.find((mod) => mod.moduleID === moduleID);
        if(module) module.title = title
    },
    setSubmitted: (state, action: PayloadAction<{ moduleID: string; value: boolean }>) => {
        const { moduleID, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        console.log('module', module)
        console.log(moduleID, value)
        if(module) module.submitted = value
    },
    setRequired: (state, action: PayloadAction<{ moduleID: string; value: boolean }>) => {
        const { moduleID, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if(module) module.required = value
    },
    setQuestion: (state, action: PayloadAction<{ 
            moduleID: string; 
            questionnaireID: string; 
            field: keyof Pick<Extract<ModuleContent, { type: "questionnaire" }>, "choiceType" | "question" | "questionPoint">; 
            value: string; 
        }>) => {
        const { moduleID, questionnaireID, field, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        
        if (module) {
            const questionnaire = module.content.find(
                (item) => item.type === "questionnaire" && item.questionnaireID === questionnaireID
            ) as Extract<ModuleContent, { type: "questionnaire" }> | undefined;
            
            if (questionnaire) {
                questionnaire[field] = value as never;
            }
            if (module.key_answers) {
                module.key_answers = module.key_answers.filter((item) => !Object.prototype.hasOwnProperty.call(item, questionnaireID));
            }
        }
    },
    addChoice: (state, action: PayloadAction<{ moduleID: string; questionnaireID: string; value: {choiceID: string, choice: string} }>) => {
        const { moduleID, questionnaireID, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if(module){
            if (module) {
                const questionnaire = module.content.find(
                    (item) => item.type === "questionnaire" && item.questionnaireID === questionnaireID
                ) as Extract<ModuleContent, { type: "questionnaire" }> | undefined;
        
                if (questionnaire) {
                    questionnaire.choices = [...questionnaire.choices, value];
                }
            }
        }
    },
    setChoice: (state, action: PayloadAction<{ moduleID: string; questionnaireID: string; choiceID: string; value: string}>) => {
        const { moduleID, questionnaireID, choiceID, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if(module){
            if (module) {
                const questionnaire = module.content.find(
                    (item) => item.type === "questionnaire" && item.questionnaireID === questionnaireID
                ) as Extract<ModuleContent, { type: "questionnaire" }> | undefined;
        
                if (questionnaire) {
                    const choice = questionnaire.choices.find((choice) => choice.choiceID === choiceID)
                    if(choice) choice.choice = value
                }
            }
        }
    },
    setKeyAnswer: (state, action: PayloadAction<{ moduleID: string; questionnaireID: string; value: string; type: "" | "Multiple Choice" | "Text Answer" | "Check Box" | "True or False"; }>) => {
        const { moduleID, questionnaireID, value, type } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if (!module) return;
      
        if (!module.key_answers) {
          module.key_answers = [];
        }
      
        const existingEntry = module.key_answers.find(
          (entry) => Object.keys(entry)[0] === questionnaireID
        );
      
        if (existingEntry) {
          const currentValue = existingEntry[questionnaireID];
      
          if (type === 'Check Box') {
            // Handle as string[]
            if (Array.isArray(currentValue)) {
              if (currentValue.includes(value)) {
                existingEntry[questionnaireID] = currentValue.filter((v) => v !== value);
              } else {
                existingEntry[questionnaireID] = [...currentValue, value];
              }
            } else {
              // Convert single string to array
              existingEntry[questionnaireID] = [currentValue, value];
            }
          } else {
            // For text or radio: overwrite as string
            existingEntry[questionnaireID] = value;
          }
        } else {
          // No existing entry
          if (type === 'Check Box') {
            module.key_answers.push({ [questionnaireID]: [value] });
          } else {
            module.key_answers.push({ [questionnaireID]: value });
          }
        }
    },
    deleteModule: (state, action: PayloadAction<string>) => {
        return state.filter((item) => item.moduleID !== action.payload)
    },
    deleteModulePermanent: (state, action: PayloadAction<number>) => {
        return state.filter((item) => item.id !== action.payload)
    },
    deleteContent: (state, action: PayloadAction<{ moduleID: string; contentID: string }>) => {
        const { moduleID, contentID } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if (module) {
            module.content = module.content.filter((content) => 
                !(
                    content.type === 'questionnaire' && content.questionnaireID === contentID || 
                    content.type === 'separator' && content.lessonID === contentID ||
                    content.type === 'uploadedFile' && content.fileID === contentID
                )
            );

            if (module.key_answers) {
                module.key_answers = module.key_answers.filter((item) => !Object.prototype.hasOwnProperty.call(item, contentID));
            }
        }
    },
    deleteChoice: (state, action: PayloadAction<{ moduleID: string; questionnaireID: string; choiceID: string;}>) => {
        const { moduleID, questionnaireID, choiceID } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if(module){
            if (module) {
                const questionnaire = module.content.find(
                    (item) => item.type === "questionnaire" && item.questionnaireID === questionnaireID
                ) as Extract<ModuleContent, { type: "questionnaire" }> | undefined;
        
                if (questionnaire) {
                    questionnaire.choices = questionnaire.choices.filter((choice) => choice.choiceID !== choiceID)
                }
            }
        }
    },
    deleteAllChoicesFromQuestionnaire: (state, action: PayloadAction<{ moduleID: string; questionnaireID: string }>) => {
        const { moduleID, questionnaireID } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        
        if (module) {
            const questionnaire = module.content.find(
                (item) => item.type === "questionnaire" && item.questionnaireID === questionnaireID
            ) as Extract<ModuleContent, { type: "questionnaire" }> | undefined;
    
            if (questionnaire) {
                questionnaire.choices = []; 
            }
        }
    },    
    setLesson: (state, action: PayloadAction<{ 
        moduleID: string; 
        lessonID: string; 
        field: keyof Pick<Extract<ModuleContent, { type: "separator" }>, "title" | "content" >; 
        value: string}>) => {
        const { moduleID, lessonID, field, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        if(module){
            if (module) {
                const lesson = module.content.find(
                    (item) => item.type === "separator" && item.lessonID === lessonID
                ) as Extract<ModuleContent, { type: "separator" }> | undefined;
        
                if (lesson) {
                    lesson[field] = value as never;
                }
            }
        }
    },
    setFileName: (state, action: PayloadAction<{moduleID: string; fileID: string; value: string;}>) => {
        const { moduleID, fileID, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        
        if (module) {
            const file = module.content.find(
                (item) => item.type === "uploadedFile" && item.fileID === fileID
            ) as Extract<ModuleContent, { type: "uploadedFile" }> | undefined

            if (file) {
                file.fileName = value;
            }
        }
    },
    setFile: (state, action: PayloadAction<{moduleID: string; fileID: string; value: File;}>) => {
        const { moduleID, fileID, value } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
        
        if (module) {
            const file = module.content.find(
                (item) => item.type === "uploadedFile" && item.fileID === fileID
            ) as Extract<ModuleContent, { type: "uploadedFile" }> | undefined

            if (file) {
                file.file = value;
            }
        }
    },
    deleteFile: (state, action: PayloadAction<{ moduleID: string; fileID: string }>) => {
        const { moduleID, fileID } = action.payload;
        const module = state.find((mod) => mod.moduleID === moduleID);
    
        if (module) {
            const file = module.content.find(
                (item) => item.type === "uploadedFile" && item.fileID === fileID
            ) as Extract<ModuleContent, { type: "uploadedFile" }> | undefined;
    
            if (file) {
                file.file = null; // Empty the file field instead of removing the object
            }
        }
    },
    
    replaceModule: (state, action: PayloadAction<{ moduleID: string; newModule: ModuleState }>) => {
        const { moduleID, newModule } = action.payload;
        const index = state.findIndex((mod) => mod.moduleID === moduleID);
        if (index !== -1) {
          state[index] = newModule;
        }
      },
    resetModuleData: () => initialState
  },
});

export const { 
    setModule, 
    setContent, 
    setModuleTitle,
    setQuestion,
    addChoice,
    setChoice,
    deleteModule,
    deleteContent,
    deleteChoice,
    setLesson,
    setFileName,
    setFile,
    resetModuleData,
    replaceModule,
    setSubmitted,
    setRequired,
    deleteModulePermanent,
    deleteAllChoicesFromQuestionnaire,
    deleteFile,
    setKeyAnswer,
    setModules
} = ModuleDataRedux.actions;
export default ModuleDataRedux.reducer;
