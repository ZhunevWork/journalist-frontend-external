import type { FileType } from '~/api/controllers/types';
import clsx from 'clsx';
import { memo } from 'react';

interface DownloadProps {
  files?: FileType[];
  classNames?: string;
  onDownload?: (files: FileType[]) => void;
  onRemove?: (fileId: number) => void;
  error?: boolean;
  showRemoveButton?: boolean;
}

const Download = memo(function (props: DownloadProps) {
  const {
    files = [],
    classNames,
    onDownload,
    onRemove,
    error,
    showRemoveButton = false,
  } = props;

  // Функция для скачивания файла
  const downloadFile = async (file: FileType) => {
    try {
      // Вызываем кастомный обработчик если он есть
      if (onDownload) {
        onDownload([file]);
        return;
      }

      // Скачиваем файл средствами браузера
      const response = await fetch(file.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Освобождаем память
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Если fetch не работает, открываем в новой вкладке как fallback
      window.open(file.url, '_blank');
    }
  };

  // Функция для скачивания всех файлов
  const downloadAllFiles = async () => {
    if (files.length === 0) return;

    // Вызываем кастомный обработчик если он есть
    if (onDownload) {
      onDownload(files);
      return;
    }

    // Скачиваем каждый файл по очереди
    for (const file of files) {
      await downloadFile(file);
      // Небольшая задержка между скачиваниями
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  // Функция для получения иконки в зависимости от типа файла
  const getFileIcon = (file: FileType): string => {
    const fileType = file.extension || '';

    if (fileType.startsWith('image/') || fileType.startsWith('jpg')) {
      return file.url; // возвращаем URL для превью изображения
    }

    // Определяем иконку по типу файла или расширению
    if (fileType.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) {
      return './icons/pdf-icon.svg';
    } else if (
      fileType.includes('word') ||
      fileType.includes('document') ||
      file.name.toLowerCase().endsWith('.doc') ||
      file.name.toLowerCase().endsWith('.docx')
    ) {
      return './icons/word-icon.svg';
    } else if (
      fileType.includes('excel') ||
      fileType.includes('spreadsheet') ||
      file.name.toLowerCase().endsWith('.xls') ||
      file.name.toLowerCase().endsWith('.xlsx')
    ) {
      return './icons/excel-icon.svg';
    } else if (
      fileType.includes('zip') ||
      fileType.includes('compressed') ||
      file.name.toLowerCase().endsWith('.zip') ||
      file.name.toLowerCase().endsWith('.rar')
    ) {
      return './icons/zip-icon.svg';
    } else {
      return './icons/file-icon.svg';
    }
  };

  // Функция для проверки, является ли файл изображением
  const isImageFile = (file: FileType): boolean => {
    return (file.extension || '').startsWith('image/');
  };

  const handleFileClick = (file: FileType) => {
    // Скачиваем файл при клике на него
    downloadFile(file);
  };

  const handleRemove = (fileId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    onRemove?.(fileId);
  };

  return (
    <div
      className={clsx(
        'flex items-center h-[88px] bg-white border rounded-[10px] px-[14px]',
        error ? 'border-red-500' : 'border-(--gray-light)',
        classNames,
      )}
    >
      <div className="flex gap-2 flex-wrap">
        {files.map(file => (
          <div
            key={file.id}
            className="relative w-[60px] h-[60px] cursor-pointer"
            onClick={() => handleFileClick(file)}
            title={`Скачать ${file.name}`}
          >
            {isImageFile(file) ? (
              <img
                src={getFileIcon(file)}
                alt={file.name}
                className="w-[60px] h-[60px] object-cover rounded"
              />
            ) : (
              <div className="w-[60px] h-[60px] bg-(--gray-light) flex flex-col items-center justify-center hover:bg-gray-200 transition-colors rounded-lg overflow-hidden">
                <img
                  src={getFileIcon(file)}
                  alt={file.extension || 'file'}
                  className="object-cover"
                />
              </div>
            )}

            {/* Кнопка удаления */}
            {showRemoveButton && onRemove && (
              <button
                type="button"
                onClick={e => handleRemove(file.id, e)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs border-2 border-white hover:bg-red-600 transition-colors"
                title="Удалить"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {files.length === 0 && (
          <div className="flex items-center justify-center w-[60px] h-[60px] text-gray-400 text-sm">
            Нет файлов
          </div>
        )}
      </div>

      {/* Кнопка скачивания всех файлов */}
      <button
        type="button"
        onClick={downloadAllFiles}
        disabled={files.length === 0}
        className={clsx(
          'w-[52px] h-[52px] bg-(--bg-secondary) border border-(--gray-light) rounded-2xl flex justify-center items-center cursor-pointer ml-auto',
          files.length === 0 && 'opacity-50 cursor-not-allowed',
        )}
        title={
          files.length > 0 ? 'Скачать все файлы' : 'Нет файлов для скачивания'
        }
      >
        <img src="./icons/upload.svg" alt="download" />
      </button>
    </div>
  );
});

export default Download;
