import React from 'react';
import { 
  OpenAI, 
  Google, 
  Anthropic, 
  Mistral, 
  Meta, 
  Moonshot, 
  Minimax,
  Qwen,
  DeepSeek,
  Claude,
  Gemini,
  Gemma,
  Groq,
  Zhipu,
  Together,
  Fireworks,
  Ollama,
  Perplexity,
  Cohere,
  Ai21,
  Baichuan,
  Hunyuan,
  Stepfun,
  Spark,
  Ai360,
  SiliconCloud,
  Upstage,
  Novita,
  Wenxin,
  Volcengine,
  OpenRouter,
  Replicate,
  HuggingFace,
  Stability,
  Midjourney,
  Runway,
  Luma,
  Pika,
  VertexAI,
  AzureAI,
  Bedrock,
  Snowflake,
  Cerebras,
  Lambda,
  SambaNova,
  Github,
  Microsoft,
  XAI,
  Nvidia,
  AionLabs
} from '@lobehub/icons';
import { GiBeveledStar } from "react-icons/gi";

// Default icon for unknown providers
const DefaultIcon = () => (
    <GiBeveledStar className="w-8 h-8"/>
);

// Provider icons mapping using @lobehub/icons
export const providerIcons: Record<string, React.ReactNode> = {
  'openai': <OpenAI.Avatar size={32} />,
  'google': <Google.Avatar size={32} />,
  'anthropic': <Anthropic.Avatar size={32} />,
  'mistralai': <Mistral.Avatar size={32} />,
  'meta': <Meta.Avatar size={32} />,
  'llama': <Meta.Avatar size={32} />,
  'moonshotai': <Moonshot.Avatar size={32} />,
  'moonshot': <Moonshot.Avatar size={32} />,
  'minimax': <Minimax.Avatar size={32} />,
  'qwen': <Qwen.Avatar size={32} />,
  'deepseek': <DeepSeek.Avatar size={32} />,
  'claude': <Claude.Avatar size={32} />,
  'gemini': <Gemini.Avatar size={32} />,
  'gemma': <Gemma.Avatar size={32} />,
  'groq': <Groq.Avatar size={32} />,
  'zhipu': <Zhipu.Avatar size={32} />,
  'together': <Together.Avatar size={32} />,
  'togetherai': <Together.Avatar size={32} />,
  'fireworks': <Fireworks.Avatar size={32} />,
  'fireworksai': <Fireworks.Avatar size={32} />,
  'ollama': <Ollama.Avatar size={32} />,
  'perplexity': <Perplexity.Avatar size={32} />,
  'cohere': <Cohere.Avatar size={32} />,
  'ai21': <Ai21.Avatar size={32} />,
  'ai21labs': <Ai21.Avatar size={32} />,
  'baichuan': <Baichuan.Avatar size={32} />,
  'hunyuan': <Hunyuan.Avatar size={32} />,
  'stepfun': <Stepfun.Avatar size={32} />,
  'spark': <Spark.Avatar size={32} />,
  'ai360': <Ai360.Avatar size={32} />,
  'siliconcloud': <SiliconCloud.Avatar size={32} />,
  'siliconflow': <SiliconCloud.Avatar size={32} />,
  'upstage': <Upstage.Avatar size={32} />,
  'novita': <Novita.Avatar size={32} />,
  'wenxin': <Wenxin.Avatar size={32} />,
  'volcengine': <Volcengine.Avatar size={32} />,
  'openrouter': <OpenRouter.Avatar size={32} />,
  'replicate': <Replicate.Avatar size={32} />,
  'huggingface': <HuggingFace.Avatar size={32} />,
  'stability': <Stability.Avatar size={32} />,
  'stabilityai': <Stability.Avatar size={32} />,
  'midjourney': <Midjourney.Avatar size={32} />,
  'runway': <Runway.Avatar size={32} />,
  'luma': <Luma.Avatar size={32} />,
  'pika': <Pika.Avatar size={32} />,
  'vertex': <VertexAI.Avatar size={32} />,
  'vertexai': <VertexAI.Avatar size={32} />,
  'azure': <AzureAI.Avatar size={32} />,
  'azureai': <AzureAI.Avatar size={32} />,
  'bedrock': <Bedrock.Avatar size={32} />,
  'aws': <Bedrock.Avatar size={32} />,
  'snowflake': <Snowflake.Avatar size={32} />,
  'cerebras': <Cerebras.Avatar size={32} />,
  'lambda': <Lambda.Avatar size={32} />,
  'sambanova': <SambaNova.Avatar size={32} />,
  'github': <Github.Avatar size={32} />,
  'microsoft': <Microsoft.Avatar size={32} />,
  'xai': <XAI.Avatar size={32} />,
  'nvidia': <Nvidia.Avatar size={32} />,
  'aionlabs': <AionLabs.Avatar size={32} />,
  'amazon': <Bedrock.Avatar size={32} />
};

// Helper function to get provider from model ID
export const getProviderFromModel = (modelId: string): string => {
  if (modelId.includes('/')) {
    return modelId.split('/')[0].toLowerCase();
  }
  return 'unknown';
};

// Helper function to get provider icon
export const getProviderIcon = (modelId: string): React.ReactNode => {
  const provider = getProviderFromModel(modelId);
  return providerIcons[provider] || <DefaultIcon />;
};

export { DefaultIcon }; 