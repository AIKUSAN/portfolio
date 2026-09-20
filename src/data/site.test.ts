import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { education, experience, focusCopy, projects } from './site';

const roleFocusValues = ['support', 'systems', 'platform'] as const;
const provenanceValues = [
  'client-employment',
  'independent-business',
  'sanitized-architecture',
  'portfolio-lab'
] as const;

describe('portfolio evidence registry', () => {
  it('keeps every project inside the public provenance and role contracts', () => {
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(provenanceValues).toContain(project.provenance);
      expect(project.focus.length).toBeGreaterThan(0);
      expect(project.focus.every((focus) => roleFocusValues.includes(focus))).toBe(true);
      expect(project.situation.length).toBeGreaterThan(20);
      expect(project.intervention.length).toBeGreaterThan(0);
      expect(project.verifiedResult.length).toBeGreaterThan(20);
    }
  });

  it('provides a featured evidence record and résumé for every role lens', () => {
    for (const focus of roleFocusValues) {
      expect(projects.some((project) => project.featured && project.focus.includes(focus))).toBe(true);
      expect(focusCopy[focus].resume).toMatch(/^\/resume\/.+\.pdf$/);
    }
  });

  it('does not reintroduce retired or private claims', () => {
    const publicEvidence = JSON.stringify({ focusCopy, projects }).toLowerCase();
    for (const forbidden of ['permanent resident', 'security+', '99.9%', '2m+', '65% cost']) {
      expect(publicEvidence).not.toContain(forbidden);
    }
  });
});

describe('approved public career baseline', () => {
  it('keeps the employment transition and verified contract title distinct', () => {
    const contractor = experience.find(entry => entry.organization === 'Land of Promise (Patrick Bezalel Pte Ltd)');
    const employee = experience.find(entry => entry.organization === 'DigiHwy — Land of Promise Project');
    expect(contractor).toMatchObject({ role: 'Independent IT & Platform Support Contractor', period: 'June 2024–Present' });
    expect(employee).toMatchObject({ role: 'Lead Developer / Platform Support', period: '2023–June 13, 2024' });
    expect(experience.find(entry => entry.organization === 'Proven Training Concepts')?.role).toBe('Network Infrastructure Consultant (Contract)');
    expect(experience).toHaveLength(6);
    expect(projects).toHaveLength(6);
  });

  it('distinguishes completed education from continuing certification study', () => {
    expect(education.degree).toBe('Bachelor of Science in Computer Engineering');
    expect(education.institution).toBe('Interface Computer College');
    expect(education.completion).toBe('Completed 2020');
    expect(education.status).toBe('In progress; target completion Fall 2026');
    expect(education.coursework).toEqual(['Computer Systems Architecture', 'Network Engineering', 'Database Management', 'Data Structures & Algorithms']);
  });

  it.each([
    ['it-support', '61c47c9d23860994f1644348a860bd7413f259db634261fba884f973356f5337'],
    ['systems-cloud', '652f8d0d498499be9bba8f0799cf906553c398993c583644a5d525fe7e5d8772']
  ])('preserves the approved public %s résumé PDF', (track, approvedHash) => {
    // Editable sources are private. Update the digest only after reviewing a replacement PDF.
    const pdf = readFileSync(new URL(`../../public/resume/lorenz-tazan-${track}.pdf`, import.meta.url));
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(createHash('sha256').update(pdf).digest('hex')).toBe(approvedHash);
  });
});
