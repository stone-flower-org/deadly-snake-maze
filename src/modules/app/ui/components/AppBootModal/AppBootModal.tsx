import React, { useEffect, useRef, useState } from 'react';

import { calcProgressPercent, FADE_MS, isFinishedFromPercent } from './utils';

export interface AppBootModalProps {
  progress?: number;
}

export const AppBootModal = ({ progress = 0 }: AppBootModalProps) => {
  const progressPercent = calcProgressPercent(progress);

  const [isFinished, setIsFinished] = useState(() => isFinishedFromPercent(progressPercent));

  const bootModalRef = useRef<HTMLDivElement | null>(null);

  const className = ['boot-modal'];
  if (progressPercent === 100) className.push('boot-modal--closing');

  useEffect(() => {
    bootModalRef.current?.style.setProperty('--progress', `${progressPercent}%`);

    let fadeId: unknown | undefined = undefined;
    if (isFinishedFromPercent(progressPercent)) {
      fadeId = setTimeout(() => {
        setIsFinished(true);
      }, FADE_MS);
    }

    return () => {
      fadeId && clearTimeout(Number(fadeId));
    };
  }, [progressPercent]);

  if (isFinished) return null;

  return (
    <div
      className={className.join(' ')}
      ref={bootModalRef}
      role="dialog"
    >
      <div className="boot-modal__content">
        <div className="boot-modal__logo">
          <img
            alt="Logo"
            className="boot-modal__logo-img"
            src="static/img/logo/logo.svg"
          />
        </div>
        <div className="boot-modal__progress">
          <div
            aria-label="App Booting"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progressPercent}
            className="boot-modal__progress-bar"
            role="progressbar"
          >
            <div className="boot-modal__progress-bar-background" />
            <div className="boot-modal__progress-bar-track" />
          </div>
        </div>
        <noscript>
          <p className="boot-modal__noscript">You need to enable JavaScript</p>
        </noscript>
      </div>
    </div>
  );
};
