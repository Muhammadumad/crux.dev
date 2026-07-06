import AnimatedMetric from './AnimatedMetric'

const METRICS_DATA = [
  {
    value: 150,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'High-performance digital products engineered to absolute scale.'
  },
  {
    value: 51,
    suffix: 'K+',
    label: 'Commits Pushed',
    description: 'Continuous shipping cycle across production-proven repositories.'
  },
  {
    value: 99.97,
    suffix: '%',
    label: 'Architecture Uptime',
    description: 'Zero-fault tolerant systems running on redundant container stacks.',
    decimals: 2
  },
  {
    value: 12,
    suffix: '+',
    label: 'Countries Served',
    description: 'Global-ready software compliant with international standards.'
  }
]

export default function MetricsGrid() {
  return (
    <section className="py-24 bg-slate-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {METRICS_DATA.map((metric) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              description={metric.description}
              decimals={metric.decimals}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
