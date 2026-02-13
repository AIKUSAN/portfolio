export type ProjectCategory = 'Infrastructure' | 'Security' | 'Automation';

export interface ProjectMetric {
    label: string;
    value: string; // Display string (e.g. "99.9%")
    target: number; // Numeric target for animation (e.g. 99.9)
    suffix: string; // %, ms, k+, etc.
}

export interface ProjectColors {
    primary: string; // Tailwind class for text/border (e.g. text-blue-400)
    glow: string; // Hex for shadow generation
    gradient: string; // Tailwind gradient classes
}

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    tech: string[];
    description: string;
    gridSpan: string;
    image: string;
    imageAlt: string;
    details: {
        architecture: string;
        highlights: string[];
    };
    metrics: ProjectMetric[];
    colors: ProjectColors;
    links: {
        github?: string;
        demo?: string;
    };
    lastUpdated: string; // ISO date string for sorting
}
