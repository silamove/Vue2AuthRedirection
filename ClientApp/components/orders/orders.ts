import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
    computed: {
        ...mapState('order', {
            orders: (state: any) => state.orders,
            isLoading: (state: any) => state.isLoading,
            error: (state: any) => state.error
        })
    },
    methods: {
        ...mapActions('order', [
            'fetchOrders',
            'deleteOrder'
        ])
    }
})
export default class OrdersComponent extends Vue {
    // Type assertion for mapped actions
    fetchOrders!: () => Promise<void>;
    deleteOrder!: (orderId: number) => Promise<void>;

    mounted() {
        this.fetchOrders();
    }

    editOrder(orderId: number) {
        this.$router.push({ name: 'order-edit', params: { id: orderId.toString() } });
    }

    async removeOrder(orderId: number) {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                await this.deleteOrder(orderId);
            } catch (error) {
                console.error('Error deleting order:', error);
                // Optionally, show an error message to the user
            }
        }
    }
}
