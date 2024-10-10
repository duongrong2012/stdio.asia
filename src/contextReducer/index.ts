import { ProductAction } from "@/constant/types/actionType";
import * as ActionTypes from "../redux/actionTypes";
import { Product } from "@/constant/types/product";

export interface productCRState {
    products : Product | null,
    productLoading:boolean
}

export const productCRDefaultState: productCRState = {
    products: null,
    productLoading:true
}

export default function productCR(state = productCRDefaultState, action:ProductAction) {
    switch (action.type) {
        case ActionTypes.GET_PRODUCTS:
            return {
                ...state,
                productLoading: true,
            };
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                productLoading: false,
                products: action.payload,
            };
        case ActionTypes.GET_PRODUCTS_FAILED:
            return {
                ...state,
                productLoading: false,
            };
        default:
            return state;
    }
}