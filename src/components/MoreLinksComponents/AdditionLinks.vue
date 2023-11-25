<!-- eslint-disable max-len -->
<template>
  <section class="additions-links">
    <div class="container">
      <routerLink to="" class="addition-link">
        <div class="link-info">
          <img src="../../assets/imgs/credit-card.png" class="small-img" alt="">
          <span class="link-span">بطاقة الدفع</span>
        </div>
        <img src="../../assets/imgs/left.arr.png" class="small-img" alt="">
      </routerLink>

      <routerLink to="MyWishies.html" class="addition-link">
        <div class="link-info">
          <img src="../../assets/imgs/heart.png" class="small-img" alt="">
          <span class="link-span">مفضلتي</span>
        </div>
        <img src="../../assets/imgs/left.arr.png" class="small-img" alt="">
      </routerLink>

      <routerLink to="" class="addition-link">
        <div class="link-info">
          <img src="../../assets/imgs/agent.png" class="small-img" alt="">
          <span class="link-span">الوسطاء العقاريين</span>
        </div>
        <img src="../../assets/imgs/left.arr.png" class="small-img" alt="">
      </routerLink>

      <routerLink to="" class="addition-link">
        <div class="link-info">
          <img src="../../assets/imgs/customer-service.png" class="small-img" alt="">
          <span class="link-span"> تواصل معنا</span>
        </div>
        <img src="../../assets/imgs/left.arr.png" class="small-img" alt="">
      </routerLink>

      <routerLink to="" class="addition-link">
        <div class="link-info">
          <img src="../../assets/imgs/faq.png" class="small-img" alt="">
          <span class="link-span">الأسئلة الأكثر شيوعا</span>
        </div>
        <img src="../../assets/imgs/left.arr.png" class="small-img" alt="">
      </routerLink>

      <routerLink to="signup.html" class="addition-link">
        <div class="link-info">
          <img src="../../assets/imgs/shareing.png" class="small-img" alt="">
          <span class="link-span">شارك الموقع</span>
        </div>
        <img src="../../assets/imgs/left.arr.png" class="small-img" alt="">
      </routerLink>

      <button class="addition-link-logout" @click="logout">
        <div class="link-info">
          <img src="../../assets/imgs/logout.png" class="small-img" alt="">
          <span class="link-span">تسجيل الخروج</span>
        </div>
        <!-- <img src="../../assets/imgs/logout.png" class="small-img" alt=""> -->
      </button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddtionLinks',
  async created() {
    try {
      const accessToken = localStorage.getItem('access_token');
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('Access Token:', accessToken);
      console.log('User Data:', user);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
  methods: {
    async logout() {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        // Send the access token in the headers for the logout request
        await axios.post('https://mashrouk-apis.waselly-app.com/api/auth/logout', null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      // Remove the access token and user data from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');

      this.$router.push('/login');
    },
  },
};
</script>
