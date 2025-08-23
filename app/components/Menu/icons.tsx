interface IconProps {
  color?: string | null;
}

export const HouseIcon = ({ color }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9995 16.9998C12.6663 16.9998 11.3923 16.9998 8.99951 16.9998M20 9.5L12.0082 4L4 9.5V20H20V9.5Z"
      stroke={color ?? 'var(--bg-brand)'}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);

export const BellIcon = ({ color }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 2H4V22H20V7L15 2Z"
      stroke={color ?? 'var(--bg-brand)'}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M14.0002 2C14.0002 2 13.9999 5.42809 13.9999 8H20.0002"
      stroke={color ?? 'var(--bg-brand)'}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M10 9H8"
      stroke={color ?? 'var(--bg-brand)'}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M16 13H8"
      stroke={color ?? 'var(--bg-brand)'}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M16 17H8"
      stroke={color ?? 'var(--bg-brand)'}
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);

// export const PersonIcon = ({ color }: IconProps) => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M18 21C18 18.8783 17.1571 16.8434 15.6569 15.3431C14.1566 13.8429 12.1217 13 10 13C7.87827 13 5.84344 13.8429 4.34315 15.3431C2.84285 16.8434 2 18.8783 2 21"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13Z"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M22.0008 20C22.0008 16.63 20.0008 13.5 18.0008 12C18.6582 11.5068 19.1839 10.8591 19.5313 10.1143C19.8788 9.36946 20.0373 8.55048 19.9928 7.72981C19.9483 6.90914 19.7022 6.1121 19.2763 5.40921C18.8503 4.70633 18.2577 4.11927 17.5508 3.70001"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export const CalendarIcon = ({ color }: IconProps) => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M8 2V6"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16 2V6"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M19 4H5H3V20V22H21V20V4H19Z"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//     />
//     <path
//       d="M3 10H21"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M8 14H8.01"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 14H12.01"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16 14H16.01"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M8 18H8.01"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 18H12.01"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M16 18H16.01"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export const JournalistIcon = ({ color }: IconProps) => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M14.6992 17.4H10.1992"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//     />
//     <path
//       d="M17.3992 13.8H10.1992"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//     />
//     <path
//       d="M4.8 21H21V3H6.6V19.2C6.6 19.6774 6.41036 20.1352 6.07279 20.4728C5.73523 20.8104 5.27739 21 4.8 21ZM4.8 21C4.32261 21 3.86477 20.8104 3.52721 20.4728C3.18964 20.1352 3 19.6774 3 19.2V9.3H6.6"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//     />
//     <path
//       d="M17.3992 6.59998H10.1992V10.2H17.3992V6.59998Z"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="square"
//     />
//   </svg>
// );

// export const KeyIcon = ({ color }: IconProps) => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M2.00173 18L2.00192 22H7.00192V19H9.99902V16H13.4019V14.6382C13.4019 14.6382 16.3047 15.1205 17.6934 14.633C19.082 14.1455 20.2641 13.2011 21.0463 11.9544C21.8284 10.7077 22.1643 9.23242 21.999 7.76998C21.8337 6.30755 21.177 4.9445 20.1363 3.90382C19.0957 2.86313 17.7326 2.20643 16.2702 2.04114C14.8077 1.87584 13.3325 2.21174 12.0858 2.99389C10.8391 3.77603 9.89471 4.95812 9.40716 6.34677C8.91962 7.73541 8.91777 9.24841 9.40192 10.6382L2.00173 18Z"
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="round"
//     />
//     <path
//       d="M16.5 8C16.7761 8 17 7.77614 17 7.5C17 7.22386 16.7761 7 16.5 7C16.2239 7 16 7.22386 16 7.5C16 7.77614 16.2239 8 16.5 8Z"
//       fill={color ? color : 'var(--bg-brand)'}
//       stroke={color ? color : 'var(--bg-brand)'}
//       strokeWidth="1.5"
//       strokeLinecap="round"
//     />
//   </svg>
// );
