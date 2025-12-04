import { useStore } from '../../../store/useStore';
import CanvasMapContainer from './CanvasMapContainer';
import { useEffect } from 'react';

const MapGeneral: React.FC<{}> = () => {
    const setLoadingMap = useStore((state) => state.map.setLoadingMap);
    const getMap = useStore((state) => state.map.getMap);
    const getPlayerMe = useStore((state) => state.player.getMe);
    const selected_map = useStore((state) => state.map.selected_map);

    useEffect(() => {
      setLoadingMap(true);
      getMap();
      getPlayerMe();
    }, []);
    
    return (
      !selected_map ? <div>Loading map...</div> :
      <CanvasMapContainer />
    );
};

export default MapGeneral;