export default function CardProfileFiles() {
  return (
    <div className="md:p-9 p-4 rounded-3xl border border-(--gray-light)">
      <h3 className="text-2xl mb-3 md:mb-7 font-medium">Загруженные файлы</h3>

      <span className="text-[14px] block mb-1 text-(--gray)">
        Личное фото, цветное
      </span>
      <div className="p-9 rounded-[10px] border border-(--gray-light) grid grid-cols-2 gap-6 mb-6"></div>

      <span className="text-[14px] block mb-1 text-(--gray)">
        Личное фото, цветное
      </span>
      <div className="p-9 rounded-[10px] border border-(--gray-light) grid grid-cols-2 gap-6"></div>
    </div>
  );
}
