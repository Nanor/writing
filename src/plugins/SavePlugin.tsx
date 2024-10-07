import { useEffect } from "react";
import { $getRoot, $insertNodes } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const SavePlugin = () => {
  const [editor] = useLexicalComposerContext();

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

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        localStorage.setItem("writing__html", html);
      });
    });
  }, [editor]);

  return null;
};

export default SavePlugin;
