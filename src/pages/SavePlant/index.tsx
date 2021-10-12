import React, { useEffect, useState } from 'react';

import './styles.scss';

import { useHistory, useParams } from 'react-router-dom';
import drop from '../../assets/drop.svg';
import api from '../../services/api';

interface PlantParams {
  id: string;
}

interface SavePlantProps {
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

interface SavePlantLocalStorageProps {
  [id: string]: {
    data: SavePlantProps
  }
}

export function SavePlant() {
  const [savePlant, setSavePlant] = useState<SavePlantProps[]>([]);
  const [timeNotification, setTimeNotification] = useState('');
  const history = useHistory();
  const { id } = useParams<PlantParams>();

  useEffect(() => {
    if (!localStorage.getItem('@plantmanager:user')) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    async function getSavePlant() {
      const { data } = await api.get(`plants/${id}`);

      setSavePlant([data]);
    }

    getSavePlant();
  }, []);

  function savePlantToLocalStorage(plant: SavePlantProps) {
    const data = localStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as SavePlantLocalStorageProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    localStorage.setItem('@plantmanager:plants', JSON.stringify({
      ...oldPlants,
      ...newPlant,
    }));

    history.push('/myplants');
  }

  return (
    <>
      {savePlant.map((plant) => (
        <div className="save-plant">
          <section className="selected-plant-info">
            <img src={plant.photo} alt={`Planta ${plant.name}`} />
            <span>{plant.name}</span>
            <p>
              {plant.about}
            </p>
          </section>

          <section className="selected-plant-config">
            <div className="water-card">
              <img src={drop} alt="Gota d'água" />
              <p>{plant.water_tips}</p>
            </div>

            <div className="remember-to-water">
              <p>Ecolha o melhor horário para ser lembrado:</p>
              <input
                type="time"
                onChange={(e) => setTimeNotification(e.target.value)}
              />
              <button type="button" onClick={() => savePlantToLocalStorage({ ...plant, timeNotification })}>Cadastrar Planta</button>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
