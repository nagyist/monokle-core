const ClusterSettings = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '19';
  const iconHeight = height || '19';

  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8431 3.8165L6.00065 6.62937L1.15625 3.81201"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.99805 6.62891V11.8568" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.57734 12.1023C6.22007 12.3099 5.7799 12.3099 5.42264 12.1023L1.57735 9.86876C1.22008 9.66122 1 9.27767 1 8.86263V4.39538C1 3.98033 1.22008 3.5968 1.57735 3.38928L5.42264 1.15565C5.7799 0.948118 6.22007 0.948118 6.57734 1.15565L10.4227 3.38928C10.7799 3.5968 11 3.98033 11 4.39538V6.27719"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5021 12.0023C13.114 12.0023 12.7506 12.145 12.4754 12.4056C12.2015 12.6662 12.0496 13.0105 12.0496 13.3781C12.0496 13.7456 12.2015 14.0899 12.4754 14.3505C12.7506 14.6099 13.114 14.7538 13.5021 14.7538C13.8902 14.7538 14.2537 14.6099 14.5288 14.3505C14.8027 14.0899 14.9546 13.7456 14.9546 13.3781C14.9546 13.0105 14.8027 12.6662 14.5288 12.4056C14.3944 12.2773 14.2345 12.1756 14.0582 12.1064C13.8819 12.0372 13.6929 12.0018 13.5021 12.0023ZM18.8538 14.8976L18.0049 14.2104C18.0451 13.9768 18.0659 13.7383 18.0659 13.501C18.0659 13.2637 18.0451 13.024 18.0049 12.7916L18.8538 12.1044C18.9179 12.0524 18.9638 11.9831 18.9854 11.9058C19.0069 11.8285 19.0031 11.7468 18.9745 11.6716L18.9628 11.6397C18.7292 11.0209 18.3791 10.4473 17.9296 9.94677L17.9062 9.92095C17.8516 9.86016 17.7789 9.81646 17.6976 9.79561C17.6162 9.77476 17.5301 9.77774 17.4506 9.80416L16.3967 10.1595C16.0073 9.85702 15.5737 9.61852 15.1038 9.45255L14.9001 8.40878C14.8847 8.33015 14.8444 8.25781 14.7846 8.20137C14.7248 8.14494 14.6483 8.10708 14.5652 8.09282L14.5301 8.08667C13.8552 7.97111 13.1439 7.97111 12.4689 8.08667L12.4339 8.09282C12.3508 8.10708 12.2743 8.14494 12.2144 8.20137C12.1546 8.25781 12.1143 8.33015 12.099 8.40878L11.8939 9.45747C11.4285 9.62476 10.9949 9.86269 10.6102 10.1619L9.5484 9.80416C9.46892 9.77753 9.38276 9.77445 9.30138 9.79531C9.22 9.81617 9.14725 9.85999 9.0928 9.92095L9.06944 9.94677C8.62071 10.4479 8.27074 11.0213 8.03623 11.6397L8.02455 11.6716C7.96614 11.8253 8.01416 11.9974 8.14526 12.1044L9.00454 12.799C8.9643 13.0301 8.94483 13.2662 8.94483 13.4998C8.94483 13.7358 8.9643 13.9719 9.00454 14.2005L8.14786 14.8951C8.08373 14.9471 8.03783 15.0164 8.01627 15.0937C7.99471 15.171 7.9985 15.2527 8.02714 15.3279L8.03882 15.3599C8.27376 15.9783 8.62033 16.5499 9.07203 17.0528L9.0954 17.0786C9.14998 17.1394 9.22274 17.1831 9.30407 17.2039C9.3854 17.2248 9.47149 17.2218 9.551 17.1954L10.6128 16.8376C10.9996 17.1388 11.4305 17.3773 11.8965 17.5421L12.1016 18.5908C12.1169 18.6694 12.1572 18.7417 12.217 18.7982C12.2768 18.8546 12.3534 18.8925 12.4365 18.9067L12.4715 18.9129C13.1531 19.029 13.8511 19.029 14.5327 18.9129L14.5678 18.9067C14.6508 18.8925 14.7274 18.8546 14.7872 18.7982C14.847 18.7417 14.8873 18.6694 14.9027 18.5908L15.1064 17.547C15.5763 17.3798 16.0098 17.1425 16.3992 16.8401L17.4532 17.1954C17.5327 17.222 17.6189 17.2251 17.7002 17.2042C17.7816 17.1834 17.8544 17.1395 17.9088 17.0786L17.9322 17.0528C18.3839 16.5475 18.7305 15.9783 18.9654 15.3599L18.9771 15.3279C19.0329 15.1755 18.9849 15.0046 18.8538 14.8976ZM13.5021 15.5394C12.2418 15.5394 11.2202 14.5718 11.2202 13.3781C11.2202 12.1843 12.2418 11.2168 13.5021 11.2168C14.7625 11.2168 15.784 12.1843 15.784 13.3781C15.784 14.5718 14.7625 15.5394 13.5021 15.5394Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ClusterSettings;