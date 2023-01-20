const CRDs: React.FC = ({width, height}: {width?: number; height?: number}) => {
  const iconWidth = width || '32';
  const iconHeight = height || '32';

  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_506_8310)" />
      <path
        d="M21 8.95L19.626 8.65023C19.7507 7.72797 19.5257 6.79351 18.9917 6.01618L20.0482 5.21083L19.5295 4.58894L18.4733 5.39389C17.7928 4.72482 16.8872 4.30668 15.916 4.21307V3H15.084V4.21307C14.1128 4.30671 13.2072 4.7249 12.5267 5.39401L11.4705 4.58894L10.9517 5.21079L12.0083 6.01614C11.4743 6.79349 11.2493 7.72796 11.374 8.65023L10 8.9502L10.1853 9.72525L11.5568 9.42584C11.8689 10.3131 12.4974 11.0672 13.3324 11.5563L12.7792 12.655L13.5286 13L14.0816 11.9021C14.9969 12.2264 16.0035 12.2264 16.9187 11.9021L17.4716 13L18.2211 12.6548L17.6679 11.5563C18.5028 11.0672 19.1313 10.3131 19.4435 9.42584L20.815 9.72505L21 8.95ZM18.8276 8.16911C18.8276 8.27142 18.8215 8.37237 18.8116 8.47238L16.7318 8.01845C16.7213 7.93802 16.7021 7.85885 16.6746 7.78218L18.3368 6.51499C18.6573 7.01233 18.8273 7.58495 18.8276 8.16911V8.16911ZM15.084 8.16911C15.084 8.09047 15.1084 8.01359 15.1541 7.9482C15.1999 7.88281 15.2648 7.83185 15.3408 7.80175C15.4168 7.77166 15.5005 7.76378 15.5811 7.77913C15.6618 7.79447 15.736 7.83234 15.7941 7.88795C15.8523 7.94356 15.8919 8.01441 15.908 8.09154C15.924 8.16867 15.9158 8.24862 15.8843 8.32127C15.8528 8.39393 15.7995 8.45603 15.7311 8.49972C15.6627 8.54341 15.5823 8.56673 15.5 8.56673C15.3897 8.56664 15.284 8.52472 15.206 8.45017C15.128 8.37562 15.0841 8.27454 15.084 8.16911V8.16911ZM17.8193 5.89247L16.1572 7.1595C16.0811 7.11467 16.0003 7.07777 15.916 7.04944V5.01567C16.6334 5.10186 17.3017 5.40975 17.8193 5.89247V5.89247ZM15.084 5.01567V7.04944C14.9997 7.07777 14.9189 7.11467 14.8428 7.1595L13.1808 5.89247C13.6983 5.40976 14.3666 5.10188 15.084 5.01567V5.01567ZM12.1724 8.16911C12.1727 7.58495 12.3427 7.01233 12.6632 6.51499L14.3254 7.78206C14.2979 7.85873 14.2787 7.9379 14.2682 8.01833L12.1884 8.47226C12.1785 8.37237 12.1724 8.27142 12.1724 8.16911ZM12.3735 9.24762L14.4429 8.79584C14.4918 8.87294 14.5497 8.94452 14.6154 9.00921L13.6945 10.8372C13.085 10.4588 12.6212 9.90073 12.3735 9.24762V9.24762ZM15.5 11.3501C15.1407 11.3495 14.7839 11.2931 14.4435 11.1831L15.3671 9.34914C15.4112 9.35568 15.4555 9.35997 15.5 9.36198C15.5444 9.35998 15.5887 9.3557 15.6327 9.34918L16.5565 11.1831C16.2162 11.2932 15.8593 11.3496 15.5 11.3501V11.3501ZM17.3055 10.8372L16.3846 9.00905C16.4503 8.94436 16.5082 8.87278 16.5571 8.79568L18.6265 9.24746C18.3788 9.90063 17.915 10.4587 17.3055 10.8372V10.8372Z"
        fill="currentColor"
      />
      <path
        d="M12.3517 19.1811H11.0235C10.9856 18.9633 10.9158 18.7704 10.814 18.6023C10.7122 18.4318 10.5856 18.2874 10.434 18.169C10.2825 18.0507 10.1097 17.9619 9.91557 17.9027C9.72381 17.8411 9.51666 17.8104 9.29412 17.8104C8.89876 17.8104 8.54838 17.9098 8.24299 18.1087C7.93759 18.3052 7.69848 18.594 7.52566 18.9751C7.35284 19.3539 7.26642 19.8168 7.26642 20.3636C7.26642 20.92 7.35284 21.3887 7.52566 21.7699C7.70085 22.1487 7.93996 22.4351 8.24299 22.6293C8.54838 22.821 8.89758 22.9169 9.29057 22.9169C9.50837 22.9169 9.71197 22.8885 9.90137 22.8317C10.0931 22.7725 10.2648 22.6861 10.4163 22.5724C10.5702 22.4588 10.6992 22.3191 10.8034 22.1534C10.9099 21.9877 10.9833 21.7983 11.0235 21.5852L12.3517 21.5923C12.3019 21.938 12.1942 22.2623 12.0285 22.5653C11.8651 22.8684 11.6509 23.1359 11.3857 23.3679C11.1206 23.5975 10.8105 23.7775 10.4553 23.9077C10.1002 24.0355 9.70605 24.0994 9.27282 24.0994C8.63361 24.0994 8.06306 23.9515 7.56117 23.6555C7.05927 23.3596 6.66391 22.9323 6.37509 22.3736C6.08626 21.8149 5.94185 21.1449 5.94185 20.3636C5.94185 19.58 6.08745 18.91 6.37864 18.3537C6.66983 17.795 7.06638 17.3677 7.56827 17.0717C8.07016 16.7758 8.63835 16.6278 9.27282 16.6278C9.67765 16.6278 10.0541 16.6847 10.4021 16.7983C10.7501 16.9119 11.0602 17.0788 11.3325 17.299C11.6047 17.5168 11.8285 17.7843 12.0036 18.1016C12.1812 18.4164 12.2972 18.7763 12.3517 19.1811ZM13.5581 24V16.7273H16.2854C16.8441 16.7273 17.3129 16.8243 17.6917 17.0185C18.0728 17.2126 18.3605 17.4848 18.5546 17.8352C18.7511 18.1832 18.8493 18.5893 18.8493 19.0533C18.8493 19.5196 18.7499 19.9245 18.551 20.2678C18.3546 20.6087 18.0645 20.8726 17.681 21.0597C17.2975 21.2443 16.8264 21.3366 16.2677 21.3366H14.3252V20.2429H16.0901C16.4168 20.2429 16.6843 20.1979 16.8927 20.108C17.101 20.0156 17.2549 19.8819 17.3543 19.7067C17.4561 19.5291 17.507 19.3113 17.507 19.0533C17.507 18.7952 17.4561 18.575 17.3543 18.3928C17.2525 18.2081 17.0974 18.0684 16.8891 17.9737C16.6808 17.8767 16.4121 17.8281 16.083 17.8281H14.8756V24H13.5581ZM17.3153 20.7045L19.1157 24H17.6455L15.877 20.7045H17.3153ZM22.5265 24H20.0621V16.7273H22.5763C23.2983 16.7273 23.9186 16.8729 24.4371 17.1641C24.9579 17.4529 25.358 17.8684 25.6373 18.4105C25.9167 18.9527 26.0564 19.6013 26.0564 20.3565C26.0564 21.1141 25.9155 21.7652 25.6338 22.3097C25.3544 22.8542 24.9508 23.272 24.4229 23.5632C23.8973 23.8544 23.2652 24 22.5265 24ZM21.3795 22.8601H22.4626C22.9693 22.8601 23.3918 22.7678 23.7304 22.5831C24.0689 22.3961 24.3234 22.1179 24.4939 21.7486C24.6643 21.3769 24.7496 20.9129 24.7496 20.3565C24.7496 19.8002 24.6643 19.3385 24.4939 18.9716C24.3234 18.6023 24.0713 18.3265 23.7375 18.1442C23.406 17.9595 22.9941 17.8672 22.5017 17.8672H21.3795V22.8601Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="paint0_linear_506_8310"
          x1="7"
          y1="6.70552e-08"
          x2="25"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9A50B4" />
          <stop offset="1" stopColor="#0092E5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CRDs;
