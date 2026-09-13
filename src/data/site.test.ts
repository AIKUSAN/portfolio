import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
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

  it.each(['it-support', 'systems-cloud'])('keeps the %s résumé aligned with public facts and privacy boundaries', (track) => {
    const source = readFileSync(new URL(`../../resume-sources/lorenz-tazan-${track}.md`, import.meta.url), 'utf8');
    for (const required of [
      '10+ years', 'Land of Promise (Patrick Bezalel Pte Ltd)', 'June 2024–Present',
      'DigiHwy — Land of Promise Project', '2023–June 2024', 'Lead Developer / Platform Support',
      'Network Infrastructure Consultant (Contract)', '700+ concurrent subscribers',
      'EDUCATION & PROFESSIONAL DEVELOPMENT', education.degree, education.institution,
      education.completion, education.status, education.study,
      'mailto:lorenztazan@gmail.com', 'tel:2402562410'
    ]) expect(source).toContain(required);
    for (const retired of [
      '7+ years', '2023–Present', '100+ clients', '20+ clients', '300+ daily users',
      'IT Support Technician (Contract)', 'Remote IT Support Specialist',
      'undergraduate coursework', 'permanent resident', 'immigration', 'sponsorship',
      'security clearance', 'RESUME_SOURCE_NOTES', 'MASTER_REVIEW', 'Approved Baselines',
      'tenant administration', 'SharePoint migration'
    ]) expect(source.toLowerCase()).not.toContain(retired.toLowerCase());
  });
});
