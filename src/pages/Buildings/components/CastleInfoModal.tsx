import FilledButton from "../../../components/Buttons/FilledButton";
import Countdown from "../../../components/Countdown/Countdown";
import { useStore } from "../../../store/useStore";

const CastleInfoModalContent: React.FC<{}> = () => {
    const selected_city = useStore((state) => state.city.selected_city);
    const build = useStore((state) => state.city.build);
    const cancelBuild = useStore((state) => state.city.cancelBuild);
    const building_list = useStore((state) => state.city.selected_city?.buildings || []);
    
    const handleBuild = (building_type: string, level: number) => {
        if(!selected_city) return;
        build(selected_city.id, building_type, level);
    }
    const handleCancelBuild = (queue_id: string) => {
        if(!selected_city) return;
        cancelBuild(selected_city.id, queue_id);
    }

    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
            <div className="flex gap-2 mb-3">
                {
                    Array.from({ length: selected_city?.builders?.max || 0 }).map((_, i) => (
                        <div className="bg-white border-2 border-black rounded-lg flex flex-col items-center justify-center p-5">
                            Construtor {i + 1}
                            { selected_city?.builders?.queue?.[i] &&
                                <div className="bg-gray-200 border-2 border-black rounded-lg flex flex-col items-center justify-center p-5">
                                    <span>Construindo {selected_city.builders.queue[i].type} Nível {selected_city.builders.queue[i].level}</span>
                                    <span>Termina em: {new Date(selected_city.builders.queue[i].finishes_at).toLocaleString()}</span>
                                    <span>Tempo Restante: <Countdown finishes_at={selected_city.builders.queue[i].finishes_at} key={i.toString()} /></span>
                                    <FilledButton
                                        type="button"
                                        onClick={() => handleCancelBuild(selected_city.builders?.queue?.[i].id ?? '')}
                                    >Cancelar</FilledButton>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <span>Edifícios Construídos:</span>
                <table>
                    <tr>
                        <th>Tipo</th>
                        <th>Nível</th>
                        <th colSpan={4}>Custo</th>
                        <th>Ações</th>
                    </tr>
                    {   building_list.map((building) => {
                        const can_build = Object.values(building.can_build).every(v => v === true);
                        let cant_build_message = '';
                        if(building.can_build.resources === false) cant_build_message = 'Recursos insuficientes.';
                        else if(building.can_build.builders === false) cant_build_message = 'Todos os construtores estão ocupados.';
                        else if(building.can_build.free_queue === false) cant_build_message = 'A construção já está na fila.';
                        return (
                            building.maxed_out ? 
                                <tr>
                                    <td>{building.type}</td>
                                    <td colSpan={5}>Edifício totalmente contruído</td>
                                </tr>
                            :
                                <tr>
                                    <td>{building.type}</td>
                                    <td>Nível: {building.current_level}</td>
                                    <td>Madeira: {building.build_cost?.wood || 0}</td>
                                    <td>Pedra: {building.build_cost?.stone || 0}</td>
                                    <td>Ouro: {building.build_cost?.gold || 0}</td>
                                    <td>Comida: {building.build_cost?.food || 0}</td>
                                    <td>
                                        {
                                            can_build ? 
                                                <FilledButton type='button' onClick={() => handleBuild(building.type, building.next_level)}>
                                                    {building.next_level === 1 ? 'Construir' : `Nível ${building.next_level.toString()}`}
                                                </FilledButton> 
                                            : <span>{cant_build_message}</span>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
        </div>
    );
};

export default CastleInfoModalContent;