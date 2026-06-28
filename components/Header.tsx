export default function Header() {
  const leftLinks = [
    { label: "獎金獵人", icon: "/images/bonus-icon.png", href: "https://bhuntr.com/" },
    { label: "試用獵人", icon: "/images/trybox-icon.png", href: "/" },
    { label: "Dream & Hunter", icon: "/images/dream-icon.png", href: "https://dream.bhuntr.com/" },
  ];

  return (
    <header className="w-full bg-[#1f1f1f] text-white text-[14px] font-bold leading-none">
      <div className="mx-auto flex h-[41px] max-w-[1200px] items-center justify-between px-0">
        <nav className="flex items-center gap-[18px]">
          {leftLinks.map((item) => (
            <a key={item.label} href={item.href} className="flex items-center gap-[4px] hover:opacity-80">
              <img src={item.icon} alt={item.label} className="h-[16px] w-[16px] object-contain brightness-0 invert" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <nav className="flex items-center gap-[22px]">
          <a href="#" className="hover:opacity-80">主辦專區</a>
          <a href="#" className="hover:opacity-80">服務介紹</a>
        </nav>
      </div>
    </header>
  );
}
