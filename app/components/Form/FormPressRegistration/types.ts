export interface StepOneFields {
  phone: string;
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
  passportIssueDate: string;
  passportIssuedBy: string;
  passportDivisionCode: string;
  birthPlace: string;
}

export interface StepTwoFields {
  role?: string;
  channel?: string;
  fanCard?: string;
  type?: string;
  password?: string;
  passwordRepeat?: string;
}
