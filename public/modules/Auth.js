import Ajax from './ajax.js'

/**
 * Кидает запрос на регистрацию пользователя
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<void>}
 */
const register = async (username, password, email) => {
    const url = 'http://localhost:8080/api/auth/register'
    const body = {
        username: username,
        password: password,
        email: email,
    }

    const responseData = Ajax.post({ url, body })
    console.log(responseData)
}

const login = async (username, password) => {
    const url = 'http://localhost:8080/api/auth/login'
    const body = {
        username: username,
        password: password,
    }
    const responseData = Ajax.post({ url, body })
    console.log(responseData)
}

console.log(await register('123', '12', '12'))
login()
