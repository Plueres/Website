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
            console.time('Login Time'); // Start timing
            try {
                console.log('Attempting to log in with:', this.username, this.password);
                const response = await fetch(`${process.env.API_ORIGIN}/api/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username, password: this.password })
                });

                console.timeEnd('Login Time'); // End timing
                const data = await response.json();
                console.log('Response from server:', data);

                if (data.error) {
                    this.error = data.error;
                } else {
                    localStorage.setItem('token', data.token);
                    this.$router.push('/dashboard');
                }
            } catch (err) {
                console.error('Login error:', err);
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
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 0;
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

button:hover {
    background-color: #0056b3;
}

button:active {
    background-color: #004080;
}
</style>