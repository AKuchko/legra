<script>
import { Icon } from "@iconify/vue";
import TransitionFade from "@/components/transitions/TransitionFade.vue";
import BaseCropper from "@/components/common/BaseCropper.vue";
import BaseFilepicker from "@/components/common/BaseFilepicker.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseInput from "@/components/common/BaseInput.vue";

import { useStore } from "vuex";
import { ref } from "vue";
import userService from "@/services/user.service";

export default {
  name: "SettingsView",
  components: {
    Icon,
    BaseFilepicker,
    BaseCropper,
    BaseButton,
    TransitionFade,
    BaseInput,
  },
  setup() {
    const store = useStore();
    const user = store.getters.userInfo;
    const profile_image = ref(null);
    const cropperVisible = ref(false);
    const changed = ref(false);
    let image_cropp = {};

    const updateUsername = (value) => {
      user.user_name = value;
      changed.value = true;
    };
    const updateDesc = (value) => {
      user.description = value;
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
          const new_img = r.data.profile_image;
          store.commit("setUserImage", { profile_image: new_img });
          user.profile_image.push(new_img);
          closeCropper();
        });
    };
    const submitChanges = () => {
      userService
        .updateUser({
          user_name: user.user_name,
          description: user.description,
        })
        .then((r) => {
          const { user_name, profile_name, description } = r.data;
          store.commit("setUserBIO", { user_name, profile_name, description });
        });
      changed.value = false;
    };

    return {
      user,
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
        <div class="settings__account">
          <div class="settings__user-image">
            <img :src="user.profile_image.at(-1).data" />
            <BaseFilepicker class="edit-layer" @file-select="onNewImage">
              <Icon icon="material-symbols:edit-rounded" width="40" />
            </BaseFilepicker>
          </div>
          <div class="settings__user-info">
            <ul class="settings__info-items">
              <li class="settings__info-item">
                <BaseInput
                  :modelValue="user.user_name"
                  label="username"
                  @update:modelValue="updateUsername"
                />
              </li>
              <li class="settings__info-item">
                <BaseInput
                  :modelValue="user.description"
                  label="username"
                  @update:modelValue="updateDesc"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="settings__body"></div>
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

  &__wrapper {
    position: relative;
    max-width: 45rem;
    height: 100%;
    margin: auto;
  }

  &__account {
    display: flex;
    align-items: center;
  }

  &__user-info {
    flex-grow: 1;
    margin-left: 1rem;
  }

  &__user-image {
    position: relative;
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
