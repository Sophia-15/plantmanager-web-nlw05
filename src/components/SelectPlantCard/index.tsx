import React from 'react';

import './styles.scss';

interface SelectPlantCardProps {
  photo: string
  name: string
  onClick?: () => void
}

export function SelectPlantCard({ photo, name, onClick }: SelectPlantCardProps) {
  return (
    <button className="select-plant" onClick={onClick} type="button">
      <img src={photo} alt={`Planta ${name}`} />
      <span>{name}</span>
    </button>
  );
}
