<!-- eslint-disable max-len -->
<!-- eslint-disable linebreak-style -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <section class="sign-body">
    <div class="container">
      <form class="form-bod" @submit.prevent="handleSubmit">
        <h2 class="header-title c-h">تسجيل الدخول</h2>
        <div class="cell">
          <label for="email">البريد الإلكتروني</label>
          <input type="text" v-model="email"  name="email" class="cell-entery" placeholder="البريد الإلكتروني" required>
        </div>
        <div class="cell">
          <label for="password">كلمة المرور</label>
          <input type="password" v-model="password" name="password" class="cell-entery"
            placeholder="كلمة المرور" required>
        </div>
        <button class="mashrouk-btn">تسجيل الدخول</button>
        <!-- <input type="submit" value="تسجيل الدخول" required class="mashrouk-btn" /> -->
        <div class="cell-actions">
          <div class="forgit">
            <a href="pass-reset.html" class="fo">نسيت كلمة المرور</a>
          </div>
        </div>
        <div class="Reg-cell">
          <router-link to="/signup" class="c-s">أنشئ حساب جديد</router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';

export default {
  name: 'LogIn',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      const toaster = createToaster();

      try {
        const response = await axios.post('auth/login', {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          console.log('Access Token:', response.data.access_token);
          console.log('User:', response.data.user);
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('userr', response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          toaster.success('تم تسجيل الدخول بنجاح', { position: 'top-left' });
          // Push to the main page
          this.$router.push('/main');
        } else {
          console.error('An error occurred:', response);
          toaster.error('An error occurred. Please try again.', {
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toaster.error('An error occurred. Please try again.', {
          position: 'top-right',
        });
      }
    },
  },
};
</script>
