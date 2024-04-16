import React, { useState, useEffect } from 'react';

const TimeComponent = () => {
  const [timeData, setTimeData] = useState(null);
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Function to fetch the IP address using an external service
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress(); // Fetch the IP address when the component mounts

    const intervalId = setInterval(fetchIpAddress, 60000); // Refresh IP every 60 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    if (ipAddress) {
      // Fetch time data based on the fetched IP address
      const fetchTimeData = async () => {
        try {
          const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
          const apiUrl = `https://timeapi.io/api/Time/current/ip?ipAddress=${ipAddress}`;
          const response = await fetch(proxyUrl + apiUrl);
          const data = await response.json();
          setTimeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchTimeData(); // Initial fetch when IP address is available

      const refreshIntervalId = setInterval(fetchTimeData, 60000); // Refresh data every 60 seconds

      return () => clearInterval(refreshIntervalId); // Clean up interval on component unmount
    }
  }, [ipAddress]);

  return (
    <div>
      <h1>Current Time and Date</h1>
      {timeData ? (
        <div>
          <p>Time: {timeData.time}</p>
          <p>Date: {timeData.date}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TimeComponent;
