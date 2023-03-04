<template>
  <v-card color="primary" variant="flat" class="ma-0 pa-0" width="100vw">
    <v-tabs v-model="tab" align-tabs="title">
      <v-tab value="machines"> Машины </v-tab>
      <v-tab value="defect"> Дефекты </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="machines">
        <v-card flat>
          <v-text-field v-model="searchParam" label="Найти" />
          <v-expansion-panels class="mt-10" variant="accordion">
            <v-expansion-panel
              v-for="machine in filtredMachines"
              :key="machine.id"
            >
              <v-expansion-panel-title>
                <v-row>
                  <v-col cols="11">
                    <span>{{ machine.name }}</span>
                  </v-col>
                  <v-col cols="1">
                    <v-chip :color="machine.isActive ? 'green' : 'red'">{{
                      machine.isActive ? "ON" : "OFF"
                    }}</v-chip>
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card flat>
                  <v-card-title class="text-h5 text-center"
                    >Описание</v-card-title
                  >
                  <v-card-text class="text-h6 mb-5">{{
                    machine.description
                  }}</v-card-text>
                  <v-divider class="border-opacity-100" color="primary" />
                  <div class="d-flex jsutify-start my-7">
                    <v-btn @click="refreshDefects" class="mx-5" color="primary"
                      >Обновить</v-btn
                    >
                  </div>
                  <v-data-table
                    :loading="isDefectLoading"
                    :items="defects"
                    :headers="defectsHeaders"
                    class="elevation-1 table"
                  >
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
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import Machine from "@/types/Machine";
const store = useStore();
const tab = ref(0);
onMounted(() => {
  store.dispatch("machines/fetch");
  store.dispatch("defects/fetch");
});

const machines = computed<Machine[]>(() => store.getters["machines/machines"]);
// const isMachineLoading = computed(() => store.getters["machines/isLoading"]);
const filtredMachines = computed(() => {
  return machines.value.filter((m) => {
    return m.id.startsWith(sear);
  });
});

const defectsHeaders: any = [
  { title: "Имя", value: "name", class: "table-header" },
  { title: "Описание", value: "description", class: "table-header" },
  {
    title: "Решена",
    value: "isResolved",
    key: "isResolved",
    class: "table-header",
  },
  {
    title: "Создана",
    value: "createdAt",
    key: "createdAt",
    class: "table-header",
  },
  {
    title: "Обновлена",
    value: "updateAt",
    key: "updateAt",
    class: "table-header",
  },
];
const refreshDefects = () => {
  store.dispatch("defects/refresh");
};

const defects = computed(() => store.getters["defects/defects"]);
const isDefectLoading = computed(() => store.getters["defects/isLoading"]);
</script>
