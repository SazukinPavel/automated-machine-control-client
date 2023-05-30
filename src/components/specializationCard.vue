<template>
  <v-card color="primary" variant="outlined" class="ma-5 pa-1">
    <v-card-title class="text-wrap">{{
      props.specialization?.name
    }}</v-card-title>
    <v-expansion-panels>
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Разряды:
        </v-expansion-panel-title>
        <v-expansion-panel-text class="pa-0 text-wrap">
          <v-list
            density="comfortable"
            v-if="props.specialization?.types"
            item-title="name"
          >
            <v-list-item-title
              v-for="specialization in props.specialization.types"
              class="text-wrap ml-2"
              :key="specialization.id"
              >{{ specialization.name }}
            </v-list-item-title>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row justify="end" class="pa-3">
      <confitm-dialog
        v-model="isDeleteDialog"
        :message="`Вы точно хотите удалить ${props.specialization?.name}?`"
        @confirm="deleteSpecialization"
      >
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
      <v-btn
        density="comfortable"
        class="mx-1 my-2 mx-lg-5"
        :disabled="isDeleteLoading"
        :to="{
          name: 'EditSpecialization',
          params: { id: props.specialization?.id },
        }"
      >
        Изменить
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps } from "vue";
import ConfitmDialog from "@/components/confitmDialog.vue";
import { useStore } from "vuex";
import Specialization from "@/types/busnes/Specialization";

const props = defineProps({
  specialization: { type: Object as PropType<Specialization> },
});

const store = useStore();

const isDeleteDialog = ref(false);
const isDeleteLoading = ref(false);

const deleteSpecialization = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("specializations/delete", props.specialization?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${props.specialization?.name} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.specialization?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
