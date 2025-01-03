import React from 'react'
import { Check, X, Clock } from 'lucide-react'


const StatusUpdate= ({ currentStatus, onUpdateStatus }) => {
    return (
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Status</h3>
            <div className="mt-4 flex flex-wrap gap-2">
                <button
                    onClick={() => onUpdateStatus('accepted')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={currentStatus === 'accepted'}
                >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                </button>
                <button
                    onClick={() => onUpdateStatus('cancelled')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    disabled={currentStatus === 'cancelled'}
                >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                </button>
                <button
                    onClick={() => onUpdateStatus('completed')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={currentStatus === 'completed'}
                >
                    <Clock className="mr-2 h-4 w-4" />
                    Complete
                </button>
            </div>
        </div>
    )
}

export default StatusUpdate

