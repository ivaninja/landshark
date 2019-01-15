export const required = value =>
    value || typeof value === "number" ? null : "Required";

export function validateEmail(value) {
    return required(value)
        ? required(value)
        : value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : null;
}

const minLength = min => value => {
    return required(value)
        ? required(value)
        : value && value.length < min
            ? `Must be ${min} characters or more`
            : null;
};

export const validateConfirmPassword = (password, passwordToConfirm) => {
    return required(passwordToConfirm)
        ? required(passwordToConfirm)
        : password === passwordToConfirm
            ? null
            : "Password does not match";
};

export const validatePassword = minLength(4);
