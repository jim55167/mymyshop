<template>
  <div class="checkout-wrap">
    <Loading :active.sync="isLoading"></Loading>
    <form @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="130px">ORDER NUM</th>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <th>EMAIL</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>ORDERER NAME</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>PHONE NUMBER</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>ADDRESS</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>MESSAGE</th>
            <td>{{ order.message }}</td>
          </tr>
          <tr>
            <th>PAYMENT STATUS</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button type="button" class="btn btn-danger">確認付款去</button>
      </div>
    </form>
    <!-- Modal -->
    <div
      class="modal fade"
      id="paymentCompeleted"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <img src="~@/assets/calendar/ok.png" alt="完成">
            <h4>AWESOME</h4>
            <p>YOUR PAYMENT COMPLETED</p>
            <button type="button" class="btn btn-primary" @click="goToProducts">
              COUNTINUE SHOPPING!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isLoading: false,
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.order = response.data.order
        this.isLoading = false
      })
    },
    payOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.isLoading = false
          this.getOrder()
          $('#paymentCompeleted').modal('show')
        }
        this.isLoading = false
      })
    },
    goToProducts () {
      $('#paymentCompeleted').modal('hide')
      this.$router.push('/frontProducts/all')
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
