export type ProductAssetStatus = "pending" | "approved" | "blocked";

interface ProductAssetBase {
  id: "PROD-01" | "PROD-02" | "PROD-03";
  key: "direction" | "progress" | "evidence";
  title: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

interface ApprovedProductAsset extends ProductAssetBase {
  status: "approved";
  src: string;
}

interface UnavailableProductAsset extends ProductAssetBase {
  status: "pending" | "blocked";
  src: null;
}

export type ProductAsset = ApprovedProductAsset | UnavailableProductAsset;

export const productAssets: readonly ProductAsset[] = [
  {
    id: "PROD-01",
    key: "direction",
    title: "Your Direction",
    alt: "Pathwisse career direction view showing how a student explores or selects a role direction.",
    width: 1440,
    height: 1000,
    status: "blocked",
    src: null,
  },
  {
    id: "PROD-02",
    key: "progress",
    title: "Your Progress",
    alt: "Pathwisse development view showing the student's verified learning journey and next relevant step.",
    width: 1440,
    height: 1000,
    status: "blocked",
    src: null,
  },
  {
    id: "PROD-03",
    key: "evidence",
    title: "Your Evidence",
    alt: "Pathwisse evidence view showing verified applied work and the context attached to it.",
    width: 1440,
    height: 1000,
    status: "blocked",
    src: null,
  },
];
