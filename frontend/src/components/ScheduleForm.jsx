import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';

const ScheduleForm = () => {
    const [selectedDates, setSelectedDates] = useState([new Date()]);
    const [startTime, setStartTime] =  useState(new Date());
    const [endTime, setEndTime] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process the form data here
        console.log('Selected Dates:', selectedDates);
        console.log('Start Time:', startTime);
        console.log('End Time:', endTime);
    };

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    };

    return (
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
    );
};

export default ScheduleForm;
