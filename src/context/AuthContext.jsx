import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const getToken = async () => {
        try {
            const response = await fetch('https://localhost:44395/api/Token/GetToken?user=davidvirtus@gmail.com');
            if (!response.ok)
                throw new Error('Error al obtener el token');

            const tokenValue = await response.text();
            setToken(tokenValue);
        }
        catch (error) {
            console.error(`Error al obtener el token:${error.message}`);
            setToken(null);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, refreshToken: getToken }}>
            { children }
        </AuthContext.Provider>
    )
};
