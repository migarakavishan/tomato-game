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
        <div className="flex justify-center max-w-md mx-auto mt-10">
            <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
                <p className="font-bold mb-2">Date:</p>
                <p className="text-lg">{formattedDate}</p>
                <p className="font-bold mb-2 mt-4">Time:</p>
                <p className="text-lg">{formattedTime}</p>
                <p className="font-bold mb-2 mt-4">Timezone:</p>
                <p className="text-lg">{timezone}</p>
            </div>
        </div>
    );
};

export default TimeComponent;
