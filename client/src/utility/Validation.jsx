export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
};

export const validateName = (name) => {
    const usernameRegex = /^(?! )[a-zA-Z0-9 ]{1,18}(?<! )$/;
    return usernameRegex.test(name);
};
