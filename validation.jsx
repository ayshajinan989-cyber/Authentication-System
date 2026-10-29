
export function validateEmail(email) {
    return email.includes('@') && email.includes('.');
}

export function validateLogin(values) {
    const errors = {};

    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!validateEmail(values.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (!values.password) {
        errors.password = 'Password is required.';
    }

    return errors;
}

export function validateRegister(values) {
    const errors = {};

    if (!values.fullName.trim()) {
        errors.fullName = 'Full name is required.';
    } else if (values.fullName.trim().length < 2) {
        errors.fullName = 'Name must be at least 2 characters.';
    }

    if (!values.username.trim()) {
        errors.username = 'Username is required.';
    } else if (
        values.username.trim().length < 3 ||
        values.username.trim().length > 20
    ) {
        errors.username = 'Username must be 3–20 characters.';
    }

    if (!values.email.trim()) {
        errors.email = 'Email is required.';
    } else if (!validateEmail(values.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
}
