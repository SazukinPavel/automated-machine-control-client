import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { VDataTable } from "vuetify/labs/VDataTable";

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    primary: "#5d08a6",
    "primary-darken-1": "#310159",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  defaults: {
    VDataTable: {
      noDataText: "Данных нет",
    },
    VBtn: {
      color: "primary",
    },
    VExpansionPanels: {
      color: "primary",
    },
    VExpansionPanel: {
      color: "primary",
    },
    VTextField: {
      color: "primary",
      variant: "outlined",
    },
    VSelect: {
      color: "primary",
      variant: "outlined",
      hideNoData: true,
      noDataText: "",
    },
    VListItem: {
      color: "primary",
      activeColor: "primary",
    },
    VList: {
      color: "primary",
      activeColor: "primary",
    },
    VAutocomplete: {
      color: "primary",
      variant: "outlined",
      hideNoData: true,
      noDataText: "",
    },
  },
  directives,
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});

export default vuetify;
