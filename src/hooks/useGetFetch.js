import React, { useEffect, useState } from 'react';

export const useGetFetch = (apiUrl) => {
    const [state, setState] = useState({
        data: null,
        hasError: false,
        error: null
    });

    useEffect(() => {
        getFetch();
    }, [apiUrl]);

    const getFetch = async () => {
        const response = await fetch(apiUrl);
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

    return {
        data: state.data,
        hasError: state.hasError,
        error: state.error,
        refresh: getFetch
    }
}
