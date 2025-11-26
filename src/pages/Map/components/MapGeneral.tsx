import { useStore } from '../../../store/useStore';
import CanvasMapContainer from '../../../components/Canvas/CanvasMapContainer';
import { useEffect } from 'react';

const MapGeneral: React.FC<{}> = () => {
    const setLoadingMap = useStore((state) => state.map.setLoadingMap);
    const getMap = useStore((state) => state.map.getMap);
    const selected_map = useStore((state) => state.map.selected_map);

    useEffect(() => {
      setLoadingMap(true);
      getMap();
    }, []);
    
    return (
      !selected_map ? <div>Loading map...</div> :
      <CanvasMapContainer
        image_url={'https://jornada-sat-public.s3.us-east-1.amazonaws.com/map.jpg'}
        show_grid={true}
        show_minimap={true}
      />
    );
};

export default MapGeneral;