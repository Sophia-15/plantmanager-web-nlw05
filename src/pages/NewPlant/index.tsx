import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.scss';
import api from '../../services/api';
import { Header } from '../../componentes/Header';
import { EnvironmentButton } from '../../componentes/EnvironmentButton';
import { SelectPlantCard } from '../../componentes/SelectPlantCard';

interface EnvironmentProps {
  key: string
  title: string
}

interface PlantProps {
  id: string
  name: string
  about: string
  water_tips: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: string
  }
}

export function NewPlant() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');

  const history = useHistory();

  useEffect(() => {
    async function getEnvironments() {
      const { data } = await api.get('/plants_environments');

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }

    getEnvironments();
  }, []);

  useEffect(() => {
    async function getPlants() {
      const { data } = await api.get('/plants');

      setPlants(data);
    }

    getPlants();
  }, []);

  function handleSelectedEnvironment(environment: string) {
    setSelectedEnvironment(environment);

    if (environment === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) => plant.environments.includes(environment));

    return setFilteredPlants(filtered);
  }

  function handlePlantSelected(id: string) {
    history.push(`/saveplant/${id}`);
  }

  return (
    <>
      <Header />
      <main className="new-plant-container">
        <h2>Em qual ambiente você quer colocar sua planta?</h2>
        <div className="enviroment-container">
          {environments.map((environment) => (
            <EnvironmentButton
              key={String(environment.key)}
              title={environment.title}
              isActive={environment.key === selectedEnvironment}
              onClick={() => handleSelectedEnvironment(environment.key)}
            />
          ))}

        </div>

        <div className="choose-plant-container">
          {filteredPlants.map((plant) => (
            <SelectPlantCard
              photo={plant.photo}
              name={plant.name}
              key={String(plant.id)}
              onClick={() => handlePlantSelected(plant.id)}
            />
          ))}

        </div>

      </main>
    </>
  );
}
