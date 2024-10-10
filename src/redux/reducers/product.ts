import * as ActionTypes from "../actionTypes";
import { AnyAction } from "redux";
import { Product } from "@/constant/types/product";

interface State {
    products : Product[],
    productLoading:boolean
}

const defaultState: State = {
    products: [],
    productLoading:true
}

export default function product(state = defaultState, action:AnyAction) {
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