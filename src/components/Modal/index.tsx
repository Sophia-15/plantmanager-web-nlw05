import React from 'react';

import './styles.scss';

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  timeNotification: string
}

interface MyPlantsProps {
  plant: PlantProps | undefined
  showModal: boolean
  setShowModal: (boolean: boolean) => void
  handleRemovePlant: (plant: PlantProps | undefined) => void
}

export function Modal({
  plant, showModal, setShowModal, handleRemovePlant,
}: MyPlantsProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div id="form">
          <img src={plant?.photo} alt={plant?.name} />
          <p>
            Deseja mesmo deletar sua
            {' '}
            {plant?.name}
            ?
          </p>

          <div className="actions">
            <button type="button" onClick={() => setShowModal(!showModal)}>Cancelar</button>
            <button type="button" onClick={() => handleRemovePlant(plant)}>Deletar</button>
          </div>
        </div>

      </div>
    </div>
  );
}
