<template>
    <div class="login">
        <h3>Login</h3>
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
            <button @click="Dashboard">Dashboard</button>
        </div>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            message: ''
        };
    },
    computed: {
        isLoggedIn() {
            return !!sessionStorage.getItem('token');
        }
    },
    methods: {
        async login() {
            console.time('Login Time'); // Start timing
            try {
                console.log('Attempting to log in with:', this.username, this.password);
                this.message = "logging in, please wait...";
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

                if (data.message) {
                    this.message = data.message;
                }
                    sessionStorage.setItem('token', data.token);
                    window.location.href = '/dashboard';
            } catch (err) {
                console.error('Login error:', err);
                this.message = 'An error occurred. Please try again.';
            }
        },
        logout() {
            if (sessionStorage.getItem('token')) {
                console.log('Logging out...');
                sessionStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                console.warn('No token found.');
                window.location.href = '/login';
            }
        },
        Dashboard() {
            if (sessionStorage.getItem('token')) {
                console.log('redirecting.');
                window.location.href = '/dashboard';
            }
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