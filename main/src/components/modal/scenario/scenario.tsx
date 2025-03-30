// import { ScenarioProps } from './scenario.types';

import { CSSProperties, ReactNode } from 'react';

interface ScenarioProps {
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

export function Scenario(props: ScenarioProps) {
  const {
    header,
    message,
    visible,
    icon,
    submitLabel,
    closeLabel,
    style,
    className,
    onClose,
    onSubmit,
    ...rest
  } = props;

  return (
    <div
      data-testid={rest['data-testid']}
      role="dialog"
      style={style}
      className={`container ${className}`}
    >
      <header>
        <div>{header ?? 'Confirmation'}</div>
        <button>&times;</button>
      </header>
    </div>
  );
}

export default Scenario;
