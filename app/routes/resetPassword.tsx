import FormReset from '~/components/Form/FormReset';
import Container from '~/components/ui/Container';

export default function ResetPassword() {
  return (
    <Container>
      <div className="flex justify-center mb-10">
        <FormReset />
      </div>
    </Container>
  );
}
