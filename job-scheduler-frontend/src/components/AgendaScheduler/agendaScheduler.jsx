import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const JobScheduler = () => {
    const [selectedDays, setSelectedDays] = useState([]);


    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const scheduleJob = async () => {
        if (selectedDays.length === 0) {
            alert('Please select at least one day to schedule the job.');
            return;
        }

        try {
            console.log(selectedDays);
            const response = await axios.post('http://localhost:5000/schedule-job', { selectedDays }); // Use Axios for the POST request

            if (response.status === 200) {
                alert('Job scheduled!');
            } else {
                alert('Failed to schedule the job.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while scheduling the job.');
        }
    };

    return (
        <div>
            <h2>Schedule a Job</h2>
            <p>Select days to schedule the job:</p>
            <div>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                    <button
                        key={index}
                        style={{
                            background: selectedDays.includes(index) ? 'lightgreen' : 'lightgray',
                        }}
                        onClick={() => toggleDay(index)}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <button onClick={scheduleJob}>Schedule Job</button>
        </div>
    );
};

export default JobScheduler;
