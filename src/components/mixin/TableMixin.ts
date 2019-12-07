import { Vue, Component } from "vue-property-decorator";
import { OrderConfigParams } from "@interface/config.interface";

@Component
export default class TableMixin extends Vue {
  TABLE_ROW_EXPAND_COLOR = "#FFF8E4";
  TABLE_ROW_SELECTED_COLOR = "#8AF3BA";

  HEADER_CELL_STYLE = {
    "background-color": "#FAFAFA",
    color: "#303133",
    height: "52px",
    "font-size": "14px",
    "border-top": "1px solid #E2E8EF"
  };
}
