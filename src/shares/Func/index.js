

export function CheckTOkenRule(){
    return JSON.parse(localStorage.getItem('token'))
}
export function CheckUserRule(){
    return JSON.parse(localStorage.getItem('user'))
}

export function CheckFullName()
{
    console.log('JSON.parse',JSON.parse(localStorage.getItem('fullname')))
    return JSON.parse(localStorage.getItem('fullname'))

}

export function CheckUseID()
{
    console.log(localStorage.getItem('userid'))
    return JSON.parse(localStorage.getItem('userid'))
    
}

