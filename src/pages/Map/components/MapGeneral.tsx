import { ProfileIcon, RankingIcon } from '../../../assets/icons/index';
import { RustTexture } from '../../../assets/images';
import IconButton from '../../../components/Buttons/IconButton';
import { useStore } from '../../../store/useStore';
import CanvasMapContainer from './CanvasMapContainer';
import { useEffect } from 'react';

const MapGeneral: React.FC<{}> = () => {
    const setLoadingMap = useStore((state) => state.map.setLoadingMap);
    const getMap = useStore((state) => state.map.getMap);
    const getPlayerMe = useStore((state) => state.player.getMe);
    const selected_map = useStore((state) => state.map.selected_map);
    const current_player = useStore((state) => state.player.current_player);

    useEffect(() => {
      setLoadingMap(true);
      getMap();
      getPlayerMe();
    }, []);
    
    return (
      <div className='flex flex-col h-full w-full font-sans' style={{ backgroundImage: `url(${RustTexture})`, backgroundSize: '', backgroundPosition: 'center' }}>
        <div className='w-full h-[10%] min-h-[110px] flex gap-2 p-1 text-black border-solid border-black border-2'>
          <div className='flex flex-col bg-old_paper px-2 py-1 border-solid border-black border-2 gap-1 rounded-md'>
            <div className="flex justify-between gap-1">
              <span className="font-bold text-sm text-gray-500">{selected_map?.name}</span>
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
            <IconButton tooltip_text="Profile" iconClassName={'w-[22px] h-[29px]'} icon={ProfileIcon} onClick={() => alert('Profile')} />
          </div>
        </div>
        <div className='w-full h-[85%] min-h-[500px] relative overflow-hidden'>
          {(selected_map && current_player) ? <CanvasMapContainer /> : <div>Loading map...</div>}
        </div>
        <div  className='w-full h-[5%] min-h-[30px] flex justify-between items-center p-1'>
          <div></div>
          <div className='flex flex-col bg-old_paper py-1 px-4 border-black border-2 rounded-md text-sm font-semibold text-center '>01/03/2025<br/>12:54:18</div>
        </div>
      </div>
    );
};

export default MapGeneral;