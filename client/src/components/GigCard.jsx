import {
  BookFilled,
  BookOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

function getInitials(name = "") {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return "JN";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getPriceLabel(price) {
  if (price === undefined || price === null || price === "") {
    return "Open rate";
  }

  const value = String(price);
  return value.startsWith("$") ? value : `$${value}`;
}

export default function GigCard({
  post,
  isLoggedIn,
  isBookmarked,
  onBookmark,
  savedView = false,
}) {
  const name = post.name || "JobNow member";
  const subject = post.subject || "Untitled gig";
  const location = post.location || "Location pending";
  const description = post.description || "No description provided yet.";

  return (
    <article className="surface-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-slate-950 text-lg font-black text-teal-300">
          {getInitials(name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <UserOutlined />
                {name}
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">
                {subject}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-orange-100 px-3 py-2 text-sm font-black text-orange-700">
                <DollarOutlined />
                {getPriceLabel(post.price)}
              </span>
              {isLoggedIn && (
                <button
                  id={post.id}
                  type="button"
                  aria-label={isBookmarked ? "Remove saved gig" : "Save gig"}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md border text-lg transition ${
                    isBookmarked
                      ? "border-teal-500 bg-teal-500 text-slate-950"
                      : "border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-700"
                  }`}
                  onClick={() => onBookmark(post.id)}
                >
                  {isBookmarked ? <BookFilled /> : <BookOutlined />}
                </button>
              )}
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <EnvironmentOutlined className="text-teal-600" />
            {location}
          </p>
          <p className="mt-4 leading-7 text-slate-700">{description}</p>
          {savedView && (
            <p className="mt-5 text-sm font-bold text-teal-700">
              Saved to your shortlist
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
