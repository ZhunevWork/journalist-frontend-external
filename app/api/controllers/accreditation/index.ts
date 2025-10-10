import { commonApi } from '~/api/common.api';
import type {
  GetAccreditationsResponse,
  ICreateAccreditationArgs,
} from '~/api/controllers/accreditation/types';

const CONTROLLER_URL = 'accreditations';

export const accreditationController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getAccreditations: builder.query<GetAccreditationsResponse, void>({
      query: () => ({
        url: '/me/' + CONTROLLER_URL,
      }),
    }),
    createAccreditation: builder.mutation<any, ICreateAccreditationArgs>({
      query: body => {
        const formData = new FormData();

        formData.append('event_id', body.event_id.toString());

        if (body.journalist_id) {
          formData.append('journalist_id', body.journalist_id.toString());
        }

        body.accreditation_applications.forEach(file => {
          formData.append('accreditation_applications[]', file);
        });

        return {
          url: CONTROLLER_URL,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetAccreditationsQuery, useCreateAccreditationMutation } =
  accreditationController;
