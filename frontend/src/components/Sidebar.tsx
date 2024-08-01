interface SidebarProps {
  posts: {
    uniqueId: number;
    title: string;
    color: colors;
  }[];
}

enum colors {
  "purple",
  "pink",
  "green",
  "orange",
  "blue",
  "navyblue",
}

export const Sidebar = ({ posts }: SidebarProps) => {
  return (
    <div className="flex flex-col">
      {posts.map((post) => {
        return (
          <div>
            <div className={`post.color ${rounded - full}`}>{post.title}</div>
          </div>
        );
      })}
    </div>
  );
};
