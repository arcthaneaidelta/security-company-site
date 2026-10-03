import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaOptions {
  title: string;
  description?: string;
  canonical?: string;
}

export function usePageMeta({ title, description, canonical }: PageMetaOptions) {
  const location = useLocation();

  useEffect(() => {
    // Set title
    const fullTitle = `${title} | Northgate Protective Services`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      description ||
        'Trained, uniformed officers and responsive patrols for offices, campuses, job sites and events. Licensed, insured, locally managed.'
    );

    // Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Focus on H1 or main landmark for accessibility
    setTimeout(() => {
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.setAttribute('tabIndex', '-1');
        h1.focus({ preventScroll: true });
      }
    }, 100);
  }, [location.pathname, title, description, canonical]);
}
