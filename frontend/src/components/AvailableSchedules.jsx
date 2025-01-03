import React from 'react'
import { Calendar, Clock } from 'lucide-react'

const AvailableSchedules = ({ schedules, onBookAppointment }) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Available Schedules</h3>
            </div>
            <div className="border-t border-gray-200">
                {schedules.length > 0 ? (
                    schedules.map(([date, events], index) => (
                        <div key={index} className="px-4 py-5 sm:p-6">
                            <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                {date}
                            </h4>
                            <ul className="space-y-4">
                                {events.map(event => (
                                    <li key={event._id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5 text-gray-400" />
                                            <span className="text-sm text-gray-900">
                                                {new Date(event.startTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })} - {new Date(event.endTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const formattedStartTime = new Date(event.startTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                });
                                                const formattedEndTime = new Date(event.endTime).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                });
                                                const formattedDate = new Date(event.startTime).toLocaleDateString('en-US');
                                                onBookAppointment(event._id, `${formattedDate}, ${formattedStartTime} to ${formattedEndTime}`);
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Book
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="px-4 py-5 sm:p-6 text-sm text-gray-500">No available schedules</p>
                )}
            </div>
        </div>
    )
}

export default AvailableSchedules

