import React, { createContext, useContext, useState } from 'react';

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
    const [stack, setStack] = useState([{ name: 'Home', params: {} }]);

    const push = (name, params = {}) => {
        setStack(prev => [...prev, { name, params }]);
    };

    const pop = () => {
        setStack(prev => {
            if (prev.length <= 1) return prev;
            return prev.slice(0, -1);
        });
    };

    const replace = (name, params = {}) => {
        setStack(prev => [...prev.slice(0, -1), { name, params }]);
    };

    const reset = (name, params = {}) => {
        setStack([{ name, params }]);
    };
    
    const currentRoute = stack[stack.length - 1];

    return (
        <RouterContext.Provider value={{ stack, currentRoute, push, pop, replace, reset }}>
            {children}
        </RouterContext.Provider>
    );
};

export const useRouter = () => useContext(RouterContext);
