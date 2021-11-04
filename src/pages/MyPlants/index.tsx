import React, { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FiTrash } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import drop from '../../assets/drop.svg';
import { Header } from '../../componentes/Header';

import './styles.scss';
import { Modal } from '../../componentes/Modal';
import { useAuth } from '../../hooks/useAuth';

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

interface SavedPlantLocalStorageProps {
  [id: string]: {
    data: PlantProps
  }
}

export function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [nextWateredPlant, setNextWateredPlant] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalPlant, setModalPlant] = useState<PlantProps>();
  const { user } = useAuth();

  useEffect(() => {
    const data = localStorage.getItem('@plantmanager:plants');
    const allPlants = data ? (JSON.parse(data) as SavedPlantLocalStorageProps) : {};
    const today = new Date();

    const plantsSorted = Object
      .keys(allPlants)
      .map((plant) => allPlants[plant].data)
      .sort((a, b) => Math.floor(
        new Date(`${today.toDateString()} ${a.timeNotification}`).getTime() / 1000
                - Math.floor(new Date(`${today.toDateString()} ${b.timeNotification}`).getTime() / 1000),
      ));

    if (!plantsSorted[0]) {
      return;
    }

    const nextWateredTime = formatDistance(
      new Date(`${today.toDateString()} ${plantsSorted[0].timeNotification}`).getTime(),
      new Date().getTime(),
      { locale: pt },
    );

    setNextWateredPlant(`Regue sua ${plantsSorted[0].name} daqui a ${nextWateredTime}`);

    setPlants(plantsSorted);
  }, []);

  function handleRemovePlant(deletedPlant: PlantProps | undefined) {
    if (deletedPlant) {
      try {
        const removedPlant = plants.filter((plant) => deletedPlant.id !== plant.id);
        const data = localStorage.getItem('@plantmanager:plants');
        const allPlants = data ? (JSON.parse(data) as SavedPlantLocalStorageProps) : {};
        delete allPlants[deletedPlant.id];

        localStorage.setItem('@plantmanager:plants', JSON.stringify(allPlants));
        setPlants(removedPlant);
        toast.success('Planta removida com sucesso!');
        setShowModal(!showModal);
      } catch (error) {
        toast.error('Houve um erro excluindo a planta');
      }
    }
  }

  function toggleModal(plant: PlantProps) {
    setShowModal(!showModal);
    setModalPlant(plant);
  }

  return (
    <>
      <Header />
      <main className="my-plants-content">
        <div className="to-water">
          <img src={drop} alt="Ícone de gota" />
          <p>{plants.length === 0 ? 'Cadastre sua planta e você saberá quando rega-la' : nextWateredPlant}</p>
        </div>
        <div className="water-next">
          <h2>
            Plantinhas de
            {' '}
            {user}
          </h2>
          <div className="plants-container">
            {plants.length > 0 ? plants.map((plant) => (
              <button type="button" className="plant" key={plant.id}>
                <div className="plant-info">
                  <img src={plant.photo} alt="Foto da planta" />
                  <p>{plant.name}</p>
                </div>
                <div className="when-to-water">
                  <p>Regar ás</p>
                  <span>{plant.timeNotification}</span>
                </div>
                <button type="button" onClick={() => toggleModal(plant)}>
                  <FiTrash
                    className="trashcan"
                  />
                </button>
              </button>

            )) : (
              <div className="empty-plants-container">
                <span>🥰</span>
                <p>
                  Que tal começar a cadastrar
                  suas plantinhas?
                </p>
              </div>
            ) }

          </div>
        </div>
      </main>
      {showModal && (
      <Modal
        plant={modalPlant}
        showModal={showModal}
        setShowModal={setShowModal}
        handleRemovePlant={handleRemovePlant}
      />
      )}
      <ToastContainer
        style={{ fontSize: '17px' }}
      />
    </>
  );
}
