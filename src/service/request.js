import axios from 'axios';

const JWTToken = localStorage.getItem('jwt');

const api = axios.create({
    baseURL: `http://85.208.87.10:80/api/`
});

window.Telegram.WebApp.ready();

const userId = window.Telegram.WebApp.initDataUnsafe.user.id;

async function tg_auth() {
        try {
            await api.post(`auth/login/` + {userId});
    
        } catch (error) {
            console.log(error);
            return null;
        }
    };

// export function apiSetHeader(name, value) {
//     if (value) {
//         api.defaults.headers[name] = value;
//     }
// };

// if (JWTToken) {
//     apiSetHeader('Authorization', `Bearer ${JWTToken}`);
// }

// export async function authorize(login, password) {
//     try {
//         var body = {
//             login: login,
//             password: password
//         }
//         const { data } = await api.post(`auth/login/`, body);

//         localStorage.setItem('accessToken', data.accessToken);
        
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// };

