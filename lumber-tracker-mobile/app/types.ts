export interface Lumber {
    id: string;
    species: string;
    grade: string;
    vendor: string;
    footage: string;
    comments: string;
    date: string;
    courses: string;
    status: 'green' | 'air-drying' | 'kiln' | 'kd' | 'infeed' | 'rip';
    kilnName?: string;
    loadNumber: string;
}

export interface Load {
    loadNumber: string;
    packages: Lumber[];
}