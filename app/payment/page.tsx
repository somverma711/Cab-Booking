"use client"
// import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/Payment/CheckOutForm'


function Payment() {

  // const {carAmount, setCarAmount}= useContext(SelectedCarAmountContext)

  const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any) 
  const options:any = {
    mode: 'payment',
    amount: 499,
    currency: 'usd',
    
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm/>
    </Elements>
  )
}

export default Payment