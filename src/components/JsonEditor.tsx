import { Editor } from '@monaco-editor/react';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
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

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
`;

const Button = styled.button`
  padding: 4px 8px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const JsonEditor = ({ value, onChange, label }: JsonEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useTheme();

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch (error) {
      // If JSON is invalid, don't format
      console.error('Invalid JSON:', error);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          const formatted = JSON.stringify(parsed, null, 2);
          onChange(formatted);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <EditorContainer>
      <Label>{label}</Label>
      <Toolbar>
        <Button onClick={handleFormat}>Format</Button>
        <Button onClick={handleUpload}>Upload JSON</Button>
        <FileInput
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Toolbar>
      <EditorWrapper>
        <Editor
          height="400px"
          defaultLanguage="json"
          value={value}
          onChange={(value) => onChange(value || '')}
          theme={isDarkMode ? 'vs-dark' : 'vs-light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default JsonEditor; 