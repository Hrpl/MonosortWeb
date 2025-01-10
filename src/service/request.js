import axios from 'axios';

const JWTToken = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: `https://monosortcoffee.ru/api/`
});


export function apiSetHeader(name, value) {
    if (value) {
        api.defaults.headers[name] = value;
    }
};

if (JWTToken) {
    apiSetHeader('Authorization', `Bearer ${JWTToken}`);
}

export async function authorize(login, password) {
    try {
        var body = {
            login: login,
            password: password
        }
        const { data } = await api.post(`auth/login/`, body);
        
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('expires', data.expires);
        return data.accessToken
        
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function reg(login, password) {
    try {
        var body = {
            login: login,
            password: password
        }
        const response = await api.post('user/create/', body);

        // Проверяем статус ответа
        if (response.status === 200) {
            console.log('Регистрация прошла успешно:', response.data);
        } else {
            console.log('Неожиданный статус:', response.status);
        }
        
    } catch (error) {
        if (error.response) {
            console.log('Ошибка от сервера:', error.response.status, error.response.data);
        } else if (error.request) {
            // Ошибка на уровне запроса (сервер не ответил)
            console.log('Сервер не отвечает:', error.request);
        } else {
            // Другая ошибка
            console.log('Произошла ошибка:', error.message);
        }

        return null;
    }
};

export async function getCategory() {
    try {
        const response = await api.get(`menu/category/`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Неожиданный статус:', response.status);
        }
        
    } catch (error) {
        if (error.response) {
            console.log('Ошибка от сервера:', error.response.status, error.response.data);
        } else if (error.request) {
            // Ошибка на уровне запроса (сервер не ответил)
            console.log('Сервер не отвечает:', error.request);
        } else {
            // Другая ошибка
            console.log('Произошла ошибка:', error.message);
        }

        return null;
    }
};

export async function getProducts(id) {
    try {
        const response = await api.get(`menu/many/`+ id);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Неожиданный статус:', response.status);
        }
        
    } catch (error) {
        if (error.response) {
            console.log('Ошибка от сервера:', error.response.status, error.response.data);
        } else if (error.request) {
            // Ошибка на уровне запроса (сервер не ответил)
            console.log('Сервер не отвечает:', error.request);
        } else {
            // Другая ошибка
            console.log('Произошла ошибка:', error.message);
        }

        return null;
    }
};

export async function getVolumes(id) {
    try {
        const response = await api.get(`drink/volume/`+ id);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Неожиданный статус:', response.status);
        }
        
    } catch (error) {
        if (error.response) {
            console.log('Ошибка от сервера:', error.response.status, error.response.data);
        } else if (error.request) {
            // Ошибка на уровне запроса (сервер не ответил)
            console.log('Сервер не отвечает:', error.request);
        } else {
            // Другая ошибка
            console.log('Произошла ошибка:', error.message);
        }

        return null;
    }
};