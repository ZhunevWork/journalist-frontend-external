import clsx from 'clsx';
import { memo, useRef, useState } from 'react';

interface UploadedFiles {
  url: string;
  file: File;
}

interface UploadProps {
  multiple?: boolean;
  classNames?: string;
}

const Upload = memo(function (props: UploadProps) {
  const { multiple, classNames } = props;

  const [files, setFiles] = useState<UploadedFiles[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFiles[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newFiles.push({ url, file });
      }
    });
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    setFiles(prev => {
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div
      className={clsx(
        'flex',
        multiple &&
          'items-center h-[88px] border border-(--gray-light) rounded-[10px] px-[14px]',
        classNames,
      )}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <div className="flex gap-2 flex-wrap">
        {files.map((img, idx) => (
          <div key={idx} className="relative w-[60px] h-[60px]">
            <img
              src={img.url}
              alt={`uploaded-${idx}`}
              className="w-[60px] h-[60px] object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              title="Удалить"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleUploadClick}
        className="w-[52px] h-[52px] bg-(--gray-light) rounded rounded-3 flex justify-center items-center cursor-pointer ml-auto"
      >
        <img src="./icons/upload.svg" alt="upload" />
      </button>
    </div>
  );
});

export default Upload;
