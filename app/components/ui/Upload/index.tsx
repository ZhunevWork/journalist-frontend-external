import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';

interface UploadProps {
  multiple?: boolean;
  classNames?: string;
  value?: File | File[] | null;
  onChange?: (files: File | File[] | null) => void;
  name?: string;
  accept?: string;
  error?: boolean;
}

const Upload = memo(function (props: UploadProps) {
  const { multiple, classNames, value, onChange, name, accept, error } = props;

  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Синхронизация с внешним value
  useEffect(() => {
    if (multiple) {
      setFiles(Array.isArray(value) ? value : []);
    } else {
      setFiles(value && !Array.isArray(value) ? [value] : []);
    }
  }, [value, multiple]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: File[] = Array.from(selectedFiles);
    let updatedFiles: File[];

    if (multiple) {
      // Для множественной загрузки добавляем к существующим
      updatedFiles = [...files, ...newFiles];
    } else {
      // Для одиночной загрузки заменяем все файлы (берем только первый)
      updatedFiles = newFiles.length > 0 ? [newFiles[0]] : [];
    }

    setFiles(updatedFiles);

    // Отправляем наружу в зависимости от режима
    if (multiple) {
      onChange?.(updatedFiles);
    } else {
      onChange?.(updatedFiles.length > 0 ? updatedFiles[0] : null);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Отправляем наружу в зависимости от режима
    if (multiple) {
      onChange?.(updatedFiles);
    } else {
      onChange?.(updatedFiles.length > 0 ? updatedFiles[0] : null);
    }
  };

  // Функция для создания временного URL для превью (только для изображений)
  const getFileUrl = (file: File): string => {
    return URL.createObjectURL(file);
  };

  // Функция для получения иконки в зависимости от типа файла
  const getFileIcon = (file: File): string => {
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
      return getFileUrl(file); // возвращаем URL для превью изображения
    } else {
      return '';
    }
  };

  // Функция для проверки, является ли файл изображением
  const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
  };

  return (
    <div
      className={clsx(
        'flex items-center h-[88px] bg-white border rounded-[10px] px-[14px]',
        error ? 'border-red-500' : 'border-(--gray-light)',
        classNames,
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        ref={inputRef}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
        name={name}
      />
      <div className="flex gap-2 flex-wrap">
        {files.map((file, idx) => (
          <div key={idx} className="relative w-[60px] h-[60px]">
            {isImageFile(file) ? (
              <img
                src={getFileIcon(file)}
                alt={`uploaded-${idx}`}
                className="w-[60px] h-[60px] object-cover rounded"
              />
            ) : (
              <div className="w-[60px] h-[60px] bg-(--gray-light) rounded flex flex-col items-center justify-center p-1">
                <img
                  src={getFileIcon(file)}
                  alt={file.type}
                  className="w-6 h-6 object-contain mb-1"
                />
                <span className="text-xs text-gray-600 truncate w-full text-center">
                  {file.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs border-2 border-white"
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
