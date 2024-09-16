<template>
    <header class="header">
        <div class="header-content">
            <a href="/dashboard" class="logo">
                <img src="https://raw.githubusercontent.com/Plueres/plueres/main/website_images/icon192.png"
                    alt="Logo" />
                <h1>CMS Dashboard</h1>
            </a>
            <div class="hamburger" @click="toggleMenu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <nav class="nav-menu" :class="{ 'active': isMenuOpen }">
                <ul>
                    <li class="dropdown" @click="toggleDropdown('lists')">
                        <a href="#" class="nav-link">Lists</a>
                        <div v-if="isDropdownOpen === 'lists'" class="dropdown-menu">
                            <a href="/dashboard/games">Games</a>
                            <a href="/dashboard/movies">Movies</a>
                            <a href="/dashboard/shows">Shows</a>
                        </div>
                    </li>
                    <li class="dropdown" @click="toggleDropdown('user')">
                        <a href="#" class="nav-link">{{ user.name }}</a>
                        <div v-if="isDropdownOpen === 'user'" class="dropdown-menu">
                            <a href="#" @click="logout">Log Out</a>
                        </div>
                    </li>
                    <li class="dropdown" @click="toggleDropdown('other')">
                        <a href="#" class="nav-link">Website</a>
                        <div v-if="isDropdownOpen === 'other'" class="dropdown-menu">
                            <a href="/">Website</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
            user: {
                name: 'Logged In',
            },
            isDropdownOpen: null, // State to manage which dropdown is open
            isMenuOpen: false // State to manage hamburger menu visibility
        };
    },
    methods: {
        toggleDropdown(dropdown) {
            this.isDropdownOpen = this.isDropdownOpen === dropdown ? null : dropdown;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen; // Toggle hamburger menu visibility
        },
        logout() {
            console.log('Logging out...');
            localStorage.removeItem('token');
            this.$router.push('/login'); // Redirect to login page
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/scss/_variables';

// Header
.header {
    background-color: #ffffff;
    padding: 1rem;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.logo img {
    height: 40px;
    margin-right: 1rem;
}

.logo h1 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
}

.hamburger {
    display: flex;
    z-index: 17;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    height: 3px;
    width: 25px;
    background-color: #333;
    margin: 3px 0;
}

.nav-menu {
    display: none;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 16;
}

.nav-menu ul {
    display: flex;
    gap: 2.2rem;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.nav-menu.active {
    display: flex;
    justify-content: center;
}

.nav-link {
    color: #ccc;
    padding: 1rem;
    font-size: 1.5rem;
    text-decoration: none;
    margin: 0 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: #f0f0f0;
}

.dropdown {
    position: relative;
}

.dropdown-menu {
    display: flex;
    position: absolute;
    top: 150%;
    right: 0;
    background-color: #eee;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 17;
    padding: 0.5rem 0;
    flex-direction: column;
    width: 100%;
}

.dropdown-menu a {
    display: block;
    padding: 0.5rem 1rem;
    color: #555;
    text-decoration: none;
}

.dropdown-menu a:hover {
    background-color: #f0f0f0;
}

// Responsive Styles Desktop
@media (min-width: $tablet-min-width) {

    // Header
    .hamburger {
        display: none;
    }

    .nav-menu {
        display: flex;
        background: none;
        position: unset;
        width: unset;
        height: unset;
        z-index: unset;
    }

    .nav-menu ul {
        display: flex;
        flex-direction: row;
        gap: unset;
    }

    .nav-link {
        color: #555;
        padding: 0.5rem 1rem;
        font-size: unset;
    }

}
</style>