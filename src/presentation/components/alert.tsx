import { memo, ReactElement, useEffect, useRef } from "react";
import { AlertModel } from "../../application/models/alert.model";

import './alert.scss';

const BOTTOM_PADDING_OFFSET = 25;

type AlertProps = {
  alert: AlertModel;
  onAlertEnd: () => void;
  className?: string;
}

export const Alert = memo(function Alert({alert, onAlertEnd, className = ''}: AlertProps): ReactElement {
  const alertContainerRef = useRef<HTMLDivElement>(null);
  const alertResolutionRef = useRef<HTMLDivElement>(null);

  /**
   * Handles scrolling alert content from bottom to top.
   * Based on a scroll increment and interval frequency, a scroll function is executed that
   * increments a reference to the top of the scrollable container until it reaches a limit.
   */
  useEffect(() => {
    const alertContainer = alertContainerRef.current;
    const alertResolution = alertResolutionRef.current;

    if (!alertContainer || !alertResolution) return;

    // Presets
    const offset = parseInt((window.getComputedStyle(alertResolution).paddingBottom)) - BOTTOM_PADDING_OFFSET;
    const scrollIncrement = 1;
    alertContainer.scrollTop = 0;

    const intervalId = setInterval(scroll, 20);

    function scroll(): void {
      if (alertContainer.scrollTop < alertContainer.scrollHeight - offset) {
        alertContainer.scrollTop += scrollIncrement;
      } else {
        onAlertEnd();
        clearInterval(intervalId);
      }
    }

    return () => clearInterval(intervalId);
  }, [alert, onAlertEnd]);

  return (
    <div ref={alertContainerRef} className={`alert__container ${className}`}>
      <div className='alert__description'>{alert.description}</div>
      <div ref={alertResolutionRef} className='alert__resolution'>{alert.resolution}</div>
    </div>
  );
}, (prev, next) => {
  return JSON.stringify(prev.alert) === JSON.stringify(next.alert);
});
