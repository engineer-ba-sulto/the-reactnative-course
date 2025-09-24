import { Metadata } from "next";

export function DashboardHeader({
  title,
  description,
}: {
  title: Metadata["title"];
  description?: Metadata["description"];
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title!.toString()}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
