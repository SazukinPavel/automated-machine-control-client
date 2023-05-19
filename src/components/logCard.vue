<template>
  <v-card color="primary" variant="outlined" class="ma-3 pa-1">
    <div class="d-flex justify-end">
      <v-chip :color="logColor"
        >{{ formatDateTime(props.log.creationDate) }}
      </v-chip>
    </div>
    <v-card-title
      class="ma-0 pa-0 text-wrap text-subtitle-1 text-lg-h6 text-md-h6 text-sm-h6"
    >
      {{ props.log.action }}
    </v-card-title>
    <v-card-title
      class="ma-0 pa-0 text-wrap text-subtitle-1 text-lg-h6 text-md-h6 text-sm-h6"
    >
      Пользователь: {{ props.log.user || "Не авторизован" }}
    </v-card-title>
    <v-expansion-panels v-if="body">
      <v-expansion-panel color="primary">
        <v-expansion-panel-title color="primary"
          >Описание:
        </v-expansion-panel-title>
        <v-expansion-panel-text class="text-wrap pa-1">
          <v-card-title
            class="ma-0 pa-0 text-wrap text-subtitle-1 text-lg-h6 text-md-h6 text-sm-h6"
          >
            Тело запроса:
          </v-card-title>

          <v-textarea :model-value="props.log?.body" readonly></v-textarea>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, defineProps, computed } from "vue";
import Log from "@/types/busnes/Log";
import getLogColorByLevel from "@/utils/getLogColorByLevel";
import useDateFormater from "@/hooks/useDateFormater";

const props = defineProps({
  log: { type: Object as PropType<Log>, required: true },
});

const { formatDateTime } = useDateFormater();

const logColor = computed(() => getLogColorByLevel(props.log?.level));
const body = computed(() => {
  try {
    const action = JSON.parse(props.log?.body);
    return Object.keys(action).length ? action : undefined;
  } catch {
    return undefined;
  }
});
</script>

<style scoped></style>
