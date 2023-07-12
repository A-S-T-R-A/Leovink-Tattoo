export function FaqIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path d="M5 7H7.01V9H5V7Z" fill="black" />
      <path d="M8 7H10.01V9H8V7Z" fill="black" />
      <path d="M11 7H13.01V9H11V7Z" fill="black" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 3H23V21H1V3ZM3 5V19H21V5H3Z"
        fill="black"
      />
    </svg>
  );
}
