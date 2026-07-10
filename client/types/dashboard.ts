export interface UserSession {
      user?: {
            name?: string;
            email?: string;
            image?: string | null;
      };
}

export interface PlatformState {
      connected: boolean;
      status: string;
      loading: boolean;
}

export interface Platforms {
      github: PlatformState;
      leetcode: PlatformState;
}

export interface Metrics {
      repos: string;
      contributions: string;
      projects: string;
}
