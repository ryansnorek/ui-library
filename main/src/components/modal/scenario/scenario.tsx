import React, { useEffect } from "react";
import { ScenarioProps } from "./scenario.types";

/**
 * Renders a confirmation modal dialog.
 *
 * @param {string} [props.header] - Optional header text displayed at the top of the modal.
 * @param {string | React.ReactNode} props.message - The content or message displayed in the modal.
 * @param {boolean} props.visible - Whether the modal is visible.
 * @param {string} [props.icon] - Optional icon displayed in the modal header.
 * @param {string} [props.submitLabel] - Optional label for the submit/confirm button. Defaults to "Confirm".
 * @param {string} [props.closeLabel] - Optional label for the cancel/close button. Defaults to "Cancel".
 * @param {React.CSSProperties} [props.style] - Optional inline styles for the modal container.
 * @param {string} [props.className] - Optional additional class names for the modal container.
 * @param {() => void} [props.onClose] - Optional callback triggered when the modal is closed.
 * @param {() => void} props.onSubmit - Callback triggered when the confirm button is clicked.
 * @param {string} props['data-testid'] - Identifier for testing the modal.
 * /**
 * Renders a confirmation modal dialog with customizable header, message, buttons, and event handlers.
 *
 * @param {ScenarioProps} props - The props for the Scenario component.
 * @param {string} [props.header] - Optional header text displayed at the top of the modal.
 * @param {string | React.ReactNode} props.message - The content or message displayed in the modal.
 * @param {boolean} props.visible - Whether the modal is visible.
 * @param {string} [props.icon] - Optional icon displayed in the modal header.
 * @param {string} [props.submitLabel] - Optional label for the submit/confirm button. Defaults to "Confirm".
 * @param {string} [props.closeLabel] - Optional label for the cancel/close button. Defaults to "Cancel".
 * @param {React.CSSProperties} [props.style] - Optional inline styles for the modal container.
 * @param {string} [props.className] - Optional additional class names for the modal container.
 * @param {() => void} [props.onClose] - Optional callback triggered when the modal is closed.
 * @param {() => void} props.onSubmit - Callback triggered when the confirm button is clicked.
 * @param {string} props['data-testid'] - Identifier for testing the modal.
 * @returns {React.ReactElement} The rendered confirmation modal component.
 *
 * @example
 * const App = () => {
 *   const handleSubmit = () => {
 *     console.log("Submit clicked!");
 *   };
 *
 *   const handleClose = () => {
 *     console.log("Close clicked!");
 *   };
 *
 *   return (
 *     <Scenario
 *       header="Delete Item"
 *       message="Are you sure you want to delete this item?"
 *       visible={true}
 *       icon="icon-class"
 *       submitLabel="Delete"
 *       closeLabel="Close"
 *       data-testid="delete-modal"
 *       onSubmit={handleSubmit}
 *       onClose={handleClose}
 *     />
 *   );
 * };
 */
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


export function C() {
  return <Scenario />
}