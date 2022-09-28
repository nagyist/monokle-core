import { ValidationRule } from "../../common/sarif";

export const LABELS_RULES: ValidationRule[] = [
  {
    id: "LBL001",
    name: "LABEL_MISSING",
    shortDescription: {
      text: "Cannot find any label.",
    },
    longDescription: {
      text: "The resource should use labels to easily identify it. Without labels it is difficult to determine source of deployment and ownership.",
    },
    help: {
      text: "Add any label to the Kubernetes resource.",
    },
  },
];