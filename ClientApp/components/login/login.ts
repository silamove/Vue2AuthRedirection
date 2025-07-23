import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapState('auth', ['loading', 'error'])
    },
    
    data() {
        return {
            username: '',
            password: ''
        };
    },
    
    methods: {
        ...mapActions('auth', ['login']),
        
        async handleLogin() {
            const result = await (this as any).login({
                username: (this as any).username,
                password: (this as any).password
            });
            
            if (result.success) {
                // Redirect to intended page or home
                const redirect = (this as any).$route.query.redirect;
                (this as any).$router.push(redirect || '/');
            }
        }
    }
});
