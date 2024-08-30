<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login" v-if="!isLoggedIn">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-else>
            <p>You are already logged in.</p>
            <button @click="logout">Logout</button>
        </div>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            error: ''
        };
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('token');
        }
    },
    methods: {
        async login() {
            try {
                const response = await fetch('http://localhost:3000/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username, password: this.password })
                });
                const data = await response.json();
                if (data.error) {
                    this.error = data.error;
                } else {
                    // Handle successful login (e.g., store token, redirect)
                    localStorage.setItem('token', data.token);
                    this.$router.push('/dashboard');
                }
            } catch (err) {
                this.error = 'An error occurred. Please try again.';
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.login {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>