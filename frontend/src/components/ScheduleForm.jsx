import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Api from '../Api';
import { Calendar, Clock, Check, AlertCircle } from 'lucide-react';

// Custom styles for the DatePicker to match our theme
const customDatePickerStyles = `
  .react-datepicker {
    font-family: inherit;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
  .react-datepicker__header {
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }
  .react-datepicker__day--selected {
    background-color: #3b82f6 !important;
    border-radius: 0.375rem;
  }
  .react-datepicker__day:hover {
    background-color: #dbeafe;
    border-radius: 0.375rem;
  }
  .react-datepicker__time-container .react-datepicker__time {
    background-color: white;
  }
  .react-datepicker__time-container .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background-color: #3b82f6;
  }
`;

const ScheduleForm = ({ onSuccess }) => {
    const [selectedDates, setSelectedDates] = useState([new Date()]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(null);
    const token = localStorage.getItem('token') || false;
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addSchedule();
    };

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    };

    const addSchedule = async () => {
        try {
            setError(null);
            setSuccess(null);
            setLoading(true);
            const response = await Api.post('api/set-schedules', {
                dates: selectedDates,
                startTime: startTime.toLocaleTimeString('en-US', { timeZoneName: 'short' }),
                endTime: endTime.toLocaleTimeString('en-US', { timeZoneName: 'short' })
            }, {
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, '')}`
                }
            });
            if (response.status === 200) {
                setSuccess('Schedule added successfully');
                setError(null);
                setLoading(false);
                onSuccess();
            }
        } catch (error) {
            setError(error.response.data.message);
            setSuccess(null);
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <style>{customDatePickerStyles}</style>
            
            {/* Notifications */}
            {error && (
                <div className="mb-6 flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}
            {success && (
                <div className="mb-6 flex items-center gap-2 p-4 text-green-700 bg-green-50 rounded-lg">
                    <Check className="h-5 w-5 flex-shrink-0" />
                    <p>{success}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Select Dates
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <DatePicker
                            onChange={(date) => handleDateChange(date)}
                            selectedDates={selectedDates}
                            selectsMultiple
                            dateFormat="yyyy/MM/dd"
                            shouldCloseOnSelect={false}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Start Time
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <DatePicker
                                selected={startTime}
                                onChange={(date) => setStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Start Time"
                                dateFormat="h:mm aa"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            End Time
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <DatePicker
                                selected={endTime}
                                onChange={(date) => setEndTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="End Time"
                                dateFormat="h:mm aa"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
                {loading ? 
                <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
            >
                Saving Schedule...
            </button>

                :<button
                    type="submit"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Save Schedule
                </button>}
            </form>
        </div>
    );
};

export default ScheduleForm;

