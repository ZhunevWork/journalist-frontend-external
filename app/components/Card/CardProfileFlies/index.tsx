import Download from '~/components/ui/Download';
import { useAppSelector } from '~/hooks/redux';

export default function CardProfileFiles() {
  const profileData = useAppSelector(s => s.auth.profileData);

  return (
    <div className="md:p-9 p-4 rounded-3xl border border-(--gray-light)">
      <h3 className="text-2xl mb-3 md:mb-7 font-medium">Загруженные файлы</h3>

      <span className="text-[14px] block mb-1 text-(--gray)">
        Личное фото, цветное
      </span>
      {/* <div className="p-9 rounded-[10px] border border-(--gray-light) grid grid-cols-2 gap-6 mb-6"></div> */}
      <Download
        files={profileData?.profile_photo ? [profileData?.profile_photo] : []}
      />

      <span className="text-[14px] block mb-1 text-(--gray)">
        Скан удостоверения или письменное подтверждение работы в издании
      </span>
      <Download files={profileData?.documents} />
    </div>
  );
}
