import { useState } from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import Sidebar from "./components/Sidebar";

library.add(fas);

// Основной контейнер приложения
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #e2e8f0;
  position: relative;
`;

// Базовый стиль для всех кнопок в приложении
// Наследуется ThemeToggleButton и SidebarToggleButton 
// Использую дизайн-токены для цветов кнопок из index.scss
const ButtonBase = styled.button`
  position: fixed;
  z-index: 1000;
  background: ${props => props.theme === 'dark' ? 'var(--color-button-background-dark-default)' : 'var(--color-button-background-light-default)'};
  color: ${props => props.theme === 'dark' ? 'var(--color-text-dark-default)' : 'var(--color-text-light-default)'};
  border: none;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'var(--color-sidebar-background-dark-hover)' : 'var(--color-sidebar-background-light-hover)'};
    color: ${props => props.theme === 'dark' ? 'var(--color-text-dark-hover)' : 'var(--color-text-light-hover)'};
  }
  
  &:active {
    background: ${props => props.theme === 'dark' ? 'var(--color-button-background-dark-active)' : 'var(--color-button-background-light-active)'};
    color: ${props => props.theme === 'dark' ? 'var(--color-text-dark-active)' : 'var(--color-text-light-active)'};
  }
`;

// Кнопка переключения темы (светлая/темная)
// Наследует все стили от ButtonBase
const ThemeToggleButton = styled(ButtonBase)`
  top: 20px;
  right: 20px;
  border-radius: 12px;
  padding: 12px 20px;
  gap: 8px;
`;

// Кнопка сворачивания/разворачивания сайдбара
// Наследует все стили от ButtonBase
const SidebarToggleButton = styled(ButtonBase)`
  left: ${props => props.isOpened ? '260px' : '80px'};
  top: 20px;
  border-radius: 50%;
  padding: 12px;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

export default function App() {
  // Состояние для текущей темы (light/dark)
  const [theme, setTheme] = useState('light');
  
  // Состояние для открытия/закрытия сайдбара
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Функция для переключения состояния сайдбара
  const toggleSidebar = () => {
    setIsSidebarOpened(prev => !prev);
  };

  return (
    <AppContainer>
      {/* Кнопка переключения темы */}
      <ThemeToggleButton theme={theme} onClick={toggleTheme}>
        <FontAwesomeIcon icon={theme === 'light' ? 'moon' : 'sun'} />
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </ThemeToggleButton>
      
      {/* Кнопка сворачивания сайдбара */}
      <SidebarToggleButton 
        theme={theme} 
        isOpened={isSidebarOpened} 
        onClick={toggleSidebar}
      >
        {/* Стрелка влево когда сайдбар открыт, вправо когда закрыт */}
        <FontAwesomeIcon icon={isSidebarOpened ? 'angle-left' : 'angle-right'} />
      </SidebarToggleButton>
      
      {/* Компонент сайдбара */}
      <Sidebar color={theme} isOpened={isSidebarOpened} />
    </AppContainer>
  );
}
