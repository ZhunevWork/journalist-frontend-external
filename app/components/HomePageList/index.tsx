import { useGetAccreditationsQuery } from '~/api/controllers/accreditation';
import ListAccreditations from '~/components/List/ListAccreditations';
import { Link } from 'react-router';

export default function HomePageList() {
  const { data: accreditations } = useGetAccreditationsQuery();

  if (!accreditations) {
    return null;
  }

  return (
    <div>
      <ListAccreditations
        title="Мои аккредитации"
        data={accreditations?.data}
        maxHeight={660}
        children={
          <Link
            to={`/accreditations`}
            className="text-(--gray) text-center w-full block"
          >
            Посмотреть все
          </Link>
        }
      />
    </div>
  );
}
