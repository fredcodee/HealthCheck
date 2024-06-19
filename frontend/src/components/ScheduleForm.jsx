import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Api from '../Api';

const ScheduleForm = ({onSuccess}) => {
    const [selectedDates, setSelectedDates] = useState([new Date()]);
    const [startTime, setStartTime] =  useState(new Date());
    const [endTime, setEndTime] = useState(null);
    const token = localStorage.getItem('token') || false
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process the form data here
        console.log('Selected Dates:', selectedDates);
        console.log('Start Time:', startTime.toLocaleTimeString('en-US', { timeZoneName: 'short' }));
        console.log('End Time:', endTime.toLocaleTimeString('en-US', { timeZoneName: 'short' }));
        addSchedule();
    };

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    };


    const addSchedule = async () => {
        try {
            const response = await Api.post('api/set-schedules', {
                dates: selectedDates,
                startTime: startTime.toLocaleTimeString('en-US', { timeZoneName: 'short' }),
                endTime: endTime.toLocaleTimeString('en-US', { timeZoneName: 'short' })
            },{
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            });
            if (response.status === 200) {
                setSuccess('Schedule added successfully');
                onSuccess();
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div>
            
        <form onSubmit={handleSubmit}>
            <div className='pb-2'>
            <label>Select Dates:</label>
                <DatePicker
                    onChange={(date) => handleDateChange(date)}
                    selectedDates={selectedDates}
                    selectsMultiple
                    dateFormat="yyyy/MM/dd"
                    shouldCloseOnSelect={false}
                    //excludeDates={selectedDates}
                />
            </div>
            <div className='pb-2'> 
                <label>Start Time:</label>
                <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Start Time"
                    dateFormat="h:mm aa"
                />
            </div>
            <div className='pb-2'>
                <label>End Time:</label>
                <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="End Time"
                    dateFormat="h:mm aa"
                />
            </div>
            <button type="submit" className='btn btn-success'>Save Schedule</button>
        </form>
        </div>
    );
};

export default ScheduleForm;
