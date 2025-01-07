import axios from 'axios';

const JWTToken = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: `http://85.208.87.10:80/api/`
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