import { useStore } from '../../../store/useStore';
import CanvasCityContainer from './CanvasCityContainer';
import { useEffect, useState } from 'react';

const CityGeneral: React.FC<{}> = () => {
    const setLoadingCity = useStore((state) => state.city.setLoadingCity);
    const getCity = useStore((state) => state.city.getCity);
    const selected_city = useStore((state) => state.city.selected_city);
    const {
      production,
      storage,
      builders,
      population,
      defense,
      level,
      experience
    } = selected_city || {};

    const production_per_second = {
      food: (production?.food || 0) / 3600,
      wood: (production?.wood || 0) / 3600,
      stone: (production?.stone || 0) / 3600,
      gold: (production?.gold || 0) / 3600,
    }

    const [currentStorage, setCurrentStorage] = useState({
      food: storage?.current?.food || 0,
      wood: storage?.current?.wood || 0,
      stone: storage?.current?.stone || 0,
      gold: storage?.current?.gold || 0,
    });

    useEffect(() => {
      getCity(localStorage.getItem('selected_city') || '');
      setLoadingCity(true);
    }, []);

    useEffect(() => {
      if (storage?.current) {
        setCurrentStorage({
          food: storage.current.food || 0,
          wood: storage.current.wood || 0,
          stone: storage.current.stone || 0,
          gold: storage.current.gold || 0,
        });
      }
    }, [storage?.current]);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStorage(prev => ({
          food: Math.min((prev.food || 0) + production_per_second.food, storage?.max || 0),
          wood: Math.min((prev.wood || 0) + production_per_second.wood, storage?.max || 0),
          stone: Math.min((prev.stone || 0) + production_per_second.stone, storage?.max || 0),
          gold: Math.min((prev.gold || 0) + production_per_second.gold, storage?.max || 0),
        }));
      }, 1000);

      return () => clearInterval(interval);
    }, [production_per_second.food, production_per_second.wood, production_per_second.stone, production_per_second.gold, storage?.max]);

    return (
      <div className='flex w-full max-w-[2000px] justify-center'>
        <div className='min-w-[200px] w-[20%] h-full flex flex-col gap-2 align-center p-4 bg-white text-black'></div>
        <div className='min-w-[800px] w-[1200px] h-full flex items-center justify-center'>
          <div>
            
          </div>
          <CanvasCityContainer />
        </div>
        <div className='min-w-[200px] w-[20%] h-full flex flex-col gap-2 align-center p-4 bg-white text-black'>
          <span>Economia</span>
          <hr />
          <div className='flex flex-col'>
            <span>Nível {level}</span>
            <span>População: {population?.current}/{population?.max}</span>
            <span>Experiência: {experience}</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Comida: {production?.food}/hora</span>
            <span>Madeira: {production?.wood}/hora</span>
            <span>Pedra: {production?.stone}/hora</span>
            <span>Ouro: {production?.gold}/hora</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Armazenamento:</span>
            <span>Comida: {Math.floor(currentStorage.food)}/{storage?.max}</span>
            <span>Madeira: {Math.floor(currentStorage.wood)}/{storage?.max}</span>
            <span>Pedra: {Math.floor(currentStorage.stone)}/{storage?.max}</span>
            <span>Ouro: {Math.floor(currentStorage.gold)}/{storage?.max}</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Construtores: {builders?.free}/{builders?.max}</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Bônus Defensivo: {defense}%</span>
          </div>
        </div>
      </div>
    );
};

export default CityGeneral;