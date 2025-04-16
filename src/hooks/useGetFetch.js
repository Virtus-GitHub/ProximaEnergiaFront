import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useGetFetch = (apiUrl) => {
    const { token } = useContext(AuthContext);

    const [state, setState] = useState({
        data: null,
        hasError: false,
        error: null
    });

    const getFetch = async () => {
        if(!token) return;

        try{
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                setState({
                    data: null,
                    hasError: true,
                    error: {
                        code: response.status,
                        message: response.statusText
                    }
                });
    
                return;
            }
    
            const data = await response.json();
            setState({
                data: data,
                hasError: false,
                error: null
            });
        }
        catch (error) {
            setState({
                data: null,
                hasError: true,
                error: {
                    code: 0,
                    message: error.message
                }
            });
        }
    }

    useEffect(() => {
        if (token) {
            getFetch(token);
        }
    }, [token, apiUrl]);

    return {
        data: state.data,
        hasError: state.hasError,
        error: state.error,
        refresh: getFetch
    }
}
