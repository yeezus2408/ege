export function getTokenFromLocalStorage(): string {
    const dataToken = localStorage.getItem('token');
    if (dataToken === null) {
        return ''; // Или другое значение по умолчанию
    }

    try {
        const token: string = JSON.parse(dataToken);
        return token;
    } catch (error) {
        console.error("Error parsing token from localStorage:", error);
        return ''; // Или другое значение по умолчанию, чтобы указать на ошибку
    }
}

export function setTokenToLocalStorage(key: string, token: string): void{
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void{
    localStorage.removeItem(key);
}