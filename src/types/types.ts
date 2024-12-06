export interface Guitar {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export interface CartItem extends Guitar{
    quantity: number
}

//Heredar y extender un type o una interface


/*
    1.

    export type CartItem = Guitar & {
        quantity: number
    }

    2. 

    export interface CartItem extends Guitar {
        quantity: number
    }

    3.
    !Solo sirve para types
    
    ? pick sirve para obtener las propiedades que uno desee de
    export typerCartItem = Pick<Guitar, 'id | 'name | 'price> 
*/