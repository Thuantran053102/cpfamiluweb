import { ADDTOCART, EN, VI, REMOVECART, VN } from './actionType';

export const AddToCart = (data) => {
    return {
        type: ADDTOCART,
        data: data
    }
}
export const RemoveCart = (data) => {
    return {
        type: REMOVECART,
        data: data
    }
}

export const changeToEng = () => {
    console.log("hlo")
    return {
        type: EN
    }
}

export const changeToVn = () => {
    return {
        type: VN
    }
}