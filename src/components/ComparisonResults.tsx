import styled from '@emotion/styled';

interface MismatchSetting {
  enabled: boolean;
  logLevel: 'Info' | 'Warning' | 'Error';
}

interface Settings {
  valueMismatches: MismatchSetting;
  typeMismatches: MismatchSetting;
  missingProperties: MismatchSetting;
  arrayLengthMismatches: MismatchSetting;
}

interface ComparisonResultsProps {
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
  settings: Settings;
  identicalMessage?: string;
}

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2em;
  padding-bottom: 8px;
  border-bottom: 2px solid #e0e0e0;
`;

const ResultItem = styled.div`
  padding: 12px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  word-break: break-word;
  line-height: 1.5;
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-weight: bold;
`;

const WarningText = styled.span`
  color: #ffc107;
  font-weight: bold;
`;

const InfoText = styled.span`
  color: #17a2b8;
  font-weight: bold;
`;

const formatPath = (path: string): string => {
  return path.replace(/\.(\d+)\./g, '[$1].');
};

const getLogLevelStyle = (logLevel: 'Info' | 'Warning' | 'Error') => {
  switch (logLevel) {
    case 'Error':
      return ErrorText;
    case 'Warning':
      return WarningText;
    case 'Info':
      return InfoText;
    default:
      return ErrorText;
  }
};

interface LogLevelProps {
  level: 'Info' | 'Warning' | 'Error';
  children: React.ReactNode;
}

const LogLevelComponent = ({ level, children }: LogLevelProps) => {
  const Component = getLogLevelStyle(level);
  return <Component>{children}</Component>;
};

const ComparisonResults = ({
  valueMismatches,
  typeMismatches,
  missingProperties,
  arrayLengthMismatches,
  settings,
  identicalMessage,
}: ComparisonResultsProps) => {
  return (
    <ResultsContainer>
      {identicalMessage && (
        <Section>
          <SectionTitle>Comparison Results</SectionTitle>
          <ResultItem>
            <LogLevelComponent level="Info">[Info]</LogLevelComponent> {identicalMessage}
          </ResultItem>
        </Section>
      )}

      {settings.arrayLengthMismatches.enabled && arrayLengthMismatches.length > 0 && (
        <Section>
          <SectionTitle>Array Length Mismatches</SectionTitle>
          {arrayLengthMismatches.map((mismatch, index) => (
            <ResultItem key={index}>
              <LogLevelComponent level={settings.arrayLengthMismatches.logLevel}>
                [{settings.arrayLengthMismatches.logLevel}]
              </LogLevelComponent>{' '}
              Array length mismatch on {formatPath(mismatch.path)} (
              {mismatch.length1}, {mismatch.length2})
            </ResultItem>
          ))}
        </Section>
      )}

      {settings.valueMismatches.enabled && valueMismatches.length > 0 && (
        <Section>
          <SectionTitle>Value Mismatches</SectionTitle>
          {valueMismatches.map((mismatch, index) => (
            <ResultItem key={index}>
              <LogLevelComponent level={settings.valueMismatches.logLevel}>
                [{settings.valueMismatches.logLevel}]
              </LogLevelComponent>{' '}
              Value mismatch on {formatPath(mismatch.path)} (
              {JSON.stringify(mismatch.value1)}, {JSON.stringify(mismatch.value2)})
            </ResultItem>
          ))}
        </Section>
      )}

      {settings.typeMismatches.enabled && typeMismatches.length > 0 && (
        <Section>
          <SectionTitle>Type Mismatches</SectionTitle>
          {typeMismatches.map((mismatch, index) => (
            <ResultItem key={index}>
              <LogLevelComponent level={settings.typeMismatches.logLevel}>
                [{settings.typeMismatches.logLevel}]
              </LogLevelComponent>{' '}
              Type mismatch on {formatPath(mismatch.path)} (
              {mismatch.type1}, {mismatch.type2})
            </ResultItem>
          ))}
        </Section>
      )}

      {settings.missingProperties.enabled && missingProperties.length > 0 && (
        <Section>
          <SectionTitle>Missing Properties</SectionTitle>
          {missingProperties.map((missing, index) => (
            <ResultItem key={index}>
              <LogLevelComponent level={settings.missingProperties.logLevel}>
                [{settings.missingProperties.logLevel}]
              </LogLevelComponent>{' '}
              Property {formatPath(missing.path)} is{' '}
              {missing.inFirst ? 'only in first JSON' : 'only in second JSON'}
            </ResultItem>
          ))}
        </Section>
      )}
    </ResultsContainer>
  );
};

export default ComparisonResults; 