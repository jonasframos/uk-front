import Countdown from "../../../components/Countdown/Countdown";
import { useStore } from "../../../store/useStore";

const FarmInfoModalContent: React.FC<{}> = () => {
    const selected_city = useStore((state) => state.city.selected_city);
    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
        <span>Produção:</span>
            <table>
                <tr>
                    <th>Hora</th>
                    <th>Dia</th>
                    <th>Armazenado</th>
                    <th>Cheio</th>
                    <th>Restante</th>
                </tr>
                <tr>
                    <td>{selected_city?.production?.food}</td>
                    <td>{(selected_city?.production?.food ?? 0) * 24}</td>
                    <td>{selected_city?.storage?.current?.food}</td>
                    <td>{selected_city?.storage?.full_at?.food}</td>
                    <td>{selected_city?.storage?.full_at?.food ? <Countdown key={selected_city.storage.full_at.food} finishes_at={selected_city.storage.full_at.food} /> : 'N/A'}</td>
                </tr>
            </table>
        </div>
    );
};

export default FarmInfoModalContent;