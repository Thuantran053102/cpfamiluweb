import vi from '../lang/vn.json';
import en from '../lang/en.json';
export const LoadLang = () => {
    if (localStorage.getItem("_lang")) {
        let setting = JSON.parse(localStorage.getItem("_lang")).value;
        if (setting==="vi"){
            return vi;
        }else{
            return en;
        }
    }else{
        return vi;
    }
} 