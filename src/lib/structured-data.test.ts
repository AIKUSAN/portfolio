import { describe, expect, it } from 'vitest';
import { portfolioStructuredData, serializeStructuredData } from './structured-data';

const schemaFor = (path: string, noindex = false) => portfolioStructuredData(path, 'Lorenz Tazan', 'Approved page description.', noindex);

describe('portfolio structured data', () => {
  it('identifies the website on Home and preserves the approved Person', () => {
    const schema = schemaFor('/')!;
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph'].map(node => node['@type'])).toEqual(['Person', 'WebSite']);
    expect(schema['@graph'][0]).toMatchObject({
      '@id': 'https://lorenztazan.com/#person', name: 'Lorenz Tazan',
      sameAs: ['https://github.com/AIKUSAN'], jobTitle: 'IT Systems & Infrastructure Professional'
    });
  });

  it.each(['/about', '/contact'])('links %s to the same person and website', path => {
    const graph = schemaFor(path)!['@graph'];
    expect(graph[1]).toMatchObject({
      '@type': path === '/about' ? 'ProfilePage' : 'ContactPage',
      url: `https://lorenztazan.com${path}`, isPartOf: { '@id': 'https://lorenztazan.com/#website' }
    });
    expect(graph[1]?.[path === '/about' ? 'mainEntity' : 'about']).toEqual({ '@id': graph[0]?.['@id'] });
  });

  it.each(['/work', '/experience'])('keeps existing Person metadata without claiming %s is a profile', path => {
    expect(schemaFor(path)!['@graph'].map(node => node['@type'])).toEqual(['Person']);
  });

  it('uses stable canonical entities across all role lenses', () => {
    for (const path of ['/', '/about', '/contact', '/work', '/experience']) {
      for (const focus of ['support', 'systems', 'platform']) {
        expect(schemaFor(`${path}?focus=${focus}#selected`)).toEqual(schemaFor(path));
      }
    }
  });

  it('omits schema for retired, unknown, external and noindex pages', () => {
    for (const path of ['/blog', '/404', '/unknown', 'https://example.com/about']) expect(schemaFor(path)).toBeNull();
    expect(schemaFor('/about', true)).toBeNull();
  });

  it('escapes HTML script-closing sequences without changing parsed data', () => {
    const value = { description: '</script><script>alert("x")</script><!-- & >' };
    const serialized = serializeStructuredData(value);
    expect(serialized).not.toContain('<');
    expect(JSON.parse(serialized)).toEqual(value);
  });

  it('adds no unsupported ratings, jobs, dates, private details or social profiles', () => {
    const serialized = serializeStructuredData(schemaFor('/about'));
    for (const forbidden of ['AggregateRating', 'JobPosting', 'SearchAction', 'datePublished', 'address', 'telephone', 'linkedin']) {
      expect(serialized).not.toContain(forbidden);
    }
  });
});
