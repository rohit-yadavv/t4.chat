import { queryOptions } from "@tanstack/react-query";

const fetchOpenRouterModels = async (): Promise<any> => {
  try {
    const url = "https://openrouter.ai/api/v1/models";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || ''}`, // Add API key if required
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    // Validate response structure
    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Invalid API response structure: 'data' array is missing");
    }

    // Process model names to extract content after the colon
    return {
      data: data.data.map((model: any) => ({
        ...model,
        name: model.name && typeof model.name === 'string' && model.name.includes(':')
          ? model.name.split(':')[1].trim()
          : model.name || 'Unknown Model',
      })),
    };
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    return { data: [] }; // Return empty array to prevent breaking the UI
  }
};

export const openRouterModelsQueryOptions = queryOptions({
  queryKey: ["openRouterModels"],
  queryFn: fetchOpenRouterModels,
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  retry: 3,
});