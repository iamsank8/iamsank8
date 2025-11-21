export interface QualityReport {
  generatedAt: string;
  unitTests: {
    status: 'passing' | 'failing' | 'unknown';
    coverage: {
      statements: number;
      branches: number;
      functions: number;
      lines: number;
    };
    totalTests: number;
    passed: number;
    failed: number;
  };
  linting: {
    status: 'passing' | 'failing' | 'unknown';
    errors: number;
    warnings: number;
  };
  e2eTests: {
    status: 'passing' | 'failing' | 'configured' | 'unknown';
    totalTests: number;
    passed: number;
    failed: number;
  };
  tools: {
    unitTesting: string[];
    e2eTesting: string[];
    linting: string[];
    formatting: string[];
  };
}
