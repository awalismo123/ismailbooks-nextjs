"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyMCEBlogEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  darkMode?: boolean;
}

export default function TinyMCEBlogEditor({
  value,
  onChange,
  height = 480,
  darkMode = false,
}: TinyMCEBlogEditorProps) {
  const isDark = darkMode;

  return (
    <div
      className={`tinymce-editor-wrapper rounded-xl overflow-hidden border transition-colors ${
        isDark ? "border-[#2F3336] bg-[#161E27]" : "border-[#E8DFD2] bg-white"
      }`}
    >
      <Editor
        key={isDark ? "dark-editor" : "light-editor"}
        tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@6.8.3/tinymce.min.js"
        value={value}
        onEditorChange={(newContent) => onChange(newContent)}
        init={{
          height,
          skin: isDark ? "oxide-dark" : "oxide",
          content_css: isDark ? "dark" : "default",
          menubar: "file edit view insert format tools table",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | removeformat code fullscreen",
          content_style: `
            body { 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
              font-size: 15px; 
              line-height: 1.7; 
              color: ${isDark ? "#E7E9EA" : "#201B16"}; 
              background-color: ${isDark ? "#161E27" : "#FFFFFF"};
              padding: 1rem; 
            }
            h1, h2, h3, h4 { color: ${isDark ? "#70B5F9" : "#1F3A54"}; font-weight: 800; }
            a { color: ${isDark ? "#F87171" : "#7A1F2B"}; text-decoration: underline; }
            blockquote { border-left: 4px solid ${isDark ? "#F87171" : "#7A1F2B"}; margin: 1em 0; padding-left: 1em; color: ${isDark ? "#9CA3AF" : "#6B5F52"}; font-style: italic; }
            img { max-width: 100%; height: auto; border-radius: 8px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid ${isDark ? "#2F3336" : "#E8DFD2"}; padding: 8px; }
          `,
          branding: false,
          promotion: false,
          statusbar: true,
          elementpath: true,
        }}
      />
    </div>
  );
}
