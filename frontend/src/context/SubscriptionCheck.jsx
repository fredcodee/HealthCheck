import { Navigate } from 'react-router-dom'

const SubscriptionCheck = ({ children, ...rest }) => {
  const subscriptionMode = localStorage.getItem('subscription_Mode') || false

  if (subscriptionMode === 'true') {
    return children
  }
  else if (subscriptionMode === 'false') {
    return <Navigate to="/pricing" />
  }
}



export default SubscriptionCheck