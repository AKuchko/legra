<script>
import ChatList from "@/components/ChatList.vue";
import chatService from "@/services/chat.service";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "MessangerView",
  components: { ChatList },
  async setup() {
    const store = useStore();
    const chats = ref([]);
    const user_id = store.getters.userInfo.user_id;

    chats.value = await chatService
      .getUserChats({ user_id })
      .then((r) => r.data);

    return {
      chats,
    };
  },
};
</script>

<template>
  <div class="messanger">
    <div class="messanger__head"></div>
    <div class="messanger__body">
      <chat-list :chats="chats" />
    </div>
    <div class="messanger__bottom"></div>
  </div>
</template>

<style lang="scss">
.messanger {
  width: 100%;
  height: 100%;
}
</style>
