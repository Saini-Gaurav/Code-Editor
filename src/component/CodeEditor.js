import React, { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleCopy = () => {
    if (code.trim() === "") {
      alert("Nothing to copy.");
    } else {
      navigator.clipboard.writeText(code).then(() => {
        alert("Code copied to clipboard!");
      });
    }
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_code.txt";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleTabKey = (e) => {
    if (e.key === "Tab" && !isLocked) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const spaces = "  ";
      setCode(
        code.substring(0, start) + spaces + code.substring(end)
      );
      e.target.setSelectionRange(start + spaces.length, start + spaces.length);
    }
  };

  return (
    <div className="code-editor">
      <div className="code-editor__toolbar">
        <button className="code-editor__button code-editor__button--copy" onClick={handleCopy}>
          Copy
        </button>
        <button className="code-editor__button code-editor__button--save" onClick={handleSave}>
          Save
        </button>
        <button className="code-editor__button code-editor__button--lock" onClick={handleLockToggle}>
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </div>
      <textarea cols="100"
        className="code-editor__textarea code-editor__code-input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleTabKey}
        readOnly={isLocked}
      />
    </div>
  );
};

export default CodeEditor;
