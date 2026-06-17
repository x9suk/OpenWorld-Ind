'use client';

import { Navbar, Footer, Card, Badge } from '@openworld/ui';
import { motion } from 'framer-motion';

const types = [
  {
    name: 'State',
    description: 'A state or union territory within India.',
    fields: [
      { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
      { name: 'name', type: 'string', required: true, description: 'State name' },
      { name: 'slug', type: 'string', required: true, description: 'URL-friendly name' },
      { name: 'capital', type: 'string', required: true, description: 'Capital city' },
      { name: 'description', type: 'string', required: true, description: 'Overview text' },
      { name: 'imageUrl', type: 'string', required: false, description: 'Hero image URL' },
      { name: 'population', type: 'number', required: false, description: 'Total population' },
      { name: 'area', type: 'number', required: false, description: 'Area in km²' },
      { name: 'language', type: 'string[]', required: false, description: 'Official languages' },
      { name: 'culture', type: 'object', required: false, description: 'Culture details' },
      { name: 'economy', type: 'object', required: false, description: 'Economy overview' },
      { name: 'coordinates', type: 'object', required: false, description: 'lat/lng center point' },
    ],
  },
  {
    name: 'City',
    description: 'A city or major town within a state.',
    fields: [
      { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
      { name: 'name', type: 'string', required: true, description: 'City name' },
      { name: 'slug', type: 'string', required: true, description: 'URL-friendly name' },
      { name: 'stateId', type: 'string', required: true, description: 'Parent state ID' },
      { name: 'description', type: 'string', required: true, description: 'City overview' },
      { name: 'population', type: 'number', required: false, description: 'Population count' },
      { name: 'touristAttractions', type: 'string[]', required: false, description: 'List of attractions' },
      { name: 'localFoods', type: 'string[]', required: false, description: 'Local cuisine items' },
      { name: 'famousPlaces', type: 'string[]', required: false, description: 'Well-known places' },
      { name: 'nearbyDestinations', type: 'string[]', required: false, description: 'Nearby places to visit' },
      { name: 'travelInfo', type: 'string', required: false, description: 'Travel tips' },
      { name: 'coordinates', type: 'object', required: false, description: 'lat/lng location' },
    ],
  },
  {
    name: 'Monument',
    description: 'A historical monument or heritage site.',
    fields: [
      { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
      { name: 'name', type: 'string', required: true, description: 'Monument name' },
      { name: 'slug', type: 'string', required: true, description: 'URL-friendly name' },
      { name: 'stateId', type: 'string', required: true, description: 'Parent state ID' },
      { name: 'cityId', type: 'string', required: false, description: 'Parent city ID' },
      { name: 'description', type: 'string', required: true, description: 'Description' },
      { name: 'history', type: 'string', required: false, description: 'Historical background' },
      { name: 'architecture', type: 'string', required: false, description: 'Architecture details' },
      { name: 'visitorInfo', type: 'string', required: false, description: 'Visitor tips' },
      { name: 'builtBy', type: 'string', required: false, description: 'Builder/ruler' },
      { name: 'builtIn', type: 'string', required: false, description: 'Century or year' },
      { name: 'style', type: 'string', required: false, description: 'Architectural style' },
      { name: 'coordinates', type: 'object', required: false, description: 'lat/lng location' },
    ],
  },
];

export default function DataFormatPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <section className="relative overflow-hidden gradient-india py-12">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              Data Format Reference
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              The schema and types used across the OpenWorld India platform.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {types.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.name}</h2>
                  <Badge variant="default">{t.fields.length} fields</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{t.description}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Field</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Required</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.fields.map((f) => (
                        <tr key={f.name} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="py-2 px-3 font-mono text-blue-600 dark:text-blue-400 text-xs">{f.name}</td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-400 text-xs">{f.type}</td>
                          <td className="py-2 px-3">
                            {f.required
                              ? <span className="text-green-600 dark:text-green-400 text-xs">Yes</span>
                              : <span className="text-slate-400 text-xs">No</span>
                            }
                          </td>
                          <td className="py-2 px-3 text-slate-700 dark:text-slate-300 text-xs">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
