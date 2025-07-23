import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapState('auth', ['isAuthenticated'])
    },
    
    async mounted() {
        await (this as any).checkAuth();
        // Check auth on route changes
        (this as any).$router.afterEach(async () => {
            await (this as any).checkAuth();
        });
    },
    
    methods: {
        ...mapActions('auth', ['checkAuth', 'logout']),
        
        async handleLogout() {
            const result = await (this as any).logout();
            if (result.success) {
                (this as any).$router.push('/login');
            }
        }
    }
});
