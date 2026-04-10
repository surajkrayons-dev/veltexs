import VeltexLogo from '../../assets/VeltexLogo.png';

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-[6vw] flex flex-col gap-4 opacity-80 font-sans text-[0.7rem] uppercase tracking-[0.25em] z-10 footer pb-32 sm:pb-40 text-black bg-white"
      role="contentinfo"
    >
      <div className="mb-4 opacity-100 block">
        <img
          src={VeltexLogo}
          alt="Veltex logo"
          className="h-10 w-auto object-contain sm:h-10"
        />
      </div>
      <div className="flex flex-col gap-4">
        {/* <span>Singapore&nbsp;·&nbsp;Hong Kong&nbsp;·&nbsp;Global</span> */}
        <span>At Veltex, we believe that every business, regardless of size or industry, deserves the power to tell their story and reach their audience.

          Since 2013, making professional media planning and execution accessible to all.</span>
        <span>© {new Date().getFullYear()} Veltex Studio. All rights reserved.</span>
      </div>
    </footer>
  );
}
