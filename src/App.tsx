/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import Theme from "./Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import SavePlugin from "./plugins/SavePlugin";
import { useState } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

const editorConfig = {
  namespace: "writing",
  nodes: [],
  onError(error: Error) {
    throw error;
  },
  theme: Theme,
};

export default function App() {
  const [animating, setAnimating] = useState(false);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className={`editor-inner ${animating ? "animating" : ""}`}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <SavePlugin />
          <OnChangePlugin
            onChange={() => {
              setAnimating(false);
              setTimeout(() => {
                setAnimating(true);
              }, 1000);
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}
