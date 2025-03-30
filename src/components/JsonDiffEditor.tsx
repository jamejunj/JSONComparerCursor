import { DiffEditor } from '@monaco-editor/react';
import styled from '@emotion/styled';

interface JsonDiffEditorProps {
  original: string;
  modified: string;
}

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-width: 0;
  border: 1px solid #94a3b8;
  border-radius: 4px;
  overflow: hidden;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
  font-size: 1.1em;
  padding: 8px 12px;
  background-color: #f8fafc;
  border-bottom: 1px solid #94a3b8;
`;

const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const JsonDiffEditor = ({ original, modified }: JsonDiffEditorProps) => {
  return (
    <EditorContainer>
      <Label>Differences</Label>
      <EditorWrapper>
        <DiffEditor
          height="600px"
          language="json"
          original={original}
          modified={modified}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            renderSideBySide: true,
            readOnly: true,
            diffWordWrap: 'on',
            renderWhitespace: 'all',
            originalEditable: false,
            padding: { top: 0, bottom: 0 },
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default JsonDiffEditor; 