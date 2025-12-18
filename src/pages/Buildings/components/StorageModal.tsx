import Countdown from "../../../components/Countdown/Countdown";
import { useStore } from "../../../store/useStore";

const StorageInfoModalContent: React.FC<{}> = () => {
    const selected_city = useStore((state) => state.city.selected_city);
    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
            <span>Capacidade:</span>
                <table>
                    <tr>
                        <th>Recurso</th>
                        <th>Quantidade Armazenada</th>
                        <th>Capacidade Máxima</th>
                        <th>Cheio em</th>
                        <th>Tempo restante</th>
                    </tr>
                    <tr>
                        <td>Madeira</td>
                        <td>{selected_city?.storage?.max || 0}</td>
                        <td>{selected_city?.storage?.current?.wood || 0}</td>
                        <td>{selected_city?.storage?.full_at?.wood || 0}</td>
                        <td>{selected_city?.storage?.full_at?.wood ? <Countdown key={selected_city.storage.full_at.wood} finishes_at={selected_city.storage.full_at.wood} /> : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Pedra</td>
                        <td>{selected_city?.storage?.max || 0}</td>
                        <td>{selected_city?.storage?.current?.stone || 0}</td>
                        <td>{selected_city?.storage?.full_at?.stone || 0}</td>
                        <td>{selected_city?.storage?.full_at?.stone ? <Countdown key={selected_city.storage.full_at.stone} finishes_at={selected_city.storage.full_at.stone} /> : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Comida</td>
                        <td>{selected_city?.storage?.max || 0}</td>
                        <td>{selected_city?.storage?.current?.food || 0}</td>
                        <td>{selected_city?.storage?.full_at?.food || 0}</td>
                        <td>{selected_city?.storage?.full_at?.food ? <Countdown key={selected_city.storage.full_at.food} finishes_at={selected_city.storage.full_at.food} /> : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Ouro</td>
                        <td>{selected_city?.storage?.max || 0}</td>
                        <td>{selected_city?.storage?.current?.gold || 0}</td>
                        <td>{selected_city?.storage?.full_at?.gold || 0}</td>
                        <td>{selected_city?.storage?.full_at?.gold ? <Countdown key={selected_city.storage.full_at.gold} finishes_at={selected_city.storage.full_at.gold} /> : 'N/A'}</td>
                    </tr>
                </table>
        </div>
    );
};

export default StorageInfoModalContent;