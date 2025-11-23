'use client';

import { useEffect } from 'react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger"
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
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      headerBg: 'linear-gradient(135deg, #ff5252, #ff1744)',
      icon: '⚠️',
      confirmBg: '#ff1744'
    },
    warning: {
      headerBg: 'linear-gradient(135deg, #ff9800, #f57c00)',
      icon: '⚠️',
      confirmBg: '#f57c00'
    },
    info: {
      headerBg: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
      icon: 'ℹ️',
      confirmBg: 'var(--primary-color)'
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.danger;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
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
          <button onClick={onClose} className="btn-modern btn-secondary">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="btn-modern btn-primary"
            style={{
              background: currentStyle.confirmBg,
              borderColor: currentStyle.confirmBg
            }}
          >
            {confirmText}
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

        .confirm-modal {
          background: white;
          border-radius: 20px;
          padding: 0;
          max-width: 500px;
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
          animation: iconPulse 2s ease-in-out infinite;
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
          gap: 1rem;
          padding: 0 2rem 2rem;
        }

        .modal-actions .btn-modern {
          flex: 1;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
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

        .btn-modern.btn-secondary {
          background: linear-gradient(135deg, #f7fafc, #e2e8f0);
          color: #4a5568;
          border: 2px solid #e2e8f0;
        }

        .btn-modern.btn-secondary:hover {
          background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .btn-modern.btn-primary {
          color: white;
          position: relative;
        }

        .btn-modern.btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @media (max-width: 640px) {
          .confirm-modal {
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
            flex-direction: column;
            padding: 0 1.5rem 1.5rem;
          }

          .modal-actions .btn-modern {
            padding: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}