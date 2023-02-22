import {ValidationResponse, ValidationResult} from '@monokle/validation';

export type ValidationOverviewType = {
  validationResponse: ValidationResponse;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  customMessage?: string;
  height?: number;
  newProblemsIntroducedType?: string;
  selectedProblem?: ValidationResult;
  width?: number;
  onProblemSelect?: (payload: {problem: ValidationResult; selectedFrom: 'resource' | 'file'}) => void;
};

export type ValidationOverviewFiltersType = {
  filtersValue: FiltersValueType;
  searchValue: string;
  onFiltersChange: (filters: FiltersValueType) => void;
  onSearch: (searchValue: string) => void;
};

export type FiltersValueType = {
  'tool-component'?: string[];
  type?: 'error' | 'warning';
};

export type ProblemsType = {
  [k: string]: ValidationResult[];
};

export type NewProblemsType = {data: ProblemsType; resultsCount: number};

export type ShowByFilterOptionType = 'show-by-file' | 'show-by-resource' | 'show-by-rule';
