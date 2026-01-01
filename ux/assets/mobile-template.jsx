import React, { useState } from 'react';

/**
 * UX Design Template - Mobile App Screen
 * 
 * This template provides a mobile-first design framework with common UI patterns.
 * Customize the components, colors, and layout to match your specific design needs.
 */

const UXTemplate = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // Color tokens - customize these for your design
  const colors = {
    primary: '#2563eb',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
      inverse: '#ffffff'
    }
  };

  // Common components
  const Button = ({ children, variant = 'primary', size = 'medium', fullWidth = false, onClick }) => {
    const baseStyle = {
      padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: size === 'small' ? '14px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
      primary: {
        backgroundColor: colors.primary,
        color: colors.text.inverse,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: colors.text.primary,
      },
      destructive: {
        backgroundColor: colors.error,
        color: colors.text.inverse,
      }
    };

    return (
      <button style={{ ...baseStyle, ...variants[variant] }} onClick={onClick}>
        {children}
      </button>
    );
  };

  const Card = ({ children, style = {} }) => (
    <div style={{
      backgroundColor: colors.background,
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      ...style
    }}>
      {children}
    </div>
  );

  const ListItem = ({ title, subtitle, action, onClick }) => (
    <div
      onClick={onClick}
      style={{
        padding: '16px',
        borderBottom: `1px solid ${colors.border}`,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ fontSize: '16px', fontWeight: '500', color: colors.text.primary }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: '14px', color: colors.text.secondary, marginTop: '4px' }}>
            {subtitle}
          </div>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );

  const ProgressBar = ({ progress, label, color = colors.primary }) => (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '14px',
          color: colors.text.secondary
        }}>
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: colors.surface,
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );

  const Badge = ({ children, variant = 'default' }) => {
    const variants = {
      default: { backgroundColor: colors.surface, color: colors.text.primary },
      success: { backgroundColor: '#dcfce7', color: '#166534' },
      warning: { backgroundColor: '#fef3c7', color: '#92400e' },
      error: { backgroundColor: '#fee2e2', color: '#991b1b' },
    };

    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        ...variants[variant]
      }}>
        {children}
      </span>
    );
  };

  // Mobile app container
  return (
    <div style={{
      maxWidth: '390px',
      margin: '40px auto',
      backgroundColor: colors.surface,
      minHeight: '844px',
      borderRadius: '40px',
      padding: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Screen Content - Replace this section with your design */}
      <div style={{ padding: '20px 0' }}>
        
        {/* Header Example */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: colors.text.primary,
            marginBottom: '8px' 
          }}>
            Screen Title
          </h1>
          <p style={{ fontSize: '16px', color: colors.text.secondary }}>
            Subtitle or description
          </p>
        </div>

        {/* Card Example */}
        <Card style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
            Card Title
          </h3>
          <ProgressBar progress={65} label="Progress" />
          <p style={{ fontSize: '14px', color: colors.text.secondary }}>
            Card content goes here. This could be task details, student info, etc.
          </p>
        </Card>

        {/* List Example */}
        <div style={{ backgroundColor: colors.background, borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
          <ListItem
            title="List Item 1"
            subtitle="Subtitle or additional info"
            action={<Badge variant="success">Complete</Badge>}
            onClick={() => setSelectedItem(1)}
          />
          <ListItem
            title="List Item 2"
            subtitle="Due tomorrow"
            action={<Badge variant="warning">Pending</Badge>}
            onClick={() => setSelectedItem(2)}
          />
          <ListItem
            title="List Item 3"
            subtitle="Overdue"
            action={<Badge variant="error">Late</Badge>}
            onClick={() => setSelectedItem(3)}
          />
        </div>

        {/* Button Examples */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="primary" fullWidth>Primary Action</Button>
          <Button variant="secondary" fullWidth>Secondary Action</Button>
        </div>

      </div>

      {/* Bottom Navigation Example */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '350px',
        backgroundColor: colors.background,
        borderRadius: '20px',
        padding: '12px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        {['Home', 'Tasks', 'Calendar', 'Profile'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: activeTab === index ? colors.surface : 'transparent',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: activeTab === index ? '600' : '400',
              color: activeTab === index ? colors.primary : colors.text.secondary,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UXTemplate;
