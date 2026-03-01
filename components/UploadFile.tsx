import { CheckCircle2, ImageIcon, UploadIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { PROGRESS_STEP, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS } from '../lib/constants'

interface UploadFileProps {
  onComplete?: (base64: string) => void
}

function UploadFile({ onComplete }: UploadFileProps) {

  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const { isSignedIn } = useOutletContext<AuthContext>()

  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearProgressInterval();
  }, []);

  const processFile = (file: File) => {
    if (!isSignedIn) return;

    // Check if file is image
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, PNG).");
      return;
    }

    setFile(file);
    setProgress(0);
    clearProgressInterval();

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearProgressInterval();
            setTimeout(() => {
              onComplete?.(base64);
            }, REDIRECT_DELAY_MS);
            return 100;
          }
          return prev + PROGRESS_STEP;
        });
      }, PROGRESS_INTERVAL_MS);
    };

    reader.onerror = () => {
      clearProgressInterval();
      alert("Failed to read file. Please try again.");
      setFile(null);
    };

    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!isSignedIn) {
      alert("Please sign in to upload floor plans.");
      return;
    }

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) {
      alert("Please sign in to upload floor plans.");
      return;
    }
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  return (
    <div className='upload'>
      {!file ? (
        <div
          className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" className='drop-input' accept='.jpg, .jpeg, .png'
            onChange={handleChange}
            title={isSignedIn ? "Click to Upload" : "Sign in to upload"}
          />
          <div className='drop-content'>
            <div className='drop-icon'>
              <UploadIcon size={20} />
            </div>
            <p>{isSignedIn ? "Click to Upload or just Drag and Drop"
              : "Sign in or Sign up to upload"}</p>
            <p className='help'>Maximum File Size 50 MB</p>
          </div>
        </div>

      ) :

        (
          <div className='upload-status'>
            <div className='status-content'>
              <div className='status-icon'>
                {progress === 100 ? <CheckCircle2 className='check' /> : <ImageIcon className='image' />}
              </div>
              <h3>{file?.name}</h3>

              <div className='progress'>
                <div className='bar' style={{ width: `${progress}%` }} />
                <p className='status-text'>{progress < 100 ? "Analyze Floor Plan....." : "Redirecting...."}</p>
              </div>

            </div>
          </div>
        )}
    </div>
  )
}

export default UploadFile
