import { CSSProperties, ReactNode } from 'react';

interface ScenarioProps {
  message: string | ReactNode;
  visible: boolean;
  header?: string;
  submitLabel?: string;
  closeLabel?: string;
  style?: CSSProperties;
  icon?: string;
  className?: string;
  'data-testid'?: string;
  onClose?: () => void;
  onSubmit: () => void;
}

function Scenario(props: ScenarioProps) {
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
        <div className='header-label'>
          {icon && <i>{icon}</i>}
          <div>{header ?? 'Confirmation'}</div>
        </div>
        <button>&times;</button>
      </header>
      <div className="modal-message">{message}</div>
    </div>
  );
}

function App() {
  return (
    <>
      <Scenario
        visible
        header="confirm"
        message="Please confirm scenario"
        onSubmit={() => ''}
      />
    </>
  );
}

export default App;
