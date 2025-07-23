import Vue from 'vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapState('order', ['loading', 'error']),
        ...mapGetters('order', ['currentOrder']),
        
        orderId() {
            return (this as any).$route.params.id;
        },
        
        order() {
            return (this as any).currentOrder;
        }
    },
    
    async mounted() {
        await (this as any).fetchOrder((this as any).orderId);
    },
    
    methods: {
        ...mapActions('order', ['fetchOrder', 'saveOrder']),
        
        async handleSave() {
            const result = await (this as any).saveOrder();
            if (result.success) {
                alert(`Order #${(this as any).orderId} saved successfully!`);
            }
        },
        
        cancelEdit() {
            (this as any).$router.push('/');
        }
    }
});