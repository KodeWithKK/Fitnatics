function TrainerIcon(props) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.002 19.303H18a6.808 6.808 0 01-6.808-6.808V4.688A3.688 3.688 0 0114.88 1h6.256a3.688 3.688 0 013.688 3.688v7.808a6.805 6.805 0 01-6.822 6.807z"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M12.273 8.864a3.688 3.688 0 01-.942-1.608h13.355a3.694 3.694 0 01-2.148 2.41c-.448.185-.93.28-1.415.278H14.88a3.688 3.688 0 01-2.607-1.08z"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <mask id="a" fill="#fff">
        <path d="M3.936 35.935V34.3A14.08 14.08 0 0118 20.303a14.08 14.08 0 0114.063 14.064V36" />
      </mask>
      <path
        d="M3.936 34.301l-2-.011v.011h2zM18 20.303l.002-2h-.004l.002 2zm14.063 14.064h2v-.003l-2 .003zM5.936 35.935V34.3h-4v1.634h4zm0-1.622a12.08 12.08 0 013.558-8.492l-2.822-2.835A16.08 16.08 0 001.937 34.29l4 .023zm3.558-8.492a12.08 12.08 0 018.508-3.518l-.004-4a16.08 16.08 0 00-11.326 4.683l2.822 2.835zm8.504-3.518a12.08 12.08 0 018.527 3.538l2.829-2.828a16.08 16.08 0 00-11.352-4.71l-.004 4zm8.527 3.538a12.08 12.08 0 013.539 8.528l4-.005a16.08 16.08 0 00-4.71-11.351l-2.829 2.828zm3.539 8.526V36h4v-1.633h-4z"
        fill="currentColor"
        mask="url(#a)"
      />
      <path
        d="M18.14 31.57a1.57 1.57 0 11-3.14 0 1.57 1.57 0 013.14 0z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M18 36v-5"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <mask id="b" fill="#fff">
        <path d="M9.192 23.32L17 32.678l7.808-9.36" />
      </mask>
      <path
        d="M17 32.679l-1.536 1.28L17 35.802l1.536-1.841L17 32.679zM7.657 24.6l7.807 9.359 3.072-2.562-7.808-9.36-3.071 2.563zm10.879 9.359l7.807-9.36-3.071-2.562-7.808 9.36 3.072 2.562z"
        fill="currentColor"
        mask="url(#b)"
      />
    </svg>
  );
}

function MemberIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
        <circle cx={12} cy={7} r={4} />
      </g>
    </svg>
  );
}

export { TrainerIcon, MemberIcon };
