<script>
import ChatList from "@/components/ChatList.vue";
import BaseSearch from "@/components/common/BaseSearch.vue";
import chatService from "@/services/chat.service";
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "MessangerView",
  components: { ChatList, BaseSearch },
  async setup() {
    const store = useStore();
    const chats = ref([]);
    const filteredChats = ref([]);
    const user_id = store.getters.userInfo.user_id;

    const onSearch = ({ value }) => {
      if (!value) return (filteredChats.value = chats.value);
      filteredChats.value = chats.value.filter(
        (chat) => chat.chat_name.indexOf(value) > -1
      );
    };
    const deleteChat = (e) => {
      const chat_id = e.detail.target.chat_id;
      chatService.deleteUserChat({ chat_id });
    };

    onMounted(() => {
      window.addEventListener("chat-delete", deleteChat);
      filteredChats.value = chats.value;
    });
    onUnmounted(() => {
      window.removeEventListener("chat-delete", deleteChat);
    });

    chats.value = await chatService
      .getUserChats({ user_id })
      .then((r) => r.data);

    return {
      filteredChats,
      onSearch,
    };
  },
};
</script>

<template>
  <div class="messanger">
    <div class="messanger__head">
      <base-search @on-search="onSearch" />
    </div>
    <div class="messanger__body">
      <chat-list :chats="filteredChats" />
    </div>
  </div>
</template>

<style lang="scss">
.messanger {
  width: 100%;
  height: 100%;

  &__head {
    max-width: 45.5rem;
    margin: auto;
  }

  &__body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
  }
}
</style>
