import { BsQuestionCircleFill } from "react-icons/bs";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import { LessonState  } from '../../../../types/CourseCreationTypes'

import JoditEditor from 'jodit-react'
import React, { useRef, useMemo } from 'react'

type SeparatorState = {
    moduleID: string;
    data: LessonState;
    setContent: (moduleID: string, lessonID: string, field: string, content: string) => void;
    deleteSeparator: (moduleID: string, lessonID: string) => void;
}

const Separator: React.FC<SeparatorState> = React.memo((props) => {
    const { moduleID, data, setContent, deleteSeparator } = props

    const editor = useRef(null)

    const configContent = useMemo(() => ({
        height: 400,
        minHeight: 150,
        maxHeight: 600,
        autoHeight: false,
        placeholder: 'Enter the Content here...',
        removeButtons: [
            "preview",
            "print",
            "file",
            "video",
            "about",
            "fullsize",
            "speechRecognize",
            "className"
        ],
        disablePlugins: ['class-span']
    }), [])

    const configTitle = useMemo(() => ({
        height: 100,
        minHeight: 80,
        maxHeight: 120,
        autoHeight: false,
        placeholder: 'Enter the Title here...',
        buttons: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'font',
            'eraser'
        ],
        removeButtons: [
            // Remove all other buttons by explicitly listing them
            'source', 'brush', 'paragraph', 'fontsize', 'ul', 'ol', 
            'indent', 'outdent', 'left', 'center', 'right', 'justify',
            'lineHeight', 'superscript', 'subscript', 'cut', 'copy', 'paste',
            'copyformat', 'hr', 'table', 'link', 'symbol', 'dots', 'find',
            'selectall', 'image', 'file', 'video', 'print', 'about', 'preview',
            'spellcheck', 'className', 'fullsize', 'undo', 'redo', 'hr'
        ],
        disablePlugins: [
            // Disable unnecessary plugins
            'mobile', 'speechRecognize', 'class-span', 'wrapNodes',
            'paste', 'pasteStorage', 'clipboard', 'symbols', 'table',
            'video', 'file', 'image', 'print', 'search', 'about',
            'fullsize', 'preview', 'spellcheck'
        ],
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: false,
        iframe: false,
        allowTags: {
            // Only allow basic formatting tags
            bold: true,
            italic: true,
            underline: true,
            strike: true,
            font: true,
            span: false,
            div: false
        }
        }), []);

  return (
        <section className="w-full h-fit border rounded-md">
            <header className="w-full flex items-center justify-between border-b p-3 bg-c-grey-5 rounded-t-md">
                <p className="font-medium flex items-center gap-1"><BsQuestionCircleFill size={20} color="blue"/>Title/Description</p>
                <div className="flex items-center justify-center gap-2">
                    <button><BiDownArrowAlt size={24} color="gray"/></button>
                    <button><BiUpArrowAlt size={24} color="gray"/></button>
                    <button onClick={() => deleteSeparator(moduleID, data.lessonID)}><RiDeleteBinLine size={24} color="gray"/></button>
                </div>
            </header>
            <div className="w-full p-3 flex flex-col gap-2">
                {/* <input 
                    type="text"
                    value={data.title}
                    onChange={(e) => setContent(moduleID, data.lessonID, "title", e.target.value)}
                    className="w-full p-2 text-p-lg" 
                    placeholder="Untitled (Optional)" /> */}
                <JoditEditor ref={editor} config={configTitle} value={data.title} onChange={(e) => setContent(moduleID, data.lessonID, "title", e)} />
                {/* <textarea  
                    value={data.content}
                    onChange={(e) => setContent(moduleID, data.lessonID, "content", e.target.value)}
                    className="w-full p-2 h-52 resize-none" 
                    placeholder="Description text (optional)" /> */}
                    <JoditEditor ref={editor} config={configContent} value={data.content} onChange={(e) => setContent(moduleID, data.lessonID, "content", e)} />
            </div>
        </section>
  )
})

export default Separator