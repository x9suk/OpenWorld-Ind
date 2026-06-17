import clsx from 'clsx';

interface FooterProps {
  className?: string;
}

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'States of India', href: '/states' },
      { label: 'Cities', href: '/cities' },
      { label: 'Monuments', href: '/monuments' },
      { label: 'Food', href: '/food' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'History', href: '/history' },
      { label: 'Culture', href: '/culture' },
      { label: 'Festivals', href: '/festivals' },
      { label: 'Quiz', href: '/quiz' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx('bg-gray-900 text-gray-300', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <img src="/brand/logo.svg" alt="OpenWorld India" className="h-8 w-auto mb-3 brightness-0 invert" />
            <p className="text-sm text-gray-400">Explore India Through Maps, Stories, Culture, and History.</p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} OpenWorld India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
