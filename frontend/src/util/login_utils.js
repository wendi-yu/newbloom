function validateEmail (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return "Invalid Email"
    } 
    return null;
}

function validatePassword (password) {
    if (password.length==0) {
        return "Must Enter a Password"
    } else if (password.length < 8) {
        return "Password Length must be over 8 characters"
    }
    return null
}

function validateName (name) {
    if (name.length==0) {
        return "Must Enter a Name"
    }
    return null
}

export function validateLogin (email, password) {
    return validateEmail(email) || validatePassword(password);
}

export function validateRegister (firstName, lastName, email, password) {
    return validateEmail(email) || validatePassword(password) || validateName(firstName) || validateName(lastName);
}