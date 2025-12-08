import { useEffect, useState } from "react";

interface CountdownProps {
    finishes_at: string;
    key: string;
}

const Countdown: React.FC<CountdownProps> = ({ 
    finishes_at,
    key
}) => {
    const [countdown, setCountdown] = useState<Record<string, string>>({});
    useEffect(() => {
        const updateCountdown = () => {
            const new_countdown: Record<string, string> = {};
            
            if (finishes_at) {
                const now = new Date().getTime();
                const finish_time = new Date(finishes_at).getTime();
                const remaining_ms = finish_time - now;
                
                if (remaining_ms > 0) {
                    const hours = Math.floor(remaining_ms / (1000 * 60 * 60));
                    const minutes = Math.floor((remaining_ms % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remaining_ms % (1000 * 60)) / 1000);
                    
                    new_countdown[key] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    new_countdown[key] = 'Pronto!';
                }
            }
            
            setCountdown(new_countdown);
        };

        
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(interval);
    }, [finishes_at, key]);

  return <>{countdown[key] || 'Calculando...'}</>;
}

export default Countdown;