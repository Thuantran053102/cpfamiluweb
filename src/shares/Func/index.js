

export function CheckTOkenRule(){
    return JSON.parse(localStorage.getItem('token'))
}
export function CheckUserRule(){
    return JSON.parse(localStorage.getItem('user'))
}

