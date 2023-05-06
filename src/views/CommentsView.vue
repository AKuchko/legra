<script>
/* eslint-disable */
import socket from "@/socket";
import messageService from "@/services/message.service";
import postService from "@/services/post.service";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ChatTemplate from "@/components/ChatTemplate.vue";

export default {
    name: "CommentsView",
    components: { ChatTemplate },
    async setup() {
        const route = useRoute();
        const store = useStore();
        const post_id = route.params.post_id;
        const user_id = store.getters.userInfo.user_id;
        const chat_id = ref(null);
        const messages = ref([]);
        const post = ref(null);
        const userRole = ref('customer');
        let commentsChat = null;

        const addMessage = (message) => (messages.value.push(message));
        const removeMessage = ({ message_id }) => (messages.value = messages.value.filter((message) => message.message_id != message_id));
        const editMessage = ({ message_id, fields_to_edit}) => {
            const msg_to_edit = messages.value.find((msg) => msg.message_id === message_id);
            for (let field in fields_to_edit) {
                msg_to_edit[field] = fields_to_edit[field];
            }
        };
        const deleteMsgEvent = (e) => {
            const { target } = e.detail 
            messageService.deleteMessage({ chat_id: target.chat_id, message_id: target.message_id });
        }

        onMounted(async () => {
            // post.value = await postService.getPost({ post_id }).then((r) => r.data);
            // const commentsChat = await postService.getComments({ post_id }).then((r) => r.data);
            window.addEventListener("delete-message", deleteMsgEvent);
            socket.on(`message:add:${chat_id.value}`, addMessage);
            socket.on(`message:delete:${chat_id.value}`, removeMessage); 
            socket.on(`message:edit:${chat_id.value}`, editMessage);
            socket.on(`post:like:${post.value.user_id}`, ({ action, user }) => {
                if (action === "unlike") {
                post.value.likes = post.value.likes.filter(
                    (like) => like.user_id !== user.user_id
                );
                } else post.value.likes.push(user);
            });
        });
        onUnmounted(() => {
            window.removeEventListener("delete-message", deleteMsgEvent);
            socket.off(`message:add:${chat_id.value}`);
            socket.off(`message:delete:${chat_id.value}`); 
            socket.off(`message:edit:${chat_id.value}`); 
        });

        post.value = await postService.getPost({ post_id }).then((r) => r.data);
        commentsChat = await postService.getComments({ post_id }).then((r) => r.data);
        userRole.value = post.value.user_id === user_id ? "admin" : "customer";
        messages.value = commentsChat.comments;
        chat_id.value = commentsChat.chat_id;
        
        return {
            post,
            messages,
            chat_id,
            userRole,
        }
    },
}
</script>

<template>
    <chat-template :messages="messages" :user-role="userRole" :comments-post="post" :chat_id="chat_id" />
</template>