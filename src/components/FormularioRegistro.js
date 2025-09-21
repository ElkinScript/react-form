import React, {useState} from 'react';
import '../styles/FormularioRegistro.css';
import {
    validateField,
    validateAllFields,
    hasErrors,
    areAllFieldsComplete,
    getInputClasses,
    getPasswordStrength,
    getInitialFormState
} from '../utils/validaciones-form';

function FormularioRegistro() {
    const initialState = getInitialFormState();
    const [formData, setFormData] = useState(initialState.formData);
    const [errors, setErrors] = useState(initialState.errors);
    const [touched, setTouched] = useState(initialState.touched);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e) => {
        const {name, value} = e.target;

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setTouched({
            nombre: true,
            correo: true,
            contrasena: true
        });

        const newErrors = validateAllFields(formData);
        setErrors(newErrors);

        if (!hasErrors(newErrors)) {
            console.log('✅ Registro exitoso:', formData);

            alert('¡Registro exitoso! Bienvenido ' + formData.nombre);

            const cleanState = getInitialFormState();
            setFormData(cleanState.formData);
            setErrors(cleanState.errors);
            setTouched(cleanState.touched);
        }
    };

    const isButtonDisabled = hasErrors(errors) || !areAllFieldsComplete(formData);

    const passwordStrength = getPasswordStrength(formData.contrasena);

    return (
        <div className="formulario-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">

                        <div className="custom-card">
                            <div className="card-body p-4">

                                <div className="text-center mb-4">
                                    <div className="icono-usuario mb-3">
                                        <i className="fas fa-user-circle"></i>
                                    </div>
                                    <h2 className="titulo-formulario">Registro de Usuario</h2>
                                    <p className="subtitulo">Crea tu cuenta en segundos</p>
                                </div>

                                <form onSubmit={handleSubmit}>

                                    {/* Campo Nombre */}
                                    <div className="mb-3">
                                        <label className="form-label custom-label" htmlFor="nombre">
                                            <i className="fas fa-user me-2"></i>
                                            Nombre Completo
                                        </label>
                                        <input
                                            className={getInputClasses('nombre', touched, errors, formData)}
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Ingresa tu nombre completo"
                                        />
                                        {touched.nombre && errors.nombre && (
                                            <div className="error-message">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {errors.nombre}
                                            </div>
                                        )}
                                        {touched.nombre && !errors.nombre && formData.nombre && (
                                            <div className="success-message">
                                                <i className="fas fa-check-circle me-1"></i>
                                                ¡Perfecto!
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label custom-label" htmlFor="correo">
                                            <i className="fas fa-envelope me-2"></i>
                                            Correo Electrónico
                                        </label>
                                        <input
                                            className={getInputClasses('correo', touched, errors, formData)}
                                            type="email"
                                            id="correo"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="ejemplo@correo.com"
                                        />
                                        {touched.correo && errors.correo && (
                                            <div className="error-message">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {errors.correo}
                                            </div>
                                        )}
                                        {touched.correo && !errors.correo && formData.correo && (
                                            <div className="success-message">
                                                <i className="fas fa-check-circle me-1"></i>
                                                ¡Correo válido!
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label custom-label" htmlFor="contrasena">
                                            <i className="fas fa-lock me-2"></i>
                                            Contraseña
                                        </label>
                                        <input
                                            className={getInputClasses('contrasena', touched, errors, formData)}
                                            type="password"
                                            id="contrasena"
                                            name="contrasena"
                                            value={formData.contrasena}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                        {touched.contrasena && errors.contrasena && (
                                            <div className="error-message">
                                                <i className="fas fa-exclamation-circle me-1"></i>
                                                {errors.contrasena}
                                            </div>
                                        )}
                                        {formData.contrasena && (
                                            <div className="password-strength mt-2">
                                                <small className={`strength-indicator ${passwordStrength.class}`}>
                                                    <i className="fas fa-shield-alt me-1"></i>
                                                    Fortaleza: {passwordStrength.text}
                                                </small>
                                            </div>
                                        )}
                                        {touched.contrasena && !errors.contrasena && formData.contrasena && (
                                            <div className="success-message">
                                                <i className="fas fa-check-circle me-1"></i>
                                                ¡Contraseña segura!
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className={`btn custom-button w-100 ${isButtonDisabled ? 'disabled' : ''}`}
                                        type="submit"
                                        disabled={isButtonDisabled}
                                    >
                                        <i className="fas fa-user-plus me-2"></i>
                                        {isButtonDisabled ? 'Completa los campos' : 'Crear Cuenta'}
                                    </button>

                                    <div className="text-center mt-3">
                                        <small className="text-muted">
                                            ¿Ya tienes cuenta?
                                            <a href="#login" className="custom-link"> Inicia sesión aquí</a>
                                        </small>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioRegistro;