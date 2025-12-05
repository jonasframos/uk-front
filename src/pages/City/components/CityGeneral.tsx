import { useStore } from '../../../store/useStore';
import CanvasCityContainer from './CanvasCityContainer';
import { useEffect } from 'react';

const CityGeneral: React.FC<{}> = () => {
    const setLoadingCity = useStore((state) => state.city.setLoadingCity);
    const getCity = useStore((state) => state.city.getCity);
    const selected_city = useStore((state) => state.city.selected_city);

    useEffect(() => {
      getCity(localStorage.getItem('selected_city') || '');
      setLoadingCity(true);
    }, []);
    return (
      <div className='flex w-full max-w-[2000px] justify-center'>
        <div className='min-w-[200px] w-[20%] h-full flex flex-col gap-2 align-center p-4 bg-white text-black'>
          <div className='flex flex-col'>
            <span>Nível 7</span>
            <span>População: 1500/2000</span>
            <span>Experiência: 1023/1341</span>
          </div>
        </div>
        <div className='min-w-[800px] w-[1200px] h-full flex items-center justify-center'>
          <div>
            
          </div>
          <CanvasCityContainer />
        </div>
        <div className='min-w-[200px] w-[20%] h-full flex flex-col gap-2 align-center p-4 bg-white text-black'>
          <span>Economia</span>
          <hr />
          <div className='flex flex-col'>
            <span>Nível {selected_city?.level}</span>
            <span>População: {selected_city?.population?.current}/{selected_city?.population?.max}</span>
            <span>Experiência: {selected_city?.experience}</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Comida: {selected_city?.production?.food}/hora</span>
            <span>Madeira: {selected_city?.production?.wood}/hora</span>
            <span>Pedra: {selected_city?.production?.stone}/hora</span>
            <span>Ouro: {selected_city?.production?.gold}/hora</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Armazenamento:</span>
            <span>Comida: {selected_city?.storage?.current?.food}/{selected_city?.storage?.max}</span>
            <span>Madeira: {selected_city?.storage?.current?.wood}/{selected_city?.storage?.max}</span>
            <span>Pedra: {selected_city?.storage?.current?.stone}/{selected_city?.storage?.max}</span>
            <span>Ouro: {selected_city?.storage?.current?.gold}/{selected_city?.storage?.max}</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Construtores: {selected_city?.builders?.free}/{selected_city?.builders?.max}</span>
          </div>
          <hr />
          <div className='flex flex-col'>
            <span>Bônus Defensivo: {selected_city?.defense}%</span>
          </div>
        </div>
      </div>
    );
};

export default CityGeneral;