// Worked on by Lawrence Li

// Validates an email address
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validates a password
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
};

// Validates a name
export const validateName = (name) => {
    const usernameRegex = /^[a-zA-Z0-9]{2,20}$/;
    return usernameRegex.test(name);
};
