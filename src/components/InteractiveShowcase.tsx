import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, Cpu, Database, Terminal } from 'lucide-react'

const TABS = [
  {
    id: 'crm',
    title: 'Full-Stack CRM',
    icon: <Code2 className="w-4 h-4" />,
    language: 'typescript',
    filename: 'crm-service.ts',
    code: `// crm-service.ts
import { CRMClient } from '@crux/crm-sdk';

export async function syncCustomerData(userId: string) {
  const client = new CRMClient({ apiKey: process.env.CRM_API_KEY });
  const user = await client.users.fetch(userId);
  
  // Trigger real-time anomaly detection pipelines
  await client.pipeline.trigger('customer_sync', {
    id: user.id,
    metadata: { lastLogin: user.metrics.lastLogin }
  });
}`,
    preview: {
      title: 'Edge Connections',
      nodes: [
        { label: 'UI Client', status: 'connected', color: '#38bdf8' },
        { label: 'Edge Worker', status: 'routing', color: '#f472b6' },
        { label: 'CRM API', status: 'synced', color: '#94a3b8' }
      ]
    }
  },
  {
    id: 'workflows',
    title: 'Automated Workflows',
    icon: <Cpu className="w-4 h-4" />,
    language: 'python',
    filename: 'orchestrator.py',
    code: `# orchestrator.py
from crux import WorkflowEngine

engine = WorkflowEngine.load_config("./pipelines/anomaly.yaml")

@engine.task(retries=3)
def analyze_stream(sensor_data):
    anomalies = engine.ml_model.predict(sensor_data)
    if anomalies.any():
        engine.alert_system.dispatch(
            urgency="HIGH",
            payload=anomalies.serialize()
        )`,
    preview: {
      title: 'Workflow Graph',
      nodes: [
        { label: 'Ingestion', status: 'idle', color: '#94a3b8' },
        { label: 'Predictor', status: 'running', color: '#38bdf8' },
        { label: 'Alerting', status: 'alert', color: '#f472b6' }
      ]
    }
  },
  {
    id: 'database',
    title: 'Database Engine',
    icon: <Database className="w-4 h-4" />,
    language: 'rust',
    filename: 'db_cache.rs',
    code: `// db_cache.rs
use crux_db::{ConnectionPool, CacheStore};

pub async fn query_sub_millisecond(key: &str) -> Result<Value, Error> {
    let cache = CacheStore::shared();
    if let Some(val) = cache.get(key).await {
        return Ok(val);
    }
    
    let db = ConnectionPool::get_connection().await?;
    let record = db.query("SELECT * FROM tx WHERE id = $1", &[&key]).await?;
    cache.set(key, &record).await;
    Ok(record)
}`,
    preview: {
      title: 'DB Cache Profile',
      nodes: [
        { label: 'Query Cache', status: 'hit (0.4ms)', color: '#38bdf8' },
        { label: 'Replica', status: 'standby', color: '#94a3b8' },
        { label: 'Primary DB', status: 'idle', color: '#94a3b8' }
      ]
    }
  }
]

// Highly desaturated, elegant syntax highlighting layout
function HighlightedCode({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n')
  return (
    <pre className="text-xs md:text-sm font-mono text-slate-400 leading-relaxed overflow-x-auto select-none">
      <code>
        {lines.map((line, idx) => {
          let highlighted = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')

          if (language === 'typescript') {
            highlighted = highlighted
              .replace(/\b(import|export|const|let|async|await|function|new|return|from)\b/g, '<span class="text-slate-200 font-medium">$1</span>')
              .replace(/\b(CRMClient|apiKey|process|env|CRM_API_KEY|users|fetch|pipeline|trigger|id|metadata|lastLogin|metrics)\b/g, '<span class="text-slate-350">$1</span>')
              .replace(/('.*?'|".*?")/g, '<span class="text-slate-500">$1</span>')
              .replace(/(\/\/.*)$/g, '<span class="text-slate-600 italic">$1</span>')
          } else if (language === 'python') {
            highlighted = highlighted
              .replace(/\b(from|import|def|if|return|and|or)\b/g, '<span class="text-slate-200 font-medium">$1</span>')
              .replace(/\b(WorkflowEngine|load_config|task|retries|analyze_stream|sensor_data|ml_model|predict|anomalies|alert_system|dispatch|urgency|payload|serialize)\b/g, '<span class="text-slate-350">$1</span>')
              .replace(/('.*?'|".*?")/g, '<span class="text-slate-500">$1</span>')
              .replace(/(#.*)$/g, '<span class="text-slate-600 italic">$1</span>')
          } else if (language === 'rust') {
            highlighted = highlighted
              .replace(/\b(use|pub|async|fn|let|if|Some|return|Ok|match)\b/g, '<span class="text-slate-200 font-medium">$1</span>')
              .replace(/\b(ConnectionPool|CacheStore|shared|get|set|await|ConnectionPool|get_connection|query|Result|Value|Error)\b/g, '<span class="text-slate-350">$1</span>')
              .replace(/('.*?'|".*?")/g, '<span class="text-slate-500">$1</span>')
              .replace(/(\/\/.*)$/g, '<span class="text-slate-600 italic">$1</span>')
          }

          return (
            <div key={idx} className="table-row">
              <span className="table-cell pr-5 text-slate-700 text-right select-none w-6">{idx + 1}</span>
              <span className="table-cell" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
          )
        })}
      </code>
    </pre>
  )
}

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  // Parallax layer coordinates responding elastically to global mouse movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 90, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 90, damping: 22 })
  
  // Muted amplitude to keep parallax subtle and premium
  const widgetX = useTransform(springX, [-300, 300], [15, -15])
  const widgetY = useTransform(springY, [-300, 300], [15, -15])

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - el.left - el.width / 2
    const y = e.clientY - el.top - el.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-bold tracking-[0.22em] text-slate-500 uppercase">
              Core Architecture
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-none">
            Deeply engineered <span className="font-black gradient-text">infrastructure.</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto font-light text-sm leading-relaxed">
            Inspect our codebase patterns and track connection parameters in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Naked borderless tabs */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {TABS.map((tab) => {
              const isActive = activeTab.id === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className="relative flex items-center gap-5 p-5 rounded-xl text-left cursor-pointer group transition-all duration-350"
                >
                  {/* Shared layout active indicator pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-white/5 rounded-xl border border-white/5"
                      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                    />
                  )}

                  <div className={`relative z-10 p-2.5 rounded-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {tab.icon}
                  </div>

                  <div className="relative z-10">
                    <h4 className={`text-sm font-bold tracking-[0.05em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                      {tab.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-[0.15em] mt-1 block">
                      {tab.language} engine
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: IDE Terminal */}
          <div 
            className="lg:col-span-7 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Minimal, borderless editor frame */}
            <div className="bg-[#05070c] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/5 relative">
              {/* Terminal Header */}
              <div className="bg-[#0b0f19]/40 px-6 py-4 flex items-center justify-between border-b border-white/5">
                <span className="text-xs text-slate-500 font-mono select-none">
                  {activeTab.filename}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0b0f19] text-slate-500 uppercase tracking-widest border border-white/5">
                  {activeTab.language}
                </span>
              </div>

              {/* Code Display Area */}
              <div className="p-6 overflow-y-auto max-h-[340px] min-h-[340px] relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <HighlightedCode code={activeTab.code} language={activeTab.language} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Overlapping Parallax Performance Widget */}
            <motion.div
              style={{
                x: widgetX,
                y: widgetY,
              }}
              className="hidden lg:block absolute -top-8 -right-8 w-60 bg-[#131926]/90 backdrop-blur-xl border border-white/5 p-5 rounded-xl shadow-2xl z-20 pointer-events-none"
            >
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
                {activeTab.preview.title}
              </h5>
              
              <div className="flex flex-col gap-2.5">
                <AnimatePresence mode="wait">
                  {activeTab.preview.nodes.map((node) => (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-xs font-semibold text-slate-300">{node.label}</span>
                      <span
                        style={{ color: node.color }}
                        className="text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <span 
                          style={{ backgroundColor: node.color }} 
                          className="w-1.5 h-1.5 rounded-full opacity-60" 
                        />
                        {node.status}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
