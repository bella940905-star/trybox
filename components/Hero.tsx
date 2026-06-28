const tags = ["收納好上手", "OXO", "試用大隊", "試用獵人", "POP", "選單必吃"];
const tabs = ["最愛品牌牆", "試用心得", "參加試用 Q&A", "辦試用"];

export default function Hero() {
  return (
    <section className="w-full bg-white pt-[45px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="relative mb-[43px] min-h-[86px]">
          <div className="absolute left-0 top-[6px] flex w-[260px] flex-wrap gap-x-[8px] gap-y-[8px]">
            {tags.map((tag) => (
              <a
                key={tag}
                href="#"
                className="rounded-full border border-[#ff6b3a] px-[11px] py-[4px] text-[15px] font-normal leading-none text-[#ff6b3a]"
              >
                # {tag}
              </a>
            ))}
          </div>

          <a href="/" className="mx-auto block w-[245px]">
            <img src="/images/trybox-logo.svg" alt="試用獵人" className="w-full object-contain" />
          </a>

          <a
            href="#"
            className="absolute right-[35px] top-[22px] rounded-[6px] bg-[#ff7043] px-[22px] py-[12px] text-[15px] font-bold leading-none text-white hover:bg-[#f25f32]"
          >
            登入 / 註冊
          </a>
        </div>

        <div className="relative h-[600px] w-[1200px] overflow-visible">
          <img
            src="/images/hero-oxo.jpg"
            alt="OXO POP Containers 試用招募中"
            className="h-full w-full object-cover object-center"
          />
          <button className="absolute left-0 top-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-[38px] font-light text-black shadow-sm">
            ‹
          </button>
          <button className="absolute right-0 top-1/2 flex h-[54px] w-[54px] translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white text-[38px] font-light text-black shadow-sm">
            ›
          </button>
        </div>

        <div className="mt-[38px] grid grid-cols-4 gap-[10px]">
          {tabs.map((tab) => (
            <a
              key={tab}
              href="#"
              className="flex h-[66px] items-center justify-center bg-[#e8e8e8] text-[20px] font-normal text-[#555]"
            >
              {tab}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
