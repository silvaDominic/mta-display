import { ReactElement, useEffect, useRef } from "react";
import { AlertModel } from "../../application/models/alert.model";

import './alert.scss';

const BOTTOM_PADDING_OFFSET = 25;

type AlertProps = {
  alert: AlertModel;
  onAlertEnd: () => void;
}

export function Alert({alert, onAlertEnd}: AlertProps): ReactElement {
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
        // TODO: Consider how this will be handled with real time data
        onAlertEnd();
        clearInterval(intervalId);
      }
    }

    return () => clearInterval(intervalId);
  }, [alert, onAlertEnd]);

  return (
    <div ref={alertContainerRef} className='alert-container'>
      <div className='alert-description'>{alert.description}</div>
      <div ref={alertResolutionRef} className='alert-resolution'>{alert.resolution}</div>
    </div>
  );
}
