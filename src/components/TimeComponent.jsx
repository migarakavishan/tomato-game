import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const TimeComponent = () => {
    const [dateTime, setDateTime] = useState(null);
    const [timezone, setTimezone] = useState('');

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await fetch('http://worldtimeapi.org/api/ip');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                const { datetime, timezone } = data;
                setDateTime(new Date(datetime));
                setTimezone(timezone);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTime();

        const intervalId = setInterval(fetchTime, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = dateTime ? format(dateTime, 'MMMM d, yyyy') : 'Loading...';
    const formattedTime = dateTime ? format(dateTime, 'h:mm a') : 'Loading...';

    return (
        <div class="flex justify-center max-w-md mx-auto mt-10">
    <div class="bg-slate-400 text-slate-700 rounded-lg p-4 shadow-md flex items-center">

        <p class="text-lg mr-4">{formattedDate}</p>

        <p class="text-lg mr-4">{formattedTime}</p>

        <p class="text-lg">{timezone}</p>
    </div>
</div>

    );
};

export default TimeComponent;
