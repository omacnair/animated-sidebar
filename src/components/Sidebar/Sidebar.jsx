import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

// Массив основных пунктов навигации
// Каждый объект содержит: title (название), icon (иконка), path (путь)
const routes = [
    { title: 'Home', icon: 'house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

// Массив дополнительных пунктов навигации
const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

// Styled Components

// Основной контейнер сайдбара
const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: ${props => 
    props.color === 'dark' 
      ? 'var(--color-sidebar-background-dark-default)' 
      : 'var(--color-sidebar-background-light-default)'
  };
  transition: width 0.3s ease;
  width: ${props => props.isOpened ? '240px' : '60px'};
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`;

// Заголовок сайдбара (с логотипом)
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px solid ${props => 
    props.color === 'dark' 
      ? 'rgba(240, 242, 255, 0.1)' 
      : 'rgba(151, 165, 185, 0.2)'
  };
  position: relative; 
`;

// Логотип
const Logo = styled.img`
  width: 32px;
  height: 32px;
  margin-right: ${props => props.isOpened ? '12px' : '0'};
  transition: margin 0.3s ease;
`;

// Текст логотипа
const LogoText = styled.span`
  color: ${props => 
    props.color === 'dark' 
      ? 'var(--color-text-logo-dark-default)' 
      : 'var(--color-text-logo-light-default)'
  };
  font-weight: 400;
  font-size: 18px;
  opacity: ${props => props.isOpened ? '1' : '0'};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

// Секция навигации
const NavigationSection = styled.div`
  padding: 16px 0;
`;

// Элемент навигации (пункт меню)
const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 0 8px 4px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => {
    if (props.isActive) {
      return props.color === 'dark' 
        ? 'var(--color-text-logo-dark-default)' 
        : 'var(--color-text-logo-light-default)';
    }
    return props.color === 'dark' 
      ? 'var(--color-text-dark-default)' 
      : 'var(--color-text-light-default)';
  }};
  background-color: ${props => {
    if (props.isActive) {
      return 'rgba(59, 130, 246, 0.1)';
    }
    return 'transparent';
  }};
  border-radius: ${props => props.isActive ? '12px' : '0'};
  
  &:hover {
    background-color: ${props => 
      props.color === 'dark' 
        ? 'var(--color-sidebar-background-dark-hover)' 
        : 'var(--color-sidebar-background-light-hover)'
    };
    color: ${props => 
      props.color === 'dark' 
        ? 'var(--color-text-dark-hover)' 
        : 'var(--color-text-light-hover)'
    };
    border-radius: 12px;
  }
  
  &:active {
    background-color: ${props => 
      props.color === 'dark' 
        ? 'var(--color-sidebar-background-dark-active)' 
        : 'var(--color-sidebar-background-light-active)'
    };
    color: ${props => 
      props.color === 'dark' 
        ? 'var(--color-text-dark-active)' 
        : 'var(--color-text-light-active)'
    };
  }
`;

// Контейнер для иконки
const NavIcon = styled.div`
  width: 20px;
  margin-right: ${props => props.isOpened ? '12px' : '0'};
  transition: margin 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Текст пункта навигации
const NavText = styled.span`
  opacity: ${props => props.isOpened ? '1' : '0'};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  font-size: 14px;
  font-weight: ${props => props.isActive ? '600' : '400'};
`;

// Нижняя секция (настройки и поддержка)
const BottomSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0;
  border-top: 1px solid ${props => 
    props.color === 'dark' 
      ? 'rgba(240, 242, 255, 0.1)' 
      : 'rgba(151, 165, 185, 0.2)'
  };
`;

// ===== ОСНОВНОЙ КОМПОНЕНТ =====

const Sidebar = (props) => {
    const { color, isOpened } = props;
    const [activeItem, setActiveItem] = useState('Home');

    const goToRoute = (path, title) => {
        console.log(`going to "${path}"`);
        setActiveItem(title);
    };

    // Функция для рендеринга элементов навигации
    // Принимает массив элементов (routes или bottomRoutes)
    const renderNavItems = (items) => (
        items.map(route => (
            <NavItem 
                key={route.title} 
                color={color}
                isActive={activeItem === route.title}
                onClick={() => goToRoute(route.path, route.title)}
            >
                <NavIcon isOpened={isOpened}>
                    <FontAwesomeIcon icon={route.icon} />
                </NavIcon>
                <NavText isOpened={isOpened} isActive={activeItem === route.title}>
                    {route.title}
                </NavText>
            </NavItem>
        ))
    );

    return (
        <SidebarContainer color={color} isOpened={isOpened}>
            {/* Заголовок с логотипом */}
            <Header color={color}>
                <Logo src={logo} alt="TensorFlow logo" isOpened={isOpened} />
                <LogoText color={color} isOpened={isOpened}>TensorFlow</LogoText>
            </Header>
            
            {/* Основная навигация */}
            <NavigationSection>
                {renderNavItems(routes)}
            </NavigationSection>
            
            {/* Нижняя навигация (настройки, поддержка) */}
            <BottomSection color={color}>
                {renderNavItems(bottomRoutes)}
            </BottomSection>
        </SidebarContainer>
    );
};

// Проверка типов пропсов для отладки
Sidebar.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
    isOpened: PropTypes.bool,
};

export default Sidebar;
