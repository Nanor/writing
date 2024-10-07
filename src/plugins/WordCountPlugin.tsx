import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const WordCountPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    editor.registerTextContentListener((text) => {
      setWordCount((text.match(/\S+/g) || []).length);
    });
  }, [editor]);

  return (
    <div className="word-count">
      {wordCount} word{wordCount === 1 ? "" : "s"}
    </div>
  );
};

export default WordCountPlugin;
