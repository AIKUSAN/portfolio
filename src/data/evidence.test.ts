import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { projects, focusCopy } from './site';
import { projectEvidence } from './evidence';

const pins: Record<string, string> = {
  "regional-fiber-isp": "eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6",
  "netops-automation-framework": "c798785615f96afbc50e180988b2904c016a1a02",
  "bash-devops-toolkit": "b7e541c902ae562de8f006c0a9332438dc396a3c",
  "docker-kubernetes-automation": "dc97a671d3d0832e1c3093d524b2db0c9b4f747b"
};
// These paths were fetched at the pinned commits and checked against their Git trees.
const inspectedPaths = [
  "/AIKUSAN/regional-fiber-isp/blob/eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6/topology.drawio",
  "/AIKUSAN/regional-fiber-isp/blob/eaac33907eb375f4a4fc1dabfa6f37e3c454b1f6/mikrotik-core-router.rsc",
  "/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/app/core/drift_detector.py",
  "/AIKUSAN/netops-automation-framework/blob/c798785615f96afbc50e180988b2904c016a1a02/tests/test_drift_detector.py",
  "/AIKUSAN/bash-devops-toolkit/blob/b7e541c902ae562de8f006c0a9332438dc396a3c/scripts/backup/database-backup.sh",
  "/AIKUSAN/bash-devops-toolkit/blob/b7e541c902ae562de8f006c0a9332438dc396a3c/scripts/monitoring/server-health-check.sh",
  "/AIKUSAN/docker-kubernetes-automation/blob/dc97a671d3d0832e1c3093d524b2db0c9b4f747b/benchmarks/query-profiling.sql",
  "/AIKUSAN/docker-kubernetes-automation/blob/dc97a671d3d0832e1c3093d524b2db0c9b4f747b/configs/production-optimized.cnf"
];

describe('evidence-first contract', () => {
  it('preserves six stable anchors and their role mappings', () => {
    expect(projects.map(({ id, focus, featured }) => ({ id, focus, featured }))).toEqual([
      { id: 'client-support-operations', focus: ['support'], featured: true },
      { id: 'regional-isp-core', focus: ['systems'], featured: true },
      { id: 'netops-automation-lab', focus: ['platform'], featured: true },
      { id: 'secure-site-deployment', focus: ['support', 'systems'], featured: false },
      { id: 'bash-operations-toolkit', focus: ['platform', 'systems'], featured: false },
      { id: 'database-tuning-lab', focus: ['platform'], featured: false }
    ]);
    expect(focusCopy.support.resume).toBe('/resume/lorenz-tazan-it-support.pdf');
    expect(focusCopy.systems.resume).toBe(focusCopy.platform.resume);
  });

  it('uses descriptive, pinned links to all inspected artifacts', () => {
    const items = Object.values(projectEvidence).flat();
    expect(items).toHaveLength(9);
    for (const item of items) {
      const url = new URL(item.sourceUrl);
      const parts = url.pathname.split('/');
      expect(url.protocol).toBe('https:');
      expect(url.hostname).toBe('github.com');
      expect(parts[1]).toBe('AIKUSAN');
      expect(parts[3]).toBe('blob');
      expect(parts[4]).toMatch(/^[a-f0-9]{40}$/);
      expect(parts[4]).toBe(pins[parts[2] ?? '']);
      expect(inspectedPaths).toContain(url.pathname);
      expect(url.hash).toMatch(/^(#L\d+(-L\d+)?)?$/);
      expect(item.label).toMatch(/^View .+/);
      expect(item.caption.length).toBeGreaterThan(30);
      expect(['source', 'tests', 'configuration', 'topology', 'sql']).toContain(item.kind);
    }
  });

  it('retains provenance while presenting independent projects positively', () => {
    expect(projects.filter(p => p.provenance === 'portfolio-lab')).toHaveLength(3);
    for (const project of projects) {
      expect(project.contribution?.length).toBeGreaterThan(30);
      expect(project.decisionNotes?.length).toBeGreaterThan(0);
      expect(project.scopeNote?.length).toBeGreaterThan(30);
      if(project.provenance === 'portfolio-lab') expect(project.provenanceLabel).toBe('Independent project');
    }
    expect(projects.find(p => p.id === 'client-support-operations')?.evidence).toBeUndefined();
    expect(projects.find(p => p.id === 'secure-site-deployment')?.evidence).toBeUndefined();
  });

  it('does not promote unverified repository claims into public facts', () => {
    const copy = JSON.stringify(projects).toLowerCase();
    for (const phrase of ['redis-backed', 'redis queue', 'enforced approval', 'approval gates',
      '99.8%', '99.9%', '2m+', '10gbps', '800ms', '35ms', '65% cost', 'linkedin', 'passi city',
      'permanent resident', 'zero-downtime', '100% test coverage']) expect(copy).not.toContain(phrase);
    expect(projects[0]?.scopeNote).toContain('aggregate service record');
    expect(projects[2]?.scopeNote).toContain('have not been verified');
  });

  it('explains the same public evidence labels that Work displays', () => {
    const about = readFileSync(new URL('../pages/about.astro', import.meta.url), 'utf8');
    const labels = [...about.matchAll(/<dt>([^<]+)<\/dt>/g)].map(match => match[1]);
    expect(labels.sort()).toEqual([...new Set(projects.map(project => project.provenanceLabel))].sort());
  });

  it('keeps source excerpts inert and diagrams metric-free', () => {
    const component = readFileSync(new URL('../components/ProjectEvidence.astro', import.meta.url), 'utf8');
    expect(component).toContain('<code>{item.excerpt.text}</code>');
    for (const unsafe of ['set:html', '<script', '<iframe', 'client:']) expect(component).not.toContain(unsafe);
    const diagram = readFileSync(new URL('../components/NetworkEvidencePlate.astro', import.meta.url), 'utf8');
    expect(diagram).toContain('role="img"');
    expect(diagram).toContain('<desc');
    expect(diagram).not.toMatch(/(?:Mbps|Gbps|99\.|700\+|10\.1\.|Passi|2021)/);
    const excerpt = projectEvidence.netops[0]?.excerpt?.text;
    expect(excerpt).toContain('difflib.unified_diff(');
    expect(excerpt).toContain("fromfile='golden_config'");
    expect(excerpt).toContain("return ''.join(diff)");
  });
});
