export default function PageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
