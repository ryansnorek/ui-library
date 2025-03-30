import React, { useEffect } from "react";
import { ScenarioProps } from "./scenario.types";

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
