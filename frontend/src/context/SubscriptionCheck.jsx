import { Navigate } from 'react-router-dom'

const SubscriptionCheck = ({ children, ...rest }) => {
  const subscriptionMode = localStorage.getItem('subscription_Mode') || false

  if (subscriptionMode){
    return children
  }
  else if (!subscriptionMode) {
    return <Navigate to="/pricing" />
  }
}



export default SubscriptionCheck