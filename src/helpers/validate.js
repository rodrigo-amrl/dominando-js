import * as Yup from 'yup';

/**
 * Valida um objeto com um schema Yup
 * @param {object} data - Dados a validar (ex: req.body)
 * @param {Yup.ObjectSchema} schema - Schema Yup
 * @returns {Promise<{ valid: boolean, errors?: string[] }>}
 */
export async function validateYup(data, schema) {
    try {
        await schema.validate(data, { abortEarly: false });
        return { valid: true };
    } catch (err) {
        const errors = err.errors || [err.message];
        return { valid: false, errors };
    }
}
