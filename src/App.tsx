import { useState } from 'react'
import styled from '@emotion/styled'
import JsonEditor from './components/JsonEditor'
import JsonDiffEditor from './components/JsonDiffEditor'
import ComparisonResults from './components/ComparisonResults'
import SettingsModal from './components/SettingsModal'
import { compareJson, parseJson, formatJson } from './utils/jsonComparer'

const AppContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Header = styled.header`
  text-align: center;
  padding: 10px 0;
`

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 2em;
`

const EditorsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  flex: 1;
  min-height: 0;
`

const ResultsWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
`

const CompareButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 20px 0;
`

const SettingsButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1em;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1976D2;
  }
`

interface ComparisonResult {
  valueMismatches: Array<{
    path: string;
    value1: any;
    value2: any;
  }>;
  typeMismatches: Array<{
    path: string;
    type1: string;
    type2: string;
  }>;
  missingProperties: Array<{
    path: string;
    inFirst: boolean;
  }>;
  arrayLengthMismatches: Array<{
    path: string;
    length1: number;
    length2: number;
  }>;
}

interface Settings {
  valueMismatches: {
    enabled: boolean;
    logLevel: 'Info' | 'Warning' | 'Error';
  };
  typeMismatches: {
    enabled: boolean;
    logLevel: 'Info' | 'Warning' | 'Error';
  };
  missingProperties: {
    enabled: boolean;
    logLevel: 'Info' | 'Warning' | 'Error';
  };
  arrayLengthMismatches: {
    enabled: boolean;
    logLevel: 'Info' | 'Warning' | 'Error';
  };
}

const App = () => {
  const [json1, setJson1] = useState(formatJson({}))
  const [json2, setJson2] = useState(formatJson({}))
  const [formattedJson1, setFormattedJson1] = useState(formatJson({}))
  const [formattedJson2, setFormattedJson2] = useState(formatJson({}))
  const [showDiff, setShowDiff] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    valueMismatches: { enabled: true, logLevel: 'Info' },
    typeMismatches: { enabled: true, logLevel: 'Warning' },
    missingProperties: { enabled: true, logLevel: 'Warning' },
    arrayLengthMismatches: { enabled: true, logLevel: 'Warning' },
  })
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult>({
    valueMismatches: [],
    typeMismatches: [],
    missingProperties: [],
    arrayLengthMismatches: [],
  })

  const handleJsonChange = (value: string, isFirst: boolean) => {
    if (isFirst) {
      setJson1(value);
    } else {
      setJson2(value);
    }
    setShowDiff(false);
  }

  const handleCompare = () => {
    const parsed1 = parseJson(json1);
    const parsed2 = parseJson(json2);

    if (parsed1 && parsed2) {
      // Format both JSONs
      const formatted1 = formatJson(parsed1);
      const formatted2 = formatJson(parsed2);
      setFormattedJson1(formatted1);
      setFormattedJson2(formatted2);
      
      const results = compareJson(parsed1, parsed2);
      setComparisonResults(results);
      setShowDiff(true);
    }
  }

  const isJsonValid = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  const canCompare = isJsonValid(json1) && isJsonValid(json2);

  const hasNoDifferences = 
    comparisonResults.valueMismatches.length === 0 &&
    comparisonResults.typeMismatches.length === 0 &&
    comparisonResults.missingProperties.length === 0 &&
    comparisonResults.arrayLengthMismatches.length === 0;

  return (
    <AppContainer>
      <Header>
        <Title>JSON Comparer</Title>
      </Header>
      <EditorsContainer>
        <JsonEditor
          value={json1}
          onChange={(value) => handleJsonChange(value, true)}
          label="First JSON"
        />
        <JsonEditor
          value={json2}
          onChange={(value) => handleJsonChange(value, false)}
          label="Second JSON"
        />
      </EditorsContainer>
      <ButtonGroup>
        <CompareButton onClick={handleCompare} disabled={!canCompare}>
          Compare JSONs
        </CompareButton>
        <SettingsButton onClick={() => setShowSettings(true)}>
          Settings
        </SettingsButton>
      </ButtonGroup>
      {showDiff && !hasNoDifferences && (
        <EditorsContainer>
          <JsonDiffEditor
            original={formattedJson1}
            modified={formattedJson2}
          />
        </EditorsContainer>
      )}
      <ResultsWrapper>
        {hasNoDifferences && showDiff ? (
          <ComparisonResults
            {...comparisonResults}
            settings={{
              ...settings,
              valueMismatches: { ...settings.valueMismatches, enabled: true },
            }}
            identicalMessage="JSONs are identical"
          />
        ) : (
          <ComparisonResults {...comparisonResults} settings={settings} />
        )}
      </ResultsWrapper>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </AppContainer>
  )
}

export default App
