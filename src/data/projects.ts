export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  thumbnail: string;
  accent: string;
};

/**
 * Portfolio projects — includes your research/build work plus placeholders
 * you can swap or extend later.
 */
export const PROJECTS: Project[] = [
  {
    id: "braintumor-densenet",
    title: "Brain Tumor Classification (DenseNet-121)",
    short: "93.5% val accuracy · Grad-CAM · Explainable AI",
    description:
      "Transfer learning with DenseNet-121 for three-class brain tumor classification (meningioma, glioma, pituitary) on 3,064 contrast-enhanced T1-weighted MRI images with a stratified 80–20 split. Achieved 93.5% best validation accuracy with Adam (vs. RMSprop 90.7% and baseline CNNs 70–85%). Used focal loss, dropout (0.5), hyperparameter tuning, batch size and LR scheduling. Integrated Grad-CAM heatmaps for interpretability. Evaluated with precision, recall, F1, ROC-AUC, and confusion matrices.",
    technologies: [
      "Python",
      "Deep Learning",
      "Transfer Learning",
      "DenseNet-121",
      "Grad-CAM",
      "Explainable AI",
    ],
    liveUrl: "#",
    githubUrl: "#",
    thumbnail: "/project-thumbnails/brain-mri.svg",
    accent: "#22d3ee",
  },
  {
    id: "vlc-v2v",
    title: "ML-Assisted Vehicular VLC",
    short: "LED–photodiode prototype · adaptive thresholds · BER",
    description:
      "Ongoing research on an LED–photodiode based visible light communication prototype for vehicle-to-vehicle links. Models real-world impairments: ambient light, motion distortion, and alignment variability. Designing ML-based adaptive thresholding for reliable detection, temporal and intensity-domain features for noise-resilient classification, and hardware experiments measuring bit error rate with emphasis on robustness and real-time inference.",
    technologies: [
      "VLC",
      "Signal Processing",
      "Embedded",
      "ML",
      "Optical Communication",
    ],
    liveUrl: "#",
    githubUrl: "#",
    thumbnail: "/project-thumbnails/vlc.svg",
    accent: "#e879f9",
  },
  {
    id: "e-nose-perfume",
    title: "Intelligent Odor Sensing & ML Dispensing",
    short: "Electronic nose · PCA · Arduino actuation",
    description:
      "Multi-sensor electronic nose for VOC detection with PCA reducing dimensionality by 67.9% while retaining 99% variance. ML regression achieved MAE 0.04 mL for fragrance composition prediction. Built normalization/calibration for drift, Python ML pipeline integrated with Arduino volumetric dispensing — full sense → infer → actuate pipeline.",
    technologies: [
      "Python",
      "PCA",
      "Arduino",
      "Sensor Fusion",
      "Regression",
    ],
    liveUrl: "#",
    githubUrl: "#",
    thumbnail: "/project-thumbnails/e-nose.svg",
    accent: "#38bdf8",
  },
  {
    id: "placeholder-iot",
    title: "Edge Inference Dashboard (placeholder)",
    short: "Replace with your next flagship project",
    description:
      "Placeholder card: describe a web or edge project, link a demo and repo, and swap the thumbnail in public/project-thumbnails/.",
    technologies: ["React", "TypeScript", "Edge", "MQTT"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    thumbnail: "/project-thumbnails/placeholder-grid.svg",
    accent: "#a78bfa",
  },
  {
    id: "placeholder-robotics",
    title: "Robotics / Control Lab (placeholder)",
    short: "Optional fifth project slot",
    description:
      "Use this slot for robotics, control, or hardware competition work. Update URLs and thumbnail when ready.",
    technologies: ["C++", "ROS", "Control"],
    liveUrl: "#",
    githubUrl: "#",
    thumbnail: "/project-thumbnails/placeholder-hex.svg",
    accent: "#f472b6",
  },
];
