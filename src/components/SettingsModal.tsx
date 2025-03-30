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

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const SettingLabel = styled.label`
  flex: 1;
  color: #333;
`;

const LogLevelSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SettingsModal = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: SettingsModalProps) => {
  if (!isOpen) return null;

  const handleSettingChange = (
    key: keyof Settings,
    field: 'enabled' | 'logLevel',
    value: boolean | string
  ) => {
    onSettingsChange({
      ...settings,
      [key]: {
        ...settings[key],
        [field]: value,
      },
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Settings</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <SettingRow>
          <Checkbox
            type="checkbox"
            checked={settings.valueMismatches.enabled}
            onChange={(e) =>
              handleSettingChange('valueMismatches', 'enabled', e.target.checked)
            }
          />
          <SettingLabel>Value Mismatches</SettingLabel>
          <LogLevelSelect
            value={settings.valueMismatches.logLevel}
            onChange={(e) =>
              handleSettingChange(
                'valueMismatches',
                'logLevel',
                e.target.value as 'Info' | 'Warning' | 'Error'
              )
            }
            disabled={!settings.valueMismatches.enabled}
          >
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
          </LogLevelSelect>
        </SettingRow>

        <SettingRow>
          <Checkbox
            type="checkbox"
            checked={settings.typeMismatches.enabled}
            onChange={(e) =>
              handleSettingChange('typeMismatches', 'enabled', e.target.checked)
            }
          />
          <SettingLabel>Type Mismatches</SettingLabel>
          <LogLevelSelect
            value={settings.typeMismatches.logLevel}
            onChange={(e) =>
              handleSettingChange(
                'typeMismatches',
                'logLevel',
                e.target.value as 'Info' | 'Warning' | 'Error'
              )
            }
            disabled={!settings.typeMismatches.enabled}
          >
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
          </LogLevelSelect>
        </SettingRow>

        <SettingRow>
          <Checkbox
            type="checkbox"
            checked={settings.missingProperties.enabled}
            onChange={(e) =>
              handleSettingChange('missingProperties', 'enabled', e.target.checked)
            }
          />
          <SettingLabel>Missing Properties</SettingLabel>
          <LogLevelSelect
            value={settings.missingProperties.logLevel}
            onChange={(e) =>
              handleSettingChange(
                'missingProperties',
                'logLevel',
                e.target.value as 'Info' | 'Warning' | 'Error'
              )
            }
            disabled={!settings.missingProperties.enabled}
          >
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
          </LogLevelSelect>
        </SettingRow>

        <SettingRow>
          <Checkbox
            type="checkbox"
            checked={settings.arrayLengthMismatches.enabled}
            onChange={(e) =>
              handleSettingChange(
                'arrayLengthMismatches',
                'enabled',
                e.target.checked
              )
            }
          />
          <SettingLabel>Array Length Mismatches</SettingLabel>
          <LogLevelSelect
            value={settings.arrayLengthMismatches.logLevel}
            onChange={(e) =>
              handleSettingChange(
                'arrayLengthMismatches',
                'logLevel',
                e.target.value as 'Info' | 'Warning' | 'Error'
              )
            }
            disabled={!settings.arrayLengthMismatches.enabled}
          >
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
          </LogLevelSelect>
        </SettingRow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal; 