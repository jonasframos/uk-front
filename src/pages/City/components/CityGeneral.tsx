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
      console.log(selected_city)
    }, []);
    return (
      <div className="flex w-full h-screen">
        <div className="w-[20%] h-full bg-blue">

        </div>
        <div className="min-w-[1000px] w-[80%] h-full bg-red flex items-center justify-center">
          <CanvasCityContainer />
        </div>
        <div className="w-[20%] h-full bg-blue">

        </div>
      </div>
    );
};

export default CityGeneral;