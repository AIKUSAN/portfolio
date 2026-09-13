export type RoleFocus = 'support' | 'systems' | 'platform';

export type ProjectProvenance =
  | 'client-employment'
  | 'independent-business'
  | 'sanitized-architecture'
  | 'portfolio-lab';

export type ProjectEvidence = {
  label: string;
  kind: 'source' | 'tests' | 'configuration' | 'topology' | 'sql';
  caption: string;
  sourceUrl: string;
  excerpt?: { language: string; text: string };
  illustration?: 'regional-network';
};

export type ProjectRecord = {
  id: string;
  title: string;
  focus: RoleFocus[];
  provenance: ProjectProvenance;
  provenanceLabel: string;
  summary: string;
  situation: string;
  intervention: string[];
  verifiedResult: string;
  outcome: string;
  outcomeLabel: string;
  technologies: string[];
  collaborators: string;
  contribution?: string;
  decisionNotes?: string[];
  scopeNote?: string;
  evidence?: ProjectEvidence[];
  sourceUrl?: string;
  sourceLabel?: string;
  featured: boolean;
};

export type ExperienceRecord = {
  organization: string;
  role: string;
  period: string;
  provenance: ProjectProvenance;
  bullets: string[];
};
