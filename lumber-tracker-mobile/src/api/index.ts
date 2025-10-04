// API service for connecting to backend
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  retries: 3,
};

export interface LumberPackage {
  _id: string;
  packageNumber: string;
  species: string;
  dimensions: string;
  grade: string;
  quantity: number;
  receivedDate: Date;
  supplier: string;
  location: string;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

class ApiService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.apiBaseUrl}${endpoint}`;
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getLumberPackages(): Promise<LumberPackage[]> {
    return this.makeRequest<LumberPackage[]>('/lumberPackages');
  }

  async getLumberPackage(id: string): Promise<LumberPackage> {
    return this.makeRequest<LumberPackage>(`/lumberPackages/${id}`);
  }

  async createLumberPackage(packageData: Partial<LumberPackage>): Promise<LumberPackage> {
    return this.makeRequest<LumberPackage>('/lumberPackages', {
      method: 'POST',
      body: JSON.stringify(packageData),
    });
  }

  async updateLumberPackage(id: string, packageData: Partial<LumberPackage>): Promise<LumberPackage> {
    return this.makeRequest<LumberPackage>(`/lumberPackages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(packageData),
    });
  }

  async deleteLumberPackage(id: string): Promise<void> {
    return this.makeRequest<void>(`/lumberPackages/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();