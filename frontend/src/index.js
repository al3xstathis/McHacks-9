import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()


ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </QueryClientProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
