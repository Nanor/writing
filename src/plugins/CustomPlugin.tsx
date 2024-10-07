import { useEffect, useState } from "react";
import { $getRoot, $insertNodes } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const SavePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [wordCount, setWordCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [lastChange, setLastChange] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    editor.update(() => {
      const html = localStorage.getItem("writing__html");
      if (html) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");

        const nodes = $generateNodesFromDOM(editor, dom);

        $getRoot().clear();
        $getRoot().selectStart();
        $insertNodes(nodes);
      }
    });

    editor.registerTextContentListener((text) => {
      setWordCount((text.match(/\S+/g) || []).length);
      setLastChange(new Date().getTime());
    });

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        localStorage.setItem("writing__html", html);
      });
    });
  }, [editor]);

  return (
    <>
      {currentTime - lastChange > 1000 && <div className="warning" />}
      <div className="word-count">
        {wordCount} word{wordCount === 1 ? "" : "s"}
      </div>
    </>
  );
};

export default SavePlugin;
