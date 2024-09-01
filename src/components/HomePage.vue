<template>
    <div class="about">
        <h1>Home Page</h1>
        <p>This is the home page.</p>
        <p>
            What Should Be On a Web Developer Portfolio? <br>
            Include at least these in your web developer portfolio: <br>
            – Contact information, including relevant social media accounts <br>
            – Short bio and your photo <br>
            – Relevant experience and skills with context <br>
            – Personal projects <br>
            – Documented source code <br>
            – Education <br>
            – Awards/recognition <br>
            – Downloadable web developer resume
        </p>
        <ThemeProvider :theme="theme">
            <CssBaseline />
            <Button variant="contained" color="primary" startIcon>
                <HomeIcon />
                Home
            </Button>
        </ThemeProvider>
    </div>
</template>

<script>
import { inject } from 'vue';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

export default {
    name: 'AboutPage',
    components: {
        Button,
        HomeIcon,
    },
    setup() {
        const theme = inject('theme');
        return { theme };
    },
};
</script>

<style scoped>
.about {
    padding: 20px;
}
</style>