import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class LoginComponent extends Vue {
    constructor() {
        super();
        this.username = '';
        this.password = '';
        this.loading = false;
        this.error = '';
    }

    login() {
        this.loading = true;
        this.error = '';
        
        fetch('/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password
            })
        })
        .then(response => {
            if (response.ok) {
                // Update auth state
                this.$auth.setAuthenticated(true);
                
                // Redirect to intended page or home
                const redirect = this.$route.query.redirect;
                this.$router.push(redirect || '/');
            } else {
                this.error = 'Invalid username or password';
            }
            this.loading = false;
        })
        .catch(error => {
            this.error = 'Login failed. Please try again.';
            this.loading = false;
        });
    }
}
