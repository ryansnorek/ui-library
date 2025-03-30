import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';

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

  useEffect(() => {
    const handleEscapeClose = () => {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && onClose) {
          onClose();
        }
      })
    }
    return () => {
      window.removeEventListener("keydown", handleEscapeClose);
    };
  }, [onClose])

  return (
    <React.Fragment>
      {visible && (
        <div
          data-testid={rest['data-testid']}
          role="dialog"
          style={style}
          className={`container ${className ?? ''}`}
        >
          <header>
            <div className="header-label">
              {icon && <i>{icon}</i>}
              <div>{header ?? 'Confirmation'}</div>
            </div>
            <button onClick={onClose}>&times;</button>
          </header>
          <div className="modal-message">{message}</div>
          <div className="button-bar">
            <div className="button-container">
              <button onClick={onClose}>{closeLabel ?? 'Cancel'}</button>
              <button onClick={onSubmit}>{submitLabel ?? 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function App() {
  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
  return (
    <>
      <button onClick={() => setScenarioModalVisible(true)}>
        confirm scenario
      </button>
      <Scenario
        visible={scenarioModalVisible}
        header="confirm"
        message="Please confirm scenario"
        onSubmit={() => ''}
        onClose={() => setScenarioModalVisible(false)}
      />
    </>
  );
}

export default App;
