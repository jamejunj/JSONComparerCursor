import { DiffEditor } from '@monaco-editor/react';
import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

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
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
`;

const Label = styled.label`
  font-weight: bold;
  color: var(--text-primary);
  font-size: 1.1em;
  padding: 8px 12px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
`;

const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const JsonDiffEditor = ({ original, modified }: JsonDiffEditorProps) => {
  const { isDarkMode } = useTheme();

  return (
    <EditorContainer>
      <Label>Differences</Label>
      <EditorWrapper>
        <DiffEditor
          height="600px"
          language="json"
          original={original}
          modified={modified}
          theme={isDarkMode ? 'vs-dark' : 'vs-light'}
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
            originalEditable: false,
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default JsonDiffEditor; 