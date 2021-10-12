import React from 'react';

import './styles.scss';

interface EnvironmentButtonProps {
  title: string
  isActive?: boolean
  onClick: () => void
}

export function EnvironmentButton({ title, isActive = false, onClick }: EnvironmentButtonProps) {
  return (
    <button type="button" className={isActive ? 'environment-button active' : 'environment-button'} onClick={onClick}>{title}</button>
  );
}
