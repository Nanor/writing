import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const WarningPlugin = () => {
  const [editor] = useLexicalComposerContext();
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
    editor.registerTextContentListener(() => {
      setLastChange(new Date().getTime());
    });
  }, [editor]);

  return currentTime - lastChange > 1000 && <div className="warning" />;
};

export default WarningPlugin;
