<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-1">
    <v-card-title class="text-wrap">{{
      `${props.consumable.name} (${props.consumable.number})`
    }}</v-card-title>
    <v-card-title class="text-wrap"
      >Тип: {{ props.consumable.type?.name }}
    </v-card-title>
    <v-row justify="end" class="pa-3">
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить ${props.consumable?.name}?`"
        @confirm="deleteConsumable"
      >
        <v-btn
          :to="{
            name: 'EditConsumable',
            params: { id: props.consumable?.id },
          }"
          class="mx-1 my-2 mx-lg-5"
          density="comfortable"
        >
          Изменить
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          density="comfortable"
          :loading="isDeleteLoading"
          class="mx-1 my-2 mx-lg-5"
          @click="isDeleteDialog = true"
        >
          Удалить
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </confitm-dialog>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from "vue";
import ConfitmDialog from "@/components/confirmDialog.vue";
import { useStore } from "vuex";
import Consumable from "@/types/busnes/Consumable";

const props = defineProps({
  consumable: { type: Object as PropType<Consumable>, required: true },
});

const store = useStore();

const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);

const deleteConsumable = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("consumables/delete", props.consumable?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${props.consumable?.name} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.consumable?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
