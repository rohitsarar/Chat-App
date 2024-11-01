import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';




const useSignup = () => {
    const [loading, setLoading] = useState(false);
const{setAuthUser}=useAuthContext();   

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", { // Note the leading slash
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            if (!res.ok) {
                const errorText = await res.text(); // Attempt to get error text from response
                throw new Error(errorText || "Signup failed");
            }

            const data = await res.json();
            console.log("Signup successful:", data);
            toast.success("Signup successful!");

            if(data.error){
                throw new Error(data.error)

            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);





        } catch (error) {
            console.error("Error during signup:", error.message);
            toast.error(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

// Helper function to handle input validation
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}
