'use strict'

const USERNAME_REGEXP = /^[A-Za-z0-9][A-Za-z0-9-_.]{3,16}[A-Za-z0-9]$/
const EMAIL_REGEXP = /.+@.+/
const PASSWORD_REGEXP = /^[a-zA-Z0-9!@#$%^&*()_+=-]{8,16}$/

class Validation {
    static validateName(nameInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (!this.#validateLen(nameInput)) {
            res.ok = false
            res.text = 'Имя пользователя - от 6 до 50 символов'
        }

        return res
    }

    static validateUsername(usernameInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (!this.#validateLen(usernameInput)) {
            res.ok = false
            res.text = 'Длина логина - от 6 до 20 символов'
        }

        if (res.ok && !USERNAME_REGEXP.test(usernameInput.value)) {
            res.ok = false
            res.text =
                'Логин может содержать только латинские буквы, цифры, -, _ или точку'
        }
        return res
    }
    static validatePassword(passwordInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (!this.#validateLen(passwordInput)) {
            res.ok = false
            res.text = 'Длина пароля - от 8 до 16 символов'
        }

        if (res.ok && !PASSWORD_REGEXP.test(passwordInput.value)) {
            res.ok = false
            res.text =
                'Пароль должен содержать только символы латинского алфавита, цифры или !@#$%^&*()_+=-'
        }
        return res
    }

    static validateEmail(emailInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (!this.#validateLen(emailInput)) {
            res.ok = false
            res.text = 'Почта - от 6 до 40 символов'
        }

        if (res.ok && !EMAIL_REGEXP.test(emailInput.value)) {
            res.ok = false
            res.text = 'Почта должна иметь формат admin@example.com'
        }

        return res
    }

    static validatePasswords(passwordInput, passwordRepeatInput) {
        const res = {
            ok: true,
            text: undefined,
        }

        if (passwordInput.value !== passwordRepeatInput.value) {
            res.ok = false
            res.text = 'Пароли не совпадают'
        }

        return res
    }

    /**
     * @desc Validates length of a field (uses its inner properties for len)
     * @param {HTMLInputElement} inputElem
     * @private
     */
    static #validateLen(inputElem) {
        return (
            inputElem.value.length < inputElem.maxLength &&
            inputElem.value.length > inputElem.minLength
        )
    }
}

export default Validation
