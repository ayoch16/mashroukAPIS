<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div>
    <RequestBack />
    <FilterSearch />

    <section class="requists">
      <div class="container">
        <div v-for="(partner, index) in partners" :key="index" class="min-req-box ">
          <div class="min-req-title-imge-delete">
            <div class="min-req-title-imge">
                <div class="min-req-imge">
                    <img src="../../assets/imgs/condominium.png">
                </div>
                <div class="info-header">
                    <h2 class="info-head min-req-info-head">عمارة</h2>
                </div>
            </div>
            <div class="delete-sec" @click="deletePartner(partner.id)">
              <div class="min-req-imge-delete">
                <img src="../../assets/imgs/DeleteFilled.svg" class="icone-resize">
              </div>
              <div>حذف</div>
            </div>
        </div>
          <div class="ad-details">
            <div class="filed-data">
              <img src="../../assets/imgs/to-do-list.png" class="icone-resize">
              <h2 class="data-lable"> &nbsp;رقم الطلب &nbsp;:&nbsp;</h2>
              <h3 class="data-value">{{ partner.id }}</h3>
              <p class="Request-num min-Request-num">{{ translatePurpose(partner.purpose) }}</p>
            </div>
            <div class="filed-data">
              <img src="../../assets/imgs/calendar.png" class="icone-resize">
              <h2 class="data-lable"> &nbsp; تاريخ النشر &nbsp;:&nbsp;</h2>
              <h3 class="data-value">{{ convertTimestampToFormalDateTime(partner.created_at) }}</h3>

            </div>
            <div class="filed-data">
              <img src="../../assets/imgs/location.png" class="icone-resize">
              <h2 class="data-lable"> &nbsp; المدينة &nbsp;:&nbsp;</h2>
              <h3 class="data-value">{{ getCityName(partner) }}</h3>
          </div>
            <div class="filed-data">
              <img src="../../assets/imgs/location.png" class="icone-resize">
              <h2 class="data-lable"> &nbsp; الحي &nbsp;:&nbsp;</h2>
              <h3 class="data-value">{{ getNeighborhoodName(partner) }}</h3>
            </div>
            <div class="filed-data">
              <img src="../../assets/imgs/house.png" class="icone-resize">
              <h2 class="data-lable"> &nbsp; النوع &nbsp;:&nbsp;</h2>
              <h3 class="data-value">{{ getPropertyTypeName(partner.property_type) }}</h3>
            </div>
            <div class="filed-data">
              <img src="../../assets/imgs/money.png" class="icone-resize">
              <h2 class="data-lable"> &nbsp; مبلغ كل شريك &nbsp;:&nbsp;</h2>
              <h3 class="data-value">{{ partner.capital }} ريال</h3>
              <div class="talk">&nbsp; قابل للتفاوض&nbsp;</div>
            </div>
          </div>
          <div class="filed-flex">
            <img src="../../assets/imgs/team.png" class="icone-resize marg-l-5">
            <h2 class="data-lable">عدد الشركاء الحاليين</h2>
            <div class="talk">{{ partner.partners_count }}/3</div>
          </div>
          <div class="client-num min-req-client-num">
            <div class="client-box">
              <img src="../../assets/imgs/AvatarPurbile.svg" class="client-image">
              <img src="../../assets/imgs/Avatar.svg" class="client-image">
            </div>
          </div>
          <section class="actions">
            <a :href="'FullReq.html?id=' + partner.id" class="details-link">التفاصيل</a>
            <div class="another-acrions">
              <button @click="updatePartner(partner.id)" class="mashrouk-btn">تحديث</button>
              <button @click="stopPartner(partner.id)" class="mashrouk-btn m-r-20" style="background-color: red;">ايقاف</button>
            </div>
          </section>
        </div>
      </div>
    </section>

    <bottom-nav />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
import FilterSearch from '@/components/MainComponents/FilterSearch.vue';
import RequestBack from '@/components/FormComponents/RequestBack.vue';
import { BASE_URL } from '@/api-config';
import axios from 'axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Requests',

  data() {
    return {
      access_token: '',
      user_id: '',
      partners: [],
      partnerDetails: [],
      apartments_number: '1', // API apartments_number

      capital: 100000,
      cities: [],
      city_id: '',
      cond: true,

      description: '',
      directions: [],
      domain_id: '',
      domains: [],

      Empaty: '', //  API neighborhood_name

      filePreviewStyles: Array(5).fill({}),

      have_property: '',

      images: [],

      needs_money: 'false',
      negotiable: 'false',
      Neighborhood_id: '',
      Neighborhood_ids: [],

      other_contribution: '',
      office_number: '1', //  API office_number

      partnerNeighborhoods: [],
      partners_count: '2',
      partner_type: '',
      plan_number: '',
      project_status: '',
      property_age: '0',
      property_area: '',
      property_floors: '1',
      property_number: '',
      property_type: '',
      property_type_help: '',
      PropertyTypes: [],
      purpose: '',

      shop_number: '1', //  API shop_number
      street_width: '',

      title: '',
      true: true,

      units_number: '', //  API units_number
      user_contribution: '',
      uploadBoxes: [0, 1, 2, 3, 4],
      user: {},
    };
  },

  mounted() {
    const user = localStorage.getItem('user');
    this.access_token = localStorage.getItem('access_token');
    this.user_id = JSON.parse(user).id;
    this.fetchPartners();
  },

  methods: {
    async deletePartner(partnerId) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.access_token}`,
        };

        // Make a DELETE request to delete the partner
        const response = await axios.delete(`${BASE_URL}partners/${partnerId}`, { headers });

        if (response.status === 200) {
        // Remove the deleted partner from the local list
          this.partners = this.partners.filter((partner) => partner.id !== partnerId);
          // Optionally, you can display a success message or perform other actions
          console.log('Partner deleted successfully.');
        }
      } catch (error) {
        console.error('Error deleting partner:', error);
      // Handle error: display an error message or perform other actions
      }
    },
    getPropertyTypeName(propertyTypeId) {
      const propertyType = this.PropertyTypes.find((type) => type.id === propertyTypeId);
      return propertyType ? propertyType.name_ar : 'N/A';
    },
    convertTimestampToFormalDateTime(timestamp) {
      const dateObj = new Date(timestamp);

      const optionsDate = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      };
      const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
      return `${formattedDate}`;
    },
    getCityName(partner) {
      return partner.city ? partner.city.name_ar : 'N/A';
    },
    getNeighborhoodName(partner) {
      const neighborhood = partner.partnerNeighborhoods && partner.partnerNeighborhoods.length > 0
        ? partner.partnerNeighborhoods[0].neighborhood
        : null;

      return neighborhood ? neighborhood.name_ar : 'N/A';
    },
    translatePurpose(englishPurpose) {
      const translations = {
        Invest: 'استثمار',
        own: 'تملك', // Add translation for 'Own'
        // Add more translations as needed
      };

      return translations[englishPurpose] || englishPurpose;
    },
    fetchPartners() {
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.access_token}`,
      };
      axios.get(`${BASE_URL}partners/getPartnersByUserId/${this.user_id}`, { headers })
        .then((response) => {
          this.partners = response.data.data;
          this.partnerDetails = this.partners.map((partner) => ({ id: partner.id, details: null }));
        })
        .catch((error) => {
          console.error('Error fetching partners:', error);
        });
    },

    fetchPartnerDetails(partnerId) {
      const cachedDetails = this.getCachedDetails(partnerId);

      if (cachedDetails) {
        return Promise.resolve(cachedDetails);
      }

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.access_token}`,
      };

      return axios.get(`${BASE_URL}partners/${partnerId}`, { headers })
        .then((response) => {
          const partnerIndex = this.partnerDetails.findIndex((p) => p.id === partnerId);
          if (partnerIndex !== -1) {
            this.$set(this.partnerDetails, partnerIndex, { id: partnerId, details: response.data });
            this.cacheDetails(partnerId, response.data);
          }

          return response.data;
        })
        .catch((error) => {
          console.error(`Error fetching details for partner ID ${partnerId}:`, error);
          return null;
        });
    },

    getCachedDetails(partnerId) {
      const cachedDetails = localStorage.getItem(`partnerDetails_${partnerId}`);
      return cachedDetails ? JSON.parse(cachedDetails) : null;
    },

    cacheDetails(partnerId, details) {
      localStorage.setItem(`partnerDetails_${partnerId}`, JSON.stringify(details));
    },

    updatePartner(partnerId) {
      // Handle partner update logic
      console.log('Update partner:', partnerId);
    },

    stopPartner(partnerId) {
      // Handle partner stop logic
      console.log('Stop partner:', partnerId);
    },

    getPartnerDetails(partnerId) {
      const partnerDetails = this.partnerDetails.find((p) => p.id === partnerId);
      if (partnerDetails && partnerDetails.details) {
        return partnerDetails.details;
      } if (partnerDetails) {
        // Fetch details if not already available
        this.fetchPartnerDetails(partnerId);
        return 'Fetching details...';
      }
      return null;
    },
  },

  components: {
    BottomNav,
    FilterSearch,
    RequestBack,
  },
};
</script>
