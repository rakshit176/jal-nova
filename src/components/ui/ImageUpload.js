'use client';

import { useState, useRef } from 'react';

export default function ImageUpload({
  onImageSelect,
  currentImage = null,
  className = "",
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/jpeg,image/jpg,image/png"
}) {
  const [preview, setPreview] = useState(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const generateThumbnail = async (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set thumbnail dimensions (200x200 max)
        const maxSize = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress thumbnail
        ctx.drawImage(img, 0, 0, width, height);
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnailDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const processFile = async (file) => {
    setError('');
    setIsProcessing(true);

    try {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload JPG, JPEG, or PNG images only.');
      }

      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      }

      // Convert to base64
      const base64 = await convertToBase64(file);

      // Generate thumbnail
      const thumbnail = await generateThumbnail(file);

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Pass data to parent
      onImageSelect({
        file,
        base64,
        thumbnail,
        preview: objectUrl
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    setError('');
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`image-upload-container ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${preview ? 'has-image' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {preview ? (
          <div className="preview-container">
            <img
              src={preview}
              alt="Product preview"
              className="preview-image"
            />
            <button
              type="button"
              className="remove-btn"
              onClick={handleRemove}
              title="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <div className="upload-text">
              <p>Click to upload or drag & drop</p>
              <span>JPG, JPEG, PNG up to {maxSize / (1024 * 1024)}MB</span>
            </div>
            {isProcessing && (
              <div className="processing-indicator">
                <div className="spinner"></div>
                <span>Processing image...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <style jsx>{`
        .image-upload-container {
          width: 100%;
        }

        .upload-area {
          border: 2px dashed #cbd5e0;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8fafc;
          position: relative;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-area:hover {
          border-color: var(--primary-color);
          background: #f0f8ff;
        }

        .upload-area.dragging {
          border-color: var(--secondary-color);
          background: #e0f7fa;
          transform: scale(1.02);
        }

        .upload-area.has-image {
          padding: 0;
          background: white;
          border-style: solid;
        }

        .preview-container {
          position: relative;
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        .remove-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 20px;
          font-weight: bold;
          color: #dc2626;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .remove-btn:hover {
          background: #dc2626;
          color: white;
          transform: scale(1.1);
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .upload-icon {
          font-size: 3rem;
          color: var(--primary-color);
          opacity: 0.6;
        }

        .upload-text p {
          margin: 0;
          color: #2d3748;
          font-weight: 600;
          font-size: 1rem;
        }

        .upload-text span {
          color: #718096;
          font-size: 0.875rem;
        }

        .processing-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--secondary-color);
          font-size: 0.875rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 165, 207, 0.2);
          border-top: 2px solid var(--secondary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .error-message {
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .error-icon {
          font-size: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .upload-area {
            padding: 1.5rem;
            min-height: 150px;
          }

          .upload-icon {
            font-size: 2.5rem;
          }

          .preview-container {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}