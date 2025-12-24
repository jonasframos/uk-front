import { BuildingQueueIcon, CrateIcon, HouseIcon, PerkIcon, RankingIcon, TransportIcon, UnitQueueIcon } from '../../../assets/icons';
import { RustTexture } from '../../../assets/images';
import IconButton from '../../../components/Buttons/IconButton';
import ResourceText from '../../../components/Text/ResourceText';
import TierText from '../../../components/Text/TierText';
import { useStore } from '../../../store/useStore';
import { UnitIcon, UnitName } from '../../../utils/constants/constants';
import { effects_description } from '../../Map/components/SelectedTileInfo';
import CanvasCityContainer from './CanvasCityContainer';
import { useEffect, useState } from 'react';

const CityGeneral: React.FC<{}> = () => {
    const setLoadingCity = useStore((state) => state.city.setLoadingCity);
    const getCity = useStore((state) => state.city.getCity);
    const selected_city = useStore((state) => state.city.selected_city);
    const current_player = useStore((state) => state.player.current_player);
    const getPlayerMe = useStore((state) => state.player.getMe);

    const {
      production,
      storage,
      builders,
      population,
      unit_slots,
      tile,
      defense,
      units,
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
      getPlayerMe();
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
      <div className='flex flex-col' style={{ backgroundImage: `url(${RustTexture})`, backgroundSize: '', backgroundPosition: 'center' }}>
        <div className='w-[100vw] h-[10%] min-h-[110px] flex justify-between gap-2 p-1 text-black border-solid border-black border-2'>
          <div className="flex gap-1">
            <div className='flex flex-col bg-old_paper px-2 py-1 border-solid border-black border-2 gap-1 rounded-md'>
              <div className="flex justify-between gap-1">
                <span className="font-bold text-sm text-gray-500"></span>
                <span className="text-sm text-gray_3">#{current_player?.ranking}</span>
              </div>
              <div className="flex justify-between gap-1">
                <span className="text-lg text-gray-500">{current_player?.username}</span>
                <span className="text-lg font-semibold">Lv. {current_player?.level}</span>
              </div>
              <div className="min-w-[200px] w-full bg-white rounded-full h-2">
                <div className="bg-rust h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between gap-1">
                <span className="text-sm text-gray-500">EXP</span>
                <span className="text-sm font-bold">{current_player?.experience}/1000</span>
              </div>
            </div>
            <div className="flex flex-col w-[40px]">
              <IconButton tooltip_text="Ranking" iconClassName={'w-[40px] h-[42px]'} icon={RankingIcon} onClick={() => alert('Ranking')} />
              <IconButton tooltip_text="Perk Tree" iconClassName={'w-[30px] h-[32px]'} icon={PerkIcon} onClick={() => alert('Perk Tree')} />
            </div>
            <div className="flex flex-col w-[40px]">
            </div>
          </div>
          <div className='flex flex-col bg-old_paper px-2 py-1 border-solid border-black border-2 gap-1 rounded-md'>
            <div className="flex justify-between gap-1">
              <span className="text-lg text-gray-500">{selected_city?.name}</span>
              <span className="text-lg font-semibold">Lv. {selected_city?.level}</span>
            </div>
            <div className="min-w-[200px] w-full bg-white rounded-full h-2">
              <div className="bg-rust h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between gap-1">
              <span className="text-sm text-gray-500">EXP</span>
              <span className="text-sm font-bold">{selected_city?.experience}/1000</span>
            </div>
            <TierText tier={tile?.tier ?? ''} className='w-[40px] pt-[2px]'/>
          </div>
        </div>
        <div className='flex min-w-[1200px] h-[83%] justify-center bg-old_paper border-black border-2'>
          <div className='w-[20%] h-full flex flex-col gap-2 p-4 items-end'>
            <span className="font-semibold text-lg">Militar</span>
            <span className="text-md">Tropas</span>
            {
              units?.filter(u => u.in > 0 || u.support > 0).length === 0 ? <span className='italic text-sm'>Nenhuma unidade treinada.</span> :
              <table className='bg-white shadow-lg border-collapse border border-gray_3'>
                {units?.filter(u => u.in > 0).map((unit, index) => (
                    <tr key={index} className='border-b border-gray_1'>
                      <td className='flex items-center py-1 px-2'>
                        <img src={UnitIcon[unit.type]} className='w-[25px] h-[30px] mr-2' alt={unit.type} />
                        <span className='font-semibold'>{UnitName[unit.type]}</span>
                      </td>
                      <td className='font-semibold py-1 px-2'>({unit.in + unit.support})</td>
                    </tr>
                  ))}
              </table>
            }
            <span className="text-md">Força de Combate</span>
            1.413
            <span className="text-md">Bônus de Defesa</span>
            {defense}%
            <hr className="border-gray_3 my-1 w-full" />
            <span className="font-semibold text-lg">Inteligência</span>
          
          </div>
          <div className='w-[60%] max-w-[1120px] h-full flex items-center justify-center'>
            <CanvasCityContainer />
          </div>
          <div className='w-[20%] h-full flex flex-col gap-2 align-center p-4 bg-old_paper text-black'>
            <span className="font-semibold text-lg">Economia</span>
            <span className="text-md">Armazenamento e Produção</span>
             <div className='flex flex-col gap-1'>
              <ResourceText resource="food" current_storage={currentStorage.food} max_storage={storage?.max || 0} production={production?.food || 0} />
              <ResourceText resource="wood" current_storage={currentStorage.wood} max_storage={storage?.max || 0} production={production?.wood || 0} />
              <ResourceText resource="stone" current_storage={currentStorage.stone} max_storage={storage?.max || 0} production={production?.stone || 0} />
              <ResourceText resource="gold" current_storage={currentStorage.gold} max_storage={storage?.max || 0} production={production?.gold || 0} />
            </div>
            <div className='flex gap-1'>
              <div className='rounded-[25px] bg-white p-[2px] w-[90px] flex justify-center items-center shadow-lg'>
                <img className='inline-block w-[33px] h-[30px] mr-1' src={CrateIcon} />
                <span className='text-sm font-semibold'>{storage?.max}</span>
              </div>
              <div className='rounded-[25px] bg-white p-[2px] w-[110px] flex justify-center items-center shadow-lg'>
                <img className='inline-block w-[30px] h-[29px] mr-1' src={TransportIcon} />
                <span className='text-sm font-semibold'>130/{storage?.max}</span>
              </div>
            </div>
            <hr className="border-gray_3 my-1" />
            <span className="font-semibold text-lg">Infraestrutura</span>
            <span className="text-md">População</span>
            <div className='flex gap-1'>
              <div className='flex flex-col'>
                <div className='rounded-[25px] bg-white p-[2px] w-[90px] flex justify-center items-center shadow-lg'>
                  <img className='inline-block w-[30px] h-[30px] mr-1' src={HouseIcon} />
                  <span className='text-sm font-semibold'>{population?.current}/{population?.max}</span>
                </div>
              </div>
            </div>
            <span className="text-md">Filas</span>
            <div className='flex gap-1'>
              <div className='flex flex-col'>
                <div className='rounded-[25px] bg-white p-[4px] w-[90px] flex justify-center items-center shadow-lg'>
                  <img className='inline-block w-[28px] h-[27px] mr-1' src={BuildingQueueIcon} />
                  <span className='text-sm font-semibold'>{builders?.free}/{builders?.max}</span>
                </div>
              </div>
              { unit_slots && unit_slots?.max > 0 && 
                <div className='flex flex-col'>
                  <div className='rounded-[25px] bg-white p-[3px] w-[90px] flex justify-center items-center shadow-lg'>
                    <img className='inline-block w-[25px] h-[29px] mr-1' src={UnitQueueIcon} />
                    <span className='text-sm font-semibold'>{unit_slots?.free}/{unit_slots?.max}</span>
                  </div>
                </div>
              }
            </div>
            <hr className="border-gray_3 my-1" />
            <span className="font-semibold text-lg">Efeitos</span>
            <table className="mb-2">
                {tile?.effects?.map((effect, index) => (
                    <tr key={index}>
                        <td className="w-[90%] italic text-sm p-1">{effects_description[effect.type]}</td>
                        <td className="flex flex-col justify-center p-1">
                            <span className="text-xs font-bold text-gray_3">{effect.modifier}%</span>
                        </td>
                    </tr>
                ))}
            </table>
          </div>
        </div>
        <div  className='w-[100vw] h-[5%] min-h-[60px] flex justify-between items-center p-1'>
          <div></div>
          <div className='flex flex-col bg-old_paper py-1 px-4 border-black border-2 rounded-md text-sm font-semibold text-center '>01/03/2025<br/>12:54:18</div>
        </div>
      </div>
    );
};

export default CityGeneral;