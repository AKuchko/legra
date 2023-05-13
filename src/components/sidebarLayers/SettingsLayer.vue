<script>
import { Icon } from "@iconify/vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import BaseCropper from "@/components/common/BaseCropper.vue";
import BaseFilepicker from "@/components/common/BaseFilepicker.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseProfileImage from "@/components/common/BaseProfileImage.vue";
import BaseBackBtn from "../common/BaseBackBtn.vue";
import MainLayer from "./MainLayer.vue";
import DropDownMenu from "../DropDownMenu.vue";

import { useStore } from "vuex";
import { ref, computed } from "vue";
import userService from "@/services/user.service";

export default {
  name: "SettingsLayer",
  components: {
    Icon,
    BaseFilepicker,
    BaseCropper,
    BaseButton,
    TransitionFade,
    BaseInput,
    BaseProfileImage,
    BaseBackBtn,
    DropDownMenu,
  },
  setup() {
    const store = useStore();
    const current_user = computed(() => store.getters.userInfo);
    const copy_user_name = ref(current_user.value.user_name);
    const copy_desc = ref(current_user.value.description);
    const profile_image = ref(null);
    const cropperVisible = ref(false);
    const changed = ref(false);
    let image_cropp = {};

    const updateUsername = (value) => {
      copy_user_name.value = value;
      changed.value = true;
    };
    const updateDesc = (value) => {
      copy_desc.value = value;
      changed.value = true;
    };
    const openCropper = () => (cropperVisible.value = true);
    const closeCropper = () => (cropperVisible.value = false);
    const onNewImage = ({ _files }) => {
      profile_image.value = _files[0];
      openCropper();
    };
    const onCroppImage = ({ cropperData }) => (image_cropp = cropperData);
    const submitNewImage = () => {
      userService
        .updateUser({
          profile_image: profile_image.value.file,
          crop_data: image_cropp,
        })
        .then((r) => {
          const new_img = r.data;
          console.log(new_img);
          store.commit("setUserImage", new_img);
          closeCropper();
        });
    };
    const submitChanges = () => {
      userService
        .updateUser({
          user_name: copy_user_name.value,
          description: copy_desc.value,
        })
        .then((r) => {
          const { user_name, profile_name, description } = r.data;
          store.commit("setUserBIO", { user_name, profile_name, description });
        });
      changed.value = false;
    };
    const back = () => {
      store.dispatch("toggleComponent", { component: MainLayer });
    };

    return {
      copy_user_name,
      copy_desc,
      current_user,
      profile_image,
      cropperVisible,
      changed,
      onNewImage,
      onCroppImage,
      submitNewImage,
      closeCropper,
      updateUsername,
      updateDesc,
      submitChanges,
      back,
    };
  },
};
</script>

<template>
  <div class="settings">
    <div class="settings__cropper">
      <transition-fade>
        <div
          v-if="cropperVisible"
          class="cropper__wrapper"
          @click="closeCropper"
        >
          <div class="cropper__window" @click.prevent.stop>
            <div class="cropper__bsae-cropper">
              <BaseCropper
                :image="profile_image"
                :ratio="1"
                :viewMode="1"
                @crop="onCroppImage"
              />
            </div>
            <BaseButton @click="submitNewImage">Submit</BaseButton>
          </div>
        </div>
      </transition-fade>
    </div>
    <div class="settings__wrapper">
      <div class="settings__header">
        <BaseBackBtn @click="back" />
        <div class="settings__header-content">
          <h3 class="settings__header-title">Settings</h3>
          <div class="settings__header-more">
            <DropDownMenu
              :menu="[
                { name: 'Log out', action: 'logout', icon: 'ion:exit-outline' },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="settings__body">
        <div class="settings__user-image">
          <BaseProfileImage
            :size="160"
            :imageData="current_user.profile_image"
            :user_name="current_user.user_name"
          />
          <BaseFilepicker class="edit-layer" @file-select="onNewImage">
            <Icon icon="material-symbols:edit-rounded" width="40" />
          </BaseFilepicker>
        </div>
        <div class="settings__user-info">
          <ul class="settings__info-items">
            <li class="settings__info-item">
              <BaseInput
                :modelValue="copy_user_name"
                label="Username"
                @update:modelValue="updateUsername"
              />
            </li>
            <li class="settings__info-item">
              <BaseInput
                :modelValue="copy_desc"
                label="Description"
                @update:modelValue="updateDesc"
              />
            </li>
          </ul>
        </div>
      </div>
      <TransitionFade>
        <button
          v-if="changed"
          class="settings__submit-button fly-button rounded-button"
          @click="submitChanges"
        >
          <Icon icon="material-symbols:check-small-rounded" width="56" />
        </button>
      </TransitionFade>
    </div>
  </div>
</template>

<style lang="scss">
.settings {
  width: 100%;
  min-width: 25rem;
  height: 100%;

  &__wrapper {
    position: relative;
    overflow-y: scroll;
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.8rem;
    height: 3.5rem;
    background: #dbdbdb;
  }

  &__header-content {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &__header-title {
    flex: 1;
    text-align: left;
    margin-left: 1.375rem;
    font-size: 1.25rem;
  }

  &__body {
    padding-top: 0.8rem;
    overflow-y: overlay;
    overflow-x: hidden;
    border-top: 1px solid $color-placeholder;
  }

  &__user-info {
    padding: 0 0.8rem;
  }

  &__user-image {
    position: relative;
    margin: auto;
    margin-bottom: 1rem;
    max-width: 10rem;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .edit-layer {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: $color-light-bg;
      background: rgba($color: #000000, $alpha: 0.1);
      opacity: 0;
      transition: $transition-base;
    }

    &:hover .edit-layer {
      opacity: 1;
    }
  }

  &__cropper {
    .cropper__wrapper {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100svh;
      background: rgba($color: #000000, $alpha: 0.3);
      z-index: 55;
    }

    .cropper__window {
      padding: 1rem;
      border-radius: 0.5rem;
      background: $color-light-bg;
    }

    .cropper__bsae-cropper {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 30rem;
      max-height: 30rem;
      overflow: hidden;
    }
  }

  &__info-item:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
