import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useRef } from "react";
import "../style/custom.css";
export default function TextEditor() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  return (
    <div className=" bg-white  dark:bg-[var(--color-secondary-900)] ">
      <div
        className="bg-white min-h-50 dark:bg-[var(--color-secondary-900)]  dark:text-white"
        ref={editorRef}
      />
    </div>
  );
}
