import React, { useState } from "react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    { 
      label: "Bold", 
      action: () => editor.chain().focus().toggleBold().run(), 
      active: editor.isActive("bold") 
    },
    { 
      label: "Italic", 
      action: () => editor.chain().focus().toggleItalic().run(), 
      active: editor.isActive("italic") 
    },
    { 
      label: "Strike", 
      action: () => editor.chain().focus().toggleStrike().run(), 
      active: editor.isActive("strike") 
    },
    { 
      label: "Bullet List", 
      action: () => editor.chain().focus().toggleBulletList().run(), 
      active: editor.isActive("bulletList") 
    },
    { 
      label: "Ordered List", 
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList") 
    },
    { 
      label: "Left", 
      action: () => editor.chain().focus().setTextAlign("left").run(), 
      active: editor.isActive({ textAlign: "left" }) 
    },
    { 
      label: "Center", 
      action: () => editor.chain().focus().setTextAlign("center").run(), 
      active: editor.isActive({ textAlign: "center" }) 
    },
    { 
      label: "Right", 
      action: () => editor.chain().focus().setTextAlign("right").run(), 
      active: editor.isActive({ textAlign: "right" }) 
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-md mb-4">
      {buttons.map(({ label, action, active }, index) => (
        <button
          key={index}
          onClick={action}
          className={`px-3 py-1 text-sm font-medium border rounded-md transition-all duration-200 ${active ? "bg-blue-500 text-white" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const TiptapEditor: React.FC = () => {
  const [savedContent, setSavedContent] = useState<string>("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  // const handleSave = () => {
  //   if (editor) {
  //     setSavedContent(editor.getHTML());
  //   }
  // };

//   const handleSave = async () => {
//     if (!editor) return;

//     const contentJSON = editor.getJSON(); // Get JSON format
//     setSavedContent(JSON.stringify(contentJSON, null, 2)); // Display JSON

//     await fetch("/api/save-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title: "My Post", content: contentJSON }),
//     });
// };

const displayEditor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ],
  content: savedContent ? JSON.parse(savedContent) : "",
  editable: false,
});

const handleSave = async () => {
  if (!editor) return;

  const contentJSON = editor.getJSON(); // Get JSON format
  const stringified = JSON.stringify(contentJSON, null, 2);
  setSavedContent(stringified);
};

  return (
    <div className="mx-auto p-4 border rounded-md shadow-md bg-white">
      <MenuBar editor={editor} />
      <div className="p-4 border rounded-md bg-gray-50">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Save Content
        </button>
      </div>
      
      {savedContent && (
        <section className="flex flex-row gap-10">
          {/*This is how were going to store it in database*/}
          <div className="mt-6 w-80">
            <h3 className="text-lg font-medium mb-2">JSON Store</h3>
            <pre className="p-4 bg-gray-100 rounded-md overflow-auto border border-gray-300">
              {savedContent}
            </pre>
          </div>
          {/*Show here sample of how will it look after fetching the content from the database*/}
          <div className="mt-6 w-80">
            <h3 className="text-lg font-medium mb-2">Display Content</h3>
            <div className="p-4 bg-gray-100 rounded-md overflow-auto border border-gray-300">
            <EditorContent editor={displayEditor} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TiptapEditor;