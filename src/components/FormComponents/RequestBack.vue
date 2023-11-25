<!-- eslint-disable max-len -->
<template>
  <section class="back-head  m-t-20 share-types">
    <div class="container">
        <div class="back-flex">
            <div>
              <router-link to="/main"><img class="icone-resize" src="../../assets/imgs/right-arrow.png" alt=""></router-link>
            </div>
            <div class="m-r-20">
                <h3>شراكاتي</h3>
            </div>
        </div>
        <div class="share-type">
            <a href="myrequests.html" class="mashrouk-btn main-req-button">
                <h4>طلباتي</h4>
            </a>
            <a href="myoffers.html" class="mashrouk-btn main-req-button m-r-20 not-active">
                <h4 class="not-active">عروضي</h4>
            </a>
        </div>
    </div>
</section>
</template>

<script>
export default {
  name: 'RequestBack',

};
</script>
