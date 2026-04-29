'use client';
import { useTranslations } from 'next-intl';
import Card3D from './Card3D';

interface SkillGroup {
  icon: string;
  title: string;
  /** Tailwind gradient classes for the card top strip */
  gradientFrom: string;
  gradientTo: string;
  accentBg: string;
  accentText: string;
  /** Tailwind classes applied to Tier-1 pills for this card */
  tier1Pill: string;
  skills: { name: string; tier: 1 | 2 | 3 }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: '🌐', title: 'Frontend',
    gradientFrom: 'from-blue-600', gradientTo: 'to-indigo-400',
    accentBg: 'bg-blue-500/10', accentText: 'text-blue-400',
    tier1Pill: 'bg-blue-500/15 border-blue-400/50 text-blue-300',
    skills: [
      { name: 'React', tier: 1 }, { name: 'Next.js', tier: 1 }, { name: 'TypeScript', tier: 1 },
      { name: 'Vue.js', tier: 2 }, { name: 'Angular', tier: 2 }, { name: 'Tailwind CSS', tier: 2 },
      { name: 'Vite', tier: 2 }, { name: 'Storybook', tier: 3 },
    ],
  },
  {
    icon: '🚀', title: 'Frameworks',
    gradientFrom: 'from-rose-500', gradientTo: 'to-orange-400',
    accentBg: 'bg-rose-500/10', accentText: 'text-rose-400',
    tier1Pill: 'bg-rose-500/15 border-rose-400/50 text-rose-300',
    skills: [
      { name: 'Quarkus', tier: 1 }, { name: 'Spring Boot', tier: 1 }, { name: 'NestJS', tier: 1 },
      { name: 'FastAPI', tier: 2 }, { name: 'Express.js', tier: 2 }, { name: 'Micronaut', tier: 2 },
      { name: 'Ktor', tier: 3 }, { name: 'Gin (Go)', tier: 3 },
    ],
  },
  {
    icon: '📱', title: 'Mobile',
    gradientFrom: 'from-violet-600', gradientTo: 'to-purple-400',
    accentBg: 'bg-violet-500/10', accentText: 'text-violet-400',
    tier1Pill: 'bg-violet-500/15 border-violet-400/50 text-violet-300',
    skills: [
      { name: 'React Native', tier: 1 }, { name: 'Expo', tier: 1 },
      { name: 'Flutter', tier: 2 }, { name: 'iOS (Swift)', tier: 2 }, { name: 'Android (Kotlin)', tier: 2 },
    ],
  },
  {
    icon: '🔌', title: 'Backend & APIs',
    gradientFrom: 'from-emerald-600', gradientTo: 'to-teal-400',
    accentBg: 'bg-emerald-500/10', accentText: 'text-emerald-400',
    tier1Pill: 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300',
    skills: [
      { name: 'Node.js', tier: 1 }, { name: 'Go', tier: 1 }, { name: 'Java', tier: 1 },
      { name: 'Python', tier: 1 }, { name: 'GraphQL', tier: 2 }, { name: 'gRPC', tier: 2 },
      { name: 'REST', tier: 1 }, { name: 'WebSockets', tier: 2 },
    ],
  },
  {
    icon: '☁️', title: 'Cloud & PaaS',
    gradientFrom: 'from-sky-500', gradientTo: 'to-cyan-400',
    accentBg: 'bg-sky-500/10', accentText: 'text-sky-400',
    tier1Pill: 'bg-sky-500/15 border-sky-400/50 text-sky-300',
    skills: [
      { name: 'AWS', tier: 1 }, { name: 'Google Cloud', tier: 2 }, { name: 'Azure', tier: 2 },
      { name: 'Vercel', tier: 1 }, { name: 'Netlify', tier: 2 },
      { name: 'Heroku', tier: 2 }, { name: 'Render', tier: 2 }, { name: 'Railway', tier: 3 },
      { name: 'Fly.io', tier: 3 }, { name: 'Supabase', tier: 2 },
    ],
  },
  {
    icon: '🐳', title: 'Containers & Orchestration',
    gradientFrom: 'from-cyan-600', gradientTo: 'to-sky-400',
    accentBg: 'bg-cyan-500/10', accentText: 'text-cyan-400',
    tier1Pill: 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300',
    skills: [
      { name: 'Docker', tier: 1 }, { name: 'Kubernetes', tier: 1 }, { name: 'Helm', tier: 2 },
      { name: 'EKS / GKE', tier: 2 }, { name: 'ArgoCD', tier: 2 }, { name: 'Podman', tier: 3 },
    ],
  },
  {
    icon: '⚙️', title: 'CI/CD & IaC',
    gradientFrom: 'from-orange-500', gradientTo: 'to-amber-400',
    accentBg: 'bg-orange-500/10', accentText: 'text-orange-400',
    tier1Pill: 'bg-orange-500/15 border-orange-400/50 text-orange-300',
    skills: [
      { name: 'GitHub Actions', tier: 1 }, { name: 'Jenkins', tier: 1 }, { name: 'GitLab CI', tier: 1 },
      { name: 'Terraform', tier: 1 }, { name: 'Ansible', tier: 2 }, { name: 'Pulumi', tier: 2 },
      { name: 'ArgoCD', tier: 2 }, { name: 'FluxCD', tier: 3 },
    ],
  },
  {
    icon: '📊', title: 'Observability',
    gradientFrom: 'from-pink-600', gradientTo: 'to-rose-400',
    accentBg: 'bg-pink-500/10', accentText: 'text-pink-400',
    tier1Pill: 'bg-pink-500/15 border-pink-400/50 text-pink-300',
    skills: [
      { name: 'Prometheus', tier: 1 }, { name: 'Grafana', tier: 1 },
      { name: 'Datadog', tier: 2 }, { name: 'ELK Stack', tier: 2 }, { name: 'OpenTelemetry', tier: 2 },
      { name: 'Jaeger', tier: 3 },
    ],
  },
  {
    icon: '🗄️', title: 'Databases',
    gradientFrom: 'from-teal-600', gradientTo: 'to-emerald-400',
    accentBg: 'bg-teal-500/10', accentText: 'text-teal-400',
    tier1Pill: 'bg-teal-500/15 border-teal-400/50 text-teal-300',
    skills: [
      { name: 'PostgreSQL', tier: 1 }, { name: 'MongoDB', tier: 1 }, { name: 'Redis', tier: 1 },
      { name: 'MySQL', tier: 2 }, { name: 'DynamoDB', tier: 2 }, { name: 'Elasticsearch', tier: 3 },
      { name: 'CassandraDB', tier: 3 },
    ],
  },
];

const TIER_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Expert',
  2: 'Advanced',
  3: 'Familiar',
};

export default function Skills() {
  const t = useTranslations('skills');
  return (
    <section id="skills" className="py-24 bg-[var(--bg-section)]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 text-center">
          {t('label')}
        </p>
        <h2 className="font-heading font-bold text-4xl text-[var(--text-primary)] text-center mb-14">
          {t('headline')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SKILL_GROUPS.map((group) => (
            <Card3D
              key={group.title}
              className="group relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-card overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:border-transparent transition-all duration-300"
            >
              {/* Gradient top strip */}
              <div className={`h-1 bg-gradient-to-r ${group.gradientFrom} ${group.gradientTo}`} />

              <div className="p-7">
                {/* Group header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${group.accentBg} flex items-center justify-center text-lg`}>
                      <span className={group.accentText}>{group.icon}</span>
                    </div>
                    <h4 className="font-heading font-semibold text-[var(--text-primary)] text-sm">
                      {group.title}
                    </h4>
                  </div>
                  {/* Skill count badge */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${group.accentBg} ${group.accentText}`}>
                    {group.skills.length}
                  </span>
                </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map(({ name }) => (
                  <span
                    key={name}
                    className="text-xs px-2.5 py-1 rounded-full border bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-secondary)]"
                  >
                    {name}
                  </span>
                ))}
              </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}