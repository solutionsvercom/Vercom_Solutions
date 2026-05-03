const VERCOM_LOGO_URL =
  'https://res.cloudinary.com/dzqn75ugc/image/upload/v1777822284/logo_rhqqma.png';

export function BrandLogoBox() {
  return (
    <img
      src={VERCOM_LOGO_URL}
      alt="Vercom Solutions"
      className="h-12 sm:h-14 md:h-16 w-auto max-w-[min(280px,55vw)] object-contain object-left shrink-0"
      draggable={false}
      loading="eager"
      decoding="async"
    />
  );
}
