<template>
  <v-card color="primary" variant="flat" class="ma-0 pa-0" width="100vw">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab value="machines"> Машины </v-tab>
      <v-tab value="defect"> Дефекты </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="machines">
        <v-card flat>
          <v-data-table :items="machines" :headers="machinesHeaders">
            <template v-slot:[`item.isActive`]="{ item }">
              <span>{{ item.raw.isActive ? "Да" : "Нет" }}</span>
            </template>
            <template v-slot:[`item.createdAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
            <template v-slot:[`item.updatedAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
      <v-window-item value="defect">
        <v-card flat>
          <v-data-table :items="defects" :headers="defectsHeaders">
            <template v-slot:[`item.isResolved`]="{ item }">
              <span>{{ item.raw.isResolved ? "Да" : "Нет" }}</span>
            </template>
            <template v-slot:[`item.createdAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
            <template v-slot:[`item.updatedAt`]="{ value }">
              <span>{{ moment(value).format("DD-MM-YY") }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import moment from "moment";
import Departament from "@/types/Departament";
import api from "@/api";
import { useStore } from "vuex";
import defects from "@/store/modules/defects";

const tab = ref(0);
const departament = ref<Departament>();
const store = useStore();

const defectsHeaders: any = [
  { title: "Имя", value: "name" },
  { title: "Описание", value: "description" },
  { title: "Решена", value: "isResolved", key: "isResolved" },
  { title: "Создана", value: "createdAt", key: "createdAt" },
  { title: "Обновлена", value: "updateAt", key: "updateAt" },
  {
    title: "",
    value: "actions",
    key: "actions",
    width: "150px",
  },
];
const machinesHeaders: any = [
  { title: "Имя", value: "name" },
  { title: "Описание", value: "description" },
  { value: "isActive", title: "Активна", key: "isActive" },
  { value: "createdAt", title: "Создана", key: "createdAt" },
  { value: "updateAt", title: "Последнее обновление", key: "updatedAt" },
];

const user = computed(() => store.getters["auth/user"]);

onMounted(async () => {
  departament.value = (
    await api.departaments.getById(user.value.departament.id)
  ).data;
});

const machines = computed(() => departament.value?.machines);
</script>

<style scoped></style>
