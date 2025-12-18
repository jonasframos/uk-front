import Countdown from "../../../components/Countdown/Countdown";
import { useStore } from "../../../store/useStore";

const LumberMillInfoModalContent: React.FC<{}> = () => {
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
                    <td>{selected_city?.production?.wood}</td>
                    <td>{(selected_city?.production?.wood ?? 0) * 24}</td>
                    <td>{selected_city?.storage?.current?.wood}</td>
                    <td>{selected_city?.storage?.full_at?.wood}</td>
                    <td>{selected_city?.storage?.full_at?.wood ? <Countdown key={selected_city.storage.full_at.wood} finishes_at={selected_city.storage.full_at.wood} /> : 'N/A'}</td>
                </tr>
            </table>
        </div>
    );
};

export default LumberMillInfoModalContent;