export const validateField = (name, value) => {
    let error = '';

    switch (name) {
        case 'nombre':
            if (!value.trim()) {
                error = 'El nombre es requerido';
            } else if (value.trim().length < 2) {
                error = 'El nombre debe tener al menos 2 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                error = 'El nombre solo puede contener letras';
            }
            break;

        case 'correo':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                error = 'El correo es requerido';
            } else if (!emailRegex.test(value)) {
                error = 'Introduce un correo válido (ejemplo@dominio.com)';
            }
            break;

        case 'contrasena':
            if (!value) {
                error = 'La contraseña es requerida';
            } else if (value.length < 8) {
                error = 'La contraseña debe tener al menos 8 caracteres';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                error = 'Debe tener al menos una mayúscula, una minúscula y un número';
            }
            break;

        default:
            break;
    }

    return error;
};

export const validateAllFields = (formData) => {
    return {
        nombre: validateField('nombre', formData.nombre),
        correo: validateField('correo', formData.correo),
        contrasena: validateField('contrasena', formData.contrasena)
    };
};

export const hasErrors = (errors) => {
    return Object.values(errors).some(error => error !== '');
};

export const areAllFieldsComplete = (formData) => {
    return formData.nombre && formData.correo && formData.contrasena;
};

export const getInputClasses = (fieldName, touched, errors, formData) => {
    let classes = 'form-control custom-input';

    if (touched[fieldName]) {
        if (errors[fieldName]) {
            classes += ' is-invalid';
        } else if (formData[fieldName]) {
            classes += ' is-valid';
        }
    }

    return classes;
};

export const getPasswordStrength = (password) => {
    if (!password) return {level: 'none', text: '', class: ''};

    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return {
            level: 'strong',
            text: 'Fuerte 💪',
            class: 'strong'
        };
    } else if (password.length >= 8) {
        return {
            level: 'medium',
            text: 'Media ⚠️',
            class: 'medium'
        };
    } else {
        return {
            level: 'weak',
            text: 'Débil ❌',
            class: 'weak'
        };
    }
};

export const getInitialFormState = () => ({
    formData: {
        nombre: '',
        correo: '',
        contrasena: ''
    },
    errors: {
        nombre: '',
        correo: '',
        contrasena: ''
    },
    touched: {
        nombre: false,
        correo: false,
        contrasena: false
    }
});