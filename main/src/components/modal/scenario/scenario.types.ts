import { CSSProperties, ReactNode } from 'react';

export interface ScenarioProps {
  message: string | ReactNode;
  visible: boolean;
  header?: string;
  submitLabel?: string;
  closeLabel?: string;
  style?: CSSProperties;
  icon?: string;
  className: string;
  'data-testid': string;
  onClose?: () => void;
  onSubmit: () => void;
}