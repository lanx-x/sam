type ToolingCapability = {
  id: number | string;
  title?: string | null;
  desc?: string | null;
};

type ToolingCapabilitiesSection = {
  title?: string | null;
  desc?: string | null;
  data?: ToolingCapability[] | null;
};

type ToolingCapabilitiesProps = {
  section?: ToolingCapabilitiesSection | null;
};

export function ToolingCapabilities({ section }: ToolingCapabilitiesProps) {
  const capabilities = section?.data ?? [];

  if (!section || capabilities.length === 0) return null;

  return (
    <section data-section="tooling_capabilities" className="bg-[#fafafa] py-15 xl:py-25">
      <div className="px-5 xl:mx-auto xl:w-7xl xl:px-0">
        <h2 className="text-center text-3xl font-semibold leading-normal xl:text-5xl">
          {section.title}
        </h2>
        {section.desc && (
          <p className="mt-3 text-center text-sm leading-normal xl:mt-4 xl:text-base">
            {section.desc}
          </p>
        )}

        <div className="mt-15 xl:mt-15">
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              className={`grid min-h-22 grid-cols-1 border-t border-[#bfbfbf] py-4 xl:min-h-16 xl:grid-cols-[3fr_5fr] xl:py-0 ${index === capabilities.length - 1 ? "border-b" : ""}`}
            >
              <p className="text-lg font-bold leading-6 xl:flex xl:items-center xl:border-r xl:border-[#bfbfbf] xl:px-10">
                {capability.title}
              </p>
              <p className="mt-2 text-base leading-6 xl:mt-0 xl:flex xl:items-center xl:px-10">
                {capability.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
