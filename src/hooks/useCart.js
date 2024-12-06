import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db.js"


export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = JSON.parse(localStorage.getItem('cart')) || []
        return localStorageCart
      }
      
      const [data] = useState(db);
    
      const [cart, setCart] = useState(initialCart);
    
      const MAX_ITEMS = 10;
      const MIN_ITEMS = 1;
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
      function addToCart(item){
    
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id )
    
        if(itemExist >= 0){
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++;
            setCart(updatedCart)
        }
        else{
          item.quantity = 1
          setCart([...cart, item])
        }
    
    
      }
    
      function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
    
      function increaseQuantity(id){
    
        const updatedCart = cart.map( item => {
          if(item.id === id && item.quantity < MAX_ITEMS){
            return{
              ...item, quantity: item.quantity + 1
            }
          }
          return item
        })
    
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id){
    
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ITEMS){
            return{
              ...item, quantity:item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function clearCart(){
        setCart([])
      }

          //State derivado

    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0),[cart])

    
    
    return {
        data, 
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}