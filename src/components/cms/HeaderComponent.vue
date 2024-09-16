<template>
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <img src="https://raw.githubusercontent.com/Plueres/plueres/main/website_images/icon192.png"
                    alt="Logo" />
                <h1>CMS Dashboard</h1>
            </div>
            <div class="hamburger" @click="toggleMenu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <nav class="nav-menu" :class="{ 'active': isMenuOpen }">
                <ul>
                    <li><a href="/dashboard" class="nav-link">Dashboard</a></li>
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
                        <a href="#" class="nav-link">Other Options</a>
                        <div v-if="isDropdownOpen === 'other'" class="dropdown-menu">
                            <a href="#">Option 1</a>
                            <a href="#">Option 2</a>
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