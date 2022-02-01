<template>
  <div class="layout">
    <Sidebar ref="sidebar" />
    <router-view @delete="deleteCard($event)" @edit="editCard($event)" />
    <FormContainer
      :card="card"
      v-if="$store.state.overlay == true && $store.state.popUp == 1"
      class="modify"
    />
    <DeleteCheck
      :deleteId="deleteId"
      v-if="$store.state.overlay == true && $store.state.popUp == 2"
    />
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import FormContainer from "./FormContainer.vue";
import DeleteCheck from "./DeleteCheck.vue";

export default {
  components: { FormContainer, DeleteCheck, Sidebar },
  data() {
    return {
      deleteId: "",
      card: {},
    };
  },
  methods: {
    deleteCard(id) {
      this.deleteId = id;
    },
    editCard(card) {
      this.card = card;
    },
  },
};
</script>

<style lang="scss">
.layout {
  position: relative;
  margin-top: 30px;
  width: 100%;
  display: flex;
  padding-right: 60px;
  .showSidebar {
    transform: translateX(0);
  }

  .modify {
    width: 50%;
    position: fixed;
    top: 60vh;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 5;
  }
}

@media (max-width: 1400px) {
  .layout {
    padding: 0;
  }
}
</style>
