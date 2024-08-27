import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { h } from 'vue';

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
        app.component('ThemeProvider', {
            props: ['theme'],
            render() {
                return h(ThemeProvider, { theme: this.theme || theme }, {
                    default: () => [
                        h(CssBaseline),
                        this.$slots.default()
                    ]
                });
            },
        });
        app.component('CssBaseline', CssBaseline);
        app.provide('theme', theme);
    },
};