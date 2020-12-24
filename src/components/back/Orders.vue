<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="250">Email</th>
          <th width="300">購買款項</th>
          <th>備註內容</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key"
          :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ item.create_at | date }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ item.message }}</td>
          <td class="text-left">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination="pagination" @changePage="getOrders"></Pagination>
  </div>
</template>

<script>

import Pagination from '../back/Pagination';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.orders = response.data.orders;
        this.pagination = response.data.pagination;
        this.isLoading = false;
      });
    },
  },
  computed: {
    sortOrder() {
      let newOrder = [];
      if (this.orders.length) {
        newOrder = this.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  },
};
</script>