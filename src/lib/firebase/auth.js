import { auth } from './index.js';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail
} from 'firebase/auth';

/**
 * Registers a new user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the registered user object.
 * @throws {Error} - If the registration fails.
 */
export async function register(email, password) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		console.log('Registration successful');
		return user;
	} catch (error) {
		console.log('Registration failed:', error);
		throw error;
	}
}

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A promise that resolves to the logged-in user object.
 * @throws {Error} - If the login fails.
 */
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Login successful');
        return {
            uid: user.uid,
            email: user.email
        };
    } catch (error) {
        console.log('Sign-in failed:', error);
        throw error;
    }
}

/**
 * Resets the password for a user with the provided email.
 *
 * @param {string} email - The email of the user.
 * @returns {Promise<void>} - A promise that resolves when the password reset email is sent.
 * @throws {Error} - If the password reset fails.
 */
export async function resetPassword(email) {
	try {
		await sendPasswordResetEmail(auth, email);
		console.log('Password reset email sent successfully');
	} catch (error) {
		console.log('Password reset failed:', error);
		throw error;
	}
}
