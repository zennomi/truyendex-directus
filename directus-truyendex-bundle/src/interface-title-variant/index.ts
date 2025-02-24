import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "interface-title-variant",
  name: "Interface Title Variant",
  icon: "box",
  description: "Interface for title variant",
  component: InterfaceComponent,
  options: null,
  types: ["alias"],
  localTypes: ["presentation"],
  group: "presentation",
  hideLabel: true,
  hideLoader: true,
});
