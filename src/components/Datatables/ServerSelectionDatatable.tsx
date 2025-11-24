import { Server } from "../../store/types/server";
import FilledButton from "../Buttons/FilledButton";

interface DataTableProps {
  data: Server[];
  onSwitchServer: (server: Server) => void;
}

const ServerSelectionDataTable: React.FC<DataTableProps> = ({
    data,
    onSwitchServer
}) => {
    return (
        <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="w-full bg-white">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Servidor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tag
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Jogadores
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    { data.map((server, index) => (
                        <tr 
                            key={server.tag} 
                            className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                            }`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {server.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono bg-gray-100 rounded px-2 py-1">
                                {server.tag}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                    {server.players_count} jogadores ativos
                                </span>
                            </td>
                            <td>
                                {
                                    server.player_info ? 
                                    '123' :
                                    <FilledButton
                                        className="px-3"
                                        onClick={() => onSwitchServer(server)}
                                    >
                                        Selecionar
                                    </FilledButton>
                                }
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default ServerSelectionDataTable;