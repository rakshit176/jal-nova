'use client';

import { useEffect } from 'react';

export default function AlertModal({
  isOpen,
  onClose,
  title = "Notification",
  message,
  type = "success",
  autoClose = false,
  autoCloseDelay = 3000
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      if (autoClose) {
        const timer = setTimeout(() => {
          onClose();
        }, autoCloseDelay);

        return () => {
          clearTimeout(timer);
          document.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = 'unset';
        };
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, autoClose, autoCloseDelay]);

  if (!isOpen) return null;

  const typeStyles = {
    success: {
      headerBg: 'linear-gradient(135deg, #10b981, #059669)',
      icon: '✅',
      buttonText: 'Awesome!'
    },
    error: {
      headerBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
      icon: '❌',
      buttonText: 'Got it'
    },
    warning: {
      headerBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: '⚠️',
      buttonText: 'Understood'
    },
    info: {
      headerBg: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
      icon: 'ℹ️',
      buttonText: 'Got it'
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.info;

  return (
    <div className="modal-overlay">
      <div className="alert-modal">
        <div className="modal-header" style={{ background: currentStyle.headerBg }}>
          <div className="modal-icon">{currentStyle.icon}</div>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          {message && (
            typeof message === 'string' ? (
              <p>{message}</p>
            ) : (
              message
            )
          )}
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-modern btn-primary">
            {currentStyle.buttonText}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.2s ease-out;
        }

        .alert-modal {
          background: white;
          border-radius: 20px;
          padding: 0;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-header {
          color: white;
          padding: 2rem 2rem 1.5rem;
          border-radius: 20px 20px 0 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .modal-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        }

        .modal-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
          animation: iconBounce 1s ease-in-out;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .modal-body {
          padding: 2rem;
          text-align: center;
        }

        .modal-body p {
          margin: 0;
          color: #4a5568;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .modal-actions {
          display: flex;
          padding: 0 2rem 2rem;
          justify-content: center;
        }

        .modal-actions .btn-modern {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          position: relative;
          overflow: hidden;
        }

        .modal-actions .btn-modern::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.5s ease;
          transform: translate(-50%, -50%);
        }

        .modal-actions .btn-modern:hover::before {
          width: 300px;
          height: 300px;
        }

        .modal-actions .btn-modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 78, 100, 0.3);
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(-50px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0) rotateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes iconBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @media (max-width: 640px) {
          .alert-modal {
            width: 95%;
            margin: 1rem;
            max-width: none;
          }

          .modal-header {
            padding: 1.5rem 1.5rem 1rem;
          }

          .modal-header h2 {
            font-size: 1.25rem;
          }

          .modal-body {
            padding: 1.5rem;
          }

          .modal-actions {
            padding: 0 1.5rem 1.5rem;
          }

          .modal-actions .btn-modern {
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}