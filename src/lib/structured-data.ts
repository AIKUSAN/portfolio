const siteUrl = 'https://lorenztazan.com/';
const personId = `${siteUrl}#person`;
const websiteId = `${siteUrl}#website`;
const publicPaths = new Set(['/', '/work', '/experience', '/about', '/contact']);

type SchemaNode = Record<string, unknown>;

export function portfolioStructuredData(path: string, title: string, description: string, noindex = false) {
  const page = new URL(path, siteUrl);
  if (noindex || page.origin !== new URL(siteUrl).origin || !publicPaths.has(page.pathname)) return null;
  page.search = '';
  page.hash = '';

  const graph: SchemaNode[] = [{
    '@type': 'Person',
    '@id': personId,
    name: 'Lorenz Tazan',
    url: 'https://lorenztazan.com',
    email: 'mailto:lorenztazan@gmail.com',
    sameAs: ['https://github.com/AIKUSAN'],
    jobTitle: 'IT Systems & Infrastructure Professional',
    knowsAbout: ['IT support', 'systems administration', 'network operations', 'infrastructure automation']
  }];

  if (page.pathname === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Lorenz Tazan — Infrastructure Operations Manual',
      url: siteUrl,
      publisher: { '@id': personId }
    });
  } else if (page.pathname === '/about' || page.pathname === '/contact') {
    graph.push({
      '@type': page.pathname === '/about' ? 'ProfilePage' : 'ContactPage',
      '@id': `${page.href}#webpage`,
      url: page.href,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      ...(page.pathname === '/about' ? { mainEntity: { '@id': personId } } : { about: { '@id': personId } })
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// JSON escaping alone does not protect an HTML script context from </script>.
export const serializeStructuredData = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
