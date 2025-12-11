export function getUserName(){
    return localStorage.getItem("username");
}

export function getAccessToken(){
    return localStorage.getItem("access");
}

export function setAccessToken(){
    return localStorage.setItem("access",token);
}

export function removeAccessToken(){
    return localStorage.removeItem("access");
}