import Ajax from './Ajax.js'

/**
 * Кидает запрос на регистрацию пользователя
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<any>}
 */
export const register = async ({ username, password, email }) => {
    const url = BACKEND_URL + '/auth/register'
    const body = {
        username: username,
        password: password,
        email: email,
    }

    const responseData = Ajax.post({ url, body })
    console.log(responseData)
    return responseData
}

export const login = async ({ username, password }) => {
    const url = BACKEND_URL + '/auth/login'
    const body = {
        username: username,
        password: password,
    }
    return Ajax.post({ url, body })
}
