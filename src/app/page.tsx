'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from 'next-themes'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Search,
  Star,
  StarOff,
  ExternalLink,
  Filter,
  SortAsc,
  TrendingUp,
  Calendar,
  BarChart3,
  Sparkles,
  Zap,
  Award,
  Clock,
  Code2,
  Image as ImageIcon,
  Video,
  Music,
  X,
  Sun,
  Moon
} from 'lucide-react'

// Zhipu AI Provider Icon
function ZhipuAIIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} viewBox="0 0 24 24" fill="none" aria-label="Zhipu AI">
      <path d="M12 2L2 7l10 5 10-5M2 17l10-5M22 7l-10 5 10-5M22 17l-10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Provider Icons
function ProviderIcon({ name, className = '' }: { name: string; className?: string }) {
  const common = {
    className: `h-5 w-5 ${className}`,
    viewBox: '0 0 24 24',
    fill: 'none',
  }

  if (name === 'OpenAI') {
    return (
      <svg {...common} aria-label="OpenAI">
        <path d="M12 3.5c3.7 0 6.7 3 6.7 6.7 0 3.7-3 6.7-6.7 6.7S5.3 13.9 5.3 10.2c0-3.7 3-6.7 6.7-6.7Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.2 8.9c1.1-1.9 3.5-2.6 5.4-1.5 1.9 1.1 2.6 3.5 1.5 5.4-1.1 1.9-3.5 2.6-5.4 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Anthropic') {
    return (
      <svg {...common} aria-label="Anthropic">
        <path d="M6 18V6h5.4c3.2 0 5.1 1.6 5.1 4.2 0 1.7-.8 2.9-2.3 3.5 1.8.5 2.8 1.9 2.8 3.7 0 2.8-2 4.6-5.4 4.6H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10.2 9.2h1.9c1.5 0 2.3.6 2.3 1.8 0 1.1-.8 1.8-2.3 1.8h-1.9V9.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'Google') {
    return (
      <svg {...common} aria-label="Google">
        <path d="M20 12.2c0 4.4-3 7.3-7.5 7.3A7.5 7.5 0 1 1 12.5 4.5c1.9 0 3.5.7 4.7 1.9l-2 1.9A4.7 4.7 0 1 0 12.5 17c2.4 0 3.9-1.3 4.2-3.2h-4.2v-2.6H20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'xAI') {
    return (
      <svg {...common} aria-label="xAI">
        <path d="M6 7l12 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 7 6 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Meta') {
    return (
      <svg {...common} aria-label="Meta">
        <path d="M4 12c0-3.6 1.7-6.5 4.1-6.5 2.2 0 3.8 2.3 4.8 4.7 1-2.4 2.6-4.7 4.8-4.7 2.4 0 4.3 2.9 4.3 6.5 0 3.5-1.7 6.5-4.1 6.5-2.2 0-3.9-2.3-5-4.7-1.1 2.4-2.7 4.7-4.8 4.7C5.7 18.5 4 15.5 4 12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'Cohere') {
    return (
      <svg {...common} aria-label="Cohere">
        <path d="M12 4a8 8 0 0 1 8 8 8 8 0 0 1-16 0 8 8 0 0 1 8-8Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 8l-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'Alibaba' || name === 'Alibaba Cloud') {
    return (
      <svg {...common} aria-label="Alibaba">
        <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Suno' || name === 'Udio') {
    return (
      <svg {...common} aria-label="Audio Provider">
        <path d="M9 18V6l10 6-10 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Mistral') {
    return (
      <svg {...common} aria-label="Mistral">
        <path d="M6 17V7l3 3 3-3 3 3 3 3-3v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'Stability') {
    return (
      <svg {...common} aria-label="Stability AI">
        <path d="M12 4l2.3 4.6L19 11l-4.7 2.4L12 18l-2.3-4.6L5 11l4.7-2.4L12 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'Midjourney') {
    return (
      <svg {...common} aria-label="Midjourney">
        <path d="M6 16c2-6 4-9 6-9s4 3 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Black Forest Labs') {
    return (
      <svg {...common} aria-label="Black Forest Labs">
        <path d="M6 18V6h6.2c2.2 0 3.8 1.3 3.8 3.2 0 1.2-.6 2.2-1.6 2.6 1.4.4 2.2 1.5 2.2 3 0 2-1.6 3.2-4.1 3.2H6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 9.1h2.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Runway') {
    return (
      <svg {...common} aria-label="Runway">
        <path d="M6 18V6h6c3.3 0 6 2.7 6 6s-2.7 6-6 6H6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 9h3.2c1.7 0 2.8 1.2 2.8 3s-1.1 3-2.8 3H9V9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  if (name === 'Adobe') {
    return (
      <svg {...common} aria-label="Adobe">
        <path d="M5.5 18 10.2 6h3.6L18.5 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.2 14h5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'DeepSeek') {
    return (
      <svg {...common} aria-label="DeepSeek">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 8h4v8h-4z" fill="currentColor" />
      </svg>
    )
  }
  if (name === 'Zhipu AI') {
    return <ZhipuAIIcon className={className} />
  }

  return (
    <svg {...common} aria-label={name || 'Provider'}>
      <path d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5S16.7 20.5 12 20.5 3.5 16.7 3.5 12 7.3 3.5 12 3.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.2 12h7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const TYPES = ['All', 'LLM', 'Image', 'Video', 'Audio']
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
]

// Model Data - Updated with correct direct links and more models
const MODELS = [
  {
    id: 'chatgpt-5-2-thinking',
    name: 'ChatGPT 5.2 Thinking',
    provider: 'OpenAI',
    type: 'LLM',
    released: 'Dec 11, 2025',
    summary: 'Reasoning model tuned for deeper work: coding, long-doc analysis, planning, and tool use.',
    tags: ['Reasoning', 'Tool-use', 'Frontier'],
    link: 'https://chatgpt.com/',
    featured: true,
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google',
    type: 'LLM',
    released: 'Nov 2025',
    summary: "Google's flagship model built for strong reasoning + native multimodal workflows.",
    tags: ['Reasoning', 'Multimodal', 'Long context'],
    link: 'https://gemini.google.com/',
    featured: true,
  },
  {
    id: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    type: 'LLM',
    released: 'Nov 24, 2025',
    summary: 'Frontier model aimed at coding, agents, and computer use with strong long-horizon behavior.',
    tags: ['Reasoning', 'Agents', 'Coding'],
    link: 'https://claude.ai/',
    featured: true,
  },
  {
    id: 'grok-4-1',
    name: 'Grok 4.1',
    provider: 'xAI',
    type: 'LLM',
    released: 'Nov 17, 2025',
    summary: 'Upgraded usability + preference performance; strong conversational style with a reasoning mode.',
    tags: ['Reasoning', 'Preference', 'Search'],
    link: 'https://grok.com/',
    featured: true,
  },
  {
    id: 'glm-4-7',
    name: 'GLM-4.7 Deep Thinking',
    provider: 'Zhipu AI',
    type: 'LLM',
    released: 'Dec 22, 2025',
    summary: "Z.ai's flagship model with SOTA performance, superior agentic coding, and enhanced complex reasoning.",
    tags: ['Reasoning', 'Coding', 'Open Source', 'Frontier'],
    link: 'https://z.ai/',
    featured: true,
  },
  {
    id: 'llama-4',
    name: 'Llama 4',
    provider: 'Meta',
    type: 'LLM',
    released: 'Apr 2025',
    summary: "Meta's next-gen open suite (Scout & Maverick). Massive reasoning gains over Llama 3.",
    tags: ['Open weights', 'Reasoning'],
    link: 'https://llama.meta.com/',
  },
  {
    id: 'midjourney-v7',
    name: 'Midjourney v7',
    provider: 'Midjourney',
    type: 'Image',
    released: 'Apr 4, 2025',
    summary: 'New default model with stunning precision, richer textures, and "Draft Mode".',
    tags: ['Art', 'T2I', 'High Fidelity'],
    link: 'https://www.midjourney.com/create',
  },
  {
    id: 'mistral-3',
    name: 'Mistral 3',
    provider: 'Mistral',
    type: 'LLM',
    released: 'Mar 2025',
    summary: 'European flagship model focusing on efficiency and multilingual reasoning.',
    tags: ['Open weights', 'Efficiency'],
    link: 'https://chat.mistral.ai/',
  },
  {
    id: 'command-r-plus',
    name: 'Command R+',
    provider: 'Cohere',
    type: 'LLM',
    released: 'Apr 2024',
    summary: 'Advanced reasoning model optimized for RAG, tool use, and long-context understanding.',
    tags: ['RAG', 'Reasoning', 'Citations'],
    link: 'https://cohere.com/',
  },
  {
    id: 'gemini-2-0',
    name: 'Gemini 2.0',
    provider: 'Google',
    type: 'LLM',
    released: 'Jan 23, 2025',
    summary: 'Major update introducing enhanced agentic capabilities and thinking modes.',
    tags: ['Multimodal', 'Agents'],
    link: 'https://gemini.google.com/',
  },
  {
    id: 'o3-mini',
    name: 'OpenAI o3-mini',
    provider: 'OpenAI',
    type: 'LLM',
    released: 'Jan 31, 2025',
    summary: 'Specialized reasoning model for STEM/coding, released before the 5.2 unification.',
    tags: ['Reasoning', 'Math', 'Coding'],
    link: 'https://chatgpt.com/',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    type: 'LLM',
    released: 'May 13, 2024',
    summary: 'Real-time multimodal (text/vision/audio). Reliable daily-driver assistant.',
    tags: ['Multimodal', 'Real-time'],
    link: 'https://chatgpt.com/',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    type: 'LLM',
    released: 'Jun 21, 2024',
    summary: 'Fast, strong reasoning + coding. Great for long-context instruction following.',
    tags: ['Reasoning', 'Coding', 'Long context'],
    link: 'https://claude.ai/',
  },
  {
    id: 'llama-3-2',
    name: 'Llama 3.2 Vision',
    provider: 'Meta',
    type: 'LLM',
    released: 'Sep 2024',
    summary: "Meta's first open weights model with native vision capabilities.",
    tags: ['Open weights', 'Vision'],
    link: 'https://llama.meta.com/',
  },
  {
    id: 'qwen-2-5',
    name: 'Qwen 2.5',
    provider: 'Alibaba',
    type: 'LLM',
    released: 'Sep 2024',
    summary: 'Massive open model suite with excellent coding and math benchmarks.',
    tags: ['Open weights', 'Math', 'Coding'],
    link: 'https://qwen.ai/',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    type: 'LLM',
    released: '2025',
    summary: 'Open model family known for strong reasoning at extremely low inference cost.',
    tags: ['Open', 'Reasoning'],
    link: 'https://chat.deepseek.com/',
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'Mistral',
    type: 'LLM',
    released: 'Jul 2024',
    summary: 'Top-tier European model with 128k context and strong function calling.',
    tags: ['Multilingual', 'Coding'],
    link: 'https://chat.mistral.ai/',
  },
  {
    id: 'flux-1',
    name: 'FLUX.1',
    provider: 'Black Forest Labs',
    type: 'Image',
    released: '2024',
    summary: 'State-of-the-art open weights image generator known for prompt adherence.',
    tags: ['T2I', 'Open weights'],
    link: 'https://blackforestlabs.ai/',
  },
  {
    id: 'runway-gen-4-5',
    name: 'Runway Gen-4.5',
    provider: 'Runway',
    type: 'Video',
    released: 'Dec 2024',
    summary: "World's top-rated video model with unprecedented visual fidelity and creative control.",
    tags: ['T2V', 'Control', 'SOTA'],
    link: 'https://runwayml.com/generate',
  },
  {
    id: 'kling',
    name: 'Kling',
    provider: 'Kuaishou',
    type: 'Video',
    released: '2024',
    summary: 'Impressive video generation model supporting up to 2 minutes of 1080p video.',
    tags: ['T2V', 'Long duration'],
    link: 'https://app.klingai.com/global/text-to-video/new',
  },
  {
    id: 'suno-v3-5',
    name: 'Suno v3.5',
    provider: 'Suno',
    type: 'Audio',
    released: '2024',
    summary: 'Generates full songs with lyrics and vocals; widely considered SOTA for music.',
    tags: ['Text-to-music', 'Vocals'],
    link: 'https://suno.com/',
  },
  {
    id: 'udio',
    name: 'Udio',
    provider: 'Udio',
    type: 'Audio',
    released: '2024',
    summary: 'AI music generator with intuitive controls and professional-quality output.',
    tags: ['Text-to-music', 'High Quality'],
    link: 'https://www.udio.com/',
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    provider: 'Stability',
    type: 'Image',
    released: '2024',
    summary: 'Popular open-source image generation model with fine-grained control.',
    tags: ['T2I', 'Open weights'],
    link: 'https://stability.ai/',
  },
]

// Benchmark Data - Updated with GLM-4.7
const BENCHMARK_MODELS = [
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google',
    released: 'Nov 2025',
    link: 'https://gemini.google.com/',
    lmarena_elo: 1490,
    gpqa_diamond_no_tools: 91.9,
    swe_bench_verified: 76.2,
    arc_agi_2_verified: 31.1,
    hle_no_tools: 37.52,
    sources: [
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
      { label: 'HLE', url: 'https://scale.com/leaderboard/humanitys_last_exam' },
    ],
  },
  {
    id: 'chatgpt-5-2-thinking',
    name: 'ChatGPT 5.2 Thinking',
    provider: 'OpenAI',
    released: 'Dec 11, 2025',
    link: 'https://chatgpt.com/',
    lmarena_elo: 1442,
    gpqa_diamond_no_tools: 92.4,
    swe_bench_verified: 80.0,
    arc_agi_2_verified: 52.9,
    hle_no_tools: 34.5,
    sources: [
      { label: 'OpenAI', url: 'https://openai.com/index/introducing-gpt-5-2/' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'glm-4-7',
    name: 'GLM-4.7 Deep Thinking',
    provider: 'Zhipu AI',
    released: 'Dec 22, 2025',
    link: 'https://z.ai/',
    lmarena_elo: 1485,
    gpqa_diamond_no_tools: 89.3,
    swe_bench_verified: 78.5,
    arc_agi_2_verified: 48.2,
    hle_no_tools: 42.8,
    sources: [
      { label: 'Z.ai', url: 'https://z.ai/blog/glm-4.7' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    released: 'Nov 24, 2025',
    link: 'https://claude.ai/',
    lmarena_elo: 1469,
    gpqa_diamond_no_tools: 87.0,
    swe_bench_verified: 80.9,
    arc_agi_2_verified: 37.6,
    hle_no_tools: 25.2,
    sources: [
      { label: 'Anthropic', url: 'https://www.anthropic.com/news/claude-opus-4-5' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
      { label: 'HLE', url: 'https://scale.com/leaderboard/humanitys_last_exam' },
    ],
  },
  {
    id: 'grok-4-1',
    name: 'Grok 4.1',
    provider: 'xAI',
    released: 'Nov 17, 2025',
    link: 'https://grok.com/',
    lmarena_elo: 1477,
    gpqa_diamond_no_tools: null,
    swe_bench_verified: null,
    arc_agi_2_verified: null,
    hle_no_tools: null,
    sources: [
      { label: 'xAI', url: 'https://x.ai/news/grok-4-1' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
      { label: 'HLE', url: 'https://scale.com/leaderboard/humanitys_last_exam' },
    ],
  },
]

// Helper Functions
function byReleaseDesc(a: any, b: any) {
  const da = Date.parse(a.released)
  const db = Date.parse(b.released)
  if (!Number.isFinite(da) && !Number.isFinite(db)) return 0
  if (!Number.isFinite(da)) return 1
  if (!Number.isFinite(db)) return -1
  return db - da
}

function byReleaseAsc(a: any, b: any) {
  return byReleaseDesc(b, a)
}

function byNameAsc(a: any, b: any) {
  return a.name.localeCompare(b.name)
}

function byNameDesc(a: any, b: any) {
  return b.name.localeCompare(a.name)
}

// Card Component with Mouse Tracking and Wiggle Effect
function ModelCard({
  model,
  isFavorite,
  onToggleFavorite,
  onClick,
}: {
  model: any
  isFavorite: boolean
  onToggleFavorite: (e: React.MouseEvent) => void
  onClick: () => void
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'LLM':
        return <Sparkles className="h-4 w-4" />
      case 'Image':
        return <ImageIcon className="h-4 w-4" />
      case 'Video':
        return <Video className="h-4 w-4" />
      case 'Audio':
        return <Music className="h-4 w-4" />
      default:
        return <Code2 className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'LLM':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/40'
      case 'Image':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40'
      case 'Video':
        return 'bg-green-500/10 text-green-700 border-green-500/30 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/40'
      case 'Audio':
        return 'bg-orange-500/10 text-orange-700 border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/40'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/30 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/40'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: mousePosition.y / 30,
          rotateY: mousePosition.x / 30,
          scale: mousePosition.x !== 0 || mousePosition.y !== 0 ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className="group h-full border-2 transition-all hover:border-primary/50 hover:shadow-2xl">
          <CardContent className="p-0 h-full">
            <div className="relative flex h-full flex-col p-5">
              {/* Type Badge - Left Side, More Visible */}
              <div className="absolute left-4 top-4 z-10">
                <Badge
                  className={`gap-1.5 border-2 px-3 py-1.5 text-xs font-semibold ${getTypeColor(model.type)}`}
                >
                  {getTypeIcon(model.type)}
                  {model.type}
                </Badge>
              </div>

              {/* Favorite Button */}
              <button
                onClick={onToggleFavorite}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 hover:bg-white/20 dark:border-black/20 dark:bg-black/10 dark:hover:bg-black/20 transition-colors"
              >
                {isFavorite ? (
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ) : (
                  <StarOff className="h-4 w-4" />
                )}
              </button>

              <div className="mt-8 flex flex-1 flex flex-col">
                {/* Provider Icon & Model Name */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
                    <ProviderIcon name={model.provider} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold">
                        {model.name}
                      </h3>
                      {model.featured && (
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span>{model.provider}</span>
                      <span>·</span>
                      <span>{model.released}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {model.summary}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {model.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {model.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Visit Button */}
              <a
                href={model.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 hover:border-primary/30 dark:bg-primary/10 dark:text-primary-foreground dark:hover:bg-primary/20"
              >
                <span>Visit Website</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// Main Component
export default function AIModelsExplorer() {
  const [query, setQuery] = useState('')
  const [provider, setProvider] = useState('All')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('newest')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('models')
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ai-models-favorites')
    if (saved) {
      try {
        setFavorites(new Set(JSON.parse(saved)))
      } catch (e) {
        console.error('Failed to load favorites:', e)
      }
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ai-models-favorites', JSON.stringify([...favorites]))
  }, [favorites])

  const providers = useMemo(() => {
    const set = new Set(MODELS.map((m) => m.provider))
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let filtered = [...MODELS].filter((m) => (provider === 'All' ? true : m.provider === provider))
      .filter((m) => (type === 'All' ? true : m.type === type))
      .filter((m) => {
        if (!q) return true
        return (
          m.name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          m.summary.toLowerCase().includes(q) ||
          m.tags.some((t: string) => t.toLowerCase().includes(q))
        )
      })

    // Sort favorites to top
    const sorted = filtered.sort((a, b) => {
      const aFav = favorites.has(a.id)
      const bFav = favorites.has(b.id)

      // If one is favorite and other is not, sort accordingly
      if (aFav && !bFav) return -1
      if (!aFav && bFav) return 1

      // If both are favorites or both are not, apply normal sort
      switch (sort) {
        case 'newest':
          return byReleaseDesc(a, b)
        case 'oldest':
          return byReleaseAsc(a, b)
        case 'name-asc':
          return byNameAsc(a, b)
        case 'name-desc':
          return byNameDesc(a, b)
        default:
          return 0
      }
    })

    return sorted
  }, [query, provider, type, sort, favorites])

  const benchRows = useMemo(() => {
    return [...BENCHMARK_MODELS].sort(byReleaseDesc)
  }, [])

  const stats = useMemo(() => {
    const totalModels = MODELS.length
    const byType = MODELS.reduce((acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const byProvider = MODELS.reduce((acc, m) => {
      acc[m.provider] = (acc[m.provider] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const featuredCount = MODELS.filter(m => m.featured).length

    return {
      totalModels,
      byType,
      byProvider,
      featuredCount,
    }
  }, [])

  const toggleFavorite = (modelId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(modelId)) {
      newFavorites.delete(modelId)
      toast.success('Removed from favorites')
    } else {
      newFavorites.add(modelId)
      toast.success('Added to favorites')
    }
    setFavorites(newFavorites)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'LLM':
        return <Sparkles className="h-4 w-4" />
      case 'Image':
        return <ImageIcon className="h-4 w-4" />
      case 'Video':
        return <Video className="h-4 w-4" />
      case 'Audio':
        return <Music className="h-4 w-4" />
      default:
        return <Code2 className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 text-primary-foreground shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight sm:text-xl">AI Models Explorer</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Discover & Compare AI Models</p>
              </div>
            </div>

            {/* Enhanced Theme Toggle Button */}
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              size="default"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="gap-2 font-semibold"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Updated for 2025</span>
                </motion.div>
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                  Explore the Future of AI
                </h2>
                <p className="max-w-2xl text-muted-foreground">
                  Comprehensive directory of AI models including LLMs, image generators, video creators, and audio tools. Compare benchmarks and stay updated with the latest releases.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3"
              >
                <div className="rounded-xl bg-background/90 border-2 p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{stats.totalModels}</div>
                  <div className="text-xs text-muted-foreground">Total Models</div>
                </div>
                <div className="rounded-xl bg-background/90 border-2 p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{stats.featuredCount}</div>
                  <div className="text-xs text-muted-foreground">Featured</div>
                </div>
                <div className="rounded-xl bg-background/90 border-2 p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-primary">{Object.keys(stats.byProvider).length}</div>
                  <div className="text-xs text-muted-foreground">Providers</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 space-y-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, providers, tags..."
                className="h-11 pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[140px]">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Providers</SelectItem>
                  {providers.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[140px]">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(provider !== 'All' || type !== 'All' || favorites.size > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {provider !== 'All' && (
                <Badge variant="secondary" className="gap-1">
                  {provider}
                  <button onClick={() => setProvider('All')} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {type !== 'All' && (
                <Badge variant="secondary" className="gap-1">
                  {type}
                  <button onClick={() => setType('All')} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {favorites.size > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {favorites.size} Favorites
                  <button onClick={() => {
                    setFavorites(new Set())
                    toast.success('Cleared all favorites')
                  }} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setProvider('All')
                  setType('All')
                  setQuery('')
                }}
                className="h-6 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </motion.div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="models" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Models ({filtered.length})
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="gap-2">
              <Award className="h-4 w-4" />
              Benchmarks
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">No models found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((model, index) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    isFavorite={favorites.has(model.id)}
                    onToggleFavorite={(e) => toggleFavorite(model.id, e)}
                    onClick={() => setSelectedModel(model)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Frontier Model Benchmarks
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Performance metrics for the newest frontier reasoning models
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {benchRows.map((model, index) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-3 rounded-xl border-2 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/50">
                            <ProviderIcon name={model.provider} />
                          </div>
                          <div>
                            <div className="font-semibold">{model.name}</div>
                            <div className="text-xs text-muted-foreground">{model.released}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="gap-1 border-2">
                          <BarChart3 className="h-3 w-3" />
                          Elo: {model.lmarena_elo}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">GPQA Diamond</span>
                            <span className="font-semibold">{model.gpqa_diamond_no_tools ?? '—'}%</span>
                          </div>
                          {model.gpqa_diamond_no_tools && (
                            <Progress value={model.gpqa_diamond_no_tools} className="h-2" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">SWE-bench Verified</span>
                            <span className="font-semibold">{model.swe_bench_verified ?? '—'}%</span>
                          </div>
                          {model.swe_bench_verified && (
                            <Progress value={model.swe_bench_verified} className="h-2" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">ARC-AGI-2 Verified</span>
                            <span className="font-semibold">{model.arc_agi_2_verified ?? '—'}%</span>
                          </div>
                          {model.arc_agi_2_verified && (
                            <Progress value={model.arc_agi_2_verified} className="h-2" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">HLE (no tools)</span>
                            <span className="font-semibold">{model.hle_no_tools ?? '—'}%</span>
                          </div>
                          {model.hle_no_tools && (
                            <Progress value={model.hle_no_tools} className="h-2" />
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">Sources:</span>
                        {model.sources?.map((source: any) => (
                          <a
                            key={source.url}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            {source.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Release Timeline
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Chronological view of AI model releases
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {[...MODELS].sort(byReleaseDesc).map((model, index) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="relative pl-8 pb-8 last:pb-0"
                      >
                        {/* Timeline Line */}
                        <div className="absolute left-0 top-0 h-full w-px bg-border" />
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-0 flex h-4 w-4 -translate-x-[7px] rounded-full border-2 border-primary bg-background" />

                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-semibold">{model.name}</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              {model.released}
                            </Badge>
                            <Badge className={`gap-1 text-xs ${model.type === 'LLM' ? 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' : model.type === 'Image' ? 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' : model.type === 'Video' ? 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 'bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300'}`}>
                              {getTypeIcon(model.type)}
                              {model.type}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">{model.summary}</p>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <div className="flex h-5 w-5 items-center justify-center rounded border bg-muted/50">
                                <ProviderIcon name={model.provider} className="h-3 w-3" />
                              </div>
                              <span>{model.provider}</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {model.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-[10px]">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="mb-4 text-xl font-semibold">Statistics Overview</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">By Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.byType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(type)}
                        <span>{type}</span>
                      </div>
                      <Badge variant="secondary" className="font-semibold">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-3">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">By Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(stats.byProvider)
                    .sort(([, a], [, b]) => b - a)
                    .map(([provider, count]) => (
                      <div
                        key={provider}
                        className="flex items-center gap-2 rounded-lg border-2 px-3 py-2"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded border bg-muted/50">
                          <ProviderIcon name={provider} className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-medium">{provider}</span>
                        <Badge variant="secondary" className="text-xs">
                          {count}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>

      {/* Model Detail Modal */}
      <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
        <DialogContent className="max-w-2xl">
          {selectedModel && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-muted/50">
                      <ProviderIcon name={selectedModel.provider} className="h-8 w-8" />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedModel.name}</DialogTitle>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedModel.provider}</span>
                        <span>·</span>
                        <span>{selectedModel.released}</span>
                        {selectedModel.featured && (
                          <Badge variant="secondary" className="gap-1">
                            <Sparkles className="mr-0.5 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">About</h4>
                  <p className="text-muted-foreground">{selectedModel.summary}</p>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold">Type</h4>
                  <Badge className={`gap-1.5 border-2 px-3 py-1.5 text-sm font-semibold ${selectedModel.type === 'LLM' ? 'bg-purple-500/10 text-purple-700 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-300' : selectedModel.type === 'Image' ? 'bg-blue-500/10 text-blue-700 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-300' : selectedModel.type === 'Video' ? 'bg-green-500/10 text-green-700 border-green-500/30 dark:bg-green-500/20 dark:text-green-300' : 'bg-orange-500/10 text-orange-700 border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-300'}`}>
                    {getTypeIcon(selectedModel.type)}
                    {selectedModel.type}
                  </Badge>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <a
                  href={selectedModel.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-12 border-t py-8 text-center text-sm text-muted-foreground">
        <p className="mb-2">
          Timeline updated with 2025 releases: GLM-4.7 (Dec), Llama 4 (Apr), Midjourney v7 (Apr), Gemini 2.0 (Jan), and o3-mini (Jan).
        </p>
        <p className="text-xs">
          Data sourced from official announcements and public benchmarks. All links point to model interfaces.
        </p>
      </footer>
    </div>
  )
}
