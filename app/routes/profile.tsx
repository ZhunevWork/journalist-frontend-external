import type { Route } from '.react-router/types/app/routes/+types/profile';
import CardProfileData from '~/components/Card/CardProfileData';
import CardProfileFiles from '~/components/Card/CardProfileFlies';
import Button from '~/components/ui/Button';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Профиль' }];
}

export default function Profile() {
  return (
    <div className="w-full">
      <h1 className="font-(family-name:--font-halvar) text-4xl mb-8">
        Здравствуйте, Александр
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full mb-11">
        <CardProfileData />
        <div className="flex flex-col gap-8 justify-between">
          <CardProfileFiles />
          <div className="md:p-9 p-4 rounded-3xl border border-(--gray-light) bg-(--bg-secondary)">
            <p className="text-(--gray)">
              Для изменения данных аккаунта напишите, пожалуйста, на почту
            </p>
            <a
              href="mailto:pressa@fclm.ru"
              className="font-medium text-[18px] underline"
            >
              pressa@fclm.ru
            </a>
          </div>
        </div>
      </div>

      <Button styleType="primary" classNames="w-80">
        Выйти
      </Button>
    </div>
  );
}
