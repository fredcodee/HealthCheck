import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Api from '../Api'

const SubscriptionCheck = ({ children, ...rest }) => {
  let subscriptionMode = localStorage.getItem('subscription_Mode') || "false"
  const token = localStorage.getItem('token') || false

  useEffect(() => {
    checkSubscription()
  }, [])


  const checkSubscription = async () => {
    try{
      await Api.get('api/subscription-check', {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, '')}`
        }
      })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem('subscription_Mode', JSON.stringify(response.data.subscription_mode))
            localStorage.setItem("type", JSON.stringify(response.data.type))
          } else {
            subscriptionMode = false
          }
        })
    } catch (error) {
      subscriptionMode = false
    } 
    }



  if (subscriptionMode === 'true') {
    return children
  }
  else if (subscriptionMode === 'false') {
    return <Navigate to="/pricing" />
  }
}



export default SubscriptionCheck