import React, { useState, useRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  orientation?: 'horizontal' | 'vertical';
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTab,
  orientation = 'horizontal',
  ariaLabel = 'Tab navigation',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || (orientation === 'vertical' && e.key === 'ArrowDown')) {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft' || (orientation === 'vertical' && e.key === 'ArrowUp')) {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextItem = items[nextIndex];
    if (nextItem) {
      setActiveTab(nextItem.id);
      tabRefs.current[nextItem.id]?.focus();
    }
  };

  const isVertical = orientation === 'vertical';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        gap: '24px',
        width: '100%',
      }}
      className={isVertical ? 'tabs-vertical-container' : ''}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap: isVertical ? '8px' : '4px',
          borderBottom: isVertical ? 'none' : '1px solid var(--border)',
          borderRight: isVertical ? '1px solid var(--border)' : 'none',
          paddingBottom: isVertical ? '0' : '8px',
          paddingRight: isVertical ? '16px' : '0',
          minWidth: isVertical ? '240px' : 'auto',
          overflowX: isVertical ? 'visible' : 'auto',
        }}
      >
        {items.map((item, index) => {
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => (tabRefs.current[item.id] = el)}
              role="tab"
              id={`tab-${item.id}`}
              aria-controls={`tabpanel-${item.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'left',
                padding: '12px 18px',
                fontSize: '15px',
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'var(--text)' : 'var(--text-secondary)',
                backgroundColor: isSelected ? 'var(--surface)' : 'transparent',
                border: 'none',
                borderRadius: isVertical ? 'var(--radius-sm)' : 'var(--radius-sm) var(--radius-sm) 0 0',
                borderLeft: isVertical && isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-standard)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
              {!isVertical && isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-9px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {items.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <div
              key={item.id}
              role="tabpanel"
              id={`tabpanel-${item.id}`}
              aria-labelledby={`tab-${item.id}`}
              hidden={!isSelected}
              style={{
                display: isSelected ? 'block' : 'none',
                animation: isSelected ? 'fadeIn 250ms var(--ease-standard)' : 'none',
              }}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
