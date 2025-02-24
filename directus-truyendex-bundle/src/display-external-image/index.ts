import { defineDisplay } from "@directus/extensions-sdk";
import DisplayComponent from "./display.vue";

export default defineDisplay({
  id: "display-external-image",
  name: "Display image from external URL",
  icon: "box",
  description: "Display an image from an external URL (bypass CORS)",
  component: DisplayComponent,
  options: null,
  types: ["string"],
});
