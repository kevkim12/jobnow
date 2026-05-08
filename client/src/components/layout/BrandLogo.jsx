export default function BrandLogo({
  className = "",
  light = false,
  showTagline = false,
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/jobnow-mark.svg"
        alt=""
        className="h-10 w-10 shrink-0 rounded-md shadow-sm"
      />
      <div className="leading-none">
        <div
          className={`text-xl font-black ${
            light ? "text-white" : "text-slate-950"
          }`}
        >
          Job<span className="text-teal-500">Now</span>
        </div>
        {showTagline && (
          <div
            className={`mt-1 text-xs font-semibold uppercase ${
              light ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Work moves faster
          </div>
        )}
      </div>
    </div>
  );
}
