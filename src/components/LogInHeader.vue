<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<!-- eslint-disable max-len -->
<template>
  <section class="main-top-header">
    <div class="container">
      <nav class="navbar">
        <div class="iconsy">
          <div class="left-nav">
            <div class="logo-catch">
              <img src="@/assets/imgs/logo.png" alt="logo" class="icon-size" />
            </div>
          </div>
        </div>
        <ul class="nav-list" style="display: flex;">
          <div class="profile-handel">
            <span class="header-name">مرحبا {{name}}</span>
            <router-link to="/Profile">
              <img src="@/assets/imgs/AccountCircleFilled.svg" alt="profile" class="logo" />
          </router-link>
          </div>
          <a href="notifications.html">
            <img src="@/assets/imgs/notifications.svg" alt="notifications" class="main-header-profile-photo" />
          </a>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>

export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: 'LogInHeader',
  data() {
    return {
      name: '',
    };
  },
  mounted() {
    const usr = localStorage.getItem('user');
    const { email } = JSON.parse(usr);
    console.log(`${email}`);
    if (!usr) {
      this.$router.push({ name: 'Login' });
      return;
    }
    this.name = JSON.parse(usr).name;
  },
};
</script>
