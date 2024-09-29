// function getCookie(name) {
//     let cookieValue = null
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';')
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim()
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === name + '=') {
//                 cookieValue = decodeURIComponent(
//                     cookie.substring(name.length + 1)
//                 )
//                 break
//             }
//         }
//     }
//     return cookieValue
// }

class Ajax {
    static get() {}

    /**
     *
     * @param {string} url
     * @param {object} body
     */
    static post({ url, body }) {
        return this._makeRequest({ method: 'POST', url, body })
    }

    /**
     * @param {string} method
     * @param {string} url
     * @param {object} body
     * @returns {Promise<any>}
     */
    static async _makeRequest({ method, url, body }) {
        const request = new Request(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(body),
            credentials: 'include',
        })

        const response = await fetch(request)
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    }
}

export default Ajax
