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
  Moon,
  Palette
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

// Model Data - Upgraded to next-gen releases and new SOTA models
const MODELS = [
  {
    id: 'chatgpt-5-5-pro',
    name: 'ChatGPT 5.5 Pro',
    provider: 'OpenAI',
    type: 'LLM',
    released: 'Feb 15, 2026',
    summary: 'OpenAI\'s supreme frontier reasoning model tuned for advanced multi-agent planning, coding, and dynamic synthesis.',
    tags: ['Reasoning', 'Tool-use', 'Frontier', 'Agentic'],
    link: 'https://chatgpt.com/',
    featured: true,
  },
  {
    id: 'gemini-3-5-pro',
    name: 'Gemini 3.5 Pro',
    provider: 'Google',
    type: 'LLM',
    released: 'Jan 10, 2026',
    summary: 'Google\'s flagship multimodal marvel, native video understanding and massive 2M token context reasoning.',
    tags: ['Reasoning', 'Multimodal', 'Long context', 'Video native'],
    link: 'https://gemini.google.com/',
    featured: true,
  },
  {
    id: 'claude-5-0-opus',
    name: 'Claude 5.0 Opus',
    provider: 'Anthropic',
    type: 'LLM',
    released: 'Mar 02, 2026',
    summary: 'Anthropic\'s top-tier cognitive model designed for complex analysis, flawless system coding, and computer use workflows.',
    tags: ['Reasoning', 'Agents', 'Coding', 'Flawless logic'],
    link: 'https://claude.ai/',
    featured: true,
  },
  {
    id: 'grok-5-0',
    name: 'Grok 5.0',
    provider: 'xAI',
    type: 'LLM',
    released: 'Jan 28, 2026',
    summary: 'xAI\'s powerhouse engine featuring a highly tuned real-time database and deep analytical reasoning modes.',
    tags: ['Reasoning', 'Search', 'Real-time', 'Uncensored'],
    link: 'https://grok.com/',
    featured: true,
  },
  {
    id: 'glm-5-0',
    name: 'GLM-5.0 Deep Thinking',
    provider: 'Zhipu AI',
    type: 'LLM',
    released: 'Feb 18, 2026',
    summary: 'Zhipu AI\'s cutting-edge flagship with SOTA agentic coding, deep logical chain-of-thought, and multilinguality.',
    tags: ['Reasoning', 'Coding', 'Frontier', 'SOTA agentic'],
    link: 'https://z.ai/',
    featured: true,
  },
  {
    id: 'deepseek-r2',
    name: 'DeepSeek R2',
    provider: 'DeepSeek',
    type: 'LLM',
    released: 'Jan 20, 2026',
    summary: 'Elite open-weights reasoning model with unparalleled performance-to-cost ratio, advanced coding, and mathematics.',
    tags: ['Open Source', 'Reasoning', 'Coding', 'Math'],
    link: 'https://chat.deepseek.com/',
    featured: true,
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    type: 'LLM',
    released: 'Feb 2025',
    summary: 'The world\'s most popular coding and analytical model featuring interactive reasoning mode toggles.',
    tags: ['Coding', 'Reasoning', 'Developer favorite'],
    link: 'https://claude.ai/',
    featured: true,
  },
  {
    id: 'llama-5',
    name: 'Llama 5',
    provider: 'Meta',
    type: 'LLM',
    released: 'Feb 2026',
    summary: 'Meta\'s premier open-weights suite with high-capacity reasoning, structured JSON logic, and fast inference.',
    tags: ['Open weights', 'Reasoning', 'Fast API'],
    link: 'https://llama.meta.com/',
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    type: 'LLM',
    released: 'Dec 2024',
    summary: 'Ultra-cost-efficient 671B parameter Mixture-of-Experts open-weights model built for daily developer tasks.',
    tags: ['Open weights', 'MoE', 'Ultra cheap'],
    link: 'https://chat.deepseek.com/',
  },
  {
    id: 'midjourney-v8',
    name: 'Midjourney v8',
    provider: 'Midjourney',
    type: 'Image',
    released: 'Feb 2026',
    summary: 'Next-gen artistic rendering engine featuring native 8K texture rendering, advanced prompt consistency, and full pan-zoom tools.',
    tags: ['Art', 'T2I', 'High Fidelity', 'Creative'],
    link: 'https://www.midjourney.com/',
    featured: true,
  },
  {
    id: 'flux-2-pro',
    name: 'FLUX.2 Pro',
    provider: 'Black Forest Labs',
    type: 'Image',
    released: 'Dec 2025',
    summary: 'State-of-the-art open-weights image standard with stellar typography, realistic anatomy, and complex composition following.',
    tags: ['T2I', 'Typography', 'Open weights'],
    link: 'https://blackforestlabs.ai/',
    featured: true,
  },
  {
    id: 'stable-image-ultra',
    name: 'Stable Image Ultra',
    provider: 'Stability',
    type: 'Image',
    released: 'Oct 2025',
    summary: 'Stability\'s photorealistic masterpiece tailored for professional marketing assets and fine-detail textures.',
    tags: ['T2I', 'Photorealistic', 'Commercial'],
    link: 'https://stability.ai/',
  },
  {
    id: 'stable-diffusion-3-5',
    name: 'Stable Diffusion 3.5',
    provider: 'Stability',
    type: 'Image',
    released: 'Oct 2024',
    summary: 'High-performing, highly customisable local diffusion model popular for custom checkpoints and LoRA training.',
    tags: ['T2I', 'Open weights', 'Customisable'],
    link: 'https://stability.ai/',
  },
  {
    id: 'sora-v2',
    name: 'Sora v2',
    provider: 'OpenAI',
    type: 'Video',
    released: 'Nov 2025',
    summary: 'SOTA video model simulating real-world physics, rendering 1080p outputs with perfect spatial consistency up to 60s.',
    tags: ['T2V', 'Physics-based', 'SOTA video'],
    link: 'https://openai.com/sora',
    featured: true,
  },
  {
    id: 'runway-gen-5-0',
    name: 'Runway Gen-5.0',
    provider: 'Runway',
    type: 'Video',
    released: 'Jan 2026',
    summary: 'Cinematic powerhouse with full director controls, dynamic motion brushes, and unprecedented fidelity.',
    tags: ['T2V', 'Control', 'Cinematic'],
    link: 'https://runwayml.com/',
    featured: true,
  },
  {
    id: 'luma-dream-machine-v2',
    name: 'Luma Dream Machine v2',
    provider: 'Luma AI',
    type: 'Video',
    released: 'Dec 2025',
    summary: 'High-speed action sequence render model capable of seamless cinematic tracking and complex fluid dynamics.',
    tags: ['T2V', 'Action', 'Cinematic camera'],
    link: 'https://lumalabs.ai/dream-machine',
  },
  {
    id: 'kling-2-0',
    name: 'Kling 2.0',
    provider: 'Kuaishou',
    type: 'Video',
    released: 'Nov 2025',
    summary: 'Asia\'s flagship video generator, rendering lifelike character expressions and cinematic lighting.',
    tags: ['T2V', 'Character consistency', 'High Quality'],
    link: 'https://klingai.com/',
  },
  {
    id: 'suno-v4',
    name: 'Suno v4',
    provider: 'Suno',
    type: 'Audio',
    released: 'Jan 2026',
    summary: 'Full-song generation with flawless vocal clarity, structured instrument stems, and intelligent lyric formatting.',
    tags: ['Text-to-music', 'Vocals', 'Instrumental'],
    link: 'https://suno.com/',
    featured: true,
  },
  {
    id: 'udio-v2',
    name: 'Udio v2.0',
    provider: 'Udio',
    type: 'Audio',
    released: 'Feb 2026',
    summary: 'Professional grade text-to-music generator featuring custom audio mastering, audio-to-audio remixing, and separate stems.',
    tags: ['Text-to-music', 'Remixing', 'Studio Quality'],
    link: 'https://www.udio.com/',
    featured: true,
  },
  {
    id: 'elevenlabs-reader',
    name: 'ElevenLabs Reader',
    provider: 'ElevenLabs',
    type: 'Audio',
    released: 'Sep 2025',
    summary: 'World-leading voice cloning and text-to-speech engine with deep emotional inflection and multilingual support.',
    tags: ['TTS', 'Voice cloning', 'Narration'],
    link: 'https://elevenlabs.io/',
    featured: true,
  },
  {
    id: 'mistral-4',
    name: 'Mistral 4',
    provider: 'Mistral',
    type: 'LLM',
    released: 'Jan 2026',
    summary: 'European open flagship focusing on extreme token throughput, multi-lingual precision, and low-footprint hosting.',
    tags: ['Open weights', 'Efficiency', 'Multilingual'],
    link: 'https://chat.mistral.ai/',
  },
  {
    id: 'command-r-plus-plus',
    name: 'Command R++',
    provider: 'Cohere',
    type: 'LLM',
    released: 'Jan 2026',
    summary: 'Enterprise-grade LLM optimized for seamless RAG search, high-volume tool-use, and structured JSON outputs.',
    tags: ['RAG', 'Enterprise', 'JSON formatting'],
    link: 'https://cohere.com/',
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    type: 'LLM',
    released: 'Oct 2025',
    summary: 'Lightning-fast multimodal API with native audio output, real-time vision processing, and broad task efficiency.',
    tags: ['Multimodal', 'Real-time', 'Fast API'],
    link: 'https://gemini.google.com/',
  },
  {
    id: 'o4-mini',
    name: 'OpenAI o4-mini',
    provider: 'OpenAI',
    type: 'LLM',
    released: 'Feb 2026',
    summary: 'Fast and cheap reasoning model built for developer integrations, math operations, and recursive sub-agent logic.',
    tags: ['Reasoning', 'Math', 'Coding', 'API favorite'],
    link: 'https://chatgpt.com/',
  },
  {
    id: 'gpt-5o',
    name: 'GPT-5o',
    provider: 'OpenAI',
    type: 'LLM',
    released: 'Dec 2025',
    summary: 'Sleek real-time multimodal intelligence combining flawless speech synthesis, instant vision analysis, and reliable assistance.',
    tags: ['Multimodal', 'Real-time', 'Daily helper'],
    link: 'https://chatgpt.com/',
  },
  {
    id: 'claude-4-0-sonnet',
    name: 'Claude 4.0 Sonnet',
    provider: 'Anthropic',
    type: 'LLM',
    released: 'Jan 2026',
    summary: 'High-speed cognitive model popular for code bases, robust workspace agents, and extreme instruction-following precision.',
    tags: ['Reasoning', 'Coding', 'Agents'],
    link: 'https://claude.ai/',
  },
  {
    id: 'llama-4-vision',
    name: 'Llama 4 Vision',
    provider: 'Meta',
    type: 'LLM',
    released: 'Aug 2025',
    summary: 'Meta\'s premium open-weights vision LLM with excellent OCR, chart analysis, and spatial coordinate mapping.',
    tags: ['Open weights', 'Vision', 'OCR'],
    link: 'https://llama.meta.com/',
  },
  {
    id: 'qwen-3-0',
    name: 'Qwen 3.0',
    provider: 'Alibaba',
    type: 'LLM',
    released: 'Feb 2026',
    summary: 'Alibaba\'s powerhouse open weights suite with SOTA math reasoning and full local capability.',
    tags: ['Open weights', 'Math', 'Coding'],
    link: 'https://qwen.ai/',
  },
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral',
    type: 'LLM',
    released: 'Dec 2025',
    summary: 'Mistral\'s commercial cloud core featuring robust function calling, a 128k context, and multilingual accuracy.',
    tags: ['Multilingual', 'Enterprise', 'Function calling'],
    link: 'https://chat.mistral.ai/',
  },
]

// Upgraded Benchmark Data matching updated next-gen versions
const BENCHMARK_MODELS = [
  {
    id: 'gemini-3-5-pro',
    name: 'Gemini 3.5 Pro',
    provider: 'Google',
    released: 'Jan 10, 2026',
    link: 'https://gemini.google.com/',
    lmarena_elo: 1520,
    gpqa_diamond_no_tools: 94.2,
    swe_bench_verified: 81.5,
    arc_agi_2_verified: 36.4,
    hle_no_tools: 42.5,
    sources: [
      { label: 'Google', url: 'https://deepmind.google/technologies/gemini/' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'chatgpt-5-5-pro',
    name: 'ChatGPT 5.5 Pro',
    provider: 'OpenAI',
    released: 'Feb 15, 2026',
    link: 'https://chatgpt.com/',
    lmarena_elo: 1515,
    gpqa_diamond_no_tools: 95.0,
    swe_bench_verified: 84.2,
    arc_agi_2_verified: 56.1,
    hle_no_tools: 39.8,
    sources: [
      { label: 'OpenAI', url: 'https://openai.com/index/' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'deepseek-r2',
    name: 'DeepSeek R2',
    provider: 'DeepSeek',
    released: 'Jan 20, 2026',
    link: 'https://chat.deepseek.com/',
    lmarena_elo: 1512,
    gpqa_diamond_no_tools: 93.6,
    swe_bench_verified: 82.8,
    arc_agi_2_verified: 54.0,
    hle_no_tools: 44.1,
    sources: [
      { label: 'DeepSeek', url: 'https://github.com/deepseek-ai' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'glm-5-0',
    name: 'GLM-5.0 Deep Thinking',
    provider: 'Zhipu AI',
    released: 'Feb 18, 2026',
    link: 'https://z.ai/',
    lmarena_elo: 1508,
    gpqa_diamond_no_tools: 91.2,
    swe_bench_verified: 81.0,
    arc_agi_2_verified: 51.5,
    hle_no_tools: 46.2,
    sources: [
      { label: 'Zhipu AI', url: 'https://z.ai/' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'claude-5-0-opus',
    name: 'Claude 5.0 Opus',
    provider: 'Anthropic',
    released: 'Mar 02, 2026',
    link: 'https://claude.ai/',
    lmarena_elo: 1502,
    gpqa_diamond_no_tools: 92.5,
    swe_bench_verified: 83.5,
    arc_agi_2_verified: 42.1,
    hle_no_tools: 33.6,
    sources: [
      { label: 'Anthropic', url: 'https://www.anthropic.com/' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
  {
    id: 'grok-5-0',
    name: 'Grok 5.0',
    provider: 'xAI',
    released: 'Jan 28, 2026',
    link: 'https://grok.com/',
    lmarena_elo: 1495,
    gpqa_diamond_no_tools: 89.8,
    swe_bench_verified: 79.5,
    arc_agi_2_verified: 32.5,
    hle_no_tools: 35.4,
    sources: [
      { label: 'xAI', url: 'https://x.ai/' },
      { label: 'LMArena', url: 'https://lmarena.ai/leaderboard/text' },
    ],
  },
]

// Pricing Data - Comprehensive token limits and pricing details for SOTA models
const PRICING_DATA = [
  { id: 'chatgpt-5-5-pro', name: 'ChatGPT 5.5 Pro', provider: 'OpenAI', type: 'LLM', context: '1,000,000', inputCost: 5.00, outputCost: 15.00, desc: 'Advanced reasoning, logic, and long-doc multi-agent workflows.' },
  { id: 'gemini-3-5-pro', name: 'Gemini 3.5 Pro', provider: 'Google', type: 'LLM', context: '2,000,000', inputCost: 1.25, outputCost: 5.00, desc: 'Highest native multimodal context window and native video processing.' },
  { id: 'claude-5-0-opus', name: 'Claude 5.0 Opus', provider: 'Anthropic', type: 'LLM', context: '200,000', inputCost: 15.00, outputCost: 75.00, desc: 'Extreme logical precision, large developer codebase analysis, and complex code.' },
  { id: 'grok-5-0', name: 'Grok 5.0', provider: 'xAI', type: 'LLM', context: '128,000', inputCost: 2.00, outputCost: 10.00, desc: 'Real-time search database query synthesis and preference alignment.' },
  { id: 'glm-5-0', name: 'GLM-5.0 Deep Thinking', provider: 'Zhipu AI', type: 'LLM', context: '128,000', inputCost: 1.00, outputCost: 4.00, desc: 'Flagship reasoning and high performance bilingual agentic coding.' },
  { id: 'deepseek-r2', name: 'DeepSeek R2', provider: 'DeepSeek', type: 'LLM', context: '128,000', inputCost: 0.14, outputCost: 0.28, desc: 'SOTA open-weights reasoning model with extremely low operating cost.' },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', type: 'LLM', context: '200,000', inputCost: 3.00, outputCost: 15.00, desc: 'Developer favorite featuring active thinking and fast interactive loops.' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', type: 'LLM', context: '128,000', inputCost: 0.14, outputCost: 0.28, desc: 'Ultra-cheap 671B open-weights Mixture-of-Experts standard.' },
  { id: 'o4-mini', name: 'OpenAI o4-mini', provider: 'OpenAI', type: 'LLM', context: '128,000', inputCost: 0.15, outputCost: 0.60, desc: 'Ultra-fast cheap reasoning API optimized for STEM math operations.' },
  { id: 'gpt-5o', name: 'GPT-5o', provider: 'OpenAI', type: 'LLM', context: '128,000', inputCost: 2.50, outputCost: 10.00, desc: 'Reliable Daily Helper assistant with real-time speech and vision support.' },
  { id: 'claude-4-0-sonnet', name: 'Claude 4.0 Sonnet', provider: 'Anthropic', type: 'LLM', context: '200,000', inputCost: 3.00, outputCost: 15.00, desc: 'High-speed cognitive workspace model with elite agentic accuracy.' },
  { id: 'midjourney-v8', name: 'Midjourney v8', provider: 'Midjourney', type: 'Image', context: 'N/A', inputCost: 0, outputCost: 0, unitCost: 0.05, unitLabel: '/ image', desc: 'Flagship photorealistic digital art generation.' },
  { id: 'flux-2-pro', name: 'FLUX.2 Pro', provider: 'Black Forest Labs', type: 'Image', context: 'N/A', inputCost: 0, outputCost: 0, unitCost: 0.04, unitLabel: '/ image', desc: 'Advanced prompt adherence and high fidelity text rendering.' },
  { id: 'sora-v2', name: 'Sora v2', provider: 'OpenAI', type: 'Video', context: 'N/A', inputCost: 0, outputCost: 0, unitCost: 0.10, unitLabel: '/ video sec', desc: 'State-of-the-art physical world scene simulation.' },
  { id: 'runway-gen-5-0', name: 'Runway Gen-5.0', provider: 'Runway', type: 'Video', context: 'N/A', inputCost: 0, outputCost: 0, unitCost: 0.08, unitLabel: '/ video sec', desc: 'Professional cinematic camera brushes and motion controllers.' },
  { id: 'suno-v4', name: 'Suno v4', provider: 'Suno', type: 'Audio', context: 'N/A', inputCost: 0, outputCost: 0, unitCost: 0.01, unitLabel: '/ song', desc: 'Text to full high-fidelity vocal tracks and separation.' },
  { id: 'udio-v2', name: 'Udio v2.0', provider: 'Udio', type: 'Audio', context: 'N/A', inputCost: 0, outputCost: 0, unitCost: 0.01, unitLabel: '/ song', desc: 'Professional studio-grade audio rendering and masters.' }
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
  key?: any
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
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 hover:border-primary/30 dark:bg-primary/10 dark:text-white dark:hover:bg-primary/20"
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

const PALETTES = [
  { id: 'slate', name: 'Zinc Slate (Classic)', color: 'bg-zinc-500' },
  { id: 'emerald', name: 'Midnight Emerald', color: 'bg-emerald-500' },
  { id: 'cyberpunk', name: 'Cyberpunk Gold', color: 'bg-yellow-500' },
  { id: 'rose', name: 'Sunset Rose', color: 'bg-rose-500' },
  { id: 'ocean', name: 'Ocean Breeze', color: 'bg-sky-500' },
  { id: 'nebula', name: 'Royal Purple', color: 'bg-indigo-500' },
]

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
  const [palette, setPalette] = useState('slate')

  // Pricing calculator states
  const [calcModel, setCalcModel] = useState('chatgpt-5-5-pro')
  const [calcInputTokens, setCalcInputTokens] = useState(100000)
  const [calcOutputTokens, setCalcOutputTokens] = useState(20000)
  const [calcQuantity, setCalcQuantity] = useState(10)
  const [pricingQuery, setPricingQuery] = useState('')

  // Load favorites & theme palette from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ai-models-favorites')
    if (saved) {
      try {
        setFavorites(new Set(JSON.parse(saved)))
      } catch (e) {
        console.error('Failed to load favorites:', e)
      }
    }
    const savedPalette = localStorage.getItem('ai-models-palette') || 'slate'
    setPalette(savedPalette)
    document.documentElement.setAttribute('data-palette', savedPalette)
  }, [])

  const changePalette = (newPalette: string) => {
    setPalette(newPalette)
    localStorage.setItem('ai-models-palette', newPalette)
    document.documentElement.setAttribute('data-palette', newPalette)
    toast.success(`Theme updated to ${PALETTES.find(p => p.id === newPalette)?.name}`)
  }

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

  const [benchSortField, setBenchSortField] = useState<string>('lmarena_elo')
  const [benchSortOrder, setBenchSortOrder] = useState<'asc' | 'desc'>('desc')

  const maxMetrics = useMemo(() => {
    const elos = BENCHMARK_MODELS.map(m => m.lmarena_elo).filter(Boolean) as number[]
    const gpqa = BENCHMARK_MODELS.map(m => m.gpqa_diamond_no_tools).filter(Boolean) as number[]
    const swe = BENCHMARK_MODELS.map(m => m.swe_bench_verified).filter(Boolean) as number[]
    const arc = BENCHMARK_MODELS.map(m => m.arc_agi_2_verified).filter(Boolean) as number[]
    const hle = BENCHMARK_MODELS.map(m => m.hle_no_tools).filter(Boolean) as number[]

    return {
      lmarena_elo: elos.length ? Math.max(...elos) : 0,
      gpqa_diamond_no_tools: gpqa.length ? Math.max(...gpqa) : 0,
      swe_bench_verified: swe.length ? Math.max(...swe) : 0,
      arc_agi_2_verified: arc.length ? Math.max(...arc) : 0,
      hle_no_tools: hle.length ? Math.max(...hle) : 0,
    }
  }, [])

  const sortedBenchmarks = useMemo(() => {
    let list = [...BENCHMARK_MODELS]
    if (provider !== 'All') {
      list = list.filter(b => b.provider === provider)
    }
    
    return list.sort((a: any, b: any) => {
      const valA = a[benchSortField]
      const valB = b[benchSortField]
      
      if (valA === null || valA === undefined) return 1
      if (valB === null || valB === undefined) return -1
      
      if (benchSortOrder === 'asc') {
        return valA - valB
      } else {
        return valB - valA
      }
    })
  }, [provider, benchSortField, benchSortOrder])

  const calcResult = useMemo(() => {
    const selected = PRICING_DATA.find(p => p.id === calcModel) || PRICING_DATA[0]
    
    let total = 0
    let breakdown = { input: 0, output: 0, media: 0 }
    
    if (selected.type === 'LLM') {
      breakdown.input = (calcInputTokens / 1_000_000) * selected.inputCost
      breakdown.output = (calcOutputTokens / 1_000_000) * selected.outputCost
      total = breakdown.input + breakdown.output
    } else {
      breakdown.media = calcQuantity * (selected.unitCost || 0)
      total = breakdown.media
    }
    
    // Find deepseek open weights equivalent for saving suggestions
    let savings: any = null
    if (selected.type === 'LLM' && selected.id !== 'deepseek-r2' && selected.id !== 'deepseek-v3') {
      const cheapRef = PRICING_DATA.find(p => p.id === 'deepseek-r2')!
      const cheapInput = (calcInputTokens / 1_000_000) * cheapRef.inputCost
      const cheapOutput = (calcOutputTokens / 1_000_000) * cheapRef.outputCost
      const cheapTotal = cheapInput + cheapOutput
      const diff = total - cheapTotal
      const percent = total > 0 ? (diff / total) * 100 : 0
      
      if (diff > 0.001) {
        savings = {
          name: cheapRef.name,
          total: cheapTotal,
          savedAmount: diff,
          percent: percent.toFixed(0)
        }
      }
    }
    
    return {
      model: selected,
      total,
      breakdown,
      savings
    }
  }, [calcModel, calcInputTokens, calcOutputTokens, calcQuantity])

  const filteredPricing = useMemo(() => {
    const q = pricingQuery.trim().toLowerCase()
    return PRICING_DATA.filter((p) => {
      if (provider !== 'All' && p.provider !== provider) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      )
    })
  }, [pricingQuery, provider])

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

            <div className="flex items-center gap-3">
              {/* Color Palette / Theme Selector */}
              <Select value={palette} onValueChange={changePalette}>
                <SelectTrigger className="w-[185px] border-2 h-10 font-semibold hover:bg-muted transition-all">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    <SelectValue placeholder="Theme Palette" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {PALETTES.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className={`h-3.5 w-3.5 rounded-full ${p.color} border border-white/20`} />
                        <span>{p.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Enhanced Theme Toggle Button */}
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="default"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="gap-2 font-semibold h-10"
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
          <TabsList className="grid w-full grid-cols-4 lg:w-[800px]">
            <TabsTrigger value="models" className="gap-2 font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Models ({filtered.length})
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="gap-2 font-semibold">
              <Award className="h-4 w-4" />
              Benchmarks
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2 font-semibold">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2 font-semibold">
              <Zap className="h-4 w-4 text-amber-500 fill-amber-500/20" />
              Token & Pricing
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
            <Card className="shadow-xl border-2">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <Award className="h-6 w-6 text-primary animate-pulse" />
                    Frontier Model Benchmarks
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Direct comparison matrix of cognitive reasoning and abstraction performance metrics
                  </p>
                </div>
                {provider !== 'All' && (
                  <Badge variant="outline" className="text-xs py-1 border-primary/40 bg-primary/5 text-primary self-start sm:self-center font-bold">
                    Filtering provider: {provider}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto border-t sm:border border-border sm:rounded-xl">
                  <table className="w-full text-sm text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border select-none">
                        <th className="p-4 font-semibold text-muted-foreground">Model & Provider</th>
                        <th 
                          onClick={() => {
                            if (benchSortField === 'lmarena_elo') {
                              setBenchSortOrder(benchSortOrder === 'desc' ? 'asc' : 'desc')
                            } else {
                              setBenchSortField('lmarena_elo')
                              setBenchSortOrder('desc')
                            }
                          }}
                          className="p-4 font-bold text-muted-foreground cursor-pointer hover:text-primary transition-all text-center border-l"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>LMArena Elo</span>
                            <span className="text-[11px] opacity-75">
                              {benchSortField === 'lmarena_elo' ? (benchSortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                            </span>
                          </div>
                        </th>
                        <th 
                          onClick={() => {
                            if (benchSortField === 'gpqa_diamond_no_tools') {
                              setBenchSortOrder(benchSortOrder === 'desc' ? 'asc' : 'desc')
                            } else {
                              setBenchSortField('gpqa_diamond_no_tools')
                              setBenchSortOrder('desc')
                            }
                          }}
                          className="p-4 font-bold text-muted-foreground cursor-pointer hover:text-primary transition-all text-center border-l"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>GPQA Diamond</span>
                            <span className="text-[11px] opacity-75">
                              {benchSortField === 'gpqa_diamond_no_tools' ? (benchSortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                            </span>
                          </div>
                        </th>
                        <th 
                          onClick={() => {
                            if (benchSortField === 'swe_bench_verified') {
                              setBenchSortOrder(benchSortOrder === 'desc' ? 'asc' : 'desc')
                            } else {
                              setBenchSortField('swe_bench_verified')
                              setBenchSortOrder('desc')
                            }
                          }}
                          className="p-4 font-bold text-muted-foreground cursor-pointer hover:text-primary transition-all text-center border-l"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>SWE-bench</span>
                            <span className="text-[11px] opacity-75">
                              {benchSortField === 'swe_bench_verified' ? (benchSortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                            </span>
                          </div>
                        </th>
                        <th 
                          onClick={() => {
                            if (benchSortField === 'arc_agi_2_verified') {
                              setBenchSortOrder(benchSortOrder === 'desc' ? 'asc' : 'desc')
                            } else {
                              setBenchSortField('arc_agi_2_verified')
                              setBenchSortOrder('desc')
                            }
                          }}
                          className="p-4 font-bold text-muted-foreground cursor-pointer hover:text-primary transition-all text-center border-l"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>ARC-AGI-2</span>
                            <span className="text-[11px] opacity-75">
                              {benchSortField === 'arc_agi_2_verified' ? (benchSortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                            </span>
                          </div>
                        </th>
                        <th 
                          onClick={() => {
                            if (benchSortField === 'hle_no_tools') {
                              setBenchSortOrder(benchSortOrder === 'desc' ? 'asc' : 'desc')
                            } else {
                              setBenchSortField('hle_no_tools')
                              setBenchSortOrder('desc')
                            }
                          }}
                          className="p-4 font-bold text-muted-foreground cursor-pointer hover:text-primary transition-all text-center border-l"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span>HLE (no tools)</span>
                            <span className="text-[11px] opacity-75">
                              {benchSortField === 'hle_no_tools' ? (benchSortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                            </span>
                          </div>
                        </th>
                        <th className="p-4 font-semibold text-muted-foreground text-center border-l">Sources</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBenchmarks.map((model, idx) => (
                        <tr 
                          key={model.id} 
                          className="border-b border-border hover:bg-muted/30 transition-colors last:border-0"
                        >
                          <td className="p-4 font-medium flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/60 shrink-0 shadow-sm">
                              <ProviderIcon name={model.provider} className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <div className="font-semibold text-[14px]">{model.name}</div>
                              <div className="text-[11px] text-muted-foreground">{model.released}</div>
                            </div>
                          </td>
                          <td className="p-4 text-center border-l font-semibold">
                            <div className="flex justify-center items-center">
                              {model.lmarena_elo === maxMetrics.lmarena_elo ? (
                                <Badge className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 gap-1 font-bold">
                                  <span>👑 {model.lmarena_elo}</span>
                                </Badge>
                              ) : (
                                <span>{model.lmarena_elo ?? '—'}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center border-l font-semibold">
                            <div className="flex justify-center items-center">
                              {model.gpqa_diamond_no_tools === maxMetrics.gpqa_diamond_no_tools ? (
                                <Badge className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 gap-1 font-bold">
                                  <span>👑 {model.gpqa_diamond_no_tools}%</span>
                                </Badge>
                              ) : (
                                <span>{model.gpqa_diamond_no_tools ? `${model.gpqa_diamond_no_tools}%` : '—'}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center border-l font-semibold">
                            <div className="flex justify-center items-center">
                              {model.swe_bench_verified === maxMetrics.swe_bench_verified ? (
                                <Badge className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 gap-1 font-bold">
                                  <span>👑 {model.swe_bench_verified}%</span>
                                </Badge>
                              ) : (
                                <span>{model.swe_bench_verified ? `${model.swe_bench_verified}%` : '—'}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center border-l font-semibold">
                            <div className="flex justify-center items-center">
                              {model.arc_agi_2_verified === maxMetrics.arc_agi_2_verified ? (
                                <Badge className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 gap-1 font-bold">
                                  <span>👑 {model.arc_agi_2_verified}%</span>
                                </Badge>
                              ) : (
                                <span>{model.arc_agi_2_verified ? `${model.arc_agi_2_verified}%` : '—'}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center border-l font-semibold">
                            <div className="flex justify-center items-center">
                              {model.hle_no_tools === maxMetrics.hle_no_tools ? (
                                <Badge className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 gap-1 font-bold">
                                  <span>👑 {model.hle_no_tools}%</span>
                                </Badge>
                              ) : (
                                <span>{model.hle_no_tools ? `${model.hle_no_tools}%` : '—'}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 border-l">
                            <div className="flex flex-wrap items-center justify-center gap-1.5">
                              {model.sources?.map((source: any) => (
                                <a
                                  key={source.url}
                                  href={source.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-primary hover:underline hover:text-primary/80 border border-primary/20 px-1.5 py-0.5 rounded bg-primary/5 transition-colors"
                                >
                                  {source.label}
                                </a>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Directory Column */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-xl border-2">
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500 fill-amber-500/20" />
                        Token & Pricing Directory
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Context window sizes and API rates per million tokens
                      </p>
                    </div>
                    <div className="relative w-full sm:w-[220px]">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={pricingQuery}
                        onChange={(e) => setPricingQuery(e.target.value)}
                        placeholder="Search pricing..."
                        className="h-9 pl-9 text-xs"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 sm:p-6">
                    <div className="overflow-x-auto border-t sm:border border-border sm:rounded-xl">
                      <table className="w-full text-sm text-left border-collapse min-w-[550px]">
                        <thead>
                          <tr className="bg-muted/50 border-b border-border select-none text-xs">
                            <th className="p-3.5 font-semibold text-muted-foreground">Model</th>
                            <th className="p-3.5 font-semibold text-muted-foreground text-center border-l">Context</th>
                            <th className="p-3.5 font-semibold text-muted-foreground text-center border-l">Input / 1M</th>
                            <th className="p-3.5 font-semibold text-muted-foreground text-center border-l">Output / 1M</th>
                            <th className="p-3.5 font-semibold text-muted-foreground text-center border-l">Unit Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPricing.map((item) => (
                            <tr 
                              key={item.id}
                              className="border-b border-border hover:bg-muted/20 transition-colors last:border-0 text-xs cursor-pointer"
                              onClick={() => {
                                setCalcModel(item.id)
                                toast.success(`Calculator set to ${item.name}`)
                              }}
                            >
                              <td className="p-3.5 font-medium flex items-center gap-2.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-muted/60 shrink-0">
                                  <ProviderIcon name={item.provider} className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <div className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                    <span>{item.name}</span>
                                    {item.id === calcModel && (
                                      <Badge className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[9px] px-1 py-0 h-4">
                                        Selected
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground max-w-[280px] truncate">{item.desc}</div>
                                </div>
                              </td>
                              <td className="p-3.5 text-center border-l font-semibold text-muted-foreground">
                                {item.context}
                              </td>
                              <td className="p-3.5 text-center border-l font-semibold text-foreground">
                                {item.type === 'LLM' ? `$${item.inputCost.toFixed(2)}` : '—'}
                              </td>
                              <td className="p-3.5 text-center border-l font-semibold text-foreground">
                                {item.type === 'LLM' ? `$${item.outputCost.toFixed(2)}` : '—'}
                              </td>
                              <td className="p-3.5 text-center border-l font-semibold text-foreground">
                                {item.unitCost ? `$${item.unitCost.toFixed(3)}${item.unitLabel}` : '—'}
                              </td>
                            </tr>
                          ))}
                          {filteredPricing.length === 0 && (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                No models found matching pricing criteria.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calculator Column */}
              <div className="space-y-6">
                <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-b from-card to-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Cost Estimator
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Estimate your API or usage expenses in real-time
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    
                    {/* Model Dropdown */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Model</label>
                      <Select value={calcModel} onValueChange={setCalcModel}>
                        <SelectTrigger className="w-full border-2">
                          <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRICING_DATA.map((p) => (
                            <SelectItem key={p.id} value={p.id} className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${p.type === 'LLM' ? 'bg-purple-500' : 'bg-blue-500'} shrink-0`} />
                                <span>{p.name} ({p.provider})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* LLM Inputs */}
                    {calcResult.model.type === 'LLM' ? (
                      <div className="space-y-5">
                        
                        {/* Input Tokens */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Input Volume (Tokens)</label>
                            <span className="text-xs font-extrabold text-primary">{calcInputTokens.toLocaleString()}</span>
                          </div>
                          <Input
                            type="number"
                            value={calcInputTokens}
                            onChange={(e) => setCalcInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                            className="h-9 text-xs border-2"
                          />
                          {/* Presets */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcInputTokens(10000)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              10k (Prompt)
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcInputTokens(100000)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              100k (Doc)
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcInputTokens(500000)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              500k (Codebase)
                            </Button>
                          </div>
                        </div>

                        {/* Output Tokens */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Output Volume (Tokens)</label>
                            <span className="text-xs font-extrabold text-primary">{calcOutputTokens.toLocaleString()}</span>
                          </div>
                          <Input
                            type="number"
                            value={calcOutputTokens}
                            onChange={(e) => setCalcOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                            className="h-9 text-xs border-2"
                          />
                          {/* Presets */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcOutputTokens(1000)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              1k (Short)
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcOutputTokens(4000)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              4k (Code)
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcOutputTokens(16000)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              16k (Long)
                            </Button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Generation Inputs */
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Quantity ({calcResult.model.unitLabel?.replace('/', '')})
                          </label>
                          <span className="text-xs font-extrabold text-primary">{calcQuantity.toLocaleString()}</span>
                        </div>
                        <Input
                          type="number"
                          value={calcQuantity}
                          onChange={(e) => setCalcQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                          className="h-9 text-xs border-2"
                        />
                        {/* Slider presets */}
                        <div className="flex gap-1 mt-1.5">
                          {[5, 25, 100].map((val) => (
                            <Button 
                              key={val}
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCalcQuantity(val)}
                              className="text-[10px] h-6 px-2 py-0"
                            >
                              {val} {calcResult.model.type === 'Image' ? 'images' : 'sec'}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator className="my-2" />

                    {/* Calculated Output Cost */}
                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center space-y-1">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Estimated Cost</div>
                      <div className="text-3xl font-extrabold text-primary tracking-tight">
                        {calcResult.total < 0.000001 ? '$0.00' : `$${calcResult.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}`}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {calcResult.model.type === 'LLM' ? (
                          <span>
                            In: ${(calcResult.breakdown.input).toFixed(4)} · Out: ${(calcResult.breakdown.output).toFixed(4)}
                          </span>
                        ) : (
                          <span>
                            Media Unit Base Pricing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Money Saving Tip Card */}
                    {calcResult.savings && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3.5 rounded-xl border border-yellow-500/30 bg-yellow-500/10 dark:bg-yellow-500/15 text-xs space-y-1.5 text-yellow-800 dark:text-yellow-400"
                      >
                        <div className="font-extrabold flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 fill-yellow-500/10 text-yellow-500" />
                          <span>Smart Savings Opportunity!</span>
                        </div>
                        <p className="leading-normal">
                          Switch to <strong className="font-bold">{calcResult.savings.name}</strong> to execute this exact prompt for <strong className="font-bold">${calcResult.savings.total.toFixed(4)}</strong> — saving you <strong className="font-bold">${calcResult.savings.savedAmount.toFixed(2)} ({calcResult.savings.percent}%)</strong>!
                        </p>
                      </motion.div>
                    )}

                  </CardContent>
                </Card>
              </div>

            </div>
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
                    .sort(([, a], [, b]) => (b as number) - (a as number))
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
