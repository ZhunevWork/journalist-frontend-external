import * as yup from 'yup';

export const formAccreditationAppSchema = yup
  .object({
    event_id: yup
      .number()
      .required('ID события обязателен')
      .min(1, 'ID события должен быть положительным числом'),

    journalist_id: yup
      .number()
      .required('ID журналиста обязателен')
      .min(1, 'ID журналиста должен быть положительным числом'),

    accreditation_applications: yup
      .array()
      .required('Заявления на аккредитацию обязательны')
      .min(1, 'Должен быть загружен хотя бы один файл'),

    agreedToTerms: yup
      .boolean()
      .oneOf([true], 'Необходимо согласие с условиями')
      .required('Необходимо согласие с условиями'),
  })
  .required();

export type FormAccreditationAppValues = yup.InferType<
  typeof formAccreditationAppSchema
>;
