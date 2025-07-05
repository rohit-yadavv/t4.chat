"use server";
import connectDB from "@/config/db";
import { serializeData } from "@/lib/constant";
import User from "@/models/user.model";
import { auth } from "@/auth";
import { unstable_update as update } from "@/auth";
import { encrypt } from "@/lib/secure-pwd";

export const createOrUpdateGeminiKey = async (key: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }
    user.geminiApiKey = encrypt(key);
    const updatedUser = await user.save();
    return {
      data: serializeData(updatedUser),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const updateKey = async (data: any) => {
  const session = await auth();
  if (!session?.user || !data) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  try {
    await update({
      user: {
        ...session.user,
        openRouterApiKey: data.openRouterApiKey,
      },
    });
    return {
      data: serializeData(session.user),
      error: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      error: error,
    };
  }
};

export const getUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }
    return {
      data: serializeData(user),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const updateT3ChatInfo = async ({
  username,
  profession,
  skills,
  additionalInfo,
}: {
  username?: string;
  profession?: string;
  skills?: string[];
  additionalInfo?: string;
}) => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    // Initialize t3ChatInfo if it doesn't exist
    if (!user.t3ChatInfo) {
      user.t3ChatInfo = {};
    }

    // Update only provided fields
    if (username !== undefined) {
      user.t3ChatInfo.username = username;
    }
    if (profession !== undefined) {
      user.t3ChatInfo.profession = profession;
    }
    if (skills !== undefined) {
      user.t3ChatInfo.skills = skills;
    }
    if (additionalInfo !== undefined) {
      user.t3ChatInfo.additionalInfo = additionalInfo;
    }

    await user.save();

    return {
      data: serializeData(user.t3ChatInfo),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const updateOpenRouterApiKey = async (key: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    user.openRouterApiKey = encrypt(key);
    const updatedUser = await user.save();
    return {
      data: serializeData(updatedUser),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const removeOpenRouterApiKey = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    user.openRouterApiKey = "";
    await user.save();
    return {
      data: serializeData(user),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error,
    };
  }
};

export const updateModels = async ({ selected }: { selected?: string[] }) => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    if (selected !== undefined) {
      user.models.selected = selected;
    }

    await user.save();

    return {
      data: serializeData(user.models),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

// this action will implement later
export const addApiKey = async ({
  model,
  key,
}: {
  model: string;
  key: string;
}) => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    // Check if model already exists
    const existingApiKey = user.apiKeys.find(
      (apiKey: any) => apiKey.model === model
    );

    if (existingApiKey) {
      return {
        data: null,
        error: "API key for this model already exists",
      };
    }

    user.apiKeys.push({ model, key });
    await user.save();

    return {
      data: serializeData(user.apiKeys),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

// this action will implement later
export const updateApiKey = async ({
  _id,
  key,
}: {
  _id: string;
  key: string;
}) => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    const apiKeyIndex = user.apiKeys.findIndex(
      (apiKey: any) => apiKey._id.toString() === _id
    );

    if (apiKeyIndex === -1) {
      return {
        data: null,
        error: "API key not found",
      };
    }

    if (key !== undefined) {
      user.apiKeys[apiKeyIndex].key = key;
    }

    await user.save();

    return {
      data: serializeData(user.apiKeys),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

// this action will implement later
export const deleteApiKey = async ({ _id }: { _id: string }) => {
  const session = await auth();

  if (!session?.user) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    const apiKeyIndex = user.apiKeys.findIndex(
      (apiKey: any) => apiKey._id.toString() === _id
    );

    if (apiKeyIndex === -1) {
      return {
        data: null,
        error: "API key not found",
      };
    }

    user.apiKeys.splice(apiKeyIndex, 1);
    await user.save();

    return {
      data: serializeData(user.apiKeys),
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};
