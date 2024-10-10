'use client'

import { ProductAction } from '@/constant/types/actionType'
import { Product } from '@/constant/types/product'
import productCR, { productCRDefaultState, productCRState } from '@/contextReducer'
import store from '@/redux/store'
import React, { createContext, useReducer } from 'react'
import { Provider } from 'react-redux'

interface Props {
    children: React.ReactNode
}

interface ProductContextValue {
    productState: {
        products: Product[];
    };
    setProductState: React.Dispatch<React.SetStateAction<ProductContextValue['productState']>>

}

export interface ProductContext2Value {
    productState2: productCRState;
    dispatch: React.Dispatch<ProductAction>;
}

export const ProductContext = createContext<ProductContextValue | null>(null);

export const productContext2 = createContext<ProductContext2Value>({
    productState2: productCRDefaultState,
    dispatch: () => null, // Giá trị mặc định cho dispatch
});

function Providers({ children }: Props) {
    const [productState, setProductState] = React.useState<ProductContextValue['productState']>({
        products: []
    })

    const [productState2, dispatch] = useReducer(productCR, productCRDefaultState);

    const productContextValue = React.useMemo<ProductContextValue>(() => ({
        productState,
        setProductState,
    }), [productState]);

    const productContext2Value = React.useMemo<ProductContext2Value>(() => ({
        productState2,
        dispatch,
    }), [productState2, dispatch]);

    return (
        <Provider store={store}>
            <ProductContext.Provider value={productContextValue}>
                <productContext2.Provider value={productContext2Value}>
                    {children}
                </productContext2.Provider>
            </ProductContext.Provider>
        </Provider>
    )
}

export default Providers