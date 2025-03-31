import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-color);
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
`;

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ToggleButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
      <Icon>{isDarkMode ? '☀️' : '🌙'}</Icon>
    </ToggleButton>
  );
};

export default DarkModeToggle; 