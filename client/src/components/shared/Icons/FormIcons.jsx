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

function EmailIcon(props) {
  return (
    <svg
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      {...props}
    >
      <style>
        {
          ".st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
        }
      </style>
      <path
        className="st0"
        d="M22.6 26c-2.2 1.5-5 2.3-8 1.9-5.5-.6-10-5.1-10.6-10.6C3.3 10.1 8.9 4 16 4h.8c7.5.5 12.4 8.3 10 15.5v.1C26.3 21 25 22 23.5 22c-1.9 0-3.5-1.6-3.5-3.5V11"
      />
      <path
        className="st0"
        d="M16 21c-2.2 0-4-1.8-4-4v-2c0-2.2 1.8-4 4-4s4 1.8 4 4v2c0 2.2-1.8 4-4 4z"
      />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.1 13.359l-.528-.532zm.456-.453l.529.532zm2.417-.317l-.358.66zm1.91 1.039l-.358.659zm.539 3.255l.529.532zm-1.42 1.412l-.53-.531zm-1.326.67l.07.747zm-9.86-4.238l.528-.532zM4.002 5.746l-.749.042zm6.474 1.451l.53.532zm.157-2.654l.6-.449zM9.374 2.86l-.601.45zM6.26 2.575l.53.532zm-1.57 1.56l-.528-.531zm7.372 7.362l.529-.532zm4.567 2.394l.455-.453-1.058-1.064-.455.453zm1.985-.643l1.91 1.039.716-1.318-1.91-1.038zm2.278 3.103l-1.42 1.413 1.057 1.063 1.42-1.412zm-2.286 1.867c-1.45.136-5.201.015-9.263-4.023l-1.057 1.063c4.432 4.407 8.65 4.623 10.459 4.454zm-9.263-4.023c-3.871-3.85-4.512-7.087-4.592-8.492l-1.498.085c.1 1.768.895 5.356 5.033 9.47zm1.376-6.18l.286-.286L9.95 6.666l-.287.285zm.515-3.921L9.974 2.41l-1.201.899 1.26 1.684zM5.733 2.043l-1.57 1.56 1.058 1.064 1.57-1.56zm4.458 5.44c-.53-.532-.53-.532-.53-.53h-.002l-.003.004a1.064 1.064 0 00-.127.157c-.054.08-.113.185-.163.318a2.099 2.099 0 00-.088 1.071c.134.865.73 2.008 2.256 3.526l1.058-1.064c-1.429-1.42-1.769-2.284-1.832-2.692-.03-.194.001-.29.01-.312.005-.014.007-.015 0-.006a.276.276 0 01-.03.039l-.01.01a.203.203 0 01-.01.009zm1.343 4.546c1.527 1.518 2.676 2.11 3.542 2.242.443.068.8.014 1.071-.087a1.536 1.536 0 00.42-.236.923.923 0 00.05-.045l.007-.006.003-.003.001-.002s.002-.001-.527-.533c-.53-.532-.528-.533-.528-.533l.002-.002.002-.002.006-.005.01-.01a.383.383 0 01.038-.03c.01-.007.007-.004-.007.002-.025.009-.123.04-.32.01-.414-.064-1.284-.404-2.712-1.824zm-1.56-9.62C8.954 1.049 6.95.834 5.733 2.044L6.79 3.107c.532-.529 1.476-.475 1.983.202zM4.752 5.704c-.02-.346.139-.708.469-1.036L4.163 3.604c-.537.534-.96 1.29-.909 2.184zm14.72 12.06c-.274.274-.57.428-.865.455l.139 1.494c.735-.069 1.336-.44 1.784-.885zM11.006 7.73c.985-.979 1.058-2.527.229-3.635l-1.201.899c.403.539.343 1.246-.085 1.673zm9.52 6.558c.817.444.944 1.49.367 2.064l1.058 1.064c1.34-1.333.927-3.557-.71-4.446zm-3.441-.849c.384-.382 1.002-.476 1.53-.19l.716-1.317c-1.084-.59-2.428-.427-3.304.443z"
      />
    </svg>
  );
}

function DOBIcon(props) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M232 112a24 24 0 00-24-24h-72v-9a32.06 32.06 0 0024-31c0-28-26.44-45.91-27.56-46.66a8 8 0 00-8.88 0C122.44 2.09 96 20 96 48a32.06 32.06 0 0024 31v9H48a24 24 0 00-24 24v23.33a40.84 40.84 0 008 24.24V200a24 24 0 0024 24h144a24 24 0 0024-24v-40.43a40.84 40.84 0 008-24.24zM112 48c0-13.57 10-24.46 16-29.79 6 5.33 16 16.22 16 29.79a16 16 0 01-32 0m-72 64a8 8 0 018-8h160a8 8 0 018 8v23.33c0 13.25-10.46 24.31-23.32 24.66A24 24 0 01168 136a8 8 0 00-16 0 24 24 0 01-48 0 8 8 0 00-16 0 24 24 0 01-24.68 24C50.46 159.64 40 148.58 40 135.33zm160 96H56a8 8 0 01-8-8v-27.44A38.8 38.8 0 0062.88 176a39.7 39.7 0 0029-11.31A40.4 40.4 0 0096 160a40 40 0 0064 0 40.4 40.4 0 004.13 4.67A39.67 39.67 0 00192 176h1.14a38.8 38.8 0 0014.86-3.44V200a8 8 0 01-8 8"
      />
    </svg>
  );
}

function GenderIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M208 24h-40a8 8 0 000 16h20.69l-25.15 25.15A64 64 0 10112 175.48V192H88a8 8 0 000 16h24v24a8 8 0 0016 0v-24h24a8 8 0 000-16h-24v-16.52a63.92 63.92 0 0045.84-98L200 51.31V72a8 8 0 0016 0V32a8 8 0 00-8-8m-88 136a48 48 0 1148-48 48.05 48.05 0 01-48 48"
      />
    </svg>
  );
}

function MaleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M14.232 9.747a6 6 0 10-8.465 8.506 6 6 0 008.465-8.506m0 0L20 4m0 0h-4m4 0v4"
      />
    </svg>
  );
}

function FemaleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 14.313A5.781 5.781 0 1012 2.75a5.781 5.781 0 000 11.563m0 0v6.937m-3.469-3.469h6.938"
      />
    </svg>
  );
}

function HeightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 22V2m0 20l-4-4m4 4l4-4M12 2L8 6m4-4l4 4"
      />
    </svg>
  );
}

function WeightIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        color="currentColor"
      >
        <path d="M6.683 5c-1.365.062-2.208.254-2.804.851C3 6.731 3 8.148 3 10.981v5.009c0 2.833 0 4.25.879 5.13C4.757 22 6.172 22 9 22h6c2.828 0 4.243 0 5.121-.88S21 18.823 21 15.99v-5.01c0-2.833 0-4.25-.879-5.13-.596-.597-1.44-.79-2.804-.851" />
        <path d="M7.025 6.54c-.48-1.88-.72-2.82-.33-3.51a2 2 0 01.394-.492C7.678 2 8.669 2 10.65 2h2.7c1.981 0 2.972 0 3.561.538.157.143.29.31.394.493.39.69.15 1.63-.33 3.51-.384 1.498-.575 2.247-1.087 2.74q-.21.203-.461.353c-.614.366-1.404.366-2.983.366h-.888c-1.58 0-2.37 0-2.983-.366a2.6 2.6 0 01-.46-.352C7.6 8.788 7.407 8.039 7.024 6.54M10 18h4m-2.5-8l1-3" />
      </g>
    </svg>
  );
}

function ExperienceIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M8.319 12.198l3.88-3.88m3.104 3.104l-3.88 3.88"
          opacity={0.5}
        />
        <path d="M3.432 15.62c-.905-.905-1.357-1.357-1.421-1.91a1.598 1.598 0 010-.37c.064-.552.516-1.004 1.42-1.908.905-.905 1.357-1.357 1.909-1.421.123-.015.248-.015.37 0 .553.064 1.005.516 1.91 1.42l4.948 4.95c.905.904 1.357 1.356 1.421 1.908.015.123.015.248 0 .371-.064.552-.516 1.004-1.42 1.908-.905.905-1.357 1.357-1.909 1.421a1.598 1.598 0 01-.37 0c-.553-.064-1.005-.516-1.91-1.42zm8-8c-.905-.905-1.357-1.357-1.421-1.91a1.598 1.598 0 010-.37c.064-.552.516-1.004 1.42-1.908.905-.905 1.357-1.357 1.909-1.421.123-.015.248-.015.37 0 .553.064 1.005.516 1.91 1.42l4.948 4.95c.905.904 1.357 1.356 1.421 1.908.015.123.015.248 0 .371-.064.552-.516 1.004-1.42 1.908-.905.905-1.357 1.357-1.909 1.421a1.598 1.598 0 01-.37 0c-.553-.064-1.005-.516-1.91-1.42z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.019 2.498l3.104 3.104M2.498 18.019l3.104 3.104"
        />
      </g>
    </svg>
  );
}

function BeginnerIcon(props) {
  return (
    <svg
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.668 10.021a1.915 1.915 0 00-1.564-1.315l-7.266-1.093-3.22-6.539A1.909 1.909 0 0013.885 0c-.74 0-1.407.417-1.73 1.074L8.87 7.65 1.66 8.697a1.94 1.94 0 00-1.565 1.315 1.926 1.926 0 00.491 1.982l5.238 5.16-1.23 7.177a1.906 1.906 0 00.768 1.89 1.928 1.928 0 002.036.147l6.525-3.39 6.452 3.39c.286.148.592.222.897.222.398 0 .796-.129 1.14-.37a1.906 1.906 0 00.767-1.889l-1.203-7.252 5.211-5.085a1.893 1.893 0 00.481-1.973zm-1.787.658l-5.21 5.084a1.932 1.932 0 00-.556 1.714l1.231 7.187-.12.083-6.442-3.39a1.945 1.945 0 00-1.805 0l-6.442 3.39-.12-.083 1.231-7.187a1.934 1.934 0 00-.555-1.714l-5.21-5.084.045-.139 7.21-1.047a1.933 1.933 0 001.453-1.056l3.295-6.576c.056 0 .065.028.074.047l3.221 6.538c.278.575.824.964 1.453 1.056l7.21 1.047.037.13z"
        fill="currentColor"
      />
    </svg>
  );
}

function IntermediateIcon(props) {
  return (
    <svg
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.668 11.021a1.916 1.916 0 00-1.564-1.315l-7.266-1.093-3.22-6.539A1.909 1.909 0 0014.885 1c-.74 0-1.407.417-1.73 1.074L9.87 8.65 2.66 9.697a1.94 1.94 0 00-1.565 1.315 1.926 1.926 0 00.491 1.982l5.238 5.16-1.23 7.177a1.906 1.906 0 00.768 1.89 1.928 1.928 0 002.036.147l6.525-3.39 6.452 3.39c.286.148.592.222.897.222.398 0 .796-.129 1.14-.37a1.906 1.906 0 00.767-1.889l-1.203-7.252 5.211-5.085a1.893 1.893 0 00.481-1.973zm-1.787.658l-5.21 5.084a1.932 1.932 0 00-.556 1.714l1.231 7.187-.12.083-6.442-3.39a1.944 1.944 0 00-1.805 0l-6.442 3.39-.12-.083 1.231-7.187a1.934 1.934 0 00-.555-1.714l-5.21-5.084.045-.139 7.21-1.047a1.934 1.934 0 001.453-1.056l3.295-6.576c.056 0 .065.028.074.047l.04.08 3.181 6.458c.278.575.824.964 1.453 1.056l7.21 1.047.037.13z"
        fill="currentColor"
      />
      <path
        d="M14.882 22.135c.04 0 .079.001.118.004V2.989l-.04-.081c-.009-.019-.018-.047-.074-.047l-3.295 6.576a1.932 1.932 0 01-1.453 1.056l-7.21 1.047-.046.139 5.211 5.084a1.934 1.934 0 01.555 1.714l-1.23 7.187.12.083 6.441-3.39c.279-.146.588-.222.903-.222z"
        fill="currentColor"
      />
      <path
        d="M15 2.5v.489M15 23v-.861m0 0a1.939 1.939 0 00-1.02.218l-6.443 3.39-.12-.083 1.231-7.187a1.934 1.934 0 00-.555-1.714l-5.21-5.084.045-.139 7.21-1.047a1.934 1.934 0 001.453-1.056l3.295-6.576c.056 0 .065.028.074.047l.04.08m0 19.15V2.989m0 19.15c.274.017.54.091.784.219l6.442 3.39.12-.083-1.23-7.187a1.931 1.931 0 01.555-1.714l5.21-5.084-.037-.13-7.21-1.047a1.913 1.913 0 01-1.453-1.056L15 2.99m13.668 8.032a1.916 1.916 0 00-1.564-1.315l-7.266-1.093-3.22-6.539A1.909 1.909 0 0014.885 1c-.74 0-1.407.417-1.73 1.074L9.87 8.65 2.66 9.697a1.94 1.94 0 00-1.565 1.315 1.926 1.926 0 00.491 1.982l5.238 5.16-1.23 7.177a1.906 1.906 0 00.768 1.89 1.928 1.928 0 002.036.147l6.525-3.39 6.452 3.39c.286.148.592.222.897.222.398 0 .796-.129 1.14-.37a1.906 1.906 0 00.767-1.889l-1.203-7.252 5.211-5.085a1.893 1.893 0 00.481-1.973z"
        stroke="currentColor"
      />
    </svg>
  );
}

function AdvancedIcon(props) {
  return (
    <svg viewBox="0 0 28 27" fill="none" {...props}>
      <path
        d="M27.668 10.021a1.915 1.915 0 00-1.564-1.315l-7.266-1.093-3.22-6.539A1.909 1.909 0 0013.885 0c-.74 0-1.407.417-1.73 1.074L8.87 7.65 1.66 8.697a1.94 1.94 0 00-1.565 1.315 1.926 1.926 0 00.491 1.982l5.238 5.16-1.23 7.177a1.906 1.906 0 00.768 1.89 1.928 1.928 0 002.036.147l6.525-3.39 6.452 3.39c.286.148.592.222.897.222.398 0 .796-.129 1.14-.37a1.906 1.906 0 00.767-1.889l-1.203-7.252 5.211-5.085a1.893 1.893 0 00.481-1.973zm-1.787.658l-5.21 5.084a1.932 1.932 0 00-.556 1.714l1.231 7.187-.12.083-6.442-3.39a1.945 1.945 0 00-1.805 0l-6.442 3.39-.12-.083 1.231-7.187a1.934 1.934 0 00-.555-1.714l-5.21-5.084.045-.139 7.21-1.047a1.933 1.933 0 001.453-1.056l3.295-6.576c.056 0 .065.028.074.047l3.221 6.538c.278.575.824.964 1.453 1.056l7.21 1.047.037.13z"
        fill="currentColor"
      />
      <path
        d="M25.881 10.679l-5.21 5.084a1.932 1.932 0 00-.556 1.714l1.231 7.187-.12.083-6.442-3.39a1.945 1.945 0 00-1.805 0l-6.442 3.39-.12-.083 1.231-7.187a1.934 1.934 0 00-.555-1.714l-5.21-5.084.045-.139 7.21-1.047a1.933 1.933 0 001.453-1.056l3.295-6.576c.056 0 .065.028.074.047l3.221 6.538c.278.575.824.964 1.453 1.056l7.21 1.047.037.13z"
        fill="currentColor"
      />
    </svg>
  );
}

function AddressIcon(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
      />
    </svg>
  );
}

function DegreeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
      >
        <path d="M22 9L12 5 2 9l10 4zv6" />
        <path d="M6 10.6V16a6 3 0 0012 0v-5.4" />
      </g>
    </svg>
  );
}

function SpecializationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 16c-5.76 0-6.78-5.74-6.96-10.294-.051-1.266-.076-1.9.4-2.485.475-.586 1.044-.682 2.183-.874A26.374 26.374 0 0112 2c1.784 0 3.253.157 4.377.347 1.139.192 1.708.288 2.184.874.476.586.45 1.219.4 2.485-.18 4.553-1.2 10.294-6.96 10.294z" />
        <path strokeLinecap="round" d="M12 16v3" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.5 22h-7l.34-1.696a1 1 0 01.98-.804h4.36a1 1 0 01.98.804z"
        />
        <path d="M19 5l.949.316c.99.33 1.485.495 1.768.888.283.393.283.915.283 1.958v.073c0 .86 0 1.291-.207 1.643-.207.352-.584.561-1.336.98L17.5 12.5M5 5l-.949.316c-.99.33-1.485.495-1.768.888C2 6.597 2 7.12 2 8.162v.073c0 .86 0 1.291.207 1.643.207.352.584.561 1.336.98L6.5 12.5m4.646-6.477C11.526 5.34 11.716 5 12 5c.284 0 .474.34.854 1.023l.098.176c.108.194.162.29.246.354.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532.088.283-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354-.032.104-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135-.104 0-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438-.032-.103-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135.084-.064.138-.16.246-.354z" />
        <path strokeLinecap="round" d="M18 22H6" />
      </g>
    </svg>
  );
}

function TrainerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M3.76 3.7L2.14 4.88 4.43 8a8.2 8.2 0 011.92-.72M11 9v2h7v.29l-5 1.42v2.79A4.5 4.5 0 118.5 11H9V9h-.5a6.5 6.5 0 106.5 6.5v-1.59L22 12V9m-5.76-5.3L13.85 7h2.47l1.54-2.12M9 2v5h2V2z"
      />
    </svg>
  );
}

function WorkplaceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M5.978 3.212h6.938a2.775 2.775 0 012.775 2.775v14.8H3.203v-14.8a2.775 2.775 0 012.775-2.775M2.75 20.788h18.5" />
        <path d="M8.531 14.313h1.85A1.388 1.388 0 0111.77 15.7v5.088H7.144V15.7a1.387 1.387 0 011.387-1.387m-1.859-7.4h5.55m-5.55 3.7h5.55m3.468-1.388h1.85A2.775 2.775 0 0120.317 12v8.788" />
      </g>
    </svg>
  );
}

function LanguageIcon(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 112h288M192 64v48m80 336l96-224 96 224m-162.5-64h133M281.3 112S257 206 199 277 80 384 80 384"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 336s-35-27-72-75-56-85-56-85"
      />
    </svg>
  );
}

function ScheduleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 8v4l3 3"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

export {
  MemberIcon,
  EmailIcon,
  PhoneIcon,
  DOBIcon,
  GenderIcon,
  MaleIcon,
  FemaleIcon,
  HeightIcon,
  WeightIcon,
  ExperienceIcon,
  BeginnerIcon,
  IntermediateIcon,
  AdvancedIcon,
  AddressIcon,
  DegreeIcon,
  SpecializationIcon,
  TrainerIcon,
  WorkplaceIcon,
  LanguageIcon,
  ScheduleIcon,
};
