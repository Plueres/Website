import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

export default {
    install(app) {
        app.component('ThemeProvider', ThemeProvider);
        app.component('CssBaseline', CssBaseline);
        app.provide('theme', theme);
    },
};