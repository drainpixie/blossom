import { default as NextLink } from "next/link";

export default function Link({
  href,
  text,
  open = true,
}: {
  href: string;
  text: string;
  open?: boolean;
}) {
  return (
    <>
      <NextLink
        href={href}
        passHref
        rel="noopener noreferrer"
        target={open ? "_blank" : undefined}
      >
        {text}
      </NextLink>
      <sub>↗</sub>
    </>
  );
}
