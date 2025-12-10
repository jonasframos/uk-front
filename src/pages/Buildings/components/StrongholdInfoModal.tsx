import FilledButton from "../../../components/Buttons/FilledButton";
import Countdown from "../../../components/Countdown/Countdown";
import { useStore } from "../../../store/useStore";

const StrongholdInfoModalContent: React.FC<{}> = () => {
    const selected_city = useStore((state) => state.city.selected_city);
    const unit_list = useStore((state) => state.city.selected_city?.units || []);
    const recruit = useStore((state) => state.city.recruit);
    const cancelRecruit = useStore((state) => state.city.cancelRecruit);
    
    const handleRecruit = (type: string, level: number) => {
        if(!selected_city) return;
        recruit(selected_city.id, type, level);
    }
    const handleCancelRecruit = (id: string) => {
        if(!selected_city) return;
        cancelRecruit(selected_city.id, id);
    }
    return (
        <div className="w-full p-4 rounded-lg text-black flex flex-col gap-2 bg-white">
            <div className="flex gap-2 mb-3">
                {
                    Array.from({ length: selected_city?.unit_slots?.max || 0 }).map((_, i) => (
                        <div className="bg-white border-2 border-black rounded-lg flex flex-col items-center justify-center p-5">
                            Fila {i + 1}
                            { selected_city?.unit_slots?.queue?.[i] &&
                                <div className="bg-gray-200 border-2 border-black rounded-lg flex flex-col items-center justify-center p-5">
                                    <span>Recrutando {selected_city.unit_slots.queue[i].type} Quantidade {selected_city.unit_slots.queue[i].amount}</span>
                                    <span>Termina em: {new Date(selected_city.unit_slots.queue[i].finishes_at).toLocaleString()}</span>
                                    <span>Tempo Restante: <Countdown finishes_at={selected_city.unit_slots.queue[i].finishes_at} key={i.toString()} /></span>
                                    <FilledButton
                                        type="button"
                                        onClick={() => handleCancelRecruit(selected_city.unit_slots.queue?.[i].id ?? '')}
                                    >
                                        Cancelar
                                    </FilledButton>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <span>Unidades:</span>
                <table>
                    <tr>
                        <th>Tipo</th>
                        <th colSpan={4}>Custo</th>
                        <th>Ações</th>
                    </tr>
                    {   unit_list.map((unit) => {
                        const can_recruit = Object.values(unit.can_recruit).every(v => v === true);
                        let cant_recruit_message = '';
                        if(unit.can_recruit.resources === false) cant_recruit_message = 'Recursos insuficientes.';
                        else if(unit.can_recruit.slots === false) cant_recruit_message = 'Todos os slots estão ocupados.';
                        else if(unit.can_recruit.population === false) cant_recruit_message = 'Não há população suficiente.';
                        return (
                                <tr>
                                    <td>{unit.type}</td>
                                    <td>Madeira: {unit.cost?.wood || 0}</td>
                                    <td>Pedra: {unit.cost?.stone || 0}</td>
                                    <td>Ouro: {unit.cost?.gold || 0}</td>
                                    <td>Comida: {unit.cost?.food || 0}</td>
                                    <td>Tempo: {unit.recruit_time}</td>
                                    <td>
                                        {
                                            can_recruit ? 
                                                <FilledButton 
                                                    type='button'
                                                    onClick={() => handleRecruit(unit.type, 10)}
                                                >
                                                   Recrutar
                                                </FilledButton> 
                                            : <span>{cant_recruit_message}</span>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </table>
        </div>
    );
};

export default StrongholdInfoModalContent;