import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "directus-interface-external-image",
  name: "Inferface External Image",
  icon: "box",
  description: "Interface for external image (bypass CORS)",
  component: InterfaceComponent,
  options: null,
  types: ["string"],
});
